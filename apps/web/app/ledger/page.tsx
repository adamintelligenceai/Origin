'use client';

import { AppShell } from '../../components/AppShell';
import { useEnsureScan } from '../../components/useEnsureScan';
import { useScan } from '../../components/ScanProvider';
import { formatAud } from '@marginshield/ui';

export default function LedgerPage() {
  const result = useEnsureScan();
  const { selectFinding } = useScan();
  const rows = [...result.findings].sort((a, b) => Number(b.allocated_value) - Number(a.allocated_value));
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Leakage ledger</h1>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="ledger-rule">
            <th>ID</th>
            <th>Check</th>
            <th>Class</th>
            <th>Grade</th>
            <th className="text-right">Allocated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((f) => (
            <tr key={f.finding_id} className="ledger-rule">
              <td>
                <button type="button" className="underline" onClick={() => selectFinding(f)}>
                  {f.finding_id.slice(0, 12)}
                </button>
              </td>
              <td>{f.check_id}</td>
              <td>{f.value_class}</td>
              <td>{f.evidence_grade}</td>
              <td className="text-right tabular-nums">{formatAud(f.allocated_value)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="ledger-double">
            <td colSpan={4}>Addressable margin</td>
            <td className="text-right">{formatAud(result.headlines.addressable_margin)}</td>
          </tr>
        </tfoot>
      </table>
    </AppShell>
  );
}
