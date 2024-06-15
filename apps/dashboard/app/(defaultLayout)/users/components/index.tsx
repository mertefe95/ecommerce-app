'use client';
import { DataTable } from '@repo/ui/components/custom/data-table';
import { getColumns } from '../helpers/get-columns';
import { useGetAllUsers } from '../hooks';
import useDataTable from '@repo/ui/hooks/use-data-table';
import { useEffect } from 'react';

const Users = () => {
  const { data, isLoading, state } = useGetAllUsers();
  const { data: users, totalRows } = data ?? {};

  const columns = getColumns();
  const dataTable = useDataTable({
    columns,
    data: users ?? [],
    totalRows: totalRows ?? 0,
    state,
  });

  useEffect(() => {
    //dataTable.table.setRowSelection({ 1: true, 2: true });
    //dataTable.changeSelectedRows([data?.[0]]);
  }, [data]);

  return (
    <div className='mt-20'>
      <DataTable {...dataTable} />
    </div>
  );
};

export default Users;
