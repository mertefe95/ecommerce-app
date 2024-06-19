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
import { Product, Brand, ProductType } from '@prisma/client';
import { useMemo } from 'react';

export function useGetAllProducts(): UseQueryResult<DataList<Product>> & {
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
      QueryKey.PRODUCTS,
      debouncedSearch,
      orderByColumn,
      orderDirection,
      pageNumber,
      paginationPerPage,
    ],
    queryFn: async (): Promise<DataList<Product>> => {
      const data = await axiosInstance.get(RoutePath.PRODUCT + '/all', {
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

export function useGetBrands() {
  return useQuery({
    queryKey: [QueryKey.BRANDS],
    queryFn: async (): Promise<Brand[]> => {
      const data = await axiosInstance.get(RoutePath.PRODUCT + '/brands');

      return data?.data ?? [];
    },
  });
}

export function useGetProductTypes() {
  return useQuery({
    queryKey: [QueryKey.PRODUCT_TYPES],
    queryFn: async (): Promise<ProductType[]> => {
      const data = await axiosInstance.get(RoutePath.PRODUCT + '/types');

      return data?.data ?? [];
    },
  });
}
