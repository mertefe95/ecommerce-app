'use client';
import { DataTable } from '@repo/ui/components/custom/data-table';
import { getColumns } from '../helpers/get-columns';
import { useGetAllProducts } from '../hooks';
import useDataTable from '@repo/ui/hooks/use-data-table';
import { DataTableType } from 'packages/ui/src/types';

const Products = () => {
  const { data, state } = useGetAllProducts();
  const { data: products, totalRows } = data ?? {};
  const columns = getColumns();

  const dataTable = useDataTable({
    columns,
    data: products ?? [],
    totalRows: totalRows ?? 0,
    state,
  });

  return (
    <div className='mt-20'>
      <DataTable {...dataTable} type={DataTableType.PAGINATION} />
    </div>
  );
};

export default Products;
