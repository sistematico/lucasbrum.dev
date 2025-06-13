#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

#git clean -fxd

bun install

sudo /usr/bin/systemctl restart blog.lucasbrum.dev.service