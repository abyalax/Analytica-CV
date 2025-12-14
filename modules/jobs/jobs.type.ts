export type JobSalaryRange = {
  min: number;
  max: number;
  currency: string;
};

export type JobDescription = {
  id: number;
  user_id: number;
  title: string;
  company: string;
  location: string;
  employment_type: string;
  level: string;
  description: string;
  responsibilities: string;
  requirements: string;
  skills: string;
  experience_year: number;
  salary_range: JobSalaryRange;
  status: string;
  created_at: Date;
  updated_at: Date;
};
