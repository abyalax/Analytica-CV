import { MetaRequest } from '~/common/types/meta';
import { JobDescription } from '~/modules/jobs/jobs.type';

export type TFilterJobDescription = MetaRequest<JobDescription>;
export type PayloadJobDescription = Partial<JobDescription>;

export type JobSalaryRange = {
  min: number;
  max: number;
  currency: string;
};
