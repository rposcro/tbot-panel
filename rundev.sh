#!/bin/bash

export NODE_OPTIONS=--openssl-legacy-provider
ng serve --proxy-config proxy-dev.conf.json
