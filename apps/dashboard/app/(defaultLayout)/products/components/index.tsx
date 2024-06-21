'use client';
import { DataTable } from '@repo/ui/components/custom/data-table';
import { getColumns } from '../helpers/get-columns';
import { useGetAllProducts, useGetBrands, useGetProductTypes } from '../hooks';
import useDataTable from '@repo/ui/hooks/use-data-table';
import { DataTableType, FilterOption } from 'packages/ui/src/types';
import { useMemo } from 'react';

const Products = () => {
  const columns = getColumns();
  const { data, state, isLoading, isFetching } = useGetAllProducts();
  const { data: products, totalRows } = data ?? {};
  const { data: productTypes } = useGetProductTypes();

  const filterOptions: FilterOption[] = useMemo(
    () => [
      {
        id: 'productType',
        label: 'Product types',
        defaultValue: [],
        options: productTypes ?? [],
      },
    ],
    [productTypes]
  );

  const dataTable = useDataTable({
    columns,
    data: products ?? [],
    totalRows: totalRows ?? 0,
    state,
    filterOptions,
    isLoading,
  });

  return (
    <div className='mt-20'>
      <DataTable
        {...dataTable}
        type={DataTableType.PAGINATION}
        filterOptions={filterOptions}
      />
    </div>
  );
};

export default Products;
