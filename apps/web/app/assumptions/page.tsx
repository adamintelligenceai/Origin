'use client';

import { AppShell } from '../../components/AppShell';
import { useEnsureScan } from '../../components/useEnsureScan';

export default function AssumptionsPage() {
  const result = useEnsureScan();
  const sample = result.findings.find((f) => f.check_id === 'P3');
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Assumptions</h1>
      <p className="mt-2 text-sm text-ink-2">Every methodology assumption is visible. Recalculation uses the same engine.</p>
      <dl className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between ledger-rule py-2">
          <dt>Method version</dt>
          <dd>{result.method_version}</dd>
        </div>
        <div className="flex justify-between ledger-rule py-2">
          <dt>P3 capture base</dt>
          <dd>{sample?.capture_base ?? 0.45}</dd>
        </div>
        <div className="flex justify-between ledger-rule py-2">
          <dt>Materiality</dt>
          <dd>A$250</dd>
        </div>
        <div className="flex justify-between ledger-rule py-2">
          <dt>Agreement tolerance</dt>
          <dd>0.5%</dd>
        </div>
      </dl>
    </AppShell>
  );
}
