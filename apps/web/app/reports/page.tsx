'use client';

import { AppShell } from '../../components/AppShell';
import { useEnsureScan } from '../../components/useEnsureScan';
import { boardPackMarkdown, evidenceCsv } from '@marginshield/reports/text';

export default function ReportsPage() {
  const result = useEnsureScan();
  const download = (name: string, body: string, type: string) => {
    const blob = new Blob([body], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Reports</h1>
      <p className="mt-2 text-sm text-ink-2">
        Same engine figures as the dashboard. Run {result.run_hash.slice(0, 12)} · method {result.method_version}.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="bg-ink px-4 py-2 text-folio"
          onClick={() => download('board-pack.md', boardPackMarkdown(result), 'text/markdown')}
        >
          Board pack
        </button>
        <button
          type="button"
          className="border border-ink px-4 py-2"
          onClick={() => download('evidence-ledger.csv', evidenceCsv(result), 'text/csv')}
        >
          Evidence ledger
        </button>
      </div>
    </AppShell>
  );
}
