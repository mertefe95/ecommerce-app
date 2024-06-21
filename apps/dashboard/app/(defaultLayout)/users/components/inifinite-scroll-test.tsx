'use client';

import { getColumns } from '../helpers/get-columns';
import { useGetUsers } from '../hooks';
import useDataTable from '@repo/ui/hooks/use-data-table';
import { DataTable } from '@repo/ui/components/custom/data-table';
import { DataTableType } from 'packages/ui/src/types';

const Users = () => {
  const { data, isLoading, state, isFetching, fetchNextPage, flatData } =
    useGetUsers();
  const columns = getColumns();

  const dataTable = useDataTable({
    columns,
    data: flatData ?? [],
    totalRows: 0,
    state,
    isLoading,
  });

  return (
    <div className='mt-20'>
      <DataTable
        {...dataTable}
        type={DataTableType.INFINITE_SCROLL}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  );
};

export default Users;
