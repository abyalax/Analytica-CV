/** biome-ignore-all lint/suspicious/noExplicitAny: <generic services> */
import { MetaResponse } from '~/common/types/meta';

export type PaginateOptions<Where, OrderBy, Entity> = {
  page: number;
  per_page: number;
  search?: {
    term?: string;
    fields: (keyof Entity)[];
  };
  where?: Where;
  order_by?: OrderBy;
};

export class Repository<
  ModelDelegate extends {
    aggregate: any;
    groupBy: any;
    count: any;

    create: any;
    createMany: any;
    createManyAndReturn: any;

    delete: any;
    deleteMany: any;

    findFirst: any;
    findFirstOrThrow: any;
    findMany: any;
    findUnique: any;
    findUniqueOrThrow: any;

    update: any;
    updateMany: any;
    upsert: any;
    fields: any;
  },
  Where,
  OrderBy,
> {
  protected model: ModelDelegate;

  constructor(model: ModelDelegate) {
    this.model = model;
  }

  async create(data: any) {
    return this.model.create({ data });
  }

  async update(id: number, data: any) {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.model.delete({ where: { id } });
  }

  async paginate<T>(options: PaginateOptions<Where, OrderBy, T>): Promise<{ data: T[]; meta: MetaResponse }> {
    const { page, per_page, where = {}, order_by, search } = options;

    let finalWhere = { ...where };

    // --- Advanced Search Across Fields ---
    if (search?.term && search.fields?.length) {
      const searchFilter = {
        OR: search.fields.map((field) => ({
          [field]: { contains: search.term, mode: 'insensitive' },
        })),
      };

      finalWhere = {
        AND: [finalWhere, searchFilter],
      };
    }

    // --- Query ---
    const total_count = await this.model.count({ where: finalWhere });

    const data = await this.model.findMany({
      where: finalWhere,
      orderBy: order_by,
      skip: (page - 1) * per_page,
      take: per_page,
    });

    const total_pages = Math.ceil(total_count / per_page);

    return {
      data,
      meta: {
        page,
        per_page,
        total_count,
        total_pages,
      },
    };
  }
}
