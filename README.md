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
