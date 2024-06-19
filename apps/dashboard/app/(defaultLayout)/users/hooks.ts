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
import { DataList, InfiniteScrollData } from '@repo/ui/types';
import { User } from '@prisma/client';
import { useMemo } from 'react';

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

export function useGetUsers(): UseInfiniteQueryResult & {
  state: DataTableStateProps;
  flatData: User[];
} {
  const state = useDataTableState();
  const { search, orderByColumn, orderDirection } = state ?? {};

  const debouncedSearch = useDebounce(search, 500);

  const queryResult = useInfiniteQuery({
    queryKey: [QueryKey.USERS, debouncedSearch, orderByColumn, orderDirection],
    initialPageParam: 0,
    getNextPageParam: (_lastUser, users) => {
      return users?.length;
    },
    queryFn: async ({ pageParam = 0 }): Promise<DataList<User>> => {
      const data = await axiosInstance.get(RoutePath.USER + '/all', {
        params: {
          search,
          orderByColumn,
          orderDirection,
          pageNumber: pageParam + 1,
          paginationPerPage: 20,
        },
      });

      return {
        data: data.data?.data ?? [],
        totalRows: data.data?.totalRows ?? 0,
      };
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const flatData = useMemo(
    () => queryResult?.data?.pages?.flatMap((page: any) => page.data) ?? [],
    [queryResult?.data]
  );

  return {
    ...queryResult,
    state,
    flatData,
  };
}
