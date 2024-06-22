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
        if (row.id == '1') {
          const result = row.getIsAllSubRowsSelected();
        }
        console.log(row);
        return (
          <>
            <Checkbox
              checked={row.getIsSelected() || row.getIsAllSubRowsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label='Select row'
            />
            {/*<IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />{' '}*/}
            {row.getCanExpand() ? (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer' },
                }}
              >
                {row.getIsExpanded() ? '👇' : '👉'}
              </button>
            ) : (
              '🔵'
            )}
          </>
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
