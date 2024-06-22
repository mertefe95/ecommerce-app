'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { UserGroup, User } from '@prisma/client';
import { Checkbox, IndeterminateCheckbox } from '@repo/ui/components/checkbox';
import { DataTableColumnHeader } from '@repo/ui/components/custom/data-table-column-header';

export const getColumns = (): ColumnDef<UserGroup & { users: User[] }>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => {
        return (
          <>
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
            {/*<IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />*/}
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? '👇' : '👉'}
            </button>
          </>
        );
      },
      cell: ({ row }) => {
        if (row.id == '1') {
          const result = row.getIsAllSubRowsSelected();
        }
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
      accessorKey: 'name',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={'Name'} />;
      },
      enableSorting: true,
    },
  ];
};
