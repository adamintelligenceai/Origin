import type { ReactNode } from 'react';

export function MarketingShell({
  brand,
  attribution,
  nav,
  children,
  footer,
}: {
  brand: ReactNode;
  attribution?: ReactNode;
  nav?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="ms-ledger-bg min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
        <header className="flex items-baseline justify-between gap-4 border-b border-[var(--ruling-soft)] pb-6">
          <div>
            <div style={{ fontFamily: 'var(--font-display)' }}>{brand}</div>
            {attribution ? <div className="mt-1 text-sm text-[var(--ink-2)]">{attribution}</div> : null}
          </div>
          {nav}
        </header>
        <div className="flex-1 py-10">{children}</div>
        {footer ? (
          <footer className="border-t border-[var(--ruling-soft)] pt-6 text-sm text-[var(--ink-2)]">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}

export function AppShell({
  title,
  nav,
  children,
  aside,
}: {
  title: ReactNode;
  nav?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="ms-ledger-bg min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="ms-folio border border-[var(--ruling-soft)] p-4" style={{ borderRadius: 'var(--radius-sm)' }}>
          <div className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            {title}
          </div>
          <div className="mt-4">{nav}</div>
        </aside>
        <main className="space-y-6">
          {aside}
          {children}
        </main>
      </div>
    </div>
  );
}
