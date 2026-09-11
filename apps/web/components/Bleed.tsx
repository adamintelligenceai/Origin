'use client';

import { formatAud } from '@marginshield/ui';
import type { ScanResult } from '@marginshield/engine';

export function Bleed({ result }: { result: ScanResult }) {
  const detected = Number(result.headlines.detected_leakage);
  const modelled = Number(result.headlines.modelled_opportunity);
  const bankable = Number(result.headlines.bankable_base);
  const sales = Number(result.headlines.t12m_net_sales) || 1;
  const detectedPct = Math.max(4, (detected / sales) * 1000);
  const modelledPct = Math.max(4, (modelled / sales) * 1000);
  return (
    <section className="bg-folio p-6">
      <h2 className="font-display text-3xl">The Bleed</h2>
      <p className="mt-1 max-w-2xl text-sm text-ink-2">
        Revenue enters as a thick ink band. Detected leakage peels away as solid red. Modelled opportunity is hatched — it is
        not lost cash. Bankable base is outlined in green.
      </p>
      <div className="mt-8 space-y-3">
        <div className="h-10 bg-ink" title="T12M invoice revenue" />
        <div
          className="h-8 bg-red-ink"
          style={{ width: `${Math.min(100, detectedPct)}%` }}
          title="Detected leakage"
        />
        <div
          className="hatched h-8 border border-dashed border-red-ink"
          style={{ width: `${Math.min(100, modelledPct)}%` }}
          title="Modelled opportunity"
        />
        <div
          className="h-8 border-2 border-bank bg-transparent"
          style={{ width: `${Math.min(100, (bankable / sales) * 1000)}%` }}
          title="Bankable base"
        />
      </div>
      <dl className="mt-6 grid gap-4 text-sm md:grid-cols-3">
        <div>
          <dt className="text-ink-2">Detected leakage</dt>
          <dd className="font-display text-2xl">{formatAud(detected, true)}</dd>
        </div>
        <div>
          <dt className="text-ink-2">Modelled opportunity</dt>
          <dd className="font-display text-2xl">{formatAud(modelled, true)}</dd>
        </div>
        <div>
          <dt className="text-ink-2">Expected bankable — base</dt>
          <dd className="font-display text-2xl text-bank">{formatAud(bankable, true)}</dd>
        </div>
      </dl>
    </section>
  );
}
