// src/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// Conexão com o banco de dados PostgreSQL
// const connectionString = import.meta.env.DATABASE_URL;
// const client = postgres(connectionString);
// export const db = drizzle(client, { schema });

export const db = drizzle(process.env.DATABASE_URL!, { schema });