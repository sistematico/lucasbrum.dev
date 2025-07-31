#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin
SERVICE="lucasbrum.dev.service"
TEMP_DIR="/tmp/lucasbrum.dev"
OLDPWD="$(pwd)"

[ -e $TEMP_DIR ] && rm -rf $TEMP_DIR
cp -a $OLDPWD $TEMP_DIR
cd $TEMP_DIR

git clean -fxd -e .env.production
cp -f .env.production .env

bun install
bun run db:generate
bun run db:push
bun run build

sudo /usr/bin/systemctl stop $SERVICE
[ -e $OLDPWD ] && rm -rf $OLDPWD
cp -a $TEMP_DIR $OLDPWD
sudo /usr/bin/systemctl start $SERVICE