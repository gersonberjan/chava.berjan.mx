---
title: "FortiGate SSL VPN: no more IP addresses available"
description: "Diagnóstico de fallas de FortiClient SSL VPN cuando FortiGate no puede asignar una dirección IP al túnel."
---

# FortiGate SSL VPN: `no more IP address available`

> **Nota de vigencia:** esta guía recupera un caso documentado originalmente en 2017 y lo actualiza como referencia de troubleshooting. En FortiOS recientes, SSL VPN tunnel mode está siendo retirado/reemplazado por IPsec según la rama de FortiOS. Valida siempre el comportamiento y los comandos contra la versión instalada antes de intervenir producción.

## Síntoma

FortiClient intenta establecer una conexión SSL VPN, pero la conexión falla durante el establecimiento del túnel. Dependiendo de la versión, el cliente puede mostrar errores como `Unable to receive VPN tunnel IP address (-30)` o quedarse en un porcentaje de conexión antes de desconectarse.

En el debug de FortiGate pueden aparecer mensajes equivalentes a:

```text
failed to get dynamic IP
no more IP address available
```

El mensaje indica que FortiGate no pudo asignar una dirección IP al cliente SSL VPN. Esto **no implica por sí solo** que la única causa sea que el rango configurado sea demasiado pequeño: primero hay que revisar el estado real de sesiones y del pool.

## 1. Revisar sesiones SSL VPN

En versiones actuales puede revisarse el monitor SSL VPN con:

```shell
get vpn ssl monitor
```

En versiones antiguas de FortiOS se utilizaban comandos diferentes; por ejemplo, el caso original de 2017 utilizaba:

```shell
execute vpn sslvpn list
```

El objetivo es comprobar cuántas sesiones existen, qué usuarios están conectados y si el número de asignaciones es consistente con el tamaño del rango disponible.

## 2. Habilitar debug de SSL VPN

Realiza el debug durante un intento controlado de conexión:

```shell
diagnose debug reset
diagnose debug application sslvpn -1
diagnose debug enable
```

Solicita al usuario que intente conectar y busca eventos relacionados con la asignación de IP.

Al terminar:

```shell
diagnose debug disable
```

No dejes debug verbose habilitado innecesariamente en producción.

## 3. Determinar la causa

### Caso A — El pool realmente está agotado

Si el número de sesiones consume el rango configurado, revisa el rango de direcciones destinado a los clientes SSL VPN y dimensiona el pool de acuerdo con la concurrencia esperada.

La corrección es ampliar o rediseñar el rango, no reiniciar servicios para ocultar el problema de capacidad.

### Caso B — El pool aparenta tener capacidad, pero FortiGate no asigna IP

Si el monitor no muestra sesiones que expliquen el agotamiento y el debug continúa mostrando `failed to get dynamic IP`, el problema puede estar asociado al estado del proceso SSL VPN.

Fortinet documenta, para determinados escenarios, la revisión del monitor y el reinicio del proceso `sslvpnd` como medida correctiva. Esto debe tratarse como una acción operativa controlada: puede afectar las sesiones SSL VPN existentes.

```shell
fnsysctl killall sslvpnd
```

**Antes de ejecutar un reinicio del proceso en producción:**

- confirma que el pool no está realmente agotado;
- identifica usuarios/sesiones activas;
- evalúa el impacto de desconectarlas;
- registra la evidencia del debug;
- verifica si existe un bug conocido para tu versión de FortiOS.

## 4. Qué ocurrió en el caso original de 2017

En el incidente que dio origen a esta guía, el debug reportaba que no podía obtener una IP dinámica. La revisión de sesiones mostró múltiples entradas para algunos usuarios, llegando a consumir el pool disponible. Reiniciar `sslvpnd` liberó el estado anómalo y permitió nuevamente establecer túneles.

La lección vigente no es "reinicia el daemon": es **distinguir entre agotamiento real de capacidad y estado inconsistente de sesiones/proceso antes de aplicar una corrección**.

## Flujo de diagnóstico recomendado

```text
FortiClient no obtiene IP
        |
        v
Revisar debug SSL VPN
        |
        v
¿failed to get dynamic IP / no more IP address available?
        |
       Sí
        |
        v
Revisar sesiones + rango configurado
        |
   +----+----+
   |         |
Pool       Pool aparentemente
lleno      disponible
   |         |
   v         v
Ampliar/   Revisar estado de
rediseñar  sslvpnd / versión /
capacidad  bugs conocidos
```

## Referencias

- Fortinet Community — *Unable to receive VPN tunnel IP address (-30)*: https://community.fortinet.com/fortigate-3/technical-tip-unable-to-receive-vpn-tunnel-ip-address-30-99892
- Fortinet Community — *Unable to receive VPN tunnel IP address (-30) despite IP pool is free*: https://community.fortinet.com/fortigate-3/technical-tip-unable-to-receive-vpn-tunnel-ip-address-30-despite-ip-pool-is-free-105776
- Artículo original, Xecure Blog (2017): https://xecureblog.wordpress.com/2017/10/30/ssl-vpn-no-more-addresses-available/

---

**Origen:** recuperación y actualización de documentación técnica publicada originalmente en Xecure Blog el 30 de octubre de 2017.
