import { NextResponse } from 'next/server';

import { TResponse } from '~/common/types/response';
import { cvRepository } from '~/db/repositories/cvs.repository';
import { CV } from '~/db/schema';
import { NotFoundException } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [];

export const GET = safeHandler<{ clientId: string }>(async (_, { params }): Promise<NextResponse<TResponse<CV>>> => {
  const { clientId } = await params;
  const user = await cvRepository.findById(Number(clientId));
  if (!user) throw new NotFoundException('Client not found');
  return NextResponse.json({ data: user });
});

export const PUT = safeHandler<{ clientId: string }>(async (req, { params }): Promise<NextResponse<TResponse<CV>>> => {
  const { clientId } = await params;
  const body = await req.json();
  const updated = await cvRepository.update(Number(clientId), body);
  if (!updated) throw new NotFoundException('Client not found');
  return NextResponse.json({
    message: 'Client updated successfully',
    data: updated,
  });
});

export const DELETE = safeHandler<{ clientId: string }>(async (_, { params }): Promise<NextResponse<TResponse>> => {
  const { clientId } = await params;
  const deleted = await cvRepository.delete(Number(clientId));
  if (!deleted) throw new NotFoundException('Client not found');
  return NextResponse.json({ message: 'Client deleted' }, { status: 204 });
});
