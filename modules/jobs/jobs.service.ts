import { MetaRequest } from '~/common/types/meta';
import { Prisma } from '~/generated/prisma/client';
import { Service } from '../base/services';
import { JobsRepository } from './jobs.repository';
import { JobDescription } from './jobs.type';

class JobService extends Service<JobsRepository> {
  constructor() {
    super(new JobsRepository());
  }

  list(clientId: number, params: MetaRequest<JobDescription>, where: Prisma.JobDescriptionWhereInput) {
    const { page, per_page, search, sort_by, sort_order } = params;

    return this.repository.paginate<JobDescription>(clientId, {
      page,
      per_page,
      where,
      order_by: {
        [sort_by as string]: sort_order,
      },
      search: {
        term: search,
        fields: ['company', 'title', 'description', 'employment_type', 'location', 'level', 'company', 'employment_type'],
      },
    });
  }

  findByID(clientId: number, id: number) {
    return this.repository.findByID(clientId, id);
  }

  create(clientId: number, payload: Prisma.CVCreateInput) {
    return this.repository.create(clientId, payload);
  }

  createMany(clientId: number, payload: Prisma.CVCreateManyInput[]) {
    return this.repository.createMany(clientId, payload);
  }

  update(clientId: number, id: number, payload: Prisma.CVUpdateInput) {
    return this.repository.update<JobDescription>(clientId, id, payload);
  }

  delete(clientId: number, id: number) {
    return this.repository.delete(clientId, id);
  }
}

export const jobService = new JobService();
