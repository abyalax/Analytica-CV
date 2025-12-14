import { prisma } from '~/db/prisma';
import { Prisma } from '~/generated/prisma/client';
import { Repository } from '../base/repositories';
import { JobsMapper } from './jobs.map';

export class JobsRepository extends Repository<
  Prisma.JobDescriptionDelegate,
  Prisma.JobDescriptionWhereInput,
  Prisma.JobDescriptionOrderByWithRelationInput
> {
  constructor() {
    super(prisma.jobDescription);
  }

  async findByID(clientId: number, id: number) {
    const cv = await this.model.findUniqueOrThrow({
      where: { id, user_id: clientId },
    });
    return JobsMapper.toDTO(cv);
  }
}
