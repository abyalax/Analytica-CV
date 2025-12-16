'use client';

import { SendIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { metaRequestSchema } from '~/common/types/meta';
import { Table } from '~/components/fragments/table';
import { useSearch } from '~/components/hooks/use-search';
import { useColumns } from '../_hooks/use-columns';
import { useGetJobList } from '../_hooks/use-get-job-list';

export const TableJobs = () => {
  const search = useSearch(metaRequestSchema);
  const { clientId } = useParams<{ clientId: string }>();
  const { data } = useGetJobList(clientId, search);
  const { columns, columnIds, initialColumnVisibility } = useColumns();

  return (
    <Table
      data={data}
      columns={columns}
      columnIds={columnIds}
      onClickRow={(data) => console.log(data.original)}
      freezeColumnIds={['select']}
      initialColumnVisibility={initialColumnVisibility}
      pagination={true}
      engineSide="server_side"
      bulkActions={[
        { icon: <SendIcon />, label: 'Analyze This Data', onClick: () => toast.info('Success') },
        { icon: <SendIcon />, label: 'Remove This Data', onClick: () => toast.info('Success') },
      ]}
      facetedFilter={[
        {
          columnId: 'employment_type',
          title: 'Type of Employee',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Invited', value: 'invited' },
            { label: 'Suspended', value: 'suspended' },
          ],
        },
      ]}
    />
  );
};
