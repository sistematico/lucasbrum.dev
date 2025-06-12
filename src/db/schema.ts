import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const likesCounter = pgTable('likes_counter', {
  id: serial('id').primaryKey(),
  counter_id: text('counter_id').notNull().unique(),
  likes: integer('likes').notNull().default(0),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Opcional: Se você quiser rastrear quais usuários deram like
export const userLikes = pgTable('user_likes', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Pode ser um ID de sessão ou cookie para usuários anônimos
  counterRef: text('counter_ref').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});