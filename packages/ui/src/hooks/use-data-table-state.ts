'use client';

import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  useQueryStates,
  UseQueryStatesKeysMap,
  Values,
  SetValues,
} from 'nuqs';

export interface DataTableStateProps {
  search: string;
  setSearch: (newValue: string) => void;
  orderByColumn: string;
  setOrderByColumn: (newValue: string) => void;
  orderDirection: string;
  setOrderDirection: (newValue: string) => void;
  pageNumber: number;
  setPageNumber: (newValue: number) => void;
  paginationPerPage: number;
  setPaginationPerPage: (newValue: number) => void;
  filters?: Values<UseQueryStatesKeysMap<any>>;
  setFilters?: SetValues<UseQueryStatesKeysMap<any>>;
}

export function useDataTableState(
  filterState?: UseQueryStatesKeysMap
): DataTableStateProps {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );

  const [orderByColumn, setOrderByColumn] = useQueryState(
    'orderByColumn',
    parseAsString.withDefault('')
  );

  const [orderDirection, setOrderDirection] = useQueryState(
    'orderDirection',
    parseAsString.withDefault('')
  );

  const [pageNumber, setPageNumber] = useQueryState(
    'pageNumber',
    parseAsInteger.withDefault(1)
  );

  const [paginationPerPage, setPaginationPerPage] = useQueryState(
    'paginationPerPage',
    parseAsInteger.withDefault(20)
  );

  const [filters, setFilters] = useQueryStates(filterState!);

  return {
    search,
    setSearch,
    orderByColumn,
    setOrderByColumn,
    orderDirection,
    setOrderDirection,
    pageNumber,
    setPageNumber,
    paginationPerPage,
    setPaginationPerPage,
    filters,
    setFilters,
  };
}
