'use client';

import {
  flexRender,
  Table as ReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import { Fragment, forwardRef } from 'react';
import { TableBody, TableRow, TableCell } from '../table';
import { DataTableType, SubTableType } from '../../types';
import { SubTable } from './sub-table';

interface DataTableBodyProps<TData, TValue> {
  subType?: SubTableType;
  ref?: (node?: Element | null | undefined) => void;
  columnsLength: number;
  subColumns?: ColumnDef<TData, TValue>[];
  table: ReactTable<TData>;
}

function DataTableBody<TData, TValue>({
  subType,
  subColumns,
  columnsLength,
  table,
}: DataTableBodyProps<TData, TValue>) {
  const { rows } = table.getRowModel() ?? {};

  return (
    <TableBody>
      {rows?.length ? (
        rows.map((row) => {
          return (
            <Fragment key={row.id}>
              <TableRow data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width:
                        cell.column.getSize() === Number.MAX_SAFE_INTEGER
                          ? 'auto'
                          : cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              {row.getIsExpanded() && (
                <SubTable row={row} subType={subType} subColumns={subColumns} />
              )}
            </Fragment>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={columnsLength} className='h-24 text-center'>
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export default DataTableBody;
