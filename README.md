# ThingBot Panel

This is Angular based UI panel application

## Start Application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 

* For staging dockerized build use: `ng build --configuration=staging --baseHref=/tbot/panel`
* For production dockerized build use: `ng build --configuration=production --baseHref=/tbot/panel`

When selected project version (staging or production) is built, use `./build-docker.sh` to build docker image
and export importable binary.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
