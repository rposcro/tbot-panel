#!/bin/bash

export NODE_OPTIONS=--openssl-legacy-provider
ng serve --port 4240 --proxy-config proxy-dev.conf.json
