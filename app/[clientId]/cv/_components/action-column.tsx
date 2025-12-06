'use client';

import { MoreHorizontalIcon } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { CV } from '~/db/schema';

type Props = {
  record: CV;
};

export const ActionColumn: FC<Props> = (props) => {
  const handleClick = () => toast.info("This feature isn't available yet");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="hover:bg-secondary">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleClick}>Detail</DropdownMenuItem>
        <DropdownMenuItem onClick={handleClick}>Update</DropdownMenuItem>
        <DropdownMenuItem onClick={handleClick}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// todo
/**
const { mutate: deleteClient } = useDeleteCV(clientId);
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
 */
