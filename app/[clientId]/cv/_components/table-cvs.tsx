'use client';

import { useParams } from 'next/navigation';
import { metaRequestSchema } from '~/common/types/meta';
import { Table } from '~/components/fragments/table';
import { useSearch } from '~/components/hooks/use-search';
import { useColumns } from '../_hooks/use-columns';
import { useGetCVs } from '../_hooks/use-get-cvs';
import { Filters } from './filters';
import { UploadCV } from './upload-cv';

export const TableCVs = () => {
  const search = useSearch(metaRequestSchema);

  const { clientId } = useParams<{ clientId: string }>();

  const { data } = useGetCVs(clientId, {
    page: Number(search.page ?? 1),
    per_page: Number(search.per_page ?? 10),
    search: search.search as string,
  });

  const { columns, columnIds, initialColumnVisibility } = useColumns();

  return (
    <Table
      data={data}
      columns={columns}
      columnIds={columnIds}
      onClickRow={(data) => console.log(data.original)}
      freezeColumnIds={['select']}
      topActions={<UploadCV />}
      enableFeature={{
        columnVisibilitySelector: {
          initialColumnVisibility,
        },
        engineSide: 'server_side',
        pagination: {
          perPageOptions: [5, 10, 20, 30, 40, 50, 100],
        },
        menufilter: Filters(),
      }}
    />
  );
};
