#!/usr/bin/env bash

LOCAL_PATH="${HOME}/code/lucasbrum.dev/ansible"
REMOTE_PATH="/var/www/lucasbrum.dev/ansible"

if [ -f /etc/arch-release ]; then
  ANSIBLE_PYTHON_INTERPRETER=auto_silent \
  ANSIBLE_CONFIG=$LOCAL_PATH/ansible.cfg \
  ansible-playbook -e "ansible_port=2200" $LOCAL_PATH/main.yml -i tyche,
else
  ANSIBLE_PYTHON_INTERPRETER=auto_silent \
  ANSIBLE_CONFIG=$REMOTE_PATH/ansible.cfg \
  ansible-playbook --connection=local -e "ansible_port=2200" $REMOTE_PATH/main.yml -i localhost,
fi