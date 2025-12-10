import { MetaRequest } from '~/common/types/meta';
import { Prisma } from '~/generated/prisma/client';
import { Service } from '../base/services';
import { CVRepository } from './cv.repository';
import { CV } from './cv.type';

class CVService extends Service<CVRepository> {
  constructor() {
    super(new CVRepository());
  }

  list(params: MetaRequest<CV>, where: Prisma.cvWhereInput) {
    const { page, per_page, search, sort_by, sort_order } = params;

    return this.repository.paginate<CV>({
      page,
      per_page,
      where,
      order_by: {
        [sort_by as string]: sort_order,
      },
      search: {
        term: search,
        fields: ['name', 'email', 'about', 'address', 'linkedin'],
      },
    });
  }

  findByID(id: number) {
    return this.repository.findByID(id);
  }

  create(payload: Prisma.$cvPayload) {
    return this.repository.create(payload);
  }

  update(id: number, payload: Prisma.$cvPayload) {
    return this.repository.update(id, payload);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}

export const cvService = new CVService();
