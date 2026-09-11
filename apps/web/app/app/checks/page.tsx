'use client';

import Link from 'next/link';
import { checkQuestion } from '@marginshield/engine';
import type { CheckId } from '@marginshield/schemas';
import { AppShell } from '../../../components/AppShell';
import { useEnsureScan } from '../../../components/useEnsureScan';
import { formatAud } from '@marginshield/ui';

const CHECKS: CheckId[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'S1', 'S2', 'S3', 'B1', 'B2', 'B3'];

export default function AppChecksPage() {
  const result = useEnsureScan();
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Checks</h1>
      <ul className="mt-6 space-y-3">
        {CHECKS.map((id) => {
          const amount = result.findings
            .filter((f) => f.check_id === id)
            .reduce((a, f) => a + Number(f.allocated_value), 0);
          return (
            <li key={id} className="ledger-rule py-3">
              <Link href={`/app/checks/${id}`} className="flex justify-between gap-4">
                <span>
                  <strong>{id}</strong> {checkQuestion(id)}
                </span>
                <span className="tabular-nums">{formatAud(amount, true)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
