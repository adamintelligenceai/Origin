'use client';

import { AppShell } from '../../components/AppShell';
import { useEnsureScan } from '../../components/useEnsureScan';
import { formatAud } from '@marginshield/ui';

export default function RecoveryPage() {
  const result = useEnsureScan();
  const proposed = result.findings.filter((f) => f.root_cause).slice(0, 12);
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Recovery plan</h1>
      <p className="mt-2 text-sm text-ink-2">Status starts at Detected. Realized requires confirmation — never automatic.</p>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="ledger-rule">
            <th>Finding</th>
            <th>Owner</th>
            <th>Status</th>
            <th className="text-right">Value</th>
          </tr>
        </thead>
        <tbody>
          {proposed.map((f) => (
            <tr key={f.finding_id} className="ledger-rule">
              <td>{f.title}</td>
              <td>—</td>
              <td>{f.status}</td>
              <td className="text-right">{formatAud(f.allocated_value, true)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppShell>
  );
}
