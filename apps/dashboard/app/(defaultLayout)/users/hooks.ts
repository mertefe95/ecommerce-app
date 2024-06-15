'use client';

import {
  useQuery,
  keepPreviousData,
  UseQueryResult,
} from '@tanstack/react-query';
import { axiosInstance } from '@web/common/api';
import useDebounce from '@repo/ui/hooks/use-debounce';
import { RoutePath, QueryKey } from '@dashboard/constants';
import {
  useDataTableState,
  DataTableStateProps,
} from 'packages/ui/src/hooks/use-data-table-state';
import { DataList } from '@repo/ui/types';
import { User } from '@prisma/client';

export function useGetAllUsers(): UseQueryResult<DataList<User>> & {
  state: DataTableStateProps;
} {
  const state = useDataTableState();
  const {
    search,
    orderByColumn,
    orderDirection,
    pageNumber,
    paginationPerPage,
  } = state ?? {};

  const debouncedSearch = useDebounce(search, 500);

  const queryResult = useQuery({
    queryKey: [
      QueryKey.USERS,
      debouncedSearch,
      orderByColumn,
      orderDirection,
      pageNumber,
      paginationPerPage,
    ],
    queryFn: async (): Promise<DataList<User>> => {
      const data = await axiosInstance.get(RoutePath.USER + '/all', {
        params: {
          search,
          orderByColumn,
          orderDirection,
          pageNumber,
          paginationPerPage,
        },
      });
      return {
        data: data.data?.data ?? [],
        totalRows: data.data?.totalRows ?? 0,
      };
    },
    placeholderData: keepPreviousData,
  });

  return {
    ...queryResult,
    state,
  };
}
