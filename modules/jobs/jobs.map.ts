import { Prisma } from '~/generated/prisma/client';
import { mapJson } from '../base/mapping';
import { JobDescription } from './jobs.type';

export const JobsMapper = {
  toDTO: (jobs: Prisma.JobDescriptionModel): JobDescription => {
    return {
      ...jobs,
      ...mapJson<JobDescription>({
        salary_range: jobs?.salary_range,
      }),
    };
  },
};
