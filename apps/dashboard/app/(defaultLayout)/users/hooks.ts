'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { axiosInstance } from '@web/common/api';

import {
  useQueryParams,
  withDefault,
  NumericArrayParam,
} from 'use-query-params';

import { ProductProps } from '@web/interfaces/product';

import { RoutePath, QueryKey } from '@dashboard/constants';

//const MyFiltersParam = withDefault(NumericArrayParam, []);
export function useGetAllUsers() {
  return useQuery({
    queryKey: [QueryKey.USERS],
    queryFn: async () => {
      const data = await axiosInstance.get(RoutePath.USER + '/all');
      return data.data;
    },
    placeholderData: keepPreviousData,
  });
}
