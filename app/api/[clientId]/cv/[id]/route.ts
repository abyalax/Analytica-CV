import { NextResponse } from 'next/server';

import { NotFoundException } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';
import { cvService } from '~/modules/cv/cv.service';

export const permissions = [];

export const GET = safeHandler<{ clientId: string }>(async (_, { params }) => {
  const { clientId } = await params;
  const user = await cvService.findByID(Number(clientId));
  if (!user) throw new NotFoundException('Client not found');
  return NextResponse.json({ data: user });
});

export const PUT = safeHandler<{ clientId: string }>(async (req, { params }) => {
  const { clientId } = await params;
  const body = await req.json();
  const updated = await cvService.update(Number(clientId), body);
  if (!updated) throw new NotFoundException('Client not found');
  return NextResponse.json({
    message: 'Client updated successfully',
    data: updated,
  });
});

export const DELETE = safeHandler<{ clientId: string }>(async (_, { params }) => {
  const { clientId } = await params;
  const deleted = await cvService.delete(Number(clientId));
  if (!deleted) throw new NotFoundException('Client not found');
  return NextResponse.json({ message: 'Client deleted' }, { status: 204 });
});
