'use client';
import { DataTable } from '@repo/ui/components/custom/data-table';
import { getColumns } from '../helpers/get-columns';
import { useGetAllUsers } from '../hooks';
import useDataTable from '@repo/ui/hooks/use-data-table';
import { DataTableType } from 'packages/ui/src/types';

const Users = () => {
  const { data, state } = useGetAllUsers();
  const { data: users, totalRows } = data ?? {};
  const columns = getColumns();

  const dataTable = useDataTable({
    columns,
    data: users ?? [],
    totalRows: totalRows ?? 0,
    state,
  });

  return (
    <div className='mt-20'>
      <DataTable {...dataTable} type={DataTableType.PAGINATION} />
    </div>
  );
};

export default Users;
