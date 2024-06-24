'use client';

import {
  ColumnDef,
  Table as ReactTable,
  flexRender,
} from '@tanstack/react-table';
import { Table, TableBody, TableRow, TableCell } from '../table';
import { useMemo } from 'react';
import { Input } from '../input';
import { DataTablePagination } from './data-table-pagination';
import { DataTableType, SubTableType } from '../../types';
import { useInView } from 'react-intersection-observer';
import { useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { DataTableFilter } from './data-table-filters';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '../button';
import { FilterOption } from '../../types';
import DataTableHeader from './data-table-header';
import { SubTable } from './sub-table';

interface DataTableProps<TData, TValue> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  subColumns?: ColumnDef<TData, TValue>[];
  search: string;
  setSearch: (newValue: string) => void;
  type: DataTableType;
  subType?: SubTableType;
  fetchNextPage?: () => void;
  isFetching?: boolean;
  isLoading?: boolean;
  searchText?: string;
  filterOptions?: FilterOption[];
}

export function DataTable<TData, TValue>({
  table,
  columns,
  subColumns,
  search,
  setSearch,
  type,
  subType = SubTableType.BASIC,
  fetchNextPage,
  isFetching,
  searchText = 'Search...',
  filterOptions,
}: DataTableProps<TData, TValue>) {
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

  const headerGroups = useMemo(() => table.getHeaderGroups(), [table]);
  const { rows } = table.getRowModel() ?? {};

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
      <div className='flex gap-x-2'>
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
          <DataTableHeader headerGroups={headerGroups} />
          <TableBody>
            {rows?.length ? (
              rows.map((row, rowIndex) => {
                return (
                  <Fragment key={row.id}>
                    <TableRow
                      ref={
                        type === DataTableType.INFINITE_SCROLL &&
                        rowIndex === rows?.length - 6
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

                    {row.getIsExpanded() && (
                      <SubTable
                        row={row}
                        table={table}
                        subType={subType}
                        subColumns={subColumns}
                      />
                    )}
                  </Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
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
