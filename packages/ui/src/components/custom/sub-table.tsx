'use client';

import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
  Row,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

import { Table, TableCell, TableRow } from '../table';
import { useMemo } from 'react';
import { SubTableType } from '../../types';
import { useReactTable } from '@tanstack/react-table';
import DataTableBody from './data-table-body';
import DataTableHeader from './data-table-header';
import { useState } from 'react';

interface SubTableProps<TData, TValue> {
  row: Row<TData>;
  subColumns?: ColumnDef<TData, TValue>[];
  subType?: SubTableType;
  table: ReactTable<TData>;
}

export function SubTable<TData, TValue>({
  subColumns,
  subType,
  row,
  table,
}: SubTableProps<TData, TValue>) {
  switch (subType) {
    case SubTableType.ADVANCED: {
      const columns = subColumns!;
      const [sort, setSort] = useState<SortingState>([]);

      const subTable = useReactTable({
        data: row?.originalSubRows ?? [],
        columns,
        enableSorting: true,
        getRowId: (row: any) => row.id,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: table.setRowSelection,
        onSortingChange: setSort,
        state: {
          rowSelection: table.getState().rowSelection,
          sorting: sort,
        },
      });

      const headerGroups = useMemo(() => subTable.getHeaderGroups(), [table]);

      return (
        <TableRow>
          <TableCell colSpan={row.getVisibleCells().length}>
            <Table className='w-full'>
              <DataTableHeader headerGroups={headerGroups} />
              <DataTableBody table={subTable} columnsLength={columns.length} />
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
