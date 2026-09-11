'use client';

import { checkQuestion } from '@marginshield/engine';
import type { CheckId } from '@marginshield/schemas';
import { AppShell } from '../../../../components/AppShell';
import { useEnsureScan } from '../../../../components/useEnsureScan';
import { useScan } from '../../../../components/ScanProvider';
import { formatAud } from '@marginshield/ui';
import { useParams } from 'next/navigation';

export default function CheckDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id as CheckId;
  const result = useEnsureScan();
  const { selectFinding } = useScan();
  const findings = result.findings.filter((f) => f.check_id === id);
  const total = findings.reduce((a, f) => a + Number(f.allocated_value), 0);
  const sample = findings[0];
  return (
    <AppShell>
      <p className="text-sm text-ink-2">{id}</p>
      <h1 className="font-display text-4xl">{checkQuestion(id)}</h1>
      <dl className="mt-6 grid gap-3 text-sm md:grid-cols-3">
        <div>Value class · {sample?.value_class ?? '—'}</div>
        <div>Basis · {sample?.basis_class ?? '—'}</div>
        <div>Headline · {formatAud(total, true)}</div>
      </dl>
      <table className="mt-8 w-full text-left text-sm">
        <thead>
          <tr className="ledger-rule">
            <th>Finding</th>
            <th>Customer</th>
            <th>SKU</th>
            <th className="text-right">Allocated</th>
          </tr>
        </thead>
        <tbody>
          {findings.map((f) => (
            <tr key={f.finding_id} className="ledger-rule">
              <td>
                <button type="button" className="underline" onClick={() => selectFinding(f)}>
                  {f.title}
                </button>
              </td>
              <td>{f.customer_id}</td>
              <td>{f.sku ?? f.product_group}</td>
              <td className="text-right">{formatAud(f.allocated_value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppShell>
  );
}
