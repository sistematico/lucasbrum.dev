#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

sudo /usr/bin/systemctl stop blog.lucasbrum.dev.service

git clean -fxd

bun install

sudo /usr/bin/systemctl start blog.lucasbrum.dev.service