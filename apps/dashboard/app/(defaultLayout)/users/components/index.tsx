'use client';
import { DataTable } from '@repo/ui/components/custom/data-table';
import { getColumns } from '../helpers/get-columns';
import { useGetAllUsers, useGetUsers } from '../hooks';
import { useEffect, useMemo } from 'react';
import useDataTable from '@repo/ui/hooks/use-data-table';
import useDataTableInfiniteScroll from '@repo/ui/hooks/use-data-table-infinite-scroll';
import { DataTableInfiniteScroll } from '@repo/ui/components/custom/data-table-infinite-scroll';

const Users = () => {
  const { data, state } = useGetAllUsers();

  const { data: users, totalRows } = data ?? {};
  const columns = getColumns();
  /* TODO: Infinite scroll workaround
  const { data, isLoading, state, isFetching, fetchNextPage } = useGetUsers();

  const flatData = useMemo(
    () => data?.pages?.flatMap((page: any) => page.data) ?? [],
    [data]
  );
  const dataTable = useDataTableInfiniteScroll({
    columns,
    data: flatData,
    totalRows: 0,
    state,
  });
  */

  const dataTable = useDataTable({
    columns,
    data: users ?? [],
    totalRows: totalRows ?? 0,
    state,
  });

  return (
    <div className='mt-20'>
      {/* TODO: Infinite scroll workaround<DataTableInfiniteScroll
        {...dataTable}
        data={data}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
      /> */}

      <DataTable {...dataTable} />
    </div>
  );
};

export default Users;
