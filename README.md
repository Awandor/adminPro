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
