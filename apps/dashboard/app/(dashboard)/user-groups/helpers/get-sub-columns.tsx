'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { UserGroup, User } from '@prisma/client';
import { Checkbox, IndeterminateCheckbox } from '@repo/ui/components/checkbox';
import { DataTableColumnHeader } from '@repo/ui/components/custom/data-table-column-header';

export const getSubColumns = (): ColumnDef<User>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => {
        return <></>;
      },
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center gap-x-1'>
            <Checkbox
              checked={
                row.getIsSelected() ||
                (row.getCanExpand() && row.getIsAllSubRowsSelected())
              }
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label='Select row'
            />

            {row.getCanExpand() ? (
              <Button
                variant={'ghost'}
                type='button'
                {...{
                  onClick: row.getToggleExpandedHandler(),
                }}
                className=''
                size={'icon'}
              >
                {row.getIsExpanded() ? (
                  <ChevronDownIcon className='h-4 w-4' />
                ) : (
                  <ChevronRightIcon className='h-4 w-4' />
                )}
              </Button>
            ) : (
              ''
            )}
          </div>
        );
      },
      enableSorting: false,

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
