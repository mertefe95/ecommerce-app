'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { axiosInstance } from '@web/common/api';
import useDebounce from '@repo/ui/hooks/use-debounce';
import { RoutePath, QueryKey } from '@dashboard/constants';
import { useDataTableState } from 'packages/ui/src/hooks/use-data-table-state';
import { DataList } from '@repo/ui/types';
import { Product, Brand, ProductType } from '@prisma/client';
import { parseAsInteger, parseAsArrayOf } from 'nuqs';

export function useGetAllProducts() {
  const defaultFilters = {
    productType: parseAsArrayOf(parseAsInteger).withDefault([]),
    brand: parseAsArrayOf(parseAsInteger).withDefault([]),
  };
  const state = useDataTableState(defaultFilters);

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
      QueryKey.PRODUCTS,
      debouncedSearch,
      orderByColumn,
      orderDirection,
      pageNumber,
      paginationPerPage,
      filters,
    ],
    queryFn: async (): Promise<
      DataList<
        Product & {
          productType: ProductType;
          brand: Brand;
        }
      >
    > => {
      const data = await axiosInstance.get(RoutePath.PRODUCT + '/all', {
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

export function useGetSellers() {
  return useQuery({
    queryKey: [QueryKey.SELLERS],
    queryFn: async (): Promise<ProductType[]> => {
      const data = await axiosInstance.get(RoutePath.PRODUCT + '/sellers');

      return data?.data ?? [];
    },
  });
}
