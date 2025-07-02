import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Tabela para estatísticas dos posts
export const postStats = sqliteTable('post_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  totalViews: integer('total_views').notNull().default(0),
  uniqueViews: integer('unique_views').notNull().default(0),
  readCount: integer('read_count').notNull().default(0), // Leituras completas
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

// Tabela para rastrear visitantes únicos
export const visitors = sqliteTable('visitors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  visitorId: text('visitor_id').notNull(),
  postSlug: text('post_slug').notNull(),
  lastVisit: integer('last_visit', { mode: 'timestamp' }).notNull().default(new Date()),
  hasRead: integer('has_read', { mode: 'boolean' }).notNull().default(false),
});

// Tabela para estatísticas gerais do site
export const siteStats = sqliteTable('site_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  totalViews: integer('total_views').notNull().default(0),
  uniqueVisitors: integer('unique_visitors').notNull().default(0),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(new Date()),
});