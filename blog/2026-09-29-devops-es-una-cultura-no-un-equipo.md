---
slug: devops-es-una-cultura-no-un-equipo
title: DevOps es una cultura, no un equipo
authors: [chava]
tags: [devops, infraestructura, operacion]
description: Una experiencia práctica sobre cómo metodologías ágiles, IaC, CI/CD y DevSecOps nos llevaron a entender que DevOps iba mucho más allá de crear un equipo.
---

Mi acercamiento a DevOps no comenzó implementando DevOps.

Comenzó intentando resolver problemas.

Primero necesitábamos organizar mejor el trabajo del equipo. Después aparecieron retos en la planeación, los despliegues, la homologación de ambientes y la forma en que Desarrollo y Operaciones trabajábamos juntos.

Cada problema nos llevó a buscar una solución y, muchas veces, esa solución nos permitió ver el siguiente.

Hasta que en algún momento apareció también un equipo llamado **DevOps**.

Paradójicamente, fue entonces cuando entendí que tener un equipo DevOps no significaba necesariamente haber implementado DevOps.

## Metodologías ágiles

En 2019 comenzamos implementando algo relativamente sencillo: un tablero Kanban.

Funcionó. Tuvimos mayor visibilidad de las actividades, los proyectos y su avance.

Pero la adopción no fue inmediata.

Hacer visible el trabajo también podía percibirse como una forma de supervisión o micromanagement. No bastaba con implementar el tablero; había que trabajar también en la forma en que entendíamos y utilizábamos la metodología.

Después llegó Scrum.

Queríamos mejorar la planeación y entender mejor nuestra capacidad de trabajo. En los primeros sprints nos concentramos principalmente en proyectos y mejoras.

**Subestimamos la operación.**

Todo nuestro esfuerzo planeado estaba orientado a los proyectos, pero la operación seguía ahí: servicios que mantener, incidentes, monitoreo y actividades cotidianas.

Terminamos incorporándola dentro de nuestra planeación y estimándola a partir del esfuerzo que históricamente requería.

## El muro de la confusión

Gestionábamos múltiples productos y ambientes.

Desarrollo trabajaba sobre los primeros ambientes y, conforme un producto avanzaba, Operaciones recibía la infraestructura que debía llevar hacia calidad, seguridad y producción.

Gran parte del proceso era manual.

Los ambientes no siempre estaban homologados. Un despliegue podía tomar entre **2 y 8 horas** y un rollback aproximadamente otras dos.

Pero el tiempo era sólo una parte del problema.

Habíamos acumulado deuda técnica a lo largo del proceso, además de documentación insuficiente, diferencias entre ambientes y muchas decisiones que necesitaban traducirse entre Desarrollo y Operaciones.

Desarrollo conocía mejor el producto.

Operaciones conocía mejor la infraestructura.

Y entre ambos **existía un muro de la confusión**.

## Infraestructura como código

Comenzamos entonces a automatizar la infraestructura.

Adoptamos **Terraform** y poco a poco incorporamos componentes, módulos, variables, secretos y certificados hasta poder representar una infraestructura completa como código.

El resultado fue mucho más que reducir los tiempos de despliegue.

Los ambientes comenzaron a homologarse, la infraestructura podía reproducirse, los cambios podían versionarse y comenzamos a construir una línea base que incorporaba arquitectura, seguridad y monitoreo.

Pero funcionaba principalmente en los ambientes administrados por Operaciones.

Cuando un producto avanzaba hacia nuestros ambientes, todavía encontrábamos diferencias y configuraciones manuales.

**Habíamos automatizado nuestros ambientes, pero no el flujo completo de entrega.**

## Se creó un equipo DevOps

En ese momento ocurrió otro cambio en la organización: se creó un pequeño equipo DevOps, inicialmente formado por desarrolladores que comenzaron a asumir ese nuevo rol.

Desde Operaciones comenzamos a trabajar con ellos y compartimos buena parte de la infraestructura como código que habíamos desarrollado.

La intención era extender esas prácticas hacia etapas anteriores, para que IaC no comenzara cuando un producto llegaba a nuestros ambientes.

Y hubo resultados.

En algunos proyectos la infraestructura comenzó a llegar automatizada y homologada. Las prácticas que habíamos comenzado a adoptar desde Infraestructura empezaban a extenderse hacia otras etapas del ciclo.

Pero la cultura todavía no había permeado de forma transversal entre los equipos.

El nuevo equipo DevOps comenzó a encontrarse con muchas de las mismas necesidades de coordinación que antes encontrábamos en Operaciones.

Habíamos transferido código y automatización.

**Pero también trasladamos el muro de la confusión.**

Antes estaba entre:

```text
Desarrollo │ Operaciones
```

Ahora teníamos:

```text
Desarrollo │ DevOps │ Operaciones
```

En lugar de desaparecer, el muro se había desplazado y, en la práctica, terminamos teniendo dos puntos de separación.

## Participación desde etapas tempranas

El cambio comenzó cuando Operaciones y Seguridad fuimos invitados a participar desde etapas más tempranas de los proyectos.

En lugar de esperar a que un producto pasara de un equipo al siguiente, Desarrollo, Operaciones y Seguridad podíamos discutir decisiones mientras todavía se estaban tomando.

Desarrollo aportaba su conocimiento del producto; Operaciones, la perspectiva de infraestructura, disponibilidad, monitoreo y operación; y Seguridad podía integrar sus requerimientos desde etapas tempranas.

IaC podía formar parte del proyecto desde sus primeros ambientes y la misma línea base acompañarlo durante el ciclo de entrega.

Los pipelines también fueron evolucionando. Comenzamos a integrar pruebas unitarias, de integración y aceptación, además de controles de seguridad como SAST y DAST.

**CI/CD dejó de ser solamente una forma de automatizar la entrega y comenzó a convertirse también en un punto de integración entre Desarrollo, Operaciones y Seguridad.**

En la práctica, comenzábamos a aplicar **shift-left**: arquitectura, infraestructura, operación, automatización y seguridad podían incorporarse desde etapas más tempranas, en lugar de aparecer cuando el producto ya estaba avanzado.

Esa misma evolución nos fue acercando a **DevSecOps**: la seguridad dejaba de ser una validación al final del proceso y comenzaba a formar parte del ciclo de desarrollo y entrega.

Pero el cambio más importante no estaba solamente en mover actividades hacia la izquierda.

**La retroalimentación ya no tenía que cruzar el muro de la confusión.**

Cuando aparecía una necesidad, las áreas involucradas podían discutirla y trabajar sobre ella desde el mismo proyecto.

Seguíamos teniendo equipos y especialidades, pero trabajar juntos también comenzó a ampliar nuestras propias habilidades.

Desarrollo adquiría mayor contexto de infraestructura y operación; Operaciones entendía mejor el aplicativo y su ciclo de entrega; Seguridad participaba directamente en las decisiones del producto.

**Comenzábamos a desarrollar habilidades T:** manteníamos profundidad en nuestra especialidad mientras ampliábamos nuestro conocimiento sobre las disciplinas con las que trabajábamos.

Ya no se trataba solamente de pasar trabajo de un especialista al siguiente.

Comenzábamos a trabajar sobre un objetivo compartido.

## DevOps es una cultura, no un equipo

Viendo el recorrido completo, cada etapa aportó algo.

Kanban y Scrum cambiaron nuestra forma de organizar el trabajo. IaC nos dio repetibilidad y homologación. CI/CD y la automatización transformaron la entrega. El *shift-left* y DevSecOps nos permitieron incorporar diferentes perspectivas desde etapas más tempranas.

Pero el cambio más importante ocurrió cuando esa forma de trabajar comenzó a permear entre los equipos.

**Después de todo ese recorrido, para mí DevOps dejó de ser el nombre de un equipo y terminó siendo una cultura, una forma de comunicarnos y una forma de trabajar a través de toda la organización.**
