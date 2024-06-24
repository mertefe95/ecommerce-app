'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { User } from '@prisma/client';
import { Checkbox } from '@repo/ui/components/checkbox';
import { DataTableColumnHeader } from '@repo/ui/components/custom/data-table-column-header';

export const getColumns = (): ColumnDef<User>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={'First name'} />;
      },
      enableSorting: true,
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={'Last name'} />;
      },
      enableSorting: true,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={'Email'} />;
      },
      enableSorting: true,
    },
  ];
};
