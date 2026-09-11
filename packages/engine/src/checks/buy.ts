import { d, max0, money, zero } from '../money';
import { inRange } from '../dates';
import type { CanonicalDataset, FindingDraft, LineEconomics, SupplierRebate } from '../types';

function material(dataset: CanonicalDataset, amount: ReturnType<typeof money>): boolean {
  return amount.toNumber() >= dataset.method_config.materiality_absolute;
}

export function runBuyChecks(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  return [...b1(dataset), ...b2(dataset), ...b3(dataset, lines)].filter(
    (f) => f.value_class === 'INSIGHT' || f.value_class === 'OPPORTUNITY' || material(dataset, f.raw_gap),
  );
}

function earnedAmount(rebate: SupplierRebate): ReturnType<typeof money> {
  const base = money(rebate.eligible_base);
  switch (rebate.rebate_type) {
    case 'FLAT':
    case 'CLAIM_BACK':
      return money(rebate.earned || base.times(d(rebate.rate ?? '0')));
    case 'RETROSPECTIVE_TIER': {
      const tiers = [...(rebate.tiers ?? [])].sort((a, b) => Number(a.threshold) - Number(b.threshold));
      let rate = d(0);
      for (const tier of tiers) {
        if (base.gte(money(tier.threshold))) rate = d(tier.rate);
      }
      return money(base.times(rate));
    }
    case 'INCREMENTAL_TIER': {
      const tiers = [...(rebate.tiers ?? [])].sort((a, b) => Number(a.threshold) - Number(b.threshold));
      let remaining = base;
      let prev = zero();
      let earned = zero();
      for (const tier of tiers) {
        const threshold = money(tier.threshold);
        const band = DecimalMin(remaining, max0(threshold.minus(prev)));
        earned = earned.plus(band.times(d(tier.rate)));
        remaining = remaining.minus(band);
        prev = threshold;
        if (remaining.lte(0)) break;
      }
      if (remaining.gt(0) && tiers.length > 0) {
        const last = tiers[tiers.length - 1];
        if (last) earned = earned.plus(remaining.times(d(last.rate)));
      }
      return money(earned);
    }
    case 'GROWTH':
      return money(rebate.earned);
    default: {
      const _exhaustive: never = rebate.rebate_type;
      return _exhaustive;
    }
  }
}

function DecimalMin(a: ReturnType<typeof money>, b: ReturnType<typeof money>) {
  return a.lessThan(b) ? a : b;
}

function b1(dataset: CanonicalDataset): FindingDraft[] {
  const out: FindingDraft[] = [];
  for (const rebate of dataset.supplier_rebates) {
    const earned = earnedAmount(rebate);
    const claimed = money(rebate.claimed);
    const pending = money(rebate.received_pending_match);
    const gap = max0(earned.minus(claimed).minus(pending));
    if (gap.lte(0)) continue;
    const inWindow = inRange(dataset.analysis_period.end, rebate.period_start, rebate.claim_window_end);
    out.push({
      check_id: 'B1',
      family: 'BUY',
      value_class: 'DETECTED_LEAKAGE',
      basis_class: 'CONTRACTUAL',
      evidence_grade: 'A',
      supplier_id: rebate.supplier_id,
      grain_key: `B1|${rebate.rebate_id}`,
      raw_gap: gap,
      cash_claimable: inWindow ? gap : zero(),
      title: `Supplier rebate under-claim ${rebate.rebate_id}`,
      facts: {
        rebate_type: rebate.rebate_type,
        earned: earned.toFixed(4),
        claimed: claimed.toFixed(4),
        pending: pending.toFixed(4),
        in_claim_window: inWindow,
      },
      evidence: [
        {
          evidence_kind: 'REBATE',
          record_id: rebate.rebate_id,
          source_file: rebate.source_file,
          source_row: rebate.source_row,
          value_display: `earned ${earned.toFixed(4)} claimed ${claimed.toFixed(4)}`,
          role: 'rebate_tieout',
        },
      ],
    });
  }
  return out;
}

function b2(dataset: CanonicalDataset): FindingDraft[] {
  const out: FindingDraft[] = [];
  const cfg = dataset.method_config;
  for (const rebate of dataset.supplier_rebates) {
    if (!rebate.tiers || rebate.tiers.length === 0) continue;
    if (dataset.analysis_period.end > rebate.period_end) continue;
    const base = money(rebate.eligible_base);
    const tiers = [...rebate.tiers].sort((a, b) => Number(a.threshold) - Number(b.threshold));
    const next = tiers.find((t) => money(t.threshold).gt(base));
    if (!next) continue;
    const distance = money(next.threshold).minus(base);
    if (distance.div(money(next.threshold)).gt(cfg.b2_near_miss_pct)) continue;
    const currentRate = (() => {
      let rate = d(0);
      for (const tier of tiers) {
        if (base.gte(money(tier.threshold))) rate = d(tier.rate);
      }
      return rate;
    })();
    const incremental = money(base.times(d(next.rate).minus(currentRate)));
    out.push({
      check_id: 'B2',
      family: 'BUY',
      value_class: 'OPPORTUNITY',
      basis_class: 'CONTRACTUAL',
      evidence_grade: 'B',
      supplier_id: rebate.supplier_id,
      grain_key: `B2|${rebate.rebate_id}`,
      raw_gap: incremental,
      title: `Rebate tier near-miss ${rebate.rebate_id}`,
      facts: {
        remaining_spend: distance.toFixed(4),
        next_threshold: next.threshold,
        incremental_rebate: incremental.toFixed(4),
      },
      evidence: [
        {
          evidence_kind: 'REBATE',
          record_id: rebate.rebate_id,
          source_file: rebate.source_file,
          source_row: rebate.source_row,
          value_display: `base ${base.toFixed(4)} next ${next.threshold}`,
          role: 'tier_near_miss',
        },
      ],
    });
  }
  return out;
}

function b3(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const t12m = lines.filter((l) => l.in_t12m);
  const front = t12m.reduce((a, l) => a.plus(l.front_end_contribution), zero());
  const pocket = t12m.reduce((a, l) => a.plus(l.pocket_contribution), zero());
  const illusion = front.minus(pocket);
  return [
    {
      check_id: 'B3',
      family: 'BUY',
      value_class: 'INSIGHT',
      basis_class: 'DERIVED',
      evidence_grade: 'B',
      grain_key: 'B3|margin_illusion',
      raw_gap: zero(),
      title: 'Margin illusion — ERP cost versus landed economics',
      facts: {
        front_end_contribution: front.toFixed(4),
        pocket_contribution: pocket.toFixed(4),
        difference: illusion.toFixed(4),
      },
      evidence: [
        {
          evidence_kind: 'CALCULATION',
          value_display: `front-end ${front.toFixed(4)} pocket ${pocket.toFixed(4)}`,
          role: 'margin_illusion',
        },
      ],
    },
  ];
}
