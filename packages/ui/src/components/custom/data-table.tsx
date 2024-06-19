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
import { DataTableType } from '../../types';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import clsx from 'clsx';

declare type NewValueType<D> = D | ((latestValue: D) => D);

interface DataTableProps<TData, TValue> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  search: string;
  setSearch: (
    newValue: NewValueType<string | null | undefined>,
    updateType?: UrlUpdateType
  ) => void;
  type: DataTableType;
  fetchNextPage?: () => void;
  isFetching?: boolean;
}

export function DataTable<TData, TValue>({
  table,
  columns,
  search,
  setSearch,
  type,
  fetchNextPage,
  isFetching,
}: DataTableProps<TData, TValue>) {
  const { rows } = table.getRowModel();

  const { ref, inView } = useInView({
    threshold: 0,
    skip: type !== DataTableType.INFINITE_SCROLL,
  });

  useEffect(() => {
    if (!isFetching && type === DataTableType.INFINITE_SCROLL && inView) {
      fetchNextPage!();
    }
  }, [inView]);

  return (
    <div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter emails...'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className='max-w-sm'
        />
      </div>{' '}
      <div
        className={clsx('rounded-md border', {
          'relative h-[600px] w-full overflow-auto':
            type === DataTableType.INFINITE_SCROLL,
        })}
      >
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
            {rows?.length ? (
              rows.map((row, rowIndex) => {
                return (
                  <TableRow
                    key={row.id}
                    ref={
                      type === DataTableType.INFINITE_SCROLL &&
                      rowIndex === rows?.length - 4
                        ? ref
                        : null
                    }
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
                );
              })
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
      {type !== DataTableType.PAGINATION ? (
        <div className='mt-4'>
          <DataTablePagination table={table} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
