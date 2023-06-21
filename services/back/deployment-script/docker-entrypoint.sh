#!/bin/sh
# set -x

if [ "${1}" = "dev" ]; then
  cp -r /tmp/node_modules /workdir/node_modules
  cd /workdir
  npm run watch
fi

if [ "${1}" = "PROD" ]; then
  npm run build
  npm run server
fi