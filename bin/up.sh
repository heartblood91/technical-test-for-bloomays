#!/bin/sh
set -e

source ./bin/config/development.sh

docker compose -f ./docker-compose.yml up -d --build
