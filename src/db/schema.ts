import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const phrases = pgTable('phrases', {
  id: serial('id').primaryKey(),
  date: timestamp('date').notNull(),
  userId: text('user_id').notNull(),
  phrase: text('phrase').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
