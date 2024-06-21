'use client';

import {
  ColumnDef,
  flexRender,
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
import { DataTableType } from '../../types';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import clsx from 'clsx';
import { DataTableFilter } from './data-table-filters';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '../button';
import { FilterOption } from '../../types';

interface DataTableProps<TData, TValue> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  search: string;
  setSearch: (newValue: string) => void;
  type: DataTableType;
  fetchNextPage?: () => void;
  isFetching?: boolean;
  isLoading?: boolean;
  searchText?: string;
  filterOptions?: FilterOption[];
}

export function DataTable<TData, TValue>({
  table,
  columns,
  search,
  setSearch,
  type,
  fetchNextPage,
  isFetching,
  searchText = 'Search...',
  filterOptions,
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

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='grid gap-y-4'>
      <div className='flex items-center'>
        <Input
          placeholder={searchText}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className='max-w-sm'
        />
      </div>
      <div className='flex'>
        {filterOptions?.map((filter, index) => {
          return (
            <DataTableFilter
              key={index}
              column={table.getColumn(filter.id)}
              title={filter.label}
              options={filter.options}
            />
          );
        })}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div
        className={clsx('w-full rounded-md border', {
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
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.getSize() === Number.MAX_SAFE_INTEGER
                            ? 'auto'
                            : header.getSize(),
                      }}
                    >
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
                      <TableCell
                        key={cell.id}
                        style={{
                          width:
                            cell.column.getSize() === Number.MAX_SAFE_INTEGER
                              ? 'auto'
                              : cell.column.getSize(),
                        }}
                      >
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
      {type === DataTableType.PAGINATION ? (
        <div className='mt-4'>
          <DataTablePagination table={table} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
