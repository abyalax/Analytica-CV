import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Checkbox } from '~/components/ui/checkbox';
import { P } from '~/components/ui/typography';
import { JobDescription } from '~/modules/jobs/jobs.type';
import { ActionColumn } from '../_components/action-column';

const columnHelper = createColumnHelper<JobDescription>();
export type TJobsDescriptionColummns = keyof JobDescription | 'select' | 'action';

type Params = {
  defaultVisible: TJobsDescriptionColummns[];
};

export const useColumns = (params?: Params) => {
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            className="cursor-pointer mx-3 hover:bg-secondary/50"
            checked={table.getIsAllRowsSelected() ? true : table.getIsSomeRowsSelected() ? 'indeterminate' : false}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="cursor-pointer mx-3 hover:bg-secondary/50"
            checked={row.getIsSelected()}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 50,
      }),
      columnHelper.accessor('title', {
        id: 'title',
        header: 'Title',
      }),
      columnHelper.accessor('description', {
        id: 'description',
        header: 'Description',
        size: 400,
        cell: (info) => {
          const value = info.getValue();
          const renderValue = value.length > 50 ? `${value.slice(0, 50)}...` : value;
          return (
            <div className="prose">
              <ReactMarkdown>{renderValue}</ReactMarkdown>
            </div>
          );
        },
      }),
      columnHelper.accessor('location', {
        id: 'location',
        header: 'Location',
      }),
      columnHelper.accessor('requirements', {
        id: 'requirements',
        header: 'Requirements',
        cell: (info) => (
          <div className="prose">
            <ReactMarkdown>{info.getValue()}</ReactMarkdown>
          </div>
        ),
      }),
      columnHelper.accessor('employment_type', {
        id: 'employment_type',
        header: 'Type Employee',
      }),
      columnHelper.accessor('salary_range', {
        id: 'certificate',
        header: 'Sertifikat',
        cell: ({ row }) => <P>{`${row.original.salary_range.min} - ${row.original.salary_range.max}`}</P>,
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => <ActionColumn record={info.row.original} />,
      }),
    ],
    [],
  );

  const columnIds = useMemo(() => columns.map((col) => col.id ?? ''), [columns]);

  const initialColumnVisibility = useMemo(() => {
    const allVisible = !params?.defaultVisible;
    return columnIds.reduce(
      (acc, val) => {
        acc[val as TJobsDescriptionColummns] = allVisible
          ? true
          : (params.defaultVisible.includes(val as TJobsDescriptionColummns) ?? false);
        return acc;
      },
      {} as Record<TJobsDescriptionColummns, boolean>,
    );
  }, [columnIds, params?.defaultVisible]);

  return { columns, initialColumnVisibility, columnIds };
};
