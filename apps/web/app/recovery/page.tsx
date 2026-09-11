'use client';

import { AppShell } from '../../components/AppShell';
import { useEnsureScan } from '../../components/useEnsureScan';
import { useScan } from '../../components/ScanProvider';
import { formatAud } from '@marginshield/ui';
import type { Finding } from '@marginshield/engine';

const STATUSES: Finding['status'][] = [
  'DETECTED',
  'REVIEWED',
  'VERIFIED',
  'REJECTED',
  'ACTION_PLANNED',
  'IMPLEMENTED',
  'REALIZED',
  'CLOSED',
];

export default function RecoveryPage() {
  const result = useEnsureScan();
  const { recovery, addToRecovery, updateRecovery, selectFinding } = useScan();
  const rows = recovery
    .map((entry) => ({ entry, finding: result.findings.find((f) => f.finding_id === entry.finding_id) }))
    .filter((row): row is { entry: (typeof recovery)[number]; finding: Finding } => Boolean(row.finding));
  const available = result.findings.filter((f) => f.root_cause && !recovery.some((r) => r.finding_id === f.finding_id));
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Recovery plan</h1>
      <p className="mt-2 text-sm text-ink-2">
        Status starts at Detected. Realized requires explicit confirmation — never automatic.
      </p>
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
          {rows.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-4 text-ink-2">
                No actions in the plan yet. Add a finding from evidence or the list below.
              </td>
            </tr>
          ) : null}
          {rows.map(({ entry, finding }) => (
            <tr key={entry.finding_id} className="ledger-rule">
              <td>
                <button type="button" className="underline" onClick={() => selectFinding(finding)}>
                  {finding.title}
                </button>
              </td>
              <td>
                <input
                  className="w-32 border border-ruling-soft bg-folio px-2 py-1"
                  value={entry.owner}
                  onChange={(e) => updateRecovery(entry.finding_id, { owner: e.target.value })}
                />
              </td>
              <td>
                <select
                  className="border border-ink bg-folio px-2 py-1"
                  value={entry.status}
                  onChange={(e) => {
                    const status = e.target.value as Finding['status'];
                    if (status === 'REALIZED' && !entry.realized_confirmed) return;
                    updateRecovery(entry.finding_id, { status });
                  }}
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status} disabled={status === 'REALIZED' && !entry.realized_confirmed}>
                      {status}
                    </option>
                  ))}
                </select>
                <label className="ml-2 text-xs">
                  <input
                    type="checkbox"
                    checked={entry.realized_confirmed}
                    onChange={(e) => updateRecovery(entry.finding_id, { realized_confirmed: e.target.checked })}
                  />{' '}
                  confirm realized
                </label>
              </td>
              <td className="text-right">{formatAud(finding.allocated_value, true)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mt-10 font-display text-2xl">Detected actions not yet in plan</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {available.slice(0, 12).map((finding) => (
          <li key={finding.finding_id} className="flex justify-between gap-3 ledger-rule py-2">
            <span>
              {finding.check_id} · {finding.title}
            </span>
            <button type="button" className="underline" onClick={() => addToRecovery(finding)}>
              Add
            </button>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
