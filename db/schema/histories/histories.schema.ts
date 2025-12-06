import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import z from 'zod';
import { users } from '~/db/schema';

/**
Sessions ini akan di pakai untuk menyimpan data analisis CV
Sessions ini related dengan chat user dengan chatbot beserta data CV nya
Tidak lupa karena ini domainnya adalah Saas maka semua ini related ke userId juga.

plan for schema sessions

base field
    id
    user_id
    job_id
    updated_at
    created_at

identitas kandidat from cv
    name
    email
    posisi

results field
    experience_match
    project_match
    skill_match
    certificate_match
    education_match
    match_score
    overall_score
    
    interested_for
    recommendation
    kelebihan
    kekurangan
    track_record

related with table
    users
    chats
    job_descriptions
    agents
 */

export const histories = pgTable('cv', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
});

export const createHistoriesSchema = createInsertSchema(histories);

export const updateHistoriesSchema = createUpdateSchema(histories);

export type CreateHistories = z.infer<typeof createHistoriesSchema>;
export type UpdateHistories = z.infer<typeof updateHistoriesSchema>;

export type Histories = typeof histories.$inferSelect;
