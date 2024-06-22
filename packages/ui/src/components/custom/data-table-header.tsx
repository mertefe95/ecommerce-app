'use client';

import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '../table';

interface DataTableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
}

function DataTableHeader<TData>({ headerGroups }: DataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                style={{
                  width:
                    header.getSize() === Number.MAX_SAFE_INTEGER
                      ? 'auto'
                      : header.getSize(),
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default DataTableHeader;
