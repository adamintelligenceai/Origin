import { d, max0, money, zero } from '../money';
import type { CanonicalDataset, FindingDraft, LineEconomics } from '../types';

function material(dataset: CanonicalDataset, amount: ReturnType<typeof money>): boolean {
  return amount.toNumber() >= dataset.method_config.materiality_absolute;
}

export function runServeChecks(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  return [...s1(dataset, lines), ...s2(dataset, lines), ...s3(dataset, lines)].filter(
    (f) => f.value_class === 'INSIGHT' || material(dataset, f.raw_gap),
  );
}

function s1(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const policy = dataset.commercial_policies.find((p) => p.kind === 'FREIGHT');
  const t12m = lines.filter((l) => l.in_t12m);
  if (!policy) {
    const cost = t12m.reduce((a, l) => a.plus(money(l.transaction.freight_cost)), zero());
    if (cost.lte(0)) return [];
    return [
      {
        check_id: 'S1',
        family: 'SERVE',
        value_class: 'INSIGHT',
        basis_class: 'MODELLED',
        evidence_grade: 'C',
        grain_key: 'S1|freight_cost_to_serve',
        raw_gap: zero(),
        title: 'Outbound freight cost-to-serve (no charge policy)',
        facts: { freight_cost: cost.toFixed(4) },
        evidence: [
          {
            evidence_kind: 'CALCULATION',
            value_display: `freight cost ${cost.toFixed(4)} with no recoverable policy`,
            role: 'cost_to_serve',
          },
        ],
      },
    ];
  }
  const groups = new Map<string, LineEconomics[]>();
  for (const line of t12m) {
    const key = line.transaction.invoice_no;
    const list = groups.get(key) ?? [];
    list.push(line);
    groups.set(key, list);
  }
  const out: FindingDraft[] = [];
  let total = zero();
  const evidence: FindingDraft['evidence'] = [];
  for (const [invoice, group] of groups) {
    const revenue = group.reduce((a, l) => a.plus(l.invoice_revenue), zero());
    const charged = group.reduce((a, l) => a.plus(money(l.transaction.freight_charged)), zero());
    const cost = group.reduce((a, l) => a.plus(money(l.transaction.freight_cost)), zero());
    const freeAbove = policy.freight_free_above ? money(policy.freight_free_above) : money('999999999');
    const expected = revenue.gte(freeAbove) ? zero() : money(policy.freight_flat ?? '0');
    const costCap = cost.gt(0) ? cost : zero();
    const leakage = max0(DecimalMin(expected, costCap).minus(charged));
    if (leakage.gt(0)) {
      total = total.plus(leakage);
      const tx = group[0]?.transaction;
      evidence.push({
        evidence_kind: 'FREIGHT',
        source_file: tx?.source_file,
        source_row: tx?.source_row,
        record_id: invoice,
        value_display: `expected ${expected.toFixed(4)} charged ${charged.toFixed(4)} cost ${cost.toFixed(4)}`,
        role: 'invoice_freight',
      });
    }
  }
  if (total.lte(0)) return [];
  const contractual = policy.basis === 'CONTRACTUAL';
  out.push({
    check_id: 'S1',
    family: 'SERVE',
    value_class: contractual ? 'DETECTED_LEAKAGE' : 'POLICY_LEAKAGE',
    basis_class: contractual ? 'CONTRACTUAL' : 'INTERNAL_POLICY',
    evidence_grade: contractual ? 'A' : 'B',
    grain_key: 'S1|freight',
    raw_gap: money(total),
    title: 'Freight under-recovery',
    facts: { expected_unrecovered: total.toFixed(4) },
    evidence: [
      ...evidence.slice(0, 20),
      {
        evidence_kind: 'POLICY',
        record_id: policy.policy_id,
        source_file: policy.source_file,
        source_row: policy.source_row,
        value_display: `flat ${policy.freight_flat} free above ${policy.freight_free_above}`,
        role: 'freight_policy',
      },
    ],
  });
  return out;
}

function DecimalMin(a: ReturnType<typeof money>, b: ReturnType<typeof money>) {
  return a.lessThan(b) ? a : b;
}

function s2(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const policy = dataset.commercial_policies.find((p) => p.kind === 'MINIMUM_ORDER');
  const t12m = lines.filter((l) => l.in_t12m);
  const byInvoice = new Map<string, LineEconomics[]>();
  for (const line of t12m) {
    const list = byInvoice.get(line.transaction.invoice_no) ?? [];
    list.push(line);
    byInvoice.set(line.transaction.invoice_no, list);
  }
  if (!policy) {
    const assumedMin = money('250');
    const handling = money('35');
    let opportunity = zero();
    for (const group of byInvoice.values()) {
      const revenue = group.reduce((a, l) => a.plus(l.invoice_revenue), zero());
      if (revenue.gt(0) && revenue.lt(assumedMin)) {
        opportunity = opportunity.plus(handling);
      }
    }
    return [
      {
        check_id: 'S2',
        family: 'SERVE',
        value_class: 'MODELLED_MARGIN_OPPORTUNITY',
        basis_class: 'MODELLED',
        evidence_grade: 'C',
        grain_key: 'S2|small_order_modelled',
        raw_gap: money(opportunity),
        title: 'Small-order drain (modelled — no minimum-order policy)',
        facts: { assumed_min: assumedMin.toFixed(4), handling: handling.toFixed(4) },
        evidence: [
          {
            evidence_kind: 'CALCULATION',
            value_display: `modelled handling ${handling.toFixed(4)} on orders below ${assumedMin.toFixed(4)}`,
            role: 'modelled_small_order',
          },
        ],
      },
    ];
  }
  const minOrder = money(policy.min_order_value ?? '0');
  const surcharge = money(policy.surcharge ?? '0');
  let gap = zero();
  const evidence: FindingDraft['evidence'] = [];
    for (const [invoice, group] of byInvoice) {
      const revenue = group.reduce((a, l) => a.plus(l.invoice_revenue), zero());
      if (revenue.gt(0) && revenue.lt(minOrder)) {
      gap = gap.plus(surcharge);
      const tx = group[0]?.transaction;
      evidence.push({
        evidence_kind: 'TRANSACTION',
        record_id: invoice,
        source_file: tx?.source_file,
        source_row: tx?.source_row,
        value_display: `invoice ${invoice} value ${revenue.toFixed(4)}`,
        role: 'small_order',
      });
    }
  }
  return [
    {
      check_id: 'S2',
      family: 'SERVE',
      value_class: 'POLICY_LEAKAGE',
      basis_class: 'INTERNAL_POLICY',
      evidence_grade: 'B',
      grain_key: 'S2|small_order_policy',
      raw_gap: money(gap),
      title: 'Small-order surcharge not applied',
      facts: { min_order: minOrder.toFixed(4), surcharge: surcharge.toFixed(4) },
      evidence: [
        ...evidence.slice(0, 20),
        {
          evidence_kind: 'POLICY',
          record_id: policy.policy_id,
          source_file: policy.source_file,
          source_row: policy.source_row,
          value_display: `min ${policy.min_order_value} surcharge ${policy.surcharge}`,
          role: 'minimum_order_policy',
        },
      ],
    },
  ];
}

function s3(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const policy = dataset.commercial_policies.find((p) => p.kind === 'RESTOCKING');
  const returns = lines.filter((l) => l.in_t12m && (l.transaction.is_return || money(l.transaction.credit_amount).gt(0)));
  if (!policy) {
    const credit = returns.reduce((a, l) => a.plus(money(l.transaction.credit_amount)), zero());
    return [
      {
        check_id: 'S3',
        family: 'SERVE',
        value_class: 'INSIGHT',
        basis_class: 'MODELLED',
        evidence_grade: 'C',
        grain_key: 'S3|credits_insight',
        raw_gap: zero(),
        title: 'Credits and returns insight (no restocking policy)',
        facts: { credit_value: credit.toFixed(4), lines: returns.length },
        evidence: [
          {
            evidence_kind: 'CALCULATION',
            value_display: `${returns.length} credit/return lines; ${credit.toFixed(4)}`,
            role: 'credit_insight',
          },
        ],
      },
    ];
  }
  const rate = d(policy.restocking_rate ?? '0');
  let gap = zero();
  const evidence: FindingDraft['evidence'] = [];
  for (const line of returns) {
    const credit = money(line.transaction.credit_amount).abs();
    const expectedFee = money(credit.times(rate));
    const charged = money(line.transaction.restocking_fee_charged);
    const missing = max0(expectedFee.minus(charged));
    if (missing.gt(0)) {
      gap = gap.plus(missing);
      evidence.push({
        evidence_kind: 'TRANSACTION',
        record_id: line.transaction.transaction_id,
        source_file: line.transaction.source_file,
        source_row: line.transaction.source_row,
        value_display: `credit ${credit.toFixed(4)} fee due ${expectedFee.toFixed(4)} charged ${charged.toFixed(4)}`,
        role: 'missing_restocking_fee',
      });
    }
  }
  return [
    {
      check_id: 'S3',
      family: 'SERVE',
      value_class: 'POLICY_LEAKAGE',
      basis_class: 'INTERNAL_POLICY',
      evidence_grade: 'B',
      grain_key: 'S3|restocking',
      raw_gap: money(gap),
      title: 'Restocking fees not applied to credits/returns',
      facts: { restocking_rate: rate.toFixed(8) },
      evidence: [
        ...evidence.slice(0, 20),
        {
          evidence_kind: 'POLICY',
          record_id: policy.policy_id,
          source_file: policy.source_file,
          source_row: policy.source_row,
          value_display: `restocking ${policy.restocking_rate}`,
          role: 'restocking_policy',
        },
      ],
    },
  ];
}
