'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, PointerIcon } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { UserGroup, User } from '@prisma/client';
import { Checkbox, IndeterminateCheckbox } from '@repo/ui/components/checkbox';
import { DataTableColumnHeader } from '@repo/ui/components/custom/data-table-column-header';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ListBulletIcon,
  PinTopIcon,
} from '@radix-ui/react-icons';

export const getColumns = (): ColumnDef<UserGroup & { users: User[] }>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => {
        return (
          <div className='flex items-center justify-center gap-x-1'>
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label='Select all'
            />

            <Button
              variant={'ghost'}
              type='button'
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
              className=''
              size={'icon'}
            >
              {table.getIsAllRowsExpanded() ? (
                <ChevronDownIcon className='h-4 w-4' />
              ) : (
                <ChevronRightIcon className='h-4 w-4' />
              )}
            </Button>
          </div>
        );
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
      accessorKey: 'name',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={'Name'} />;
      },
      enableSorting: true,
    },
  ];
};
