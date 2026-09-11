import Link from 'next/link';
import { COMMERCIAL } from '../config/commercial';

export default function HomePage() {
  return (
    <main className="ms-ledger-bg min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
        <header className="flex items-baseline justify-between gap-4 border-b border-[var(--ruling-soft)] pb-6">
          <div>
            <p className="text-3xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              MarginShield
            </p>
            <p className="mt-1 text-sm text-[var(--ink-2)]">by Evidence Room</p>
          </div>
          <nav className="flex gap-4 text-sm text-[var(--ink-2)]">
            <Link href="/method">Method</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/demo">Demo</Link>
          </nav>
        </header>

        <section className="flex flex-1 flex-col justify-center gap-8 py-16">
          <h1
            className="max-w-3xl text-5xl leading-tight md:text-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Protect every point of margin.
          </h1>
          <p className="max-w-2xl text-lg text-[var(--ink-2)]">
            Find evidence-backed leakage and commercial margin opportunities across every customer
            and product—without replacing your ERP.
          </p>
          <p className="text-sm text-[var(--ink-2)]">
            Transaction files are processed locally on your computer. Every finding is traceable to
            the source.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="rounded-sm bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--folio)]"
            >
              Run the demo scan
            </Link>
            <Link
              href="/book"
              className="rounded-sm border border-[var(--ruling)] px-5 py-3 text-sm font-medium text-[var(--ink)]"
            >
              Book a Margin Scan
            </Link>
          </div>
        </section>

        <footer className="border-t border-[var(--ruling-soft)] pt-6 text-sm text-[var(--ink-2)]">
          <p>
            Margin Leakage Scan from {COMMERCIAL.currency}
            {COMMERCIAL.marginLeakageScanAud.toLocaleString('en-AU')} · Margin Monitor from{' '}
            {COMMERCIAL.currency}
            {COMMERCIAL.marginMonitorMonthlyAud.toLocaleString('en-AU')}/month
          </p>
          <p className="mt-2">MarginShield by Evidence Room</p>
        </footer>
      </div>
    </main>
  );
}
