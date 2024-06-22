'use client';

import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
  Row,
  getCoreRowModel,
} from '@tanstack/react-table';

import { Table, TableCell, TableRow } from '../table';
import { useMemo } from 'react';
import { DataTableType, SubTableType } from '../../types';
import { useReactTable } from '@tanstack/react-table';
import DataTableBody from './data-table-body';
import DataTableHeader from './data-table-header';

interface SubTableProps<TData, TValue> {
  row: Row<TData>;
  subColumns?: ColumnDef<TData, TValue>[];
  subType?: SubTableType;
}

export function SubTable<TData, TValue>({
  subColumns,
  subType,
  row,
}: SubTableProps<TData, TValue>) {
  switch (subType) {
    case SubTableType.ADVANCED: {
      const columns = subColumns!;

      const table = useReactTable({
        data: row?.originalSubRows ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      const headerGroups = useMemo(() => table.getHeaderGroups(), [table]);

      return (
        <TableRow>
          <TableCell colSpan={row.getVisibleCells().length}>
            <Table className='w-full'>
              <DataTableHeader headerGroups={headerGroups} />
              <DataTableBody
                table={table}
                type={DataTableType.NORMAL}
                columnsLength={columns.length}
              />
            </Table>
          </TableCell>
        </TableRow>
      );
    }

    default:
    case SubTableType.BASIC: {
      return row?.subRows?.map((subRow) => {
        return (
          <TableRow key={subRow.id}>
            {subRow.getVisibleCells().map((cell) => {
              return (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        );
      });
    }
  }
}
