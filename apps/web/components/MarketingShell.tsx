import Link from 'next/link';
import type { ReactNode } from 'react';

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ledger text-ink">
      <header className="border-b border-ruling-soft">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
            MarginShield
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-ink-2 md:flex">
            <Link href="/method">Method</Link>
            <Link href="/checks">Checks</Link>
            <Link href="/privacy-by-design">Privacy</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
            <Link href="/demo" className="bg-ink px-3 py-1.5 text-folio">
              Run the demo scan
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-ruling-soft">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-ink-2 md:flex-row md:justify-between">
          <p>MarginShield by Evidence Room</p>
          <div className="flex gap-4">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/book">Book a Margin Scan</Link>
            <Link href="/sample-report">Sample report</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
