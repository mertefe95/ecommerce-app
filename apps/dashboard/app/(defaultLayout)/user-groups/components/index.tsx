'use client';
import { DataTable } from '@repo/ui/components/custom/data-table';
import { getColumns } from '../helpers/get-columns';
import { getSubColumns } from '../helpers/get-sub-columns';
import { useGetAllUserGroups } from '../hooks';
import useDataTable from '@repo/ui/hooks/use-data-table';
import { DataTableType, SubTableType } from 'packages/ui/src/types';

const UserGroups = () => {
  const columns = getColumns();
  const subColumns = getSubColumns();

  const { data, state, isLoading } = useGetAllUserGroups();
  const { data: userGroups, totalRows } = data ?? {};

  const dataTable = useDataTable({
    columns,
    data:
      userGroups?.map((userGroup) => ({
        ...userGroup,
        subRows: userGroup?.users?.map((user, index) => ({
          name: `${user.firstName}`,
          ...user,
          id: `subrow_${user.id}_index`,
        })),
      })) ?? [],

    totalRows: totalRows ?? 0,
    state,
    subColumns,
    isLoading,
  });

  return (
    <div className='mt-20'>
      <DataTable
        {...dataTable}
        type={DataTableType.PAGINATION}
        subType={SubTableType.BASIC}
      />
    </div>
  );
};

export default UserGroups;
