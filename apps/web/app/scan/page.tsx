'use client';

import { AppShell } from '../../components/AppShell';
import { useScan } from '../../components/ScanProvider';
import Link from 'next/link';

export default function ScanPage() {
  const { loadDemo, scanning, result } = useScan();
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Scans</h1>
      <ol className="mt-6 space-y-2 text-sm">
        <li>1. Files — CSV or XLSX only. Macro workbooks are rejected.</li>
        <li>2. Mapping — synonyms first, confirmation for net sales / cost / freight / rebate.</li>
        <li>3. Data health — coverage, duplicates, currency, history.</li>
        <li>4. Tie-out — confirm T12M sales agree to source reporting.</li>
      </ol>
      <div className="mt-8 flex gap-3">
        <button type="button" className="bg-ink px-4 py-2 text-folio" onClick={loadDemo} disabled={scanning}>
          {scanning ? 'Scanning…' : 'Load Harbourline messy demo'}
        </button>
        {result ? (
          <Link href="/overview" className="border border-ink px-4 py-2">
            Open overview
          </Link>
        ) : null}
      </div>
    </AppShell>
  );
}
