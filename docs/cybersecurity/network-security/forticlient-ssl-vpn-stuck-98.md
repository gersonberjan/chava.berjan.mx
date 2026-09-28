---
title: "FortiClient SSL VPN se detiene al 98 %"
description: "Metodología de troubleshooting para FortiClient SSL VPN cuando la conexión se detiene o desconecta al 98 %."
---

# FortiClient SSL VPN se detiene al 98 %

> **Idea principal:** el 98 % es un síntoma, no un diagnóstico.

FortiClient puede detenerse o desconectarse al 98 % por causas diferentes. Tratar ese porcentaje como si identificara una falla específica puede llevar a aplicar correcciones que no corresponden al problema real.

Esta guía parte de un caso que documenté originalmente en 2017, donde la causa terminó siendo un problema con los WAN Miniport de Windows. Con el tiempo, Fortinet ha documentado otros escenarios que producen exactamente el mismo síntoma: problemas del driver SSL VPN, latencia y timeout, SAML/MFA, resolución IPv4/IPv6, reanudación después de suspensión y bugs específicos de determinadas versiones de FortiClient.

Por eso el objetivo aquí no es proporcionar una receta para "arreglar el 98 %", sino establecer una metodología para determinar **qué etapa de la conexión está fallando**.

## Contexto

- Producto: FortiClient para Windows
- Tecnología: FortiGate SSL VPN
- Síntoma: conexión detenida o desconectada alrededor del 98 %
- Caso original: 2017
- Documento revisado y actualizado: 2026

:::caution
Antes de aplicar cambios sobre drivers, adaptadores o configuración de FortiGate, verifica la compatibilidad entre las versiones de FortiClient y FortiOS y revisa las release notes correspondientes. Existen defectos de versión que pueden manifestarse exactamente como una conexión detenida al 98 %.
:::

## 1. No diagnosticar por el porcentaje

La interfaz de FortiClient muestra el progreso del establecimiento del túnel, pero el porcentaje por sí mismo no identifica la causa.

Fortinet ha documentado, entre otros, casos relacionados con:

- latencia o timeout durante el login;
- problemas del driver SSL VPN;
- autenticación SAML;
- MFA/FortiToken;
- FQDN del gateway resolviendo simultáneamente a IPv4 e IPv6;
- equipos que vuelven de standby o sleep;
- determinadas redes móviles/hotspots;
- bugs asociados a versiones concretas de FortiClient.

Por tanto:

```text
FortiClient muestra 98 %
        ↓
NO asumir una causa
        ↓
obtener evidencia del cliente y FortiGate
        ↓
determinar hasta dónde llegó la negociación
        ↓
corregir la capa que realmente falló
```

## 2. Capturar evidencia antes de modificar

Si es posible, reproduce el problema con logging/debug habilitado antes de reinstalar FortiClient, eliminar adaptadores o cambiar la configuración del FortiGate.

### FortiClient

Fortinet recomienda habilitar logging de nivel Debug, reproducir el error y exportar los logs del cliente.

Registra también:

- versión exacta de FortiClient;
- versión de Windows;
- tipo de autenticación utilizado;
- red desde la que se conecta el usuario;
- si el problema ocurre siempre o después de sleep/standby;
- si otros usuarios pueden conectarse al mismo gateway;
- si el mismo usuario puede conectarse desde otro equipo.

Estas comparaciones ayudan a separar rápidamente un problema del gateway de uno específico del endpoint.

### FortiGate

El objetivo del debug del FortiGate es responder preguntas concretas:

1. ¿La solicitud llega al FortiGate?
2. ¿La autenticación termina correctamente?
3. ¿Se asigna una IP al túnel?
4. ¿Se crea la sesión SSL VPN?
5. ¿El FortiGate termina inmediatamente la conexión?

No basta con observar que FortiClient llegó al 98 %.

## 3. Clasificar el problema

Una forma práctica de organizar el diagnóstico es separar las causas en capas.

| Capa | Qué revisar |
| --- | --- |
| Conectividad | Reachability, pérdida, latencia, puerto del SSL VPN |
| Autenticación | LDAP/RADIUS, MFA, FortiToken, SAML |
| Asignación | IP pool y creación de sesión |
| Endpoint | drivers, adaptadores, sleep/standby, red local |
| Resolución | FQDN, IPv4/IPv6, DNS |
| Software | compatibilidad FortiClient/FortiOS y bugs conocidos |

El mismo síntoma visual puede aparecer en cualquiera de estas capas.

## 4. Caso real: WAN Miniport de Windows

En el caso que documenté en 2017, FortiClient alcanzaba el 98 %, la negociación en FortiGate aparentemente terminaba y posteriormente la conexión era eliminada.

Después de revisar el comportamiento del gateway, el problema se aisló al endpoint Windows. La recuperación de los WAN Miniport resolvió ese caso.

Los componentes involucrados fueron:

```text
ms_ndiswanip
ms_ndiswanipv6
```

En aquel entorno se eliminaron los dispositivos y, después del reinicio, Windows volvió a instalarlos.

El procedimiento utilizado fue:

```powershell
netcfg -u ms_ndiswanip
netcfg -u ms_ndiswanipv6
```

Después se reinició Windows y se validó nuevamente la conexión.

:::warning
Estos comandos documentan **la resolución de un caso concreto**, no una solución universal para FortiClient detenido al 98 %. No deberían ejecutarse como primer paso sólo porque la GUI muestre ese porcentaje.
:::

## 5. Por qué el mismo 98 % puede tener otras causas

Las release notes de FortiClient muestran claramente por qué el porcentaje no debe utilizarse como diagnóstico.

Fortinet ha corregido problemas donde el 98 % estaba relacionado con escenarios distintos, por ejemplo:

- SSL VPN con SAML/Azure AD;
- FQDN del gateway resolviendo a IPv4 e IPv6;
- endpoint que permaneció en standby/sleep;
- MFA con FortiToken;
- caracteres específicos en el hostname;
- determinadas conexiones mediante hotspot.

Esto significa que una solución encontrada en un foro o blog puede haber sido correcta para ese entorno y, aun así, ser completamente irrelevante para otro usuario con el mismo porcentaje en pantalla.

## 6. Orden recomendado de troubleshooting

En lugar de comenzar modificando el endpoint, recomiendo seguir este orden:

```text
1. Registrar versiones y contexto
        ↓
2. Reproducir y capturar logs
        ↓
3. Confirmar reachability al gateway
        ↓
4. Revisar autenticación
        ↓
5. Confirmar creación de sesión y asignación IP
        ↓
6. Correlacionar FortiGate ↔ FortiClient
        ↓
7. Revisar release notes / bugs conocidos
        ↓
8. Investigar componentes específicos del endpoint
        ↓
9. Aplicar una corrección dirigida
        ↓
10. Repetir la prueba y validar
```

La corrección debe aparecer **después** del diagnóstico, no antes.

## 7. Validación

Una resolución no debería cerrarse únicamente porque la barra llegó al 100 %.

Valida al menos:

- el túnel permanece establecido;
- el endpoint recibe la configuración/IP esperada;
- las rutas necesarias están presentes;
- DNS funciona según el diseño;
- los recursos internos esperados son alcanzables;
- una desconexión/reconexión funciona correctamente;
- cuando aplique, sleep/standby no reproduce el problema.

## Qué aprendimos del caso original

El artículo de 2017 era útil porque documentaba una solución que funcionó en un incidente real. Sin embargo, visto con más experiencia y con la evidencia acumulada por el fabricante, la lección más importante no es el comando utilizado.

La lección es esta:

> **Un síntoma de interfaz no sustituye al diagnóstico.**

Dos usuarios pueden decir exactamente "FortiClient se queda al 98 %" y estar experimentando fallas completamente diferentes.

La forma correcta de abordar el problema es correlacionar evidencia del endpoint, autenticación, gateway, asignación de sesión y versión del software antes de elegir una acción correctiva.

## Referencias

- Fortinet Document Library — *Troubleshooting common issues*, FortiGate/FortiOS.
- Fortinet Document Library — FortiClient Windows Release Notes y sus secciones de *Known issues* / *Resolved issues*.
- Salvador Berjan — *FortiClient se congela al 98% y se desconecta*, Xecure Blog, 2017 (caso original).

## Historial

| Fecha | Cambio |
| --- | --- |
| 2017-02 | Caso original documentado en Xecure Blog |
| 2026-09 | Revisión del caso y conversión a metodología de troubleshooting |
