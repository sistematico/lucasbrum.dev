#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

[ -f .env.production ] && cp .env.production /tmp/env.lucasbrum
git clean -fxd
[ -f /tmp/env.lucasbrum ] && cp /tmp/env.lucasbrum .env.production
sudo /usr/bin/systemctl stop lucasbrum.service
bun install
bun run db:drop
bun run db:generate
bun run db:push
bun run db:migrate
bun run db:seed
#bun run build
sudo /usr/bin/systemctl start privatehub.service