'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { Product, ProductType, Brand } from '@prisma/client';
import { Checkbox } from '@repo/ui/components/checkbox';
import { DataTableColumnHeader } from '@repo/ui/components/custom/data-table-column-header';
//test
export const getColumns = (): ColumnDef<
  Product & {
    productType: ProductType;
    brand: Brand;
  }
>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
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
        </>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
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
    {
      accessorKey: 'productType',
      accessorFn: (row) => row.productType?.name,
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={'Type'} />;
      },
      enableSorting: true,
      size: 350,
    },
    {
      accessorKey: 'brand',
      accessorFn: (row) => row.brand?.name,
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={'Brand'} />;
      },
      enableSorting: true,
      size: 350,
    },
  ];
};
