#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

sudo /usr/bin/systemctl stop lucasbrum.dev.service

[ -e .env.production ] && cp -f .env.production /tmp/.env.lucasbrum.dev

git clean -fxd

[ -e /tmp/.env.lucasbrum.dev ] && cp -f /tmp/.env.lucasbrum.dev .env.production

bun install
bun run build

sudo /usr/bin/systemctl start lucasbrum.dev.service