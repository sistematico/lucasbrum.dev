#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin
NAME="lucasbrum.dev"
SERVICE="${NAME}.service"

sudo /usr/bin/systemctl stop $SERVICE

[ -e .env.production ] && cp -f .env.production /tmp/.env.$NAME

git clean -fxd

[ -e /tmp/.env.$NAME ] && cp -f /tmp/.env.$NAME .env.production

bun install
bun run db:ganerate
bun run db:push
bun run build

sudo /usr/bin/systemctl start $SERVICE