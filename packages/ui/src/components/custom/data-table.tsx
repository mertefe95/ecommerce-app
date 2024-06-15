'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as ReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import { Input } from '../input';
import { DataTablePagination } from './data-table-pagination';
import { UrlUpdateType } from 'use-query-params';

declare type NewValueType<D> = D | ((latestValue: D) => D);

interface DataTableProps<TData, TValue> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  search: string;
  setSearch: (
    newValue: NewValueType<string | null | undefined>,
    updateType?: UrlUpdateType
  ) => void;
}

export function DataTable<TData, TValue>({
  table,
  columns,
  search,
  setSearch,
}: DataTableProps<TData, TValue>) {
  return (
    <div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter emails...'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>{' '}
      <div className='mt-4'>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
