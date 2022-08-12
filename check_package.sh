#!/bin/sh
if test ! -z "$(git log --name-only -1 |grep 'package\.json' |grep -v grep)" ; then
  rm -rf node_modules && rm -f package-lock.json; npm cache clear --force && npm i --unsafe-perm=true --allow-root --registry=https://registry.npm.taobao.org
fi