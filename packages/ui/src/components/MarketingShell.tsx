import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export type MarketingShellProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Marketing / public site chrome — header and footer supplied by the app. */
export function MarketingShell({ header, footer, children, className }: MarketingShellProps) {
  return (
    <div className={cn('min-h-screen bg-[var(--ledger)] text-[var(--ink)]', className)}>
      {header}
      <main>{children}</main>
      {footer}
    </div>
  );
}
