'use client';

import { formatAud, formatFact, VALUE_CLASS_LABEL } from '@marginshield/ui';
import Link from 'next/link';
import { useScan } from './ScanProvider';

export function EvidenceDrawer() {
  const { selectedFinding, selectFinding, result, addToRecovery, recovery } = useScan();
  if (!selectedFinding) return null;
  const evidence = result?.evidence.filter((row) => row.finding_id === selectedFinding.finding_id) ?? [];
  const facts = selectedFinding.facts_json;
  const inPlan = recovery.some((row) => row.finding_id === selectedFinding.finding_id);
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-ink/40">
      <aside className="h-full w-full max-w-lg overflow-y-auto bg-folio p-6 shadow-xl">
        <button type="button" className="text-sm text-ink-2" onClick={() => selectFinding(null)}>
          Close
        </button>
        <p className="mt-4 text-sm text-ink-2">{selectedFinding.finding_id}</p>
        <h2 className="font-display text-3xl">{selectedFinding.title}</h2>
        <p className="mt-2 text-sm">
          {VALUE_CLASS_LABEL[selectedFinding.value_class]} · Grade {selectedFinding.evidence_grade} ·{' '}
          {selectedFinding.basis_class}
        </p>
        <p className="mt-4 font-display text-4xl">{formatAud(selectedFinding.allocated_value, true)}</p>
        <h3 className="mt-8 font-display text-xl">Why this was flagged</h3>
        <dl className="mt-3 space-y-1 text-sm">
          {Object.entries(facts).map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4 ledger-rule py-1">
              <dt className="text-ink-2">{key.replaceAll('_', ' ')}</dt>
              <dd className="tabular-nums">{formatFact(key, value)}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-8 font-display text-xl">Source records</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {evidence.map((row, i) => (
            <li key={`${row.record_id}-${i}`} className="border border-ruling-soft p-3">
              <div className="text-ink-2">
                {row.evidence_kind} · {row.role}
              </div>
              <div>{row.value_display}</div>
              <div className="text-xs text-ruling">
                {row.source_file} {row.source_row ? `row ${row.source_row}` : ''}
              </div>
            </li>
          ))}
        </ul>
        {inPlan ? (
          <p className="mt-8 text-sm">
            In recovery plan.{' '}
            <Link href="/recovery" className="underline">
              Open plan
            </Link>
          </p>
        ) : (
          <button
            type="button"
            className="mt-8 bg-ink px-4 py-2 text-folio"
            onClick={() => addToRecovery(selectedFinding)}
          >
            Add to recovery plan
          </button>
        )}
      </aside>
    </div>
  );
}
