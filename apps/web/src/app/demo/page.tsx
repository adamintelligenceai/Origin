import { runHarbourlineDemo } from '@marginshield/engine';
import { formatAudDisplay } from '@/lib/utils';
import Link from 'next/link';

export const metadata = {
  title: 'Demo scan',
};

export default function DemoPage() {
  const { summary, findings } = runHarbourlineDemo();
  const detected = Number(summary.detectedLeakage);
  const modelled = Number(summary.modelledOpportunity);
  const addressable = Number(summary.totalAddressable);
  const bankable = Number(summary.bankableBase);
  const cash = Number(summary.cashClaimableNow);

  const topFindings = [...findings]
    .filter((f) => f.valueClass !== 'OVERLAY' && f.valueClass !== 'INSIGHT')
    .sort((a, b) => Number(b.allocatedValue) - Number(a.allocatedValue))
    .slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-ruling">Fictional demonstration</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Harbourline Trade Supply</h1>
          <p className="mt-2 max-w-2xl text-ink-2">
            Synthetic distributor dataset. Every headline figure below is produced by the same
            MarginShield calculation engine used in the authenticated product — not hard-coded
            marketing numbers.
          </p>
        </div>
        <Link href="/app" className="border border-ink bg-ink px-4 py-2 text-sm text-folio">
          Open executive view
        </Link>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-4">
        <Metric
          label="Detected leakage"
          value={formatAudDisplay(detected)}
          hint="Document / policy supported"
          tone="detected"
        />
        <Metric
          label="Modelled opportunity"
          value={formatAudDisplay(modelled)}
          hint="Commercial optimisation"
          tone="modelled"
        />
        <Metric
          label="Addressable margin"
          value={formatAudDisplay(addressable)}
          hint="Detected + modelled"
        />
        <Metric
          label="Expected bankable — base"
          value={formatAudDisplay(bankable)}
          hint={`Cash claimable now ${formatAudDisplay(cash)}`}
          tone="bank"
        />
      </div>

      <div className="mt-4 text-sm text-ink-2">
        Economic coverage {summary.economicCoverage}% · Margin Integrity Index{' '}
        {summary.marginIntegrityIndex} · Run {summary.runHash.slice(0, 12)}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Equation</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3 border border-ruling-soft bg-folio p-5 font-mono text-sm tabular md:text-base">
          <span className="text-red-ink">{formatAudDisplay(detected)}</span>
          <span className="text-ruling">detected</span>
          <span>+</span>
          <span className="text-red-ink/80">{formatAudDisplay(modelled)}</span>
          <span className="text-ruling">modelled</span>
          <span>=</span>
          <span className="font-semibold">{formatAudDisplay(addressable)}</span>
          <span className="text-ruling">addressable</span>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Top findings</h2>
        <div className="mt-4 overflow-x-auto border border-ruling-soft bg-folio">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-ruling-soft text-ink-2">
              <tr>
                <th className="px-4 py-3 font-medium">Check</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Grade</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium text-right">Allocated</th>
              </tr>
            </thead>
            <tbody>
              {topFindings.map((f) => (
                <tr key={f.findingId} className="ledger-row">
                  <td className="px-4 py-3 font-medium">{f.checkId}</td>
                  <td className="px-4 py-3 text-ink-2">{f.valueClass.replaceAll('_', ' ')}</td>
                  <td className="px-4 py-3">{f.evidenceGrade}</td>
                  <td className="px-4 py-3">
                    {f.customerName ?? f.supplierId ?? '—'}
                    {f.sku ? ` · ${f.sku}` : ''}
                  </td>
                  <td className="px-4 py-3 text-right tabular">
                    {formatAudDisplay(Number(f.allocatedValue))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone?: 'detected' | 'modelled' | 'bank';
}) {
  const valueClass =
    tone === 'detected'
      ? 'text-red-ink'
      : tone === 'bank'
        ? 'text-bank'
        : tone === 'modelled'
          ? 'text-red-ink/80'
          : 'text-ink';
  return (
    <div className="border border-ruling-soft bg-folio p-4">
      <div className="text-xs uppercase tracking-[0.14em] text-ruling">{label}</div>
      <div className={`mt-2 text-2xl font-semibold tabular ${valueClass}`}>{value}</div>
      <div className="mt-1 text-xs text-ink-2">{hint}</div>
    </div>
  );
}
