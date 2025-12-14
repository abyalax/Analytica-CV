import z from 'zod';

export const jobsSchema = z.object({
  title: z.string().min(3, { message: 'Please enter the title of the job, at least 3 characters' }),
  company: z.string().min(3, { message: 'Please enter the company name, at least 3 characters' }),
  location: z.string().min(3, { message: 'Please enter the location of the job, at least 3 characters' }),
  employment_type: z.string().min(3, { message: 'Please enter the employment type, at least 3 characters' }),
  level: z.string().min(3, { message: 'Please enter the level of the job, at least 3 characters' }),
  description: z.string().min(10, { message: 'Please enter the description of the job, at least 10 characters' }),
  responsibilities: z.string().min(10, { message: 'Please enter the responsibilities of the job, at least 10 characters' }),
  requirements: z.string().min(10, { message: 'Please enter the requirements of the job, at least 10 characters' }),
  skills: z.string().min(10, { message: 'Please enter the skills required for the job, at least 10 characters' }),
  experience_year: z.number().int().min(1, { message: 'Please enter the experience year of the job, at least 1 year' }),
  salary_range: z.object({
    min: z.number().int().min(1, { message: 'Please enter the minimum salary range, at least 1' }),
    max: z.number().int().min(1, { message: 'Please enter the maximum salary range, at least 1' }),
    currency: z.string().min(3, { message: 'Please enter the currency of the salary range, at least 3 characters' }),
  }),
  status: z.string().min(3, { message: 'Please enter the status of the job, at least 3 characters' }),
});

export type FormDataJobs = z.infer<typeof jobsSchema>;
