'use client';

import {
  useQuery,
  keepPreviousData,
  UseQueryResult,
  useInfiniteQuery,
  UseInfiniteQueryResult,
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

export function useGetUsers() {
  const state = useDataTableState();
  const {
    search,
    orderByColumn,
    orderDirection,
    pageNumber,
    paginationPerPage,
  } = state ?? {};
  const fetchSize = 20;
  const debouncedSearch = useDebounce(search, 500);

  const queryResult = useInfiniteQuery({
    queryKey: [
      QueryKey.USERS,
      debouncedSearch,
      orderByColumn,
      orderDirection,
      /*pageNumber,
      paginationPerPage,*/
    ],
    initialPageParam: 1,
    getNextPageParam: (_lastGroup, groups) => {
      return groups.length;
    },
    queryFn: async ({ pageParam = 1 }) => {
      console.log(`pageParam: ${pageParam}`);

      const start = (pageParam as number) * fetchSize;
      console.log(`start: ${start}`);

      const data = await axiosInstance.get(RoutePath.USER + '/all', {
        params: {
          search,
          orderByColumn,
          orderDirection,
          pageNumber: pageParam,
          paginationPerPage: fetchSize,
          //skipPagination: true,
        },
      });

      return {
        data: data.data?.data ?? [],
        totalRows: data.data?.totalRows ?? 0,
      };
    },
    refetchOnWindowFocus: false,
    //placeholderData: keepPreviousData,
  });

  return {
    ...queryResult,
    state,
  };
}
