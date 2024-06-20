'use client';

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnSort,
  Table,
  RowSelectionState,
  Row,
  getFacetedRowModel,
  ColumnFilter,
} from '@tanstack/react-table';
import { UseQueryStatesKeysMap } from 'nuqs';
import { DataTableStateProps } from './use-data-table-state';
import { useState, useMemo } from 'react';
import { FilterOption } from '../types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRows: number;
  state: DataTableStateProps;
  filterOptions?: FilterOption[];
}

interface DataTableReturnProps<TData, TValue> {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  search: string;
  selectedRows: TData[];
  selectedRowIds: number[];
  setSearch: (newValue: string) => void;

  changeSelectedRows: (rows: Row<TData>[]) => void;
  resetSelectedRows: () => void;
}

export default function useDataTable<TData, TValue>({
  columns,
  data,
  totalRows,
  state,
  filterOptions,
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
    filters,
    setFilters,
  } = state ?? {};

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

  const updateFilters = (newFilters: any) => {
    const filters: { id: string; value: any }[] = newFilters();

    let queryFilter: UseQueryStatesKeysMap = {};

    filterOptions?.forEach((filterOption) => {
      const filter = filters.find((f) => f.id === filterOption.id)!;
      queryFilter[`${filterOption.id?.toString()}`] =
        filter?.value ?? filterOption.defaultValue;
    });

    setFilters!(queryFilter);
  };

  const sort: ColumnSort[] = [
    {
      id: orderByColumn,
      desc: orderDirection === 'desc',
    },
  ];

  const filterState: ColumnFilter[] = useMemo(
    () =>
      Object.keys(filters ?? {}).map((key) => {
        const value = filters![key];

        return {
          id: key,
          value,
        };
      }),
    [filters]
  );

  const table = useReactTable({
    data,
    columns,
    getFacetedRowModel: getFacetedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: updateFilters,
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
      columnFilters: filterState,
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

  const selectedRows = useMemo(
    () => selected.map((row) => row.original),
    [selected]
  );

  const selectedRowIds = useMemo(
    () => selected.map((row) => parseInt(row.id)),
    [selected]
  );

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
