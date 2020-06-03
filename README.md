# AdminPro

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.


## GIT
Creamos cuenta en github o usamos una existente > `https://github.com/`

Creamos un repositorio para el proyecto

Copiamos la url del HTTPS

Master es el repositorio local

Origin es el origen remoto

git init > Crea un reporitorio local o lo reinicializa si ya está creado
git add . 
git commit -m "first commit"
git remote add origin https://github.com/Awandor/adminPro.git
git remote -v > Vemos nuestro repositorio remoto
git push -u origin master > -u indica que use el origen por defecto

Se crea en origin la rama master

Ahora que tenemos un boilerplate de proyecto Angular con rutas y módulos podemos crear un tag en Github y un Release

git tag -a v1.0.0 -m "Versión 1 - Lista para producción"

git tag muestra los tags

git push --tags > sube los tags al repositorio remoto

Vamos a Releases > Tags > Add release notes

## TS LINT
Vamos a cambiar el tslint.json para permitir especificar el tipo de una variable y al mismo tiempo setearla

ctrl + p buscamos tslint y buscamos no-inferrable-types y lo ponemos a false

También queremos poder renombrar las variables que llevan @Input() y @Output()

"no-input-rename": false,
"no-output-rename": false,


## NG2 CHARTS
Vamos a trabajar con diagramas de `https://valor-software.com/ng2-charts/`

Instalamos ng2-charts > `npm install --save ng2-charts`

Instalamos ahora chart.js > `npm install chart.js --save`

Cuando generamos componentes y no queremos que sean importados en app.module porque los vamos a importar en otro módulo
podemos usar el flag `--skip-import`

Importamos ChartsModule en el módulo apropiado


## ESCOGER MODULOS
Cuando creamos un componente podemos indicar en qué módulo queremos importarlo

`ng g c pages/accountSettings -m="pages/pages.module.ts" --skipTests -is`

## CAMBIAR EL TEMA PRINCIPAL DE MANERA DINAMICA
Tenemos los data-theme en account-settings.component

Tenemos un id en `<link href="assets/css/colors/default-dark.css" id="theme" rel="stylesheet">` en index.html

Creamos click listeners en la vista de account-settings.component

Ya hemos visto cómo se puede manipular el DOM con referencias hacia sus elementos.

Ahora necesitamos hacer un referencia a todo el documento para acceder a index.html desde account-settings.component

Hay dos maneras de hacerlo

1. Usando @Inject( DOCUMENT ) private _document en el constructor
_document es la referencia al objeto document del DOM

2. Usando simplemente document de JS


## CREAMOS UN SERVICIO PARA GUARDAR LOS SETTINGS EN LOCAL STORAGE

`ng g s services/settings --skipTests`

A partir de Angular 8 los servicios son proveidos en la raíz y no es necesario declararlo en ningún módulo

Creamos una interfaz para los ajustes dos métodos para guardar y leer del local storage

Cargamos el servicio en el constructor de account-settings.component y ya tenemps acceso a las propiedades y métodos

Para cargar los ajustes hay que hacerlo en app.component o en pages.component


## REFECTORIZAMOS

No llevamos parte de lógica del componente account-settings.component al servicio y lo metemos en un método

En index.html podemos evitar que siempre cargue primero el tema por defecto antes de leer del local storage quitando href


## LOGIN

Para que funcione ngSubmit en el formulario hay qie importar  `import { FormsModule } from '@angular/forms';` en el módulo del login

Hay un problema con la página de login, pues no tiene sidebar y cuando se carga se ejecuta <script src="assets/js/custom.min.js"></script>
que inicializa varios métodos que controlan el sidebar y este no existe.

Tenemos que editar custom.min.js para englobar todo en una función a la que podremos llamar cuando queramos.

La llamamos desde login.component y desde el componente que contiene todas las páginas: pages.component


## AGRUPAR TODOS LOS SERVICIOS EN UN MÓDULO

Creamos un módulo `ng g m services/service --flat`

Reagrupamos los servicios en carpetas de servicios

Creamos archivo service.index.ts donde vamos a exportar todos los servicios y así si hay que hace cambios sólo lo hacemos aquí

Hacemos el cambio en app.component, cuidado con las importaciones automáticas queremos que lo importe de `service.index`


## OBSERVABLES Y PROMESAS

Ambos sirven para trabajar con procesos asíncronos

Las promesas trabajan con único flujo de datos, se usan con una única data de respuesta, no es simple de cancelar

Trabajaremos con promesas y funciones que retornan promesas

Los observables trabajan con múltiples flujos de datos, al fallar puedes ejecutar comandos y reintentar, se pueden encadenar operadores como map, forEach,
reduce, filter, retry, replay. Pueden ser creados desde otras fuentes como los eventos. Son funciones a las cuales podemos suscribirnos en múltiples lugares

Aprenderemos a crear un observable manualmente

Trabajaremos con operadores de los observables como:
Retry
Map
Filter
Next

Funciones que retornan observables


## SNIPPETS

En VS Code vamos a Preferences > User snippets > escribimos html y seleccionamos


## OPERADORES RXJS

Documentación: `http://reactivex.io/documentation/operators.html`


## BREADCRUMBS

Pasamos el nombre de cada página a través de la propiedad data en pages.routing


## CAMBIO DE TITULO DE WEB PAGE Y METAS

En la documentación de Angular hay algo llamado Title, es una clase con métodos getTitle y setTitle, se inyecta en el componente

Hay otra clase que se llama Meta


## CONECTAR NUESTRO BACK-END CON NUESTRO FRONT-END

Vamos a crear una clase que coincida con el modelo creado en Node.
Creamos carpeta models dentro de app con archivo `usuario.model.ts`

Trabajamos la página de registro, creamos validaciones del formulario.

Instalamos sweetalert 2 `npm install --save sweetalert2`

Lo importamos en `register.component`

Vamos a llamar el servicio para crear un usuario

Creamos `ng g s services/usuario/usuario --skipTests`

Editamos `service.index` y añadimos el servicio


## VAMOS A TRABAJAR CON EL FORMULARIO LOGIN POR APROXIMACIÓN DE TEMPLATE

Creamos servicio de login llamando por POST nuestra ruta `login.route` del back-end.

Desde `login.component` llamamos a ese servicio que retorna un observable al que podemos suscribirnos


## LOGIN CON GOOGLE SIGN-IN

Vamos a mis APIs de Google: `https://console.developers.google.com/`

Dentro de mi app `Sign in con Google` > Credentials

Documentación en `https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin` > Integrate Google Sign-in > Load the Google Platform Library

Seguimos la documentación, para el botón usaremos un código personalizado basado en la documentación > `Integrate Sign-in Using Listeners`

Queremos generar el token de Google, trabajamos en `login.component`


## CREAR GUARDS PARA PROTEGER PAGINAS

`ng g g services/guards/loginGuard --skipTests`

Escogemos opción CanActivate, qitamos cosas que no necesitamos y lo exportamos desde `services.index` y lo importamos en `services.module`

Ahora queremos proteger todas las rutas de `pages.routes`, añadimos a pagesRoutes > canActivate: [LoginGuard]


## PERFIL DE USUARIO, PIPES Y SUBIDA DE MAGEN

Empezamos creando un pipe para las imágenes `ng g p pipes/imagen --skipTests`

Nos importa automáticamente el pipe en app.modules, no lo queremos ahí así que lo quitamos.

Vamos a crear un módulo que contenga todos los pipes `ng g m pipes/pipes --flat`

Aplicamos el pipe a las imágenes de usuario en el header y en el sidebar


## COMPONENTE DE PERFIL DE USUARIO

Creamos el componente `ng g c pages/profile -is --skipTests`

Copiamos del template form-layout.html

Creamos el servicio para actualizar Usuario


## SUBIR ARCHIVOS AL SERVIDOR

Creamos el servicio `ng g s services/subirArchivo/subirArchivo --skipTests`

Lo añadimos a `services.index` y a `service.module`


## COMPONENTE DE USUARIOS

Vamos a `sidebar.service` que crea dinámicamente el menú del sidebar, añadimos una nueva sección de Administración

Creamos componente de Usuarios `ng g c pages/usuarios -is --skipTests`

Comprobamos que ha sido importado a `pages.module`. Lo añadimos a `pages.routes`

Vamos a crear un servicio que nos permita obtener todos los usuarios, lo crearemos en `usuario.service`

Nos fijamos en la petición GET creada en Postman


## COMPONENTE SUBIDA DE IMAGENES EN UNA MODAL

Creamos componente `ng g c components/modalUpload -is --skipTests`

Lo importamos en pages.module. Ahora colocamos su etiqueta en pages.component.html para que esté accesible en todas las páginas

Tomamos ejemplo de modal de Bootstrap

Hay un problema para pasar el _id a la modal, vamos a crear un servicio intermedio entre la comunicación de los componentes
y modal-upload component `ng g s components/modal-upload/modalUpload --skipTests`

Lo importamos en service.module para que todas las páginas puedan acceder a él.

Ahora lo importamos en nuestro componente modal.upload


## NG BOOTSTRAP

`ng add @ng-bootstrap/ng-bootstrap`

De momento no lo estoy usando por la dificultad de pasar la referencia de la modal en el componente que la llama


## CREAR SECCION DE HOSPITALES

Tenemos el modelo de Hospital, vamos a crear `hospitales.component.ts` en pages

Comprobamos que esté importado en pages.module

Añadimos la ruta

Creamos un servicio llamado `hospital.service.ts`, ubicado en el siguiente path:
services > hospital > hospital.service.ts

`ng g s services/hospital/hospital --skipTests`

Importamos el servicio a `service.index` y a `service.module`

Añadimos a `sidebar.service`

Este servicio debe de tener las siguientes funciones:
1. cargarHospitales(): No hace falta que reciba parámetros, pero retorna un observable con todos los hospitales.
2. obtenerHospital( id: string ): Esta función recibe un ID de un hospital y retorna toda la información del mismo.

Este servicio no existe actualmente en el backend, por lo cual hay que crearlo en las rutas de los hospitales


## CREAR SECCION DE MEDICOS

Creamos `medicos.component.ts` en pages

Comprobamos que esté importado en pages.module

Añadimos la ruta

Añadimos a `sidebar.service`

Vamos acrear una página de edición de médico `ng g c pages/medicos/medico -is --skipTests --flat`

Añadimos la ruta `medico/:id`

Creamos un servicio llamado `medico.service.ts`, ubicado en el siguiente path:
services > medico > `medico.service.ts`

`ng g s services/medico/medico --skipTests`

Importamos el servicio a `service.index` y a `service.module`


## SECCION DE MEDICO

Tomamos de los recursos el `form-basic.html` > Sample Basic Form









## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
