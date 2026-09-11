import Link from 'next/link';
import { COMMERCIAL } from '@/config/commercial';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-folio">
      <header className="border-b border-ruling-soft bg-ledger/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">MarginShield</p>
            <p className="text-sm text-ink-2">by Evidence Room</p>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-ink-2">
            <Link href="/method" className="hover:text-ink">Method</Link>
            <Link href="/pricing" className="hover:text-ink">Pricing</Link>
            <Link href="/demo" className="hover:text-ink">Demo</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-ruling">
          Commercial margin control
        </p>
        <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight text-ink md:text-6xl">
          Protect every point of margin.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-2">
          Find evidence-backed leakage and commercial margin opportunities across every customer and
          product—without replacing your ERP.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-ink-2">
          Your transaction files are processed on your computer, not uploaded to ours.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/demo"
            className="rounded-md bg-ink px-6 py-3 text-sm font-semibold text-folio hover:bg-ink-2"
          >
            Run the demo scan
          </Link>
          <Link
            href="/book"
            className="rounded-md border border-ruling px-6 py-3 text-sm font-semibold text-ink hover:bg-ledger"
          >
            Book a Margin Scan
          </Link>
        </div>

        <section className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-ruling-soft bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-ink">Detected leakage</h2>
            <p className="mt-2 text-sm text-ink-2">
              Document or policy-supported variance with traceable source evidence.
            </p>
          </div>
          <div className="rounded-lg border border-ruling-soft bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-ink">Modelled opportunity</h2>
            <p className="mt-2 text-sm text-ink-2">
              Commercial optimisation without contractual entitlement—never called guaranteed savings.
            </p>
          </div>
          <div className="rounded-lg border border-ruling-soft bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-ink">Expected bankable</h2>
            <p className="mt-2 text-sm text-ink-2">
              Assumption-driven planning range, not a statistically validated probability.
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-lg border border-ruling-soft bg-ledger/40 p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">Margin Leakage Scan</h2>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-ink">
            A${COMMERCIAL.marginLeakageScan.aud.toLocaleString('en-AU')}
          </p>
          <p className="mt-2 text-sm text-ink-2">{COMMERCIAL.marginLeakageScan.description}</p>
        </section>
      </main>

      <footer className="border-t border-ruling-soft py-8 text-center text-sm text-ink-2">
        MarginShield by Evidence Room
      </footer>
    </div>
  );
}
