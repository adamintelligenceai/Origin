import { d, max0, money, zero } from '../money';
import { inRange, monthKey, t12mWindow } from '../dates';
import { olsSlope, percentile, volumeQuartile } from '../stats';
import type { CanonicalDataset, CustomerAgreement, FindingDraft, LineEconomics } from '../types';

function material(dataset: CanonicalDataset, amount: ReturnType<typeof money>): boolean {
  return amount.toNumber() >= dataset.method_config.materiality_absolute;
}

function matchAgreement(
  agreements: CustomerAgreement[],
  customerId: string,
  sku: string,
  productGroup: string,
  onDate: string,
): CustomerAgreement | undefined {
  const active = agreements.filter((row) => row.customer_id === customerId && inRange(onDate, row.valid_from, row.valid_to));
  return (
    active.find((row) => row.sku === sku) ??
    active.find((row) => !row.sku && row.product_group === productGroup) ??
    active.find((row) => !row.sku && !row.product_group)
  );
}

export function runSellChecks(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const findings: FindingDraft[] = [];
  findings.push(...p1(dataset, lines));
  findings.push(...p2(dataset, lines));
  findings.push(...p3(dataset, lines));
  findings.push(...p4(dataset, lines));
  findings.push(...p5(dataset, lines));
  findings.push(...p6(dataset, lines));
  findings.push(...p7(dataset, lines));
  return findings.filter((f) => f.value_class === 'BILLING_RISK' || f.value_class === 'OVERLAY' || material(dataset, f.raw_gap) || f.not_assessed);
}

function p1(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const t12m = lines.filter((l) => l.in_t12m);
  const groups = new Map<string, LineEconomics[]>();
  for (const line of t12m) {
    const key = `${line.transaction.customer_id}|${line.transaction.sku}`;
    const list = groups.get(key) ?? [];
    list.push(line);
    groups.set(key, list);
  }
  const out: FindingDraft[] = [];
  const tolerance = dataset.method_config.agreement_tolerance;
  for (const [grain, group] of groups) {
    let under = zero();
    let over = zero();
    const evidence: FindingDraft['evidence'] = [];
    let agreement: CustomerAgreement | undefined;
    for (const line of group) {
      const tx = line.transaction;
      const ag = matchAgreement(
        dataset.customer_agreements,
        tx.customer_id,
        tx.sku,
        tx.product_group,
        tx.invoice_date,
      );
      if (!ag?.unit_price) continue;
      agreement = ag;
      const expected = money(ag.unit_price);
      const realised = ag.price_basis === 'POCKET'
        ? money(line.pocket_revenue.div(d(tx.quantity)))
        : money(tx.invoice_unit_price);
      const qty = d(tx.quantity);
      if (realised.lt(expected.times(1 - tolerance))) {
        under = under.plus(expected.minus(realised).times(qty));
        evidence.push({
          evidence_kind: 'TRANSACTION',
          source_file: tx.source_file,
          source_row: tx.source_row,
          record_id: tx.transaction_id,
          value_display: `${tx.invoice_no} @ ${realised.toFixed(4)} vs ${expected.toFixed(4)}`,
          role: 'under_billed_line',
        });
      } else if (realised.gt(expected.times(1 + tolerance))) {
        over = over.plus(realised.minus(expected).times(qty));
      }
    }
    if (!agreement) continue;
    const [customer_id, sku] = grain.split('|') as [string, string];
    if (under.gt(0)) {
      out.push({
        check_id: 'P1',
        family: 'SELL',
        value_class: 'DETECTED_LEAKAGE',
        basis_class: 'CONTRACTUAL',
        evidence_grade: 'A',
        customer_id,
        sku,
        grain_key: grain,
        raw_gap: money(under),
        cash_claimable: dataset.method_config.p1_back_billing_enabled ? money(under) : zero(),
        title: `Invoiced below active agreement on ${sku}`,
        facts: {
          expected_price: agreement.unit_price,
          gap: under.toFixed(4),
          agreement_id: agreement.agreement_id,
        },
        evidence: [
          ...evidence.slice(0, 12),
          {
            evidence_kind: 'AGREEMENT',
            source_file: agreement.source_file,
            source_row: agreement.source_row,
            record_id: agreement.agreement_id,
            value_display: `${agreement.unit_price} ${agreement.price_basis}`,
            role: 'active_agreement',
          },
        ],
      });
    }
    if (over.gt(0) && material(dataset, over)) {
      out.push({
        check_id: 'P1',
        family: 'SELL',
        value_class: 'BILLING_RISK',
        basis_class: 'CONTRACTUAL',
        evidence_grade: 'A',
        customer_id,
        sku,
        grain_key: `${grain}|over`,
        raw_gap: money(over),
        title: `Invoiced above active agreement on ${sku}`,
        facts: { gap: over.toFixed(4), agreement_id: agreement.agreement_id },
        evidence: [
          {
            evidence_kind: 'AGREEMENT',
            source_file: agreement.source_file,
            source_row: agreement.source_row,
            record_id: agreement.agreement_id,
            value_display: `${agreement.unit_price} ${agreement.price_basis}`,
            role: 'active_agreement',
          },
        ],
      });
    }
  }
  return out;
}

function p2(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const t12m = lines.filter((l) => l.in_t12m);
  const out: FindingDraft[] = [];
  const groups = new Map<string, LineEconomics[]>();
  for (const line of t12m) {
    const key = `${line.transaction.customer_id}|${line.transaction.sku}`;
    const list = groups.get(key) ?? [];
    list.push(line);
    groups.set(key, list);
  }
  for (const [grain, group] of groups) {
    const tx0 = group[0]?.transaction;
    if (!tx0) continue;
    const expired = dataset.customer_agreements
      .filter(
        (row) =>
          row.customer_id === tx0.customer_id &&
          (row.sku === tx0.sku || (!row.sku && row.product_group === tx0.product_group) || (!row.sku && !row.product_group)) &&
          row.valid_to < tx0.invoice_date &&
          row.unit_price,
      )
      .sort((a, b) => b.valid_to.localeCompare(a.valid_to))[0];
    if (!expired?.unit_price) continue;
    const successor = matchAgreement(
      dataset.customer_agreements,
      tx0.customer_id,
      tx0.sku,
      tx0.product_group,
      tx0.invoice_date,
    );
    if (successor) continue;
    const expiredPrice = money(expired.unit_price);
    let qty = zero();
    let revenue = zero();
    let consistent = true;
    for (const line of group) {
      const unit = money(line.transaction.invoice_unit_price);
      if (unit.minus(expiredPrice).abs().div(expiredPrice).gt(0.02)) consistent = false;
      qty = qty.plus(d(line.transaction.quantity));
      revenue = revenue.plus(line.invoice_revenue);
    }
    if (!consistent || qty.lte(0)) continue;
    const current = money(revenue.div(qty));
    const skuMeta = dataset.skus.find((s) => s.sku === tx0.sku);
    const segmentStandard = skuMeta?.standard_price ? money(skuMeta.standard_price) : current.times(1.08);
    const landed = group[group.length - 1]?.landed_cost_per_unit ?? zero();
    const restore = landed.gt(0) ? money(landed.div(d(0.75))) : segmentStandard;
    const reference = DecimalMin(segmentStandard, restore);
    const gap = max0(reference.minus(current).times(qty));
    if (gap.lte(0)) continue;
    const [customer_id, sku] = grain.split('|') as [string, string];
    out.push({
      check_id: 'P2',
      family: 'SELL',
      value_class: 'MODELLED_MARGIN_OPPORTUNITY',
      basis_class: 'HISTORICAL',
      evidence_grade: skuMeta?.standard_price ? 'B' : 'C',
      customer_id,
      sku,
      grain_key: grain,
      raw_gap: money(gap),
      title: `Expired agreement price still honoured on ${sku}`,
      facts: {
        expired_price: expired.unit_price,
        current_price: current.toFixed(4),
        reference_price: reference.toFixed(4),
        valid_to: expired.valid_to,
      },
      evidence: [
        {
          evidence_kind: 'AGREEMENT',
          source_file: expired.source_file,
          source_row: expired.source_row,
          record_id: expired.agreement_id,
          value_display: `expired ${expired.valid_to} @ ${expired.unit_price}`,
          role: 'expired_agreement',
        },
      ],
    });
  }
  return out;
}

function DecimalMin(a: ReturnType<typeof money>, b: ReturnType<typeof money>) {
  return a.lessThan(b) ? a : b;
}

function p3(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const cfg = dataset.method_config;
  const t12m = t12mWindow(dataset.analysis_period.end);
  const preStart = t12m.start;
  const groups = new Map<string, LineEconomics[]>();
  for (const line of lines) {
    const key = `${line.transaction.customer_id}|${line.transaction.sku}`;
    const list = groups.get(key) ?? [];
    list.push(line);
    groups.set(key, list);
  }
  const out: FindingDraft[] = [];
  for (const [grain, group] of groups) {
    const tx0 = group[0]?.transaction;
    if (!tx0) continue;
    const costs = dataset.supplier_costs
      .filter((c) => c.sku === tx0.sku)
      .sort((a, b) => a.effective_from.localeCompare(b.effective_from));
    if (costs.length < 2) continue;
    let shock: { from: string; before: ReturnType<typeof money>; after: ReturnType<typeof money> } | undefined;
    for (let i = 1; i < costs.length; i += 1) {
      const prev = costs[i - 1];
      const next = costs[i];
      if (!prev || !next) continue;
      if (next.effective_from < preStart || next.effective_from > t12m.end) continue;
      const before = money(prev.true_landed_cost);
      const after = money(next.true_landed_cost);
      if (before.lte(0)) continue;
      const change = after.div(before).minus(1).toNumber();
      if (change >= cfg.p3_material_cost_increase) {
        shock = { from: next.effective_from, before, after };
      }
    }
    if (!shock) continue;
    const baselineWindowEnd = shock.from;
    const baselineWindowStart = addDays(shock.from, -90);
    const currentStart = addDays(t12m.end, -90);
    const baselineLines = group.filter((l) => l.transaction.invoice_date >= baselineWindowStart && l.transaction.invoice_date < baselineWindowEnd);
    const currentLines = group.filter((l) => l.transaction.invoice_date >= currentStart && l.transaction.invoice_date <= t12m.end);
    const vw = (subset: LineEconomics[]) => {
      const q = subset.reduce((a, l) => a.plus(d(l.transaction.quantity)), zero());
      const r = subset.reduce((a, l) => a.plus(l.invoice_revenue), zero());
      return { q, p: q.gt(0) ? money(r.div(q)) : zero() };
    };
    const base = vw(baselineLines);
    const curr = vw(currentLines);
    if (base.p.lte(0) || curr.p.lte(0) || shock.before.lte(0)) continue;
    const costChange = shock.after.div(shock.before).minus(1).toNumber();
    const priceChange = curr.p.div(base.p).minus(1).toNumber();
    if (costChange < cfg.p3_material_cost_increase) continue;
    if (costChange - priceChange < cfg.p3_pass_through_gap) continue;
    const baselineMargin = base.p.minus(shock.before).div(base.p);
    if (baselineMargin.lte(0) || baselineMargin.gte(1)) continue;
    const restore = money(shock.after.div(d(1).minus(baselineMargin)));
    const t12mGroup = group.filter((l) => l.in_t12m);
    const t12mQty = t12mGroup.reduce((a, l) => a.plus(d(l.transaction.quantity)), zero());
    const gap = max0(restore.minus(curr.p).times(t12mQty));
    if (gap.lte(0)) continue;
    const [customer_id, sku] = grain.split('|') as [string, string];
    const lastIncrease = [...group].sort((a, b) => a.transaction.invoice_date.localeCompare(b.transaction.invoice_date));
    out.push({
      check_id: 'P3',
      family: 'SELL',
      value_class: 'MODELLED_MARGIN_OPPORTUNITY',
      basis_class: 'HISTORICAL',
      evidence_grade: 'B',
      customer_id,
      sku,
      grain_key: grain,
      raw_gap: money(gap),
      title: `Cost pass-through gap on ${sku}`,
      facts: {
        cost_change: costChange,
        price_change: priceChange,
        restore_price: restore.toFixed(4),
        current_price: curr.p.toFixed(4),
        baseline_price: base.p.toFixed(4),
        months_since_price_change: 3,
        last_invoice: lastIncrease[lastIncrease.length - 1]?.transaction.invoice_date,
      },
      evidence: [
        {
          evidence_kind: 'COST',
          record_id: sku,
          value_display: `${shock.before.toFixed(4)} → ${shock.after.toFixed(4)} on ${shock.from}`,
          role: 'landed_cost_shock',
        },
      ],
    });
  }
  return out;
}

function addDays(iso: string, days: number): string {
  const t = Date.parse(`${iso}T00:00:00Z`) + days * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
}

function p4(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const t12m = lines.filter((l) => l.in_t12m && l.invoice_revenue.gt(0));
  const floorPolicy = dataset.commercial_policies.find((p) => p.kind === 'MARGIN_FLOOR' && p.floor_margin);
  const byGroup = new Map<string, number[]>();
  for (const line of t12m) {
    const qty = d(line.transaction.quantity);
    if (qty.lte(0) || line.pocket_revenue.lte(0)) continue;
    const unitPocket = line.pocket_revenue.div(qty);
    const margin = unitPocket.minus(line.landed_cost_per_unit).div(unitPocket).toNumber();
    if (margin <= 0) continue;
    const list = byGroup.get(line.transaction.product_group) ?? [];
    list.push(margin);
    byGroup.set(line.transaction.product_group, list);
  }
  const derivedFloor = new Map<string, number>();
  for (const [group, values] of byGroup) {
    const sorted = [...values].sort((a, b) => a - b);
    derivedFloor.set(group, percentile(sorted, dataset.method_config.p4_derived_percentile));
  }
  const groups = new Map<string, LineEconomics[]>();
  for (const line of t12m) {
    const key = `${line.transaction.customer_id}|${line.transaction.sku}`;
    const list = groups.get(key) ?? [];
    list.push(line);
    groups.set(key, list);
  }
  const out: FindingDraft[] = [];
  for (const [grain, group] of groups) {
    const tx0 = group[0]?.transaction;
    if (!tx0) continue;
    const approved = floorPolicy?.floor_margin ? Number(floorPolicy.floor_margin) : undefined;
    const floorMargin = approved ?? derivedFloor.get(tx0.product_group) ?? 0.1;
    let gap = zero();
    for (const line of group) {
      const qty = d(line.transaction.quantity);
      const floorPrice = line.landed_cost_per_unit.div(d(1 - floorMargin));
      const actual = money(line.transaction.invoice_unit_price);
      gap = gap.plus(max0(floorPrice.minus(actual).times(qty)));
    }
    if (gap.lte(0)) continue;
    const [customer_id, sku] = grain.split('|') as [string, string];
    out.push({
      check_id: 'P4',
      family: 'SELL',
      value_class: approved ? 'POLICY_LEAKAGE' : 'MODELLED_MARGIN_OPPORTUNITY',
      basis_class: approved ? 'INTERNAL_POLICY' : 'DERIVED',
      evidence_grade: approved ? 'B' : 'C',
      customer_id,
      sku,
      product_group: tx0.product_group,
      grain_key: grain,
      raw_gap: money(gap),
      title: approved ? `Below approved floor on ${sku}` : `Below derived floor on ${sku} — management confirmation required`,
      facts: {
        floor_margin: floorMargin,
        derived: !approved,
      },
      evidence: approved && floorPolicy
        ? [
            {
              evidence_kind: 'POLICY',
              record_id: floorPolicy.policy_id,
              source_file: floorPolicy.source_file,
              source_row: floorPolicy.source_row,
              value_display: `floor ${floorPolicy.floor_margin}`,
              role: 'approved_floor',
            },
          ]
        : [
            {
              evidence_kind: 'CALCULATION',
              value_display: `derived ${dataset.method_config.p4_derived_percentile} percentile floor ${floorMargin}`,
              role: 'derived_floor',
            },
          ],
    });
  }
  return out;
}

function p5(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const cfg = dataset.method_config;
  const t12mPlus = lines.filter((l) => l.transaction.list_price_per_unit && Number(l.transaction.list_price_per_unit) > 0);
  const groups = new Map<string, LineEconomics[]>();
  for (const line of t12mPlus) {
    const key = `${line.transaction.customer_id}|${line.transaction.product_group}`;
    const list = groups.get(key) ?? [];
    list.push(line);
    groups.set(key, list);
  }
  const out: FindingDraft[] = [];
  for (const [grain, group] of groups) {
    const byMonth = new Map<string, { rev: ReturnType<typeof zero>; list: ReturnType<typeof zero> }>();
    for (const line of group) {
      const mk = monthKey(line.transaction.invoice_date);
      const row = byMonth.get(mk) ?? { rev: zero(), list: zero() };
      row.rev = row.rev.plus(line.invoice_revenue);
      const listVal = d(line.transaction.list_price_per_unit ?? '0').times(d(line.transaction.quantity));
      row.list = row.list.plus(listVal);
      byMonth.set(mk, row);
    }
    const months = [...byMonth.keys()].sort();
    if (months.length < cfg.p5_min_months) continue;
    const discounts = months.map((m) => {
      const row = byMonth.get(m);
      if (!row || row.list.lte(0)) return 0;
      return (1 - row.rev.div(row.list).toNumber()) * 100;
    });
    const xs = discounts.map((_, i) => i);
    const slope = olsSlope(xs, discounts);
    const baseline = discounts.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
    const current = discounts.slice(-3).reduce((a, b) => a + b, 0) / 3;
    if (slope < cfg.p5_trend_pp_per_month) continue;
    if (current - baseline < cfg.p5_current_vs_baseline_pp) continue;
    const applicableList = group
      .filter((l) => l.in_t12m)
      .reduce((a, l) => a.plus(d(l.transaction.list_price_per_unit ?? '0').times(d(l.transaction.quantity))), zero());
    const gap = money(applicableList.times((current - baseline) / 100));
    const [customer_id, product_group] = grain.split('|') as [string, string];
    out.push({
      check_id: 'P5',
      family: 'SELL',
      value_class: 'MODELLED_MARGIN_OPPORTUNITY',
      basis_class: 'HISTORICAL',
      evidence_grade: 'B',
      customer_id,
      product_group,
      grain_key: grain,
      raw_gap: gap,
      title: `Discount creep in ${product_group}`,
      facts: { slope_pp_per_month: slope, baseline_discount_pp: baseline, current_discount_pp: current },
      evidence: [
        {
          evidence_kind: 'CALCULATION',
          value_display: `slope ${slope.toFixed(3)} pp/month; ${baseline.toFixed(2)} → ${current.toFixed(2)}`,
          role: 'discount_trend',
        },
      ],
    });
  }
  return out;
}

function p6(dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const cfg = dataset.method_config;
  const t12m = lines.filter((l) => l.in_t12m);
  const byCustomerSku = new Map<string, LineEconomics[]>();
  for (const line of t12m) {
    const key = `${line.transaction.customer_id}|${line.transaction.sku}`;
    const list = byCustomerSku.get(key) ?? [];
    list.push(line);
    byCustomerSku.set(key, list);
  }
  const realised: {
    customer_id: string;
    sku: string;
    segment: string;
    region: string;
    qty: number;
    price: number;
    grain: string;
  }[] = [];
  for (const [grain, group] of byCustomerSku) {
    const tx0 = group[0]?.transaction;
    if (!tx0) continue;
    const customer = dataset.customers.find((c) => c.customer_id === tx0.customer_id);
    const qty = group.reduce((a, l) => a + Number(l.transaction.quantity), 0);
    const rev = group.reduce((a, l) => a + l.invoice_revenue.toNumber(), 0);
    if (qty <= 0) continue;
    realised.push({
      customer_id: tx0.customer_id,
      sku: tx0.sku,
      segment: customer?.segment ?? 'unknown',
      region: customer?.region ?? tx0.branch_id,
      qty,
      price: rev / qty,
      grain,
    });
  }
  const out: FindingDraft[] = [];
  for (const row of realised) {
    const skuVolumes = realised.filter((r) => r.sku === row.sku).map((r) => r.qty);
    const q = volumeQuartile(row.qty, skuVolumes);
    const peers = realised.filter(
      (r) =>
        r.sku === row.sku &&
        r.segment === row.segment &&
        r.region === row.region &&
        volumeQuartile(r.qty, skuVolumes) === q &&
        r.customer_id !== row.customer_id,
    );
    if (peers.length < cfg.p6_min_peers) continue;
    const prices = peers.map((p) => p.price).sort((a, b) => a - b);
    const p25 = percentile(prices, cfg.p6_flag_percentile);
    const p40 = percentile(prices, cfg.p6_target_percentile);
    if (row.price >= p25) continue;
    const unitGap = p40 - row.price;
    if (unitGap / row.price < cfg.p6_min_gap_pct) continue;
    const annual = unitGap * row.qty;
    if (annual < cfg.p6_min_annual_gap) continue;
    out.push({
      check_id: 'P6',
      family: 'SELL',
      value_class: 'MODELLED_MARGIN_OPPORTUNITY',
      basis_class: 'PEER_BENCHMARK',
      evidence_grade: 'C',
      customer_id: row.customer_id,
      sku: row.sku,
      grain_key: row.grain,
      raw_gap: money(annual),
      title: `Peer price dispersion on ${row.sku}`,
      facts: { p25, p40, current_price: row.price, peers: peers.length },
      evidence: [
        {
          evidence_kind: 'CALCULATION',
          value_display: `P25 ${p25.toFixed(4)} / P40 ${p40.toFixed(4)} vs ${row.price.toFixed(4)} (${peers.length} peers)`,
          role: 'peer_distribution',
        },
      ],
    });
  }
  return out;
}

function p7(_dataset: CanonicalDataset, lines: LineEconomics[]): FindingDraft[] {
  const t12m = lines.filter((l) => l.in_t12m && l.pocket_contribution.lt(0));
  if (t12m.length === 0) return [];
  const revenue = t12m.reduce((a, l) => a.plus(l.invoice_revenue), zero());
  const contribution = t12m.reduce((a, l) => a.plus(l.pocket_contribution), zero());
  return [
    {
      check_id: 'P7',
      family: 'SELL',
      value_class: 'OVERLAY',
      basis_class: 'DERIVED',
      evidence_grade: 'B',
      grain_key: 'P7|negative_contribution',
      raw_gap: zero(),
      title: 'Negative pocket contribution overlay',
      facts: {
        line_count: t12m.length,
        revenue: revenue.toFixed(4),
        negative_contribution: contribution.toFixed(4),
      },
      evidence: [
        {
          evidence_kind: 'CALCULATION',
          value_display: `${t12m.length} lines; ${contribution.toFixed(4)} pocket contribution`,
          role: 'negative_contribution',
        },
      ],
    },
  ];
}
