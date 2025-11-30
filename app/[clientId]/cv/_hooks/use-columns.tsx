import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Checkbox } from '~/components/ui/checkbox';
import { CV } from '~/db/schema';
import { url } from '~/lib/utils/converter';
import { useDeleteCV } from './use-delete-cv';

const columnHelper = createColumnHelper<CV>();
export type TCVColumn = keyof CV | 'select' | 'action';

type Params = {
  defaultVisible: TCVColumn[];
};

export const useColumns = (params?: Params) => {
  const { clientId } = useParams<{ clientId: string }>();
  const { mutate: deleteClient } = useDeleteCV(clientId);
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            className="cursor-pointer mx-3"
            checked={table.getIsAllRowsSelected() ? true : table.getIsSomeRowsSelected() ? 'indeterminate' : false}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="cursor-pointer mx-3"
            checked={row.getIsSelected()}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      }),
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
      }),
      columnHelper.accessor('email', {
        id: 'email',
        header: 'Email',
      }),
      columnHelper.accessor('about', {
        id: 'about',
        header: 'Description',
      }),
      columnHelper.accessor('address', {
        id: 'address',
        header: 'Address',
      }),
      columnHelper.accessor('certificate.title', {
        id: 'certificate',
        header: 'Sertifikat',
        cell: ({ row }) => row.original.certificate?.at(-1)?.title,
      }),
      columnHelper.accessor('experience.role', {
        id: 'experience',
        header: 'Experience',
        cell: ({ row }) => row.original.experience?.at(-1)?.role,
      }),
      columnHelper.accessor('education.name', {
        id: 'education',
        header: 'Education',
        cell: ({ row }) => row.original.education.at(-1)?.name,
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <Link
              href={url('/[clientId]/cv/[cvId]/update', { clientId, cvId: info.row.original.id.toString() })}
              onClick={(e) => e.stopPropagation()}
              className="text-gray-700 hover:text-blue-600"
            >
              <FaPencilAlt />
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteClient(info.row.original.id.toString());
              }}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ),
      }),
    ],
    [deleteClient, clientId],
  );

  const columnIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const initialColumnVisibility = useMemo(() => {
    const allVisible = !params?.defaultVisible;
    return columnIds.reduce(
      (acc, val) => {
        acc[val as TCVColumn] = allVisible ? true : (params.defaultVisible.includes(val as TCVColumn) ?? false);
        return acc;
      },
      {} as Record<TCVColumn, boolean>,
    );
  }, [columnIds, params?.defaultVisible]);

  return { columns, initialColumnVisibility, columnIds };
};
