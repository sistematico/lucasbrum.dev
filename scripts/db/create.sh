#!/bin/bash

# Importa as variáveis do arquivo .env
source "$(dirname "$0")/../other/read_env.sh"

# Define as credenciais do banco de dados
PGPASSWORD="$DB_PASS"
[ $1 ] && PGPASSWORD="$1"
DB_PASS="$PGPASSWORD"
export PGPASSWORD

if [ -f /etc/arch-release ]; then
    CTRL_USER="$DB_USER"
else 
    CTRL_USER="postgres"
fi

# Executa os comandos no PostgreSQL
psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -c "CREATE DATABASE $DB_NAME;"
echo "✅ Banco de dados $DB_NAME criado."

psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"
echo "✅ Usuário $DB_USER criado."

psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
echo "✅ Privilégios ao banco $DB_NAME adicionados a $DB_USER."

psql -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$CTRL_USER" -c "GRANT ALL ON SCHEMA public TO $DB_USER;"
echo "✅ Privivlégios ao esquema 'public' adicionados ao usuário $DB_USER para o banco ${DB_NAME}."

# Verifica se a linha DATABASE_URL já existe
if grep -q "DATABASE_URL" $ENV_FILE; then
    # Se existir, substitui a linha
    sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"postgres://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME?schema=public\"|" $ENV_FILE
    echo "✅ Linha postgres://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME?schema=public atualizada no arquivo $ENV_FILE"
else
    # Se não existir, adiciona a linha ao final do arquivo
    echo "DATABASE_URL=\"postgres://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME?schema=public\"" >> $ENV_FILE
    echo "✅ Linha postgres://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME?schema=public adicionada no arquivo $ENV_FILE"
fi

# Informa ao usuário que a operação foi concluída
echo "Credenciais do banco de dados escritas ou atualizadas no arquivo $ENV_FILE"
echo "🎉 Banco de dados $DB_NAME criado com sucesso."