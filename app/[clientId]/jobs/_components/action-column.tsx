'use client';

import { MoreHorizontalIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import { ClientParams } from '~/common/types/params';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { url } from '~/lib/utils/converter';
import { JobDescription } from '~/modules/jobs/jobs.type';
import { useDeleteJobDescription } from '../_hooks/use-delete-job';

type Props = {
  record: JobDescription;
};

export const ActionColumn: FC<Props> = ({ record }) => {
  const { push } = useRouter();
  const { clientId } = useParams<ClientParams>();
  const { mutate: deleteJob } = useDeleteJobDescription(clientId);

  const handleDetail = () => push(url('/[clientId]/jobs/[jobId]', { clientId: clientId, jobId: record.id.toString() }));
  const handleUpdate = () => push(url('/[clientId]/jobs/[jobId]/update', { clientId: clientId, jobId: record.id.toString() }));
  const handleDelete = () => deleteJob(record.id.toString());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="hover:bg-secondary">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDetail}>Detail</DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
