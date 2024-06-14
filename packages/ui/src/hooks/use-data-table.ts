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
} from '@tanstack/react-table';
import {
  useQueryParams,
  withDefault,
  NumericArrayParam,
  useQueryParam,
  StringParam,
} from 'use-query-params';
import { useState } from 'react';

const MyFiltersParam = withDefault(NumericArrayParam, []);

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function useDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [query, setQuery] = useQueryParams({
    productTypes: MyFiltersParam,
  });

  const [search, setSearch] = useQueryParam('', StringParam);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  console.log('sorting');
  console.log(sorting);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: (newSorting) => {
      console.log('newSorting');
      console.log(newSorting);
      setSorting(newSorting);
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return table;
}
