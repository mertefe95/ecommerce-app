'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { axiosInstance } from '@web/common/api';
import useDebounce from '@repo/ui/hooks/use-debounce';
import { RoutePath, QueryKey } from '@dashboard/constants';
import { useDataTableState } from 'packages/ui/src/hooks/use-data-table-state';
import { DataList } from '@repo/ui/types';
import { UserGroup, User } from '@prisma/client';

export function useGetAllUserGroups() {
  const state = useDataTableState();

  const {
    search,
    orderByColumn,
    orderDirection,
    pageNumber,
    paginationPerPage,
    filters,
  } = state ?? {};

  const debouncedSearch = useDebounce(search, 500);

  const queryResult = useQuery({
    queryKey: [
      QueryKey.USER_GROUPS,
      debouncedSearch,
      orderByColumn,
      orderDirection,
      pageNumber,
      paginationPerPage,
      filters,
    ],
    queryFn: async (): Promise<DataList<UserGroup & { users: User[] }>> => {
      const data = await axiosInstance.get(RoutePath.USER_GROUP + '/all', {
        params: {
          search,
          orderByColumn,
          orderDirection,
          pageNumber,
          paginationPerPage,
          ...filters,
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
