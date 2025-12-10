import { prisma } from '~/db/prisma';
import { Prisma } from '~/generated/prisma/client';
import { Repository } from '../base/repositories';
import { CVMapper } from './cv.map';

export class CVRepository extends Repository<Prisma.cvDelegate, Prisma.cvWhereInput, Prisma.cvOrderByWithRelationInput> {
  constructor() {
    super(prisma.cv);
  }

  async findByID(id: number) {
    const cv = await this.model.findUniqueOrThrow({
      where: { id },
    });

    return CVMapper.toDTO(cv);
  }
}
