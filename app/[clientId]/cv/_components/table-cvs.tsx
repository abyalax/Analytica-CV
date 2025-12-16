'use client';

import { MailCheck, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { metaRequestSchema } from '~/common/types/meta';
import { Table } from '~/components/fragments/table';
import { useSearch } from '~/components/hooks/use-search';
import { useColumns } from '../_hooks/use-columns';
import { useGetCVs } from '../_hooks/use-get-list-cv';
import { Filters } from './filters';
import { UploadCV } from './upload-cv';

export const TableCVs = () => {
  const search = useSearch(metaRequestSchema);
  const { clientId } = useParams<{ clientId: string }>();
  const { data } = useGetCVs(clientId, search);
  const { columns, columnIds, initialColumnVisibility } = useColumns();

  return (
    <Table
      data={data}
      columns={columns}
      columnIds={columnIds}
      onClickRow={(data) => console.log(data.original)}
      freezeColumnIds={['select', 'name']}
      topActions={<UploadCV />}
      initialColumnVisibility={initialColumnVisibility}
      pagination={true}
      menufilter={Filters()}
      bulkActions={[
        { icon: <MailCheck />, label: 'Send To Email', onClick: () => toast.info('Success gess') },
        { icon: <Trash2 />, label: 'Remove Data', onClick: () => toast.info('Success gess') },
        { icon: <MailCheck />, label: 'Send To Email', onClick: () => toast.info('Success gess') },
        { icon: <Trash2 />, label: 'Remove Data', onClick: () => toast.info('Success gess') },
      ]}
      engineSide="server_side"
      facetedFilter={[
        {
          columnId: 'name',
          title: 'Name',
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
