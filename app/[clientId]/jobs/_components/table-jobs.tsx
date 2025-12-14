'use client';

import { useParams } from 'next/navigation';
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
