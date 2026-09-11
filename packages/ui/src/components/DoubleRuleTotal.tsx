import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export type DoubleRuleTotalProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/** Accountant-style double underline total row. */
export function DoubleRuleTotal({ label, children, className }: DoubleRuleTotalProps) {
  return (
    <div
      className={cn(
        'ms-double-rule flex items-baseline justify-between gap-4 py-2 font-medium text-[var(--ink)]',
        className,
      )}
    >
      <span>{label}</span>
      <span className="ms-tabular font-mono">{children}</span>
    </div>
  );
}
