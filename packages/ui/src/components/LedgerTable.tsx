import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export type LedgerColumn<T> = {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
  render: (row: T) => ReactNode;
};

export type LedgerTableProps<T> = {
  columns: LedgerColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption?: string;
  className?: string;
  dense?: boolean;
};

export function LedgerTable<T>({
  columns,
  rows,
  rowKey,
  caption,
  className,
  dense = false,
}: LedgerTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto border border-[var(--ruling-soft)] bg-[var(--folio)]', className)}>
      <table className="w-full border-collapse text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-[var(--ink)] text-left text-[var(--ink-2)]">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  dense ? 'px-2 py-1.5' : 'px-3 py-2',
                  'font-medium',
                  col.align === 'right' && 'text-right',
                  col.align === 'center' && 'text-center',
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="ms-ledger-row hover:bg-[var(--ledger)]/60">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    dense ? 'px-2 py-1.5' : 'px-3 py-2',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.className,
                  )}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
