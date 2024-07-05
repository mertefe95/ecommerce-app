'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { User } from '@prisma/client';
import { Checkbox } from '@repo/ui/components/checkbox';
import { DataTableColumnHeader } from '@repo/ui/components/custom/data-table-column-header';
import { DataTableRowActions } from '@repo/ui/components/custom/data-table-row-actions';
import { PersonIcon, TrashIcon } from '@radix-ui/react-icons';

export const getColumns = (): ColumnDef<User>[] => {
  const actions = [
    {
      name: 'Detail',
      icon: <PersonIcon className='mr-2 h-5 w-5' />,
      href: '/users',
      onClick: () => {},
    },
    {
      name: 'Delete',
      icon: <TrashIcon className='mr-2 h-5 w-5' />,
    },
    {
      name: 'Favorite',
    },
    {
      name: 'Labels',
    },
    {
      name: 'Delete',
    },
  ];
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
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} actions={actions} />,
    },
  ];
};
