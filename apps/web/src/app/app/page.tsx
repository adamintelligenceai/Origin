import { runHarbourlineDemo } from '@marginshield/engine';
import { formatAudDisplay } from '@/lib/utils';
import Link from 'next/link';

export const metadata = { title: 'Executive overview' };

export default function AppOverviewPage() {
  const { summary, findings } = runHarbourlineDemo();
  const detected = Number(summary.detectedLeakage);
  const modelled = Number(summary.modelledOpportunity);
  const addressable = Number(summary.totalAddressable);
  const bankableBase = Number(summary.bankableBase);
  const bankableLow = Number(summary.bankableLow);
  const bankableHigh = Number(summary.bankableHigh);
  const cash = Number(summary.cashClaimableNow);

  const byFamily = [
    { id: 'BUY', label: 'Buy', value: Number(summary.byFamily.buy) },
    { id: 'SERVE', label: 'Serve', value: Number(summary.byFamily.serve) },
    { id: 'SELL', label: 'Sell', value: Number(summary.byFamily.sell) },
  ];
  const maxFamily = Math.max(...byFamily.map((f) => f.value), 1);

  const actions = [...findings]
    .filter((f) => Number(f.allocatedValue) > 0)
    .sort((a, b) => Number(b.bankableBase) - Number(a.bankableBase))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-ledger">
      <div className="border-b border-ruling-soft bg-folio">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="text-sm">
            <span className="font-semibold">MarginShield</span>
            <span className="mx-2 text-ruling">/</span>
            <span className="text-ink-2">Harbourline Trade Supply · Demo</span>
          </div>
          <Link href="/demo" className="text-sm text-ink-2 hover:text-ink">
            Back to demo
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
            <p className="mt-1 text-sm text-ink-2">
              Period {summary.periodStart} → {summary.periodEnd} · Coverage{' '}
              {summary.economicCoverage}% · MII {summary.marginIntegrityIndex} · Sales tie-out{' '}
              {summary.salesTieOutConfirmed ? 'confirmed' : 'not confirmed'}
            </p>
          </div>
          <div className="font-mono text-xs text-ruling">run {summary.runHash.slice(0, 16)}</div>
        </div>

        <div className="mt-8 border border-ruling-soft bg-folio p-5">
          <div className="text-xs uppercase tracking-[0.16em] text-ruling">Primary equation</div>
          <div className="mt-3 flex flex-wrap items-baseline gap-2 font-mono text-lg tabular md:text-2xl">
            <span className="text-red-ink">{formatAudDisplay(detected)}</span>
            <span className="text-sm text-ruling">detected</span>
            <span className="text-ruling">+</span>
            <span className="text-red-ink/80">{formatAudDisplay(modelled)}</span>
            <span className="text-sm text-ruling">modelled</span>
            <span className="text-ruling">=</span>
            <span className="font-semibold">{formatAudDisplay(addressable)}</span>
            <span className="text-sm text-ruling">addressable</span>
          </div>
          <div className="mt-4 grid gap-3 border-t border-ruling-soft pt-4 md:grid-cols-3">
            <div>
              <div className="text-xs text-ruling">Expected bankable — base</div>
              <div className="mt-1 text-xl font-semibold text-bank tabular">
                {formatAudDisplay(bankableBase)}
              </div>
            </div>
            <div>
              <div className="text-xs text-ruling">Planning range</div>
              <div className="mt-1 text-xl font-semibold tabular">
                {formatAudDisplay(bankableLow)}–{formatAudDisplay(bankableHigh)}
              </div>
            </div>
            <div>
              <div className="text-xs text-ruling">Cash claimable now</div>
              <div className="mt-1 text-xl font-semibold tabular">{formatAudDisplay(cash)}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="border border-ruling-soft bg-folio p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ruling">
              The Bleed
            </h2>
            <p className="mt-2 text-sm text-ink-2">
              Revenue enters as an ink band. Detected leakage peels solid red; modelled opportunity
              is hatched — not the same thing as lost cash.
            </p>
            <div className="mt-6 space-y-3">
              <div className="h-8 bg-ink" title="Revenue band" />
              <div
                className="h-6 bg-red-ink"
                style={{ width: `${Math.max(8, (detected / addressable) * 100)}%` }}
                title="Detected leakage"
              />
              <div
                className="modelled-hatch h-6 border border-red-ink/40"
                style={{ width: `${Math.max(8, (modelled / addressable) * 100)}%` }}
                title="Modelled opportunity"
              />
              <div
                className="h-6 border-2 border-bank bg-transparent"
                style={{ width: `${Math.max(8, (bankableBase / addressable) * 100)}%` }}
                title="Bankable base"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-2">
              <span>
                <span className="mr-2 inline-block h-2 w-4 bg-red-ink" />
                Detected
              </span>
              <span>
                <span className="modelled-hatch mr-2 inline-block h-2 w-4 border border-red-ink/40" />
                Modelled
              </span>
              <span>
                <span className="mr-2 inline-block h-2 w-4 border-2 border-bank" />
                Bankable base
              </span>
            </div>
          </section>

          <section className="border border-ruling-soft bg-folio p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ruling">
              By family
            </h2>
            <div className="mt-4 space-y-3">
              {byFamily.map((f) => (
                <div key={f.id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{f.label}</span>
                    <span className="tabular">{formatAudDisplay(f.value)}</span>
                  </div>
                  <div className="h-2 bg-ruling-soft">
                    <div
                      className="h-2 bg-ink"
                      style={{ width: `${(f.value / maxFamily) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 border border-ruling-soft bg-folio">
          <div className="border-b border-ruling-soft px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ruling">
            Top five actions
          </div>
          <table className="w-full text-left text-sm">
            <thead className="text-ink-2">
              <tr className="border-b border-ruling-soft">
                <th className="px-5 py-3 font-medium">Check</th>
                <th className="px-5 py-3 font-medium">Why</th>
                <th className="px-5 py-3 font-medium text-right">Allocated</th>
                <th className="px-5 py-3 font-medium text-right">Bankable base</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((f) => (
                <tr key={f.findingId} className="ledger-row">
                  <td className="px-5 py-3 font-medium">{f.checkId}</td>
                  <td className="px-5 py-3 text-ink-2">{f.rootCause}</td>
                  <td className="px-5 py-3 text-right tabular">
                    {formatAudDisplay(Number(f.allocatedValue))}
                  </td>
                  <td className="px-5 py-3 text-right tabular text-bank">
                    {formatAudDisplay(Number(f.bankableBase))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <p className="mt-6 text-xs text-ruling">
          MarginShield is a commercial diagnostic based on client-supplied data, configured
          assumptions and the MarginShield methodology. It is not an audit, assurance engagement,
          valuation opinion or guarantee that identified opportunities will be realised. Demo figures
          use the Harbourline synthetic company.
        </p>
      </div>
    </div>
  );
}
