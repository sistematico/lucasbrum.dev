#!/usr/bin/env bash

TMUX_SESSION="lucasbrum"

if ! \tmux has-session -t $TMUX_SESSION 2> /dev/null; then
  \tmux new-session -A -d -s $TMUX_SESSION -n main

  \tmux new-window -t $TMUX_SESSION -n dev -d
  \tmux send-keys -t $TMUX_SESSION:dev "bun run dev" ENTER
else 
  \tmux attach -t $TMUX_SESSION
fi