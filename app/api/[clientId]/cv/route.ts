import { asc, desc, ilike, or, SQL, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { MetaResponse } from '~/common/types/meta';
import { TResponse } from '~/common/types/response';
import { paginate } from '~/db/helper';
import { cvRepository } from '~/db/repositories/cvs.repository';
import { CV, cv } from '~/db/schema';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [];
type TFilterCV = {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: keyof CV;
  order_by?: 'ASC' | 'DESC';
};

export const GET = safeHandler(async (req): Promise<NextResponse<TResponse<{ data: CV[]; meta: MetaResponse }>>> => {
  const searchParams = req.nextUrl.searchParams;
  const _params: Record<string, unknown> = {};

  for (const [key, value] of searchParams.entries()) {
    _params[key] = value ?? '';
  }

  const params = _params as TFilterCV;

  console.log(params);

  let searchClause: SQL | undefined;
  let orderByClause: SQL | undefined;

  const page = params.page ? Number(params.page) : 1;
  const perPage = params.per_page ? Number(params.per_page) : 10;

  if (params.search) {
    const q = `%${params.search}%`;

    // Ambil semua column yang bertipe text untuk di-search
    const searchableColumns = Object.entries(cv)
      .filter(([_, column]) => column.dataType === 'string')
      .map(([key]) => key);

    if (searchableColumns.length > 0) {
      searchClause = or(
        //@ts-expect-error
        ...searchableColumns.map((col) => ilike(cv[col], q)),
      );
    }
  }

  // if (params.sort_by) {
  //   const column = cv[params.sort_by];

  //   if (column) {
  //     orderByClause = params.order_by === 'DESC' ? desc(column) : asc(column);
  //   }
  // }

  if (params.sort_by) {
    const col = cv[params.sort_by];

    if (col) {
      // if (params.order_by === 'DESC') {
      //   orderByClause = sql`${col} DESC`;
      // } else {
      //   orderByClause = sql`${col} ASC`;
      // }
      orderByClause = sql`${col} ${params.order_by === 'DESC' ? sql`DESC` : sql`ASC`}`;
    }
  }

  const whereClause = await cvRepository.cvWhere(searchClause);

  const data = await paginate<CV>({
    table: cv,
    page,
    perPage,
    where: whereClause,
    orderBy: orderByClause,
  });

  return NextResponse.json({
    data,
  });
});

export const POST = safeHandler(async (req): Promise<NextResponse<TResponse<CV>>> => {
  const body = await req.json();

  /**
   * TODO
   */

  return NextResponse.json({ data: body });
});
