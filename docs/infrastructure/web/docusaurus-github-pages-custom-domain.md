---
title: Docusaurus en GitHub Pages con dominio personalizado
sidebar_position: 2
description: Publicación de un sitio Docusaurus con GitHub Actions, GitHub Pages, DNS personalizado y HTTPS.
---

# Docusaurus en GitHub Pages con dominio personalizado

Esta guía documenta un despliegue real de **Docusaurus** sobre **GitHub Pages**, usando **GitHub Actions** para validar y publicar el sitio y un **subdominio personalizado** como URL final.

La intención no es sólo mostrar la configuración que funciona, sino también dejar documentados los errores que pueden aparecer durante el proceso y cómo aislarlos.

## Arquitectura

```text
Cambios de contenido/código
        ↓
      branch
        ↓
   Pull Request
        ↓
GitHub Actions — build
        ↓
       main
        ↓
GitHub Actions — deploy
        ↓
  GitHub Pages
        ↓
       DNS
        ↓
 dominio personalizado
        ↓
      HTTPS
```

## 1. Configurar Docusaurus para el dominio final

Cuando el sitio se publicará directamente en un dominio personalizado, la configuración debe considerar que la raíz del sitio será `/`.

```js
const config = {
  url: 'https://example.example.com',
  baseUrl: '/',
};
```

Esto es distinto de publicar únicamente como un *Project Page* bajo una URL similar a:

```text
https://usuario.github.io/repositorio/
```

En ese escenario, normalmente el `baseUrl` tendría que incluir `/repositorio/`.

### Síntoma de un `baseUrl` diferente a la URL usada

Docusaurus puede mostrar:

```text
Your Docusaurus site did not load properly.
A very common reason is a wrong site baseUrl configuration.
```

Si la URL de GitHub Pages sólo se está utilizando como prueba temporal y el destino real es un dominio personalizado, no necesariamente conviene cambiar `baseUrl`. Primero hay que comprobar cuál será la URL canónica final.

## 2. Validar el build antes de publicar

Conviene separar conceptualmente dos validaciones:

- **CI:** comprobar que Docusaurus puede construir el sitio.
- **CD:** publicar el resultado en GitHub Pages.

Un build exitoso permite distinguir rápidamente un problema de Docusaurus de uno de Pages, DNS o TLS.

El comando fundamental es:

```bash
npm run build
```

La rama principal debe recibir cambios mediante Pull Request cuando sea posible. Así, un fallo de compilación se detecta antes de publicar.

## 3. Habilitar GitHub Pages para GitHub Actions

En el repositorio:

```text
Settings
  → Pages
    → Build and deployment
      → Source: GitHub Actions
```

Si Pages no está habilitado para GitHub Actions, `actions/configure-pages` puede fallar con un mensaje similar a:

```text
Get Pages site failed.
Please verify that the repository has Pages enabled and configured to build using GitHub Actions.
```

En este caso el problema no está en Docusaurus: Pages todavía no está preparado para recibir el deployment.

## 4. Configurar el DNS

Para un subdominio, puede utilizarse un registro CNAME hacia el dominio de GitHub Pages del usuario.

Ejemplo genérico:

```text
Tipo:      CNAME
Nombre:    docs
Destino:   usuario.github.io
TTL:       300 segundos durante la puesta en marcha
```

Resultado esperado:

```text
docs.example.com.  300  IN  CNAME  usuario.github.io.
```

Un TTL bajo durante la puesta en marcha facilita cambios y pruebas. Una vez estabilizada la configuración puede aumentarse.

:::note
Algunos proveedores requieren, además de crear y guardar los registros, **activar explícitamente el servicio DNS o la zona**. Si la interfaz permite editar registros pero la zona aún no está publicada, los registros pueden parecer correctos en el panel y no existir para Internet.
:::

## 5. Verificar DNS antes de culpar a GitHub

No conviene validar DNS únicamente abriendo el navegador. `dig` permite saber qué está ocurriendo realmente.

```bash
dig docs.example.com CNAME
```

También puede consultarse un resolver público directamente:

```bash
dig @8.8.8.8 docs.example.com CNAME
```

La respuesta esperada contiene:

```text
;; ANSWER SECTION:
docs.example.com.  300  IN  CNAME  usuario.github.io.
```

### `SERVFAIL`

Si la respuesta es:

```text
status: SERVFAIL
```

no significa simplemente que GitHub todavía no reconoce el dominio. Significa que el resolver no pudo obtener una respuesta DNS válida.

Algunas comprobaciones útiles son:

```bash
dig example.com NS
dig @1.1.1.1 example.com NS
dig @8.8.8.8 example.com NS +dnssec
dig @8.8.8.8 example.com A +cd
```

Si distintos resolvers públicos producen el mismo error, el problema probablemente está en la publicación/delegación de la zona y no en la red local.

## 6. Registrar el dominio en GitHub Pages

Cuando el CNAME ya es públicamente resoluble:

```text
Settings
  → Pages
    → Custom domain
```

Agregar el dominio final, por ejemplo:

```text
docs.example.com
```

GitHub comprobará el DNS antes de completar la configuración.

Un mensaje como:

```text
Domain's DNS record could not be retrieved. (InvalidDNSError)
```

indica que GitHub todavía no puede resolver correctamente el dominio. Antes de modificar el workflow, hay que validar DNS con herramientas como `dig`.

## 7. HTTPS

Después de validar el dominio, GitHub Pages debe aprovisionar el certificado TLS. DNS puede estar funcionando antes de que HTTPS esté disponible.

Por ello hay que distinguir tres estados:

```text
DNS correcto
    ↓
GitHub valida el custom domain
    ↓
Certificado TLS disponible
    ↓
Enforce HTTPS
```

Una advertencia del navegador sobre HTTPS inmediatamente después de configurar el dominio no implica necesariamente que el deployment haya fallado; el certificado puede estar todavía en proceso de emisión.

## Troubleshooting rápido

| Síntoma | Capa a revisar primero |
| --- | --- |
| `Your Docusaurus site did not load properly` | `baseUrl` / URL usada |
| `Get Pages site failed` | GitHub Pages / Source |
| Build de Docusaurus falla | código / dependencias |
| `InvalidDNSError` | DNS público |
| `SERVFAIL` | zona, delegación, DNSSEC o servicio DNS |
| HTTP funciona pero HTTPS no | aprovisionamiento TLS |

## Validación final

Antes de considerar terminado el despliegue:

```text
[ ] Build de Docusaurus exitoso
[ ] Deployment de GitHub Pages exitoso
[ ] CNAME visible desde resolvers públicos
[ ] Custom domain validado por GitHub
[ ] HTTPS disponible
[ ] Enforce HTTPS habilitado
[ ] Navegación y recursos estáticos cargan desde el dominio final
```

## Lección operativa

Cuando una publicación web involucra aplicación, CI/CD, hosting, DNS y TLS, conviene diagnosticar por capas. Que el sitio no abra correctamente no significa que el problema esté en el sitio.

Separar **build → deployment → resolución DNS → validación del dominio → TLS** reduce cambios innecesarios y permite identificar exactamente qué componente está fallando.
