#!/bin/bash
docker build -t tbot-panel .
docker save --output dist/tbot-panel.docker.tar tbot-panel:latest
