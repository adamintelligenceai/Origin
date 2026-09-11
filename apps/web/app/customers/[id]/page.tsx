'use client';

import { useParams } from 'next/navigation';
import { AppShell } from '../../../components/AppShell';
import { useEnsureScan } from '../../../components/useEnsureScan';
import { useScan } from '../../../components/ScanProvider';
import { formatAud } from '@marginshield/ui';
import { priceAction } from '@marginshield/engine';
import { defaultMethodConfig } from '@marginshield/engine';

export default function Customer360Page() {
  const { id } = useParams<{ id: string }>();
  const result = useEnsureScan();
  const { selectFinding } = useScan();
  const customer = result.customers.find((c) => c.customer_id === id);
  const findings = result.findings.filter((f) => f.customer_id === id);
  const sample = findings.find((f) => f.check_id === 'P3') ?? findings[0];
  const action = sample
    ? priceAction({
        finding_id: sample.finding_id,
        current_price: Number(sample.facts_json.current_price ?? 100),
        landed_cost: 80,
        target_margin: 0.25,
        t12m_quantity: 1000,
        risk_band: sample.risk_band,
        config: defaultMethodConfig(),
      })
    : null;
  if (!customer) {
    return (
      <AppShell>
        <p>Unknown customer.</p>
      </AppShell>
    );
  }
  return (
    <AppShell>
      <h1 className="font-display text-4xl">{customer.name}</h1>
      <p className="text-sm text-ink-2">
        Commercial risk indicator {customer.risk_band} ({customer.risk_score}) — not a probability the customer leaves.
      </p>
      <dl className="mt-6 grid gap-4 md:grid-cols-4">
        <div>Revenue {formatAud(customer.revenue, true)}</div>
        <div>Pocket contribution {formatAud(customer.pocket_contribution, true)}</div>
        <div>Detected {formatAud(customer.detected_leakage, true)}</div>
        <div>Modelled {formatAud(customer.modelled_opportunity, true)}</div>
      </dl>
      <h2 className="mt-8 font-display text-2xl">Scenario lab</h2>
      {action ? (
        <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
          <div>Current price {action.current_price}</div>
          <div>Guarded recommendation {action.guarded_price}</div>
          <div>Static-volume upside {formatAud(action.static_volume_upside)}</div>
          <div>Break-even volume decline {(action.maximum_volume_decline * 100).toFixed(1)}%</div>
          {action.exceeds_guardrail ? <div className="text-red-ink">Full restore exceeds the normal guardrail.</div> : null}
        </div>
      ) : (
        <p className="text-sm text-ink-2">No priced finding on this customer.</p>
      )}
      <ul className="mt-8 space-y-2 text-sm">
        {findings.map((f) => (
          <li key={f.finding_id}>
            <button type="button" className="underline" onClick={() => selectFinding(f)}>
              {f.check_id} {f.title} {formatAud(f.allocated_value, true)}
            </button>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
