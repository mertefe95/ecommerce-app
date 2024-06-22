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
  getExpandedRowModel,
  ExpandedState,
} from '@tanstack/react-table';
import { UseQueryStatesKeysMap } from 'nuqs';
import { DataTableStateProps } from './use-data-table-state';
import { useState, useMemo, createElement } from 'react';
import { FilterOption } from '../types';
import { Skeleton } from '../components/skeleton';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  subColumns?: ColumnDef<any>[];
  data: TData[];
  totalRows: number;
  state: DataTableStateProps;
  filterOptions?: FilterOption[];
  isLoading?: boolean;
}

interface DataTableReturnProps<TData, TValue> {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  subColumns?: ColumnDef<any>[];
  search: string;
  selectedRows: TData[];
  selectedRowIds: number[];
  setSearch: (newValue: string) => void;

  changeSelectedRows: (rows: Row<TData>[]) => void;
  resetSelectedRows: () => void;
}

export default function useDataTable<TData, TValue>({
  columns,
  subColumns,
  data,
  totalRows,
  state,
  filterOptions,
  isLoading,
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
  const [expanded, setExpanded] = useState<ExpandedState>({});

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

  const tableData = useMemo(
    () => (isLoading ? Array(20).fill({}) : data),
    [isLoading, data]
  );

  const columnsMemo = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => {
              return createElement(Skeleton, { className: 'h-6' });
            },
          }))
        : columns,
    [isLoading, columns]
  );

  const table = useReactTable({
    data: tableData,
    columns: columnsMemo,
    getFacetedRowModel: getFacetedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: updateFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subRows,
    onRowSelectionChange: setRowSelection,
    getRowId: (originalRow) => {
      //originalRow: any, index: number, parent?: any
      return originalRow?.id;
    },
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    manualExpanding: true,
    rowCount: totalRows,
    onSortingChange: updateSorting,
    onExpandedChange: setExpanded,
    state: {
      expanded,
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
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    //debugAll: true, // debug console logs only available in development
    debugTable: true,
  });

  const { rows: selected, flatRows: selectedFlatRows } =
    table.getSelectedRowModel();

  const selectedRows = useMemo(
    () => selected.map((row) => row.original),
    [selected]
  );

  const selectedSubRows = useMemo(
    () =>
      selectedFlatRows
        .filter((row) => row?.id?.toString()?.startsWith('subrow_'))
        .map((row) => ({
          ...row.original,
          id: Number(row?.id?.toString()?.split('subrow_').pop()),
        })),
    [selectedFlatRows]
  );

  const selectedRowIds = useMemo(
    () => selected.map((row) => parseInt(row.id)),
    [selected]
  );

  const selectedSubRowsId = useMemo(
    () => selectedSubRows.map((row) => parseInt(row.id)),
    [selectedSubRows]
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
    subColumns,
    search,
    setSearch,
    selectedRows,
    changeSelectedRows,
    resetSelectedRows,
    selectedRowIds,
  };
}
