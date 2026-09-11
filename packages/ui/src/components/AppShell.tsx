import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export type AppNavItem = {
  href: string;
  label: string;
  active?: boolean;
};

export type AppShellProps = {
  productName?: string;
  workspaceLabel?: string;
  nav: AppNavItem[];
  renderLink: (item: AppNavItem, className: string) => ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AppShell({
  productName = 'MarginShield',
  workspaceLabel,
  nav,
  renderLink,
  headerRight,
  children,
  className,
}: AppShellProps) {
  return (
    <div className={cn('min-h-screen bg-[var(--ledger)] text-[var(--ink)]', className)}>
      <header className="border-b border-[var(--ruling-soft)] bg-[var(--folio)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="min-w-0 text-sm">
            <span className="font-semibold tracking-tight">{productName}</span>
            {workspaceLabel ? (
              <>
                <span className="mx-2 text-[var(--ruling)]">/</span>
                <span className="truncate text-[var(--ink-2)]">{workspaceLabel}</span>
              </>
            ) : null}
          </div>
          {headerRight}
        </div>
        <nav
          aria-label="Application"
          className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 md:px-6"
        >
          {nav.map((item) =>
            renderLink(
              item,
              cn(
                'whitespace-nowrap border-b-2 px-2 py-1.5 text-sm',
                item.active
                  ? 'border-[var(--ink)] text-[var(--ink)]'
                  : 'border-transparent text-[var(--ink-2)] hover:text-[var(--ink)]',
              ),
            ),
          )}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
