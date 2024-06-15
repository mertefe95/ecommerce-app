'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnSort,
  Table,
  RowSelectionState,
  Row,
} from '@tanstack/react-table';
import { UrlUpdateType } from 'use-query-params';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRows: number;
  state: any;
}

declare type NewValueType<D> = D | ((latestValue: D) => D);

interface DataTableReturnProps<TData, TValue> {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  search: string;
  selectedRows: TData[];
  selectedRowIds: number[];
  setSearch: (
    newValue: NewValueType<string | null | undefined>,
    updateType?: UrlUpdateType
  ) => void;

  changeSelectedRows: (rows: Row<TData>[]) => void;
  resetSelectedRows: () => void;
}

export default function useDataTable<TData, TValue>({
  columns,
  data,
  totalRows,
  state,
}: DataTableProps<TData, TValue>): DataTableReturnProps<TData, TValue> {
  const {
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    paginationPerPage,
    setPaginationPerPage,
    orderDirection,
    orderByColumn,
    setOrderByColumn,
    setOrderDirection,
  } = state ?? {};

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const updateSorting = (newSorting: any) => {
    const result = newSorting();
    const sort = result?.[0];
    const sortItem = {
      orderByColumn: sort.id,
      orderDirection: sort.desc ? 'desc' : 'asc',
    };

    setOrderByColumn(sortItem.orderByColumn);
    setOrderDirection(sortItem.orderDirection);
  };

  const sort: ColumnSort[] = [
    {
      id: orderByColumn,
      desc: orderDirection === 'desc',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (originalRow: any) => originalRow?.id,
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    rowCount: totalRows,
    onSortingChange: updateSorting,
    state: {
      sorting: sort,
      columnFilters,
      rowSelection,
      pagination: {
        pageIndex: pageNumber ? pageNumber - 1 : 0,
        pageSize: paginationPerPage,
      },
    },
    onPaginationChange: (newPagination: any) => {
      const pagination = newPagination({
        ...table.getState().pagination,
        ...newPagination,
      });
      setPageNumber(pagination.pageIndex + 1);
      setPaginationPerPage(pagination.pageSize);
    },
  });

  const selected = table.getSelectedRowModel().rows;
  const selectedRows = selected.map((row) => row.original);
  const selectedRowIds = selected.map((row) => parseInt(row.id));

  const changeSelectedRows = (rows: Row<TData>[]) => {
    let newRowSelection: RowSelectionState = {};

    rows?.map((row) => {
      newRowSelection = {
        ...newRowSelection,
        [row?.id]: true,
      };
    });

    table.setRowSelection(newRowSelection);
  };

  const resetSelectedRows = () => {
    table.resetRowSelection();
  };

  return {
    table,
    columns,
    search,
    setSearch,
    selectedRows,
    changeSelectedRows,
    resetSelectedRows,
    selectedRowIds,
  };
}
