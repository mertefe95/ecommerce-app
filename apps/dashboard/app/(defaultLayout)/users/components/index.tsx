'use client';
import { DataTable } from '@repo/ui/components/custom/data-table';
import { getColumns } from '../helpers/get-columns';
import { useGetAllUsers } from '../hooks';
import useDataTable from '@repo/ui/hooks/use-data-table';

const Users = () => {
  const { data, isLoading } = useGetAllUsers();

  const columns = getColumns();
  const table = useDataTable({ columns, data: data ?? [] });

  return (
    <div className='mt-20'>
      <DataTable columns={columns} table={table} />
    </div>
  );
};

export default Users;
