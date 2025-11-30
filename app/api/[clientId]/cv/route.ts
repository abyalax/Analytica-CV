import { SQL, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { MetaResponse } from '~/common/types/meta';
import { TResponse } from '~/common/types/response';
import { paginate } from '~/db/helper';
import { cvRepository } from '~/db/repositories/cvs.repository';
import { CV, cv } from '~/db/schema';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [];
export const GET = safeHandler(async (req): Promise<NextResponse<TResponse<{ data: CV[]; meta: MetaResponse }>>> => {
  const pageParams = req.nextUrl.searchParams.get('page');
  const perPageParams = req.nextUrl.searchParams.get('per_page');
  const searchParams = req.nextUrl.searchParams.get('search');

  let searchClause: SQL | undefined;

  const page = pageParams ? Number(pageParams) : 1;
  const perPage = perPageParams ? Number(perPageParams) : 10;

  if (searchParams) searchClause = sql`to_tsvector('simple', "cv"."name") @@ plainto_tsquery('simple', ${searchParams})`;

  const whereClause = await cvRepository.cvWhere(searchClause);
  const data = await paginate<CV>({
    table: cv,
    page,
    perPage,
    where: whereClause,
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
