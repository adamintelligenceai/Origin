import { zero } from './money';
import type { CanonicalDataset, CoverageComponent, CoverageResult, LineEconomics } from './types';

export function economicCoverage(dataset: CanonicalDataset, lines: LineEconomics[]): CoverageResult {
  const t12m = lines.filter((line) => line.in_t12m);
  const sales = t12m.reduce((acc, line) => acc.plus(line.invoice_revenue), zero());
  const salesN = sales.toNumber() || 1;
  const weighted = (
    pred: (line: LineEconomics) => boolean,
  ): number => t12m.reduce((acc, line) => (pred(line) ? acc + line.invoice_revenue.toNumber() : acc), 0) / salesN;

  const hasCost = weighted((line) => line.landed_cost_per_unit.gt(0));
  const hasDiscount = weighted(() => dataset.transactions.length > 0);
  const hasRebate = dataset.supplier_rebates.length > 0 ? 1 : 0;
  const hasInbound = dataset.supplier_costs.some((c) => Number(c.inbound_freight) > 0)
    ? weighted(() => true)
    : dataset.supplier_costs.length > 0
      ? 0.5
      : 0;
  const hasOutbound = weighted((line) => Number(line.transaction.freight_cost) > 0 || Number(line.transaction.freight_charged) > 0);
  const agreementValue = (() => {
    const agreed = new Set(
      dataset.customer_agreements.flatMap((a) =>
        a.sku ? [`${a.customer_id}|${a.sku}`] : [`${a.customer_id}|*`],
      ),
    );
    return weighted((line) => agreed.has(`${line.transaction.customer_id}|${line.transaction.sku}`) || agreed.has(`${line.transaction.customer_id}|*`));
  })();
  const hasCts = weighted((line) => Number(line.transaction.pick_pack) > 0 || Number(line.transaction.commission) > 0);

  const available: Record<CoverageComponent, number> = {
    realised_sales: t12m.length > 0 ? 1 : 0,
    supplier_direct_cost: hasCost,
    customer_discounts_credits: hasDiscount,
    supplier_adjustments_rebates: hasRebate,
    inbound_freight: hasInbound,
    outbound_freight: hasOutbound,
    agreement_data: agreementValue,
    variable_cost_to_serve: hasCts,
  };

  const components = {} as CoverageResult['components'];
  let score = 0;
  const missing: string[] = [];
  let weightTotal = 0;
  for (const [key, weight] of Object.entries(dataset.method_config.coverage_weights) as [CoverageComponent, number][]) {
    weightTotal += weight;
    const avail = available[key];
    const contribution = weight * avail;
    components[key] = { weight, available: avail, contribution };
    score += contribution;
    if (avail < 0.9) missing.push(key);
  }
  return {
    score: Math.round((score / weightTotal) * 100),
    components,
    missing,
  };
}
