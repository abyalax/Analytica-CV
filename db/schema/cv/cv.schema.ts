import { integer, jsonb, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import z from 'zod';
import { users } from '~/db/schema';

export type Education = {
  name: string;
  major: string;
};

export type Experience = {
  role: string;
  company: string;
  description?: string;
  start?: string;
  end?: string;
};

export type Project = {
  title: string;
  description: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  year?: number;
  url?: string;
};

export const cv = pgTable('cv', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  linkedin: varchar('linkedin', { length: 100 }),
  about: text('about').notNull(),
  interest: jsonb('interest').$type<string[]>().notNull(),
  skill: jsonb('skill').$type<string[]>().notNull(),
  education: jsonb('education').$type<Education[]>().notNull(),
  experience: jsonb('experience').$type<Experience[]>(),
  projects: jsonb('projects').$type<Project[]>(),
  certificate: jsonb('certificate').$type<Certificate[]>().notNull(),
});

export const createCVSchema = createInsertSchema(cv);

export const updateCVSchema = createUpdateSchema(cv);

export type CreateCV = z.infer<typeof createCVSchema>;
export type UpdateCV = z.infer<typeof updateCVSchema>;

export type CV = typeof cv.$inferSelect;
