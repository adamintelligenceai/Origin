'use client';

import { AppShell } from '../../components/AppShell';
import { useEnsureScan } from '../../components/useEnsureScan';
import { useScan } from '../../components/ScanProvider';
import { defaultMethodConfig, type MethodConfig } from '@marginshield/engine';
import { formatPct } from '@marginshield/ui';
import { useState } from 'react';

export default function AssumptionsPage() {
  useEnsureScan();
  const { methodConfig, recalculate, dataset } = useScan();
  const [draft, setDraft] = useState<MethodConfig>(methodConfig);
  const update = <K extends keyof MethodConfig>(key: K, value: MethodConfig[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Assumptions</h1>
      <p className="mt-2 text-sm text-ink-2">
        Every methodology assumption is visible. Recalculation uses the same engine
        {dataset ? ' on the loaded dataset' : ''}.
      </p>
      <form
        className="mt-6 max-w-xl space-y-4 text-sm"
        onSubmit={(event) => {
          event.preventDefault();
          recalculate(draft);
        }}
      >
        <label className="flex justify-between ledger-rule py-2">
          Materiality (A$)
          <input
            type="number"
            className="w-32 border border-ink bg-folio px-2 py-1 text-right"
            value={draft.materiality_absolute}
            onChange={(e) => update('materiality_absolute', Number(e.target.value))}
          />
        </label>
        <label className="flex justify-between ledger-rule py-2">
          Agreement tolerance
          <input
            type="number"
            step="0.001"
            className="w-32 border border-ink bg-folio px-2 py-1 text-right"
            value={draft.agreement_tolerance}
            onChange={(e) => update('agreement_tolerance', Number(e.target.value))}
          />
        </label>
        <label className="flex justify-between ledger-rule py-2">
          P3 material cost increase
          <input
            type="number"
            step="0.01"
            className="w-32 border border-ink bg-folio px-2 py-1 text-right"
            value={draft.p3_material_cost_increase}
            onChange={(e) => update('p3_material_cost_increase', Number(e.target.value))}
          />
        </label>
        <label className="flex justify-between ledger-rule py-2">
          P3 pass-through gap
          <input
            type="number"
            step="0.01"
            className="w-32 border border-ink bg-folio px-2 py-1 text-right"
            value={draft.p3_pass_through_gap}
            onChange={(e) => update('p3_pass_through_gap', Number(e.target.value))}
          />
        </label>
        <label className="flex justify-between ledger-rule py-2">
          P3 capture base
          <input
            type="number"
            step="0.05"
            min={0}
            max={1}
            className="w-32 border border-ink bg-folio px-2 py-1 text-right"
            value={draft.capture.P3.base}
            onChange={(e) => {
              const base = Number(e.target.value);
              setDraft((prev) => ({
                ...prev,
                capture: {
                  ...prev.capture,
                  P3: { low: Math.round(base * 0.7 * 1000) / 1000, base, high: Math.min(1, Math.round(base * 1.3 * 1000) / 1000) },
                },
              }));
            }}
          />
        </label>
        <label className="flex items-center justify-between ledger-rule py-2">
          P1 back-billing enabled
          <input
            type="checkbox"
            checked={draft.p1_back_billing_enabled}
            onChange={(e) => update('p1_back_billing_enabled', e.target.checked)}
          />
        </label>
        <p className="text-ink-2">Current P3 capture {formatPct(methodConfig.capture.P3.base)}.</p>
        <div className="flex gap-3">
          <button type="submit" className="bg-ink px-4 py-2 text-folio" disabled={!dataset}>
            Recalculate
          </button>
          <button
            type="button"
            className="border border-ink px-4 py-2"
            onClick={() => {
              const next = defaultMethodConfig();
              setDraft(next);
              recalculate(next);
            }}
          >
            Reset defaults
          </button>
        </div>
      </form>
    </AppShell>
  );
}
