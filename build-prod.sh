#!/bin/bash

if [ -z "$1" ]; then
  PLATFORM="linux/amd64"
else
  PLATFORM="$1"
fi

echo "Building TBot Panel production"
export NODE_OPTIONS=--openssl-legacy-provider
ng build --configuration=production --base-href=/tbot/panel/

echo "Wrapping TBot Panel docker image for platform: $PLATFORM"
docker buildx build --platform $PLATFORM --load -t tbot-panel .
