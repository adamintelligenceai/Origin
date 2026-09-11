import type { EvidenceGrade, Finding, ValueClass } from '../types.js';
import { buildFindingId } from '../hash/run-hash.js';

type Row = Record<string, string | number>;

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
  B1: {
    family: 'BUY',
    valueClass: 'DETECTED_LEAKAGE',
    grade: 'A',
    title: 'Supplier rebate under-claim',
    rationale: 'Earned supplier rebate exceeds claimed amount inside claim window.',
  },
};

function money(n: number): number {
  return Math.round(n);
}

export function findingsFromEconomics(input: {
  transactions: Row[];
  agreements?: Row[];
  rebates?: Row[];
  periodEnd: string;
  engineMajor: string;
}): Finding[] {
  const findings: Finding[] = [];
  const agreements = input.agreements ?? [];
  const rebates = input.rebates ?? [];

  for (const agr of agreements) {
    const validFrom = String(agr.valid_from ?? '');
    const validTo = String(agr.valid_to ?? '9999-12-31');
    const agreed = Number(agr.agreed_price ?? 0);
    if (!(agreed > 0)) continue;
    const customerId = String(agr.customer_id ?? '');
    const sku = String(agr.sku ?? '');
    let gap = 0;
    const refs: string[] = [];
    for (const tx of input.transactions) {
      if (String(tx.customer_id) !== customerId || String(tx.sku) !== sku) continue;
      const d = String(tx.invoice_date ?? '');
      if (d < validFrom || d > validTo) continue;
      const unit = Number(tx.unit_price ?? 0);
      const qty = Number(tx.qty ?? 0);
      const lineGap = Math.max(0, (agreed - unit) * qty);
      if (lineGap > 0) {
        gap += lineGap;
        refs.push(String(tx.invoice_no ?? ''));
      }
    }
    if (gap >= 250) {
      const meta = META.P1!;
      findings.push({
        findingId: buildFindingId('P1', `${customerId}|${sku}`, input.periodEnd, input.engineMajor),
        checkId: 'P1',
        family: meta.family,
        valueClass: meta.valueClass,
        evidenceGrade: meta.grade,
        rawGapAud: money(gap),
        allocatedValueAud: 0,
        cashEntitlementAud: money(gap * 0.2),
        customerId,
        sku,
        title: meta.title,
        rationale: meta.rationale,
        evidence: refs.slice(0, 8).map((ref) => ({
          kind: 'TRANSACTION',
          ref,
          detail: 'Priced below active agreement',
        })),
      });
    }
  }

  for (const agr of agreements) {
    const validTo = String(agr.valid_to ?? '');
    if (!validTo || validTo >= input.periodEnd) continue;
    const agreed = Number(agr.agreed_price ?? 0);
    const customerId = String(agr.customer_id ?? '');
    const sku = String(agr.sku ?? '');
    const hasSuccessor = agreements.some(
      (a) =>
        String(a.customer_id) === customerId &&
        String(a.sku) === sku &&
        String(a.valid_from ?? '') > validTo,
    );
    if (hasSuccessor) continue;
    let gap = 0;
    const refs: string[] = [];
    for (const tx of input.transactions) {
      if (String(tx.customer_id) !== customerId || String(tx.sku) !== sku) continue;
      const d = String(tx.invoice_date ?? '');
      if (d <= validTo) continue;
      const unit = Number(tx.unit_price ?? 0);
      const qty = Number(tx.qty ?? 0);
      const restore = Number(tx.list_price ?? agreed);
      if (Math.abs(unit - agreed) / Math.max(agreed, 0.01) <= 0.03 && restore > unit) {
        const g = Math.max(0, (restore - unit) * qty);
        if (g > 0) {
          gap += g;
          refs.push(String(tx.invoice_no ?? ''));
        }
      }
    }
    if (gap >= 250) {
      const meta = META.P2!;
      findings.push({
        findingId: buildFindingId('P2', `${customerId}|${sku}`, input.periodEnd, input.engineMajor),
        checkId: 'P2',
        family: meta.family,
        valueClass: meta.valueClass,
        evidenceGrade: meta.grade,
        rawGapAud: money(gap),
        allocatedValueAud: 0,
        cashEntitlementAud: 0,
        customerId,
        sku,
        title: meta.title,
        rationale: meta.rationale,
        evidence: refs.slice(0, 8).map((ref) => ({
          kind: 'TRANSACTION',
          ref,
          detail: 'Expired agreement price still realised',
        })),
      });
    }
  }

  for (const rebate of rebates) {
    const earned = Number(rebate.earned_aud ?? 0);
    const claimed = Number(rebate.claimed_aud ?? 0);
    const gap = Math.max(0, earned - claimed);
    if (gap < 250) continue;
    const meta = META.B1!;
    const rebateId = String(rebate.rebate_id ?? 'REBATE');
    findings.push({
      findingId: buildFindingId('B1', rebateId, input.periodEnd, input.engineMajor),
      checkId: 'B1',
      family: meta.family,
      valueClass: meta.valueClass,
      evidenceGrade: meta.grade,
      rawGapAud: money(gap),
      allocatedValueAud: 0,
      cashEntitlementAud: money(gap),
      title: meta.title,
      rationale: meta.rationale,
      evidence: [
        {
          kind: 'REBATE',
          ref: rebateId,
          detail: `Earned ${earned} vs claimed ${claimed}`,
        },
      ],
    });
  }

  return findings;
}
