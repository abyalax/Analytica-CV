import z from 'zod';

// todo: adjust based on fixed schema CV
export const cvSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  linkedin: z.string().optional(),
  about: z.string().optional(),
  interest: z.array(z.any()).optional(),
  skill: z.array(z.any()).optional(),
  education: z.array(z.any()).optional(),
  experience: z.array(z.any()).optional(),
  projects: z.array(z.any()).optional(),
  certificate: z.array(z.any()).optional(),
});

export type FormDataCV = z.infer<typeof cvSchema>;
