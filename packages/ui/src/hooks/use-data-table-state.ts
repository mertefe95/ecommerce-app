'use client';

import {
  withDefault,
  useQueryParam,
  StringParam,
  NumberParam,
} from 'use-query-params';

/*const JsonNew = {
    encode: (json: any): any => {
      console.log('json');
      console.log(json);
      return objectToSearchString(json);
    },

    decode: (json: any): any => {
      return decodeJson(json);
    },
  };

  const [sort, setSort] = useQueryParam('', withDefault(JsonNew, {}));*/

/*const [pagination, setPagination] = useQueryParam(
    'pagination',
    withDefault(JsonParam, { pageNumber: 1, paginationPerPage: 10 })
  );*/

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
}

export function useDataTableState(): DataTableStateProps {
  const [search, setSearch] = useQueryParam(
    'search',
    withDefault(StringParam, '')
  );

  const [orderByColumn, setOrderByColumn] = useQueryParam(
    'orderByColumn',
    withDefault(StringParam, '')
  );

  const [orderDirection, setOrderDirection] = useQueryParam(
    'orderDirection',
    withDefault(StringParam, '')
  );

  const [pageNumber, setPageNumber] = useQueryParam(
    'pageNumber',
    withDefault(NumberParam, 1)
  );

  const [paginationPerPage, setPaginationPerPage] = useQueryParam(
    'paginationPerPage',
    withDefault(NumberParam, 10)
  );

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
    /*sort,
    setSort,
    pagination,
    setPagination,*/
  };
}
