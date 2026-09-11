import Link from 'next/link';
import { formatAud } from '@marginshield/ui';
import { harbourlineDemoScan } from '../lib/harbourline';
import { MarketingShell } from '../components/MarketingShell';

const STEPS = [
  'Upload',
  'Map',
  'Reconcile',
  'Calculate',
  'Detect',
  'Evidence',
  'Model',
  'Prioritise',
  'Act',
  'Report',
];

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
        <h2 className="font-display text-4xl">How a scan runs</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-5">
          {STEPS.map((step, i) => (
            <li key={step} className="border border-ruling-soft bg-folio p-3">
              <div className="text-xs text-ink-2">{String(i + 1).padStart(2, '0')}</div>
              <div className="font-display text-2xl">{step}</div>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-4xl">Revenue can grow while commercial economics quietly deteriorate.</h2>
        <p className="mt-4 max-w-2xl text-ink-2">
          Your ERP recorded every transaction. MarginShield shows the commercial relationship that changed — cost shocks
          not passed through, expired terms still honoured, freight under-recovered, rebates left unclaimed.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-4xl">Files stay on the machine that opened them.</h2>
        <p className="mt-4 max-w-2xl text-ink-2">
          Mapping, reconstruction and detection run in the browser. Optional AI commentary uses aggregate fact tokens,
          never raw invoice rows. Encrypted `.msproj` bundles stay local unless you choose to move them.
        </p>
        <Link href="/privacy-by-design" className="mt-4 inline-block underline">
          Privacy by design
        </Link>
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
