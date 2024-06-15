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
import { useMemo, useCallback, useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
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
import { useInView } from 'react-intersection-observer';

declare type NewValueType<D> = D | ((latestValue: D) => D);

interface DataTableProps<TData, TValue> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  search: string;
  setSearch: (
    newValue: NewValueType<string | null | undefined>,
    updateType?: UrlUpdateType
  ) => void;
  data: any;
  isFetching: any;
  fetchNextPage: any;
}

export function DataTableInfiniteScroll<TData, TValue>({
  table,
  columns,
  search,
  setSearch,

  data,
  isFetching,
  fetchNextPage,
}: DataTableProps<TData, TValue>) {
  const flatData = useMemo(
    () => data?.pages?.flatMap((page: any) => page.data) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.totalRows ?? 0;
  const totalFetched = flatData.length;

  const { rows } = table.getRowModel();

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          console.log('fetch? next page???????');
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      console.log('fetch? next page???????');
      fetchNextPage();
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
      </div>
      <div
        onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        ref={tableContainerRef}
        className='container relative h-[600px] w-full overflow-auto rounded-md  border'
      >
        {/* <Table className='grid'>
          <TableHeader className='sticky top-0 z-[1] grid'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='flex w-full'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='w-full'
                      style={{ width: header.getSize() }}
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
          <TableBody
            className='relative grid'
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as any;
              return (
                <TableRow
                  data-index={virtualRow.index} //needed for dynamic row height
                  ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='absolute flex w-full'
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell
                      key={cell.id}
                      className='flex'
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>*/}

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
              rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  ref={rowIndex === rows?.length - 4 ? ref : null}
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
