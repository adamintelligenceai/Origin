'use client';

import { AppShell } from '../../components/AppShell';
import { Bleed } from '../../components/Bleed';
import { useEnsureScan } from '../../components/useEnsureScan';
import { formatAud } from '@marginshield/ui';
import { useScan } from '../../components/ScanProvider';
import Link from 'next/link';

export default function OverviewPage() {
  const result = useEnsureScan();
  const { selectFinding } = useScan();
  const top = [...result.findings]
    .filter((f) => f.root_cause)
    .sort((a, b) => Number(b.allocated_value) - Number(a.allocated_value))
    .slice(0, 5);
  return (
    <AppShell>
      <p className="text-sm text-ink-2">
        {result.period.t12m_start} → {result.period.t12m_end} · run {result.run_hash.slice(0, 12)} · coverage{' '}
        {result.headlines.coverage}% · {result.sales_tieout_confirmed ? 'tie-out confirmed' : 'Sales tie-out not confirmed'}
      </p>
      <div className="mt-6 flex flex-wrap items-end gap-6">
        <Eq n={formatAud(result.headlines.detected_leakage, true)} l="Detected leakage" />
        <span className="font-display text-4xl">+</span>
        <Eq n={formatAud(result.headlines.modelled_opportunity, true)} l="Modelled opportunity" />
        <span className="font-display text-4xl">=</span>
        <Eq n={formatAud(result.headlines.addressable_margin, true)} l="Addressable margin" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <div className="text-sm text-ink-2">Expected bankable — base</div>
          <div className="font-display text-3xl text-bank">{formatAud(result.headlines.bankable_base, true)}</div>
          <div className="text-sm">
            Planning range {formatAud(result.headlines.bankable_low, true)}–{formatAud(result.headlines.bankable_high, true)}
          </div>
          <p className="mt-1 text-xs text-ink-2">Initial MarginShield assumption. Confirm with management.</p>
        </div>
        <div>
          <div className="text-sm text-ink-2">Cash claimable now</div>
          <div className="font-display text-3xl">{formatAud(result.headlines.cash_claimable, true)}</div>
        </div>
        <div>
          <div className="text-sm text-ink-2">Margin Integrity Index</div>
          <div className="font-display text-3xl">{result.headlines.mii}</div>
          <p className="text-xs text-ink-2">
            MarginShield&apos;s internal trend index. Designed to compare this organisation with itself over time, not with
            external companies.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <Bleed result={result} />
      </div>
      <h2 className="mt-10 font-display text-2xl">Top five actions</h2>
      <table className="mt-3 w-full text-left text-sm">
        <thead>
          <tr className="ledger-rule">
            <th>Check</th>
            <th>Finding</th>
            <th>Class</th>
            <th className="text-right">Allocated</th>
          </tr>
        </thead>
        <tbody>
          {top.map((f) => (
            <tr key={f.finding_id} className="ledger-rule">
              <td>{f.check_id}</td>
              <td>
                <button type="button" className="underline" onClick={() => selectFinding(f)}>
                  {f.title}
                </button>
              </td>
              <td>{f.value_class.replaceAll('_', ' ').toLowerCase()}</td>
              <td className="text-right tabular-nums">{formatAud(f.allocated_value, true)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 text-sm">
        <Link href="/app/checks/P3" className="underline">
          Open P3 cost pass-through
        </Link>
      </p>
    </AppShell>
  );
}

function Eq({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-5xl">{n}</div>
      <div className="text-sm text-ink-2">{l}</div>
    </div>
  );
}
