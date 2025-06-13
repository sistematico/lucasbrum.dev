#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

sudo /usr/bin/systemctl stop blog.lucasbrum.dev.service

[ -e .env.production ] && cp -f .env.production /tmp/.env.production.blog

git clean -fxd

[ -e /tmp/.env.production.blog ] && cp -f /tmp/.env.production.blog .env.production

bun install
bun run build

sudo /usr/bin/systemctl start blog.lucasbrum.dev.service