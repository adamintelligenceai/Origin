import Link from 'next/link';
import { formatAud } from '@marginshield/ui';
import { harbourlineDemoScan } from '../lib/harbourline';
import { MarketingShell } from '../components/MarketingShell';

export default function HomePage() {
  const result = harbourlineDemoScan();
  return (
    <MarketingShell>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm text-ink-2">Commercial margin control</p>
        <h1 className="mt-3 max-w-4xl font-display text-6xl leading-[0.95] md:text-7xl">
          Protect every point of margin.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-2">
          Find evidence-backed leakage and commercial margin opportunities across every customer and product—without
          replacing your ERP.
        </p>
        <p className="mt-4 text-sm">
          Transaction files are processed locally on your computer. Every finding is traceable to the source.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/demo" className="bg-ink px-5 py-3 text-folio">
            Run the demo scan
          </Link>
          <Link href="/book" className="border border-ink px-5 py-3">
            Book a Margin Scan
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-4xl">One number isn&apos;t enough.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <Metric label="Detected leakage" value={formatAud(result.headlines.detected_leakage, true)} hint="Document or policy-supported variance" />
          <Metric label="Modelled opportunity" value={formatAud(result.headlines.modelled_opportunity, true)} hint="No contractual entitlement" />
          <Metric label="Expected bankable — base" value={formatAud(result.headlines.bankable_base, true)} hint={`Planning range ${formatAud(result.headlines.bankable_low, true)}–${formatAud(result.headlines.bankable_high, true)}`} />
          <Metric label="Cash claimable now" value={formatAud(result.headlines.cash_claimable, true)} hint="Inside valid recovery windows" />
        </div>
        <p className="mt-6 text-sm text-ink-2">
          Live Harbourline engine output. Fictional demonstration company. Figures are not hard-coded.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-4xl">Revenue can grow while commercial economics quietly deteriorate.</h2>
        <p className="mt-4 max-w-2xl text-ink-2">
          Your ERP recorded every transaction. MarginShield shows the commercial relationship that changed.
        </p>
      </section>
    </MarketingShell>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="border border-ruling-soft bg-folio p-4">
      <div className="text-sm text-ink-2">{label}</div>
      <div className="font-display text-3xl">{value}</div>
      <div className="mt-2 text-xs text-ruling">{hint}</div>
    </div>
  );
}
