import { NextResponse } from 'next/server';
import { TResponse } from '~/common/types/response';
import { CV } from '~/db/schema';
import { safeHandler } from '~/lib/handler/safe-handler';
import { parseMultipleCVs } from './extract.service';

export const POST = safeHandler<{ clientId: string }>(async (req, { params }): Promise<NextResponse<TResponse<CV[]>>> => {
  const { clientId } = await params;
  const body = await req.json();
  const resullts = await parseMultipleCVs(body, clientId);
  return NextResponse.json({
    message: 'Extracted CVs',
    data: resullts,
  });
});
