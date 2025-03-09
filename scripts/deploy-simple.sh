#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

git clean -fxd

sudo /usr/bin/systemctl stop lucasbrum
bun install
bun run build
sudo /usr/bin/systemctl start lucasbrum