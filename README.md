# ThingBot Panel

This is Angular based UI panel application

## Start Application

Run `ng serve` for a dev server. Navigate to `http://localhost:4240/`. The app will automatically reload if you change any of the source files.
Run `./runprod.sh` to use local dev instance to hit production backend service.
Run `./rundev.sh` to use local dev instance to hit local dev backend service.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Consider correct `--base-href` option so service distribution is in sync with host configuration. All references from the application
will be relative to the value so need to follow the main host proxy settings. See also source in **tbot-host** project.
<br>
Panel's docker container listens on port 4240 and its document root is / 

* For production dockerized build use: `ng build --configuration=production --base-href=/tbot/panel/`

When selected project version (staging or production) build is completed successfully, use `./build-docker.sh` to build docker image
and export importable binary.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
