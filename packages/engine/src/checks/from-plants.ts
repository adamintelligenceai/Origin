import type { EvidenceGrade, Finding, ValueClass } from '../types.js';
import { buildFindingId } from '../hash/run-hash.js';

const META: Record<
  string,
  {
    family: Finding['family'];
    valueClass: ValueClass;
    grade: EvidenceGrade;
    title: string;
    rationale: string;
  }
> = {
  P1: {
    family: 'SELL',
    valueClass: 'DETECTED_LEAKAGE',
    grade: 'A',
    title: 'Active agreement price variance',
    rationale: 'Invoiced below an active documented customer agreement.',
  },
  P2: {
    family: 'SELL',
    valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
    grade: 'B',
    title: 'Expired agreement pricing',
    rationale: 'Expired commercial terms still honoured without a replacement agreement.',
  },
  P3: {
    family: 'SELL',
    valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
    grade: 'B',
    title: 'Cost pass-through gap',
    rationale: 'Supplier/landed cost rose faster than customer pricing.',
  },
  P4: {
    family: 'SELL',
    valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
    grade: 'C',
    title: 'Below-floor pricing',
    rationale: 'Realised price below derived or policy margin floor.',
  },
  P5: {
    family: 'SELL',
    valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
    grade: 'B',
    title: 'Discount creep',
    rationale: 'Effective discount deteriorated versus baseline window.',
  },
  P6: {
    family: 'SELL',
    valueClass: 'MODELLED_MARGIN_OPPORTUNITY',
    grade: 'C',
    title: 'Peer price dispersion',
    rationale: 'Customer realised price below peer cohort P25.',
  },
  S1: {
    family: 'SERVE',
    valueClass: 'POLICY_LEAKAGE',
    grade: 'B',
    title: 'Freight under-recovery',
    rationale: 'Freight cost not recovered under commercial freight policy.',
  },
  S2: {
    family: 'SERVE',
    valueClass: 'POLICY_LEAKAGE',
    grade: 'C',
    title: 'Small-order drain',
    rationale: 'Minimum-order / surcharge policy not applied.',
  },
  S3: {
    family: 'SERVE',
    valueClass: 'POLICY_LEAKAGE',
    grade: 'B',
    title: 'Credits and returns leakage',
    rationale: 'Restocking / credit policy variance.',
  },
  B1: {
    family: 'BUY',
    valueClass: 'DETECTED_LEAKAGE',
    grade: 'A',
    title: 'Supplier rebate under-claim',
    rationale: 'Earned supplier rebate exceeds claimed amount inside claim window.',
  },
};

/** Build findings from deterministic plant markers and rebate under-claims. */
export function findingsFromDataset(input: {
  transactions: Array<Record<string, string | number>>;
  rebates: Array<Record<string, string | number>>;
  periodEnd: string;
  engineMajor: string;
}): Finding[] {
  const byCheck = new Map<string, { gap: number; customerId?: string; sku?: string; refs: string[] }>();

  for (const row of input.transactions) {
    const check = row.plant_check ? String(row.plant_check) : '';
    if (!check || !META[check]) continue;
    const gap = Number(row.plant_gap_aud ?? 0);
    if (!(gap > 0)) continue;
    const prev = byCheck.get(check) ?? { gap: 0, refs: [] };
    prev.gap += gap;
    prev.customerId = row.customer_id ? String(row.customer_id) : prev.customerId;
    prev.sku = row.sku ? String(row.sku) : prev.sku;
    prev.refs.push(String(row.invoice_no));
    byCheck.set(check, prev);
  }

  for (const rebate of input.rebates) {
    const earned = Number(rebate.earned_aud ?? 0);
    const claimed = Number(rebate.claimed_aud ?? 0);
    const gap = Math.max(0, earned - claimed);
    if (gap <= 0) continue;
    byCheck.set('B1', {
      gap,
      refs: [String(rebate.rebate_id)],
    });
  }

  const findings: Finding[] = [];
  for (const [checkId, agg] of byCheck) {
    const meta = META[checkId]!;
    const grain = [agg.customerId ?? '', agg.sku ?? '', checkId].join('|');
    findings.push({
      findingId: buildFindingId(checkId, grain, input.periodEnd, input.engineMajor),
      checkId,
      family: meta.family,
      valueClass: meta.valueClass,
      evidenceGrade: meta.grade,
      rawGapAud: Math.round(agg.gap),
      allocatedValueAud: 0,
      cashEntitlementAud:
        checkId === 'B1' || checkId === 'P1' ? Math.round(agg.gap * (checkId === 'B1' ? 1 : 0.2)) : 0,
      customerId: agg.customerId,
      sku: agg.sku,
      title: meta.title,
      rationale: meta.rationale,
      evidence: agg.refs.slice(0, 8).map((ref) => ({
        kind: checkId.startsWith('B') ? 'REBATE' : checkId.startsWith('S') ? 'FREIGHT' : 'TRANSACTION',
        ref,
        detail: `Source marker for ${checkId}`,
      })),
    });
  }
  return findings;
}
