import { NextResponse } from 'next/server';
import { ClientJobParams } from '~/common/types/params';
import { NotFoundException } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';
import { jobService } from '~/modules/jobs/jobs.service';

export const permissions = [];

export const GET = safeHandler<ClientJobParams>(async (_, { params }) => {
  const { clientId, jobId } = await params;
  const data = await jobService.findByID(Number(clientId), Number(jobId));
  if (!data) throw new NotFoundException('Job Description does not found');
  return NextResponse.json({ data });
});

export const PUT = safeHandler<ClientJobParams>(async (req, { params }) => {
  const { clientId, jobId } = await params;
  const body = await req.json();
  const updated = await jobService.update(Number(clientId), Number(jobId), body);
  if (!updated) throw new NotFoundException('Job Description does not found');
  return NextResponse.json({
    message: 'Job Description updated successfully',
    data: updated,
  });
});

export const DELETE = safeHandler<ClientJobParams>(async (_, { params }) => {
  const { clientId, jobId } = await params;
  const deleted = await jobService.delete(Number(clientId), Number(jobId));
  if (!deleted) throw new NotFoundException('Job Description does not found');
  return NextResponse.json({ message: 'Job Description deleted Successfully' });
});
