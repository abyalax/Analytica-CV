import { NextResponse } from 'next/server';
import { ClientParams } from '~/common/types/params';
import { TFilterJobDescription } from '~/data/jobs/jobs.type';
import { safeHandler } from '~/lib/handler/safe-handler';
import { jobService } from '~/modules/jobs/jobs.service';

export const GET = safeHandler<ClientParams>(async (req, { params }) => {
  const { clientId } = await params;

  const searchParams = req.nextUrl.searchParams;
  const _params: Record<string, unknown> = {};

  for (const [key, value] of searchParams.entries()) {
    _params[key] = value ?? '';
  }

  const castParams: TFilterJobDescription = {
    page: Number(_params.page),
    per_page: Number(_params.per_page),
    ..._params,
  };

  const data = await jobService.list(Number(clientId), { ...castParams }, { user_id: Number(clientId) });
  return NextResponse.json({
    message: 'Success get all Job Descriptions',
    data,
  });
});
