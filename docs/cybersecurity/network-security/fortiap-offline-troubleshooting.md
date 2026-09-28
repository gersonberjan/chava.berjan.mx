---
title: "FortiAP aparece Offline: diagnosticar antes de reiniciar"
description: "Metodología de troubleshooting para un FortiAP offline, separando energía, red, CAPWAP, controlador y software antes de aplicar acciones correctivas."
---

# FortiAP aparece Offline: diagnosticar antes de reiniciar

Que un FortiAP aparezca como **Offline** en FortiGate describe el estado observado, pero no identifica la causa.

El mismo síntoma puede aparecer por problemas de energía/PoE, enlace, VLAN, DHCP, routing, CAPWAP, autorización, compatibilidad de firmware o por una condición del propio wireless controller.

La idea de esta guía es diagnosticar por capas antes de reiniciar el AP o el controlador.

## Principio de diagnóstico

```text
FortiAP Offline
      |
      v
1. Energia / PoE
      |
      v
2. Enlace / VLAN
      |
      v
3. IP / DHCP / ARP
      |
      v
4. Reachability
      |
      v
5. CAPWAP
      |
      v
6. Autorizacion / Wireless Controller
      |
      v
7. Firmware / compatibilidad / software
```

Cada paso debe producir evidencia antes de avanzar al siguiente.

## 1. ¿El FortiAP está realmente encendido?

Antes de analizar CAPWAP, confirmar la capa física:

- alimentación o PoE;
- estado del puerto;
- negociación del enlace;
- errores o flapping del puerto;
- VLAN asignada al puerto del AP.

Un reinicio PoE puede recuperar un dispositivo, pero hacerlo como primera acción elimina información sobre el estado previo. Si el objetivo es encontrar la causa, primero conviene registrar qué estaba ocurriendo.

## 2. ¿El AP obtuvo dirección IP?

Verificar DHCP y ARP permite confirmar que el FortiAP superó las primeras capas de conectividad.

En FortiGate puede revisarse la tabla ARP y el monitor DHCP correspondiente.

```bash
get system arp
```

Preguntas que debemos responder:

- ¿aparece la MAC del FortiAP?
- ¿recibió la IP esperada?
- ¿está en la VLAN correcta?
- ¿gateway y addressing corresponden con el diseño?

Si el AP no tiene IP válida, todavía no tiene sentido diagnosticar el wireless controller.

## 3. Validar reachability

Con IP confirmada, comprobar que existe un camino entre FortiAP y FortiGate.

En una conexión L2 el descubrimiento puede ser directo. En diseños L3 o a través de WAN/VPN debe existir routing y un método de discovery adecuado hacia el wireless controller.

La existencia de una dirección IP no demuestra por sí sola que el AP pueda alcanzar al controlador.

## 4. Verificar CAPWAP

FortiAP utiliza CAPWAP para comunicarse con el wireless controller. El control utiliza UDP/5246 y el canal de datos puede utilizar UDP/5247.

Una captura permite responder una pregunta mucho más útil que simplemente observar `Offline`:

> ¿el FortiAP está intentando comunicarse con FortiGate y FortiGate está respondiendo?

Por ejemplo:

```bash
diagnose sniffer packet any "port (5246 or 5247)" 4 0 l
```

También puede centrarse el análisis en el canal de control:

```bash
diagnose sniffer packet <interface> "port 5246" 4 0 l
```

### Interpretación básica

```text
No vemos tráfico desde el AP
        -> revisar AP, VLAN, routing y discovery

Vemos tráfico AP -> FortiGate pero no respuesta
        -> revisar interfaz/controlador/configuración

Vemos comunicación bidireccional
        -> continuar con asociación, autorización y estado del controller
```

## 5. Security Fabric Connection

En versiones actuales de FortiOS, la interfaz o VLAN por la que el FortiAP alcanza al FortiGate debe permitir **Security Fabric Connection**, que incluye la comunicación CAPWAP necesaria para la administración del AP.

Por eso un escenario particularmente engañoso puede ser:

```text
AP encendido             OK
DHCP                     OK
ARP                      OK
Reachability             OK
FortiAP                  Offline
```

La captura CAPWAP ayuda a identificar si el FortiGate está recibiendo los paquetes pero no está estableciendo correctamente la comunicación de administración.

No debe asumirse, sin embargo, que `Offline = Security Fabric Connection deshabilitado`; es sólo una de varias causas posibles.

## 6. Estado del wireless controller

Consultar el estado que FortiGate mantiene de los WTP/FortiAP administrados:

```bash
diagnose wireless-controller wlac -c wtp
```

Según versión y escenario pueden utilizarse filtros y debug de `cw_acd` para determinar en qué punto falla el establecimiento de la sesión.

Antes de activar debug verbose en producción conviene limitar el análisis al AP afectado cuando sea posible y registrar la hora exacta de la prueba para correlacionar eventos.

## 7. Autorización y discovery

Comprobar:

- que el FortiAP sea visible para el controlador;
- que esté autorizado cuando corresponda;
- que el método de discovery sea compatible con la topología;
- que la IP del wireless controller sea alcanzable;
- que no exista una diferencia entre el diseño L2/L3 esperado y la red real.

En topologías con switches, routing o VPN, documentar el camino completo es especialmente útil:

```text
FortiAP
  -> switch / VLAN
  -> gateway / routing
  -> interfaz FortiGate
  -> wireless controller
```

## 8. Firmware y compatibilidad

Si la conectividad y CAPWAP son correctos pero el AP no completa el registro, revisar la matriz de compatibilidad entre:

- modelo FortiAP;
- versión de FortiAP;
- modelo FortiGate;
- versión FortiOS.

No conviene asumir que un comportamiento observado en una versión antigua representa el funcionamiento de ramas actuales.

También existen problemas específicos de versión que pueden producir APs offline aunque la red esté correctamente configurada. Por ello la versión exacta forma parte de la evidencia del incidente.

## 9. Reiniciar `cw_acd` no es el primer paso

Fortinet contempla el reinicio del proceso del wireless controller como una acción de troubleshooting en determinados escenarios.

Pero tiene impacto: reiniciar `cw_acd` puede desconectar los AP administrados.

Por eso no debería utilizarse como prueba inicial de tipo "a ver si vuelve".

Antes de hacerlo deberíamos poder explicar qué evidencia apunta al controlador y qué información ya se capturó para análisis posterior.

## Caso real de Xecure — 2017

En 2017 publiqué en Xecure un caso real titulado **FortiAP Offline**.

Este apartado se conservará como evidencia histórica del incidente original, pero no voy a reconstruir de memoria la causa o la solución. El contenido original debe recuperarse y contrastarse antes de incorporarlo aquí.

La intención es documentarlo con esta separación:

```text
Lo observado en 2017
        |
        v
Diagnóstico realizado entonces
        |
        v
Resolución aplicada
        |
        v
Qué sigue siendo válido hoy
        |
        v
Qué diagnosticaríamos diferente ahora
```

Esto evita convertir una solución que funcionó en un incidente particular en una receta universal para cualquier FortiAP `Offline`.

## Evidencia mínima recomendada

Antes de realizar cambios, registrar al menos:

```text
FortiGate model / FortiOS:
FortiAP model / firmware:
Serial del AP:
Hora del incidente:
Puerto físico / switchport:
VLAN:
IP obtenida por el AP:
ARP presente: si/no
Reachability: si/no
CAPWAP AP -> FGT: si/no
CAPWAP FGT -> AP: si/no
Estado en wireless controller:
Cambios recientes:
```

Con esta información un incidente deja de ser simplemente "el AP está offline" y se convierte en un problema reproducible y correlacionable.

## Árbol rápido de decisión

```text
                    FortiAP Offline
                          |
                  Tiene energia/link?
                    /             \
                  no               si
                  |                 |
              Fisico/PoE        Tiene IP?
                                  /    \
                                no      si
                                |        |
                            DHCP/VLAN  Reachable?
                                       /     \
                                     no       si
                                     |         |
                                red/routing   CAPWAP?
                                             /     \
                                           no       si
                                           |         |
                                   interface/path  controller
                                                   autorizacion
                                                   firmware/debug
```

## Qué aprendemos

`Offline` es una observación de estado, no una causa raíz.

Reiniciar puede restaurar el servicio y al mismo tiempo destruir la mejor oportunidad para saber por qué falló. Una metodología por capas permite separar rápidamente un problema físico, de red, de CAPWAP o del controlador y conservar evidencia útil para la siguiente ocurrencia.

## Referencias

- Fortinet Document Library — FortiAP connection issues.
- Fortinet Document Library — FortiAP packet sniffer / CAPWAP troubleshooting.
- Fortinet Community — Common cause of a FortiAP managed by FortiGate showing as offline.
- Xecure (2017) — FortiAP Offline (caso histórico pendiente de recuperar íntegramente).
