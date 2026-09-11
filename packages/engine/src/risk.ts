import type { CanonicalDataset, CustomerSnapshot, LineEconomics, RiskBand } from './types';
import { money, zero } from './money';
import { daysBetween } from './dates';

export function riskBandFromScore(score: number): RiskBand {
  if (score >= 70) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  return 'LOW';
}

export function customerRisk(
  dataset: CanonicalDataset,
  lines: LineEconomics[],
  customerId: string,
  snapshots: { customer_id: string; revenue: number; skuCount: number }[],
): { score: number; band: RiskBand } {
  const cfg = dataset.method_config.risk_weights;
  const self = snapshots.find((s) => s.customer_id === customerId);
  const totalRev = snapshots.reduce((a, s) => a + s.revenue, 0) || 1;
  const concentration = Math.min(100, ((self?.revenue ?? 0) / totalRev) * 100 * 8);
  const customerLines = lines.filter((l) => l.in_t12m && l.transaction.customer_id === customerId);
  const prices = customerLines.map((l) => Number(l.transaction.invoice_unit_price));
  const mean = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
  const allPrices = lines.filter((l) => l.in_t12m).map((l) => Number(l.transaction.invoice_unit_price));
  const peerMean = allPrices.length ? allPrices.reduce((a, b) => a + b, 0) / allPrices.length : mean;
  const pricePosition = mean > peerMean * 1.02 ? Math.min(100, ((mean / (peerMean || 1) - 1) * 400) + 40) : 20;
  const dates = customerLines.map((l) => l.transaction.invoice_date).sort();
  const last = dates[dates.length - 1] ?? dataset.analysis_period.end;
  const recency = Math.min(100, Math.max(0, 80 - daysBetween(last, dataset.analysis_period.end) / 5));
  const firstHalf = customerLines.filter((l) => l.transaction.invoice_date < midpoint(dataset.analysis_period.end));
  const secondHalf = customerLines.filter((l) => l.transaction.invoice_date >= midpoint(dataset.analysis_period.end));
  const q1 = firstHalf.reduce((a, l) => a + Number(l.transaction.quantity), 0);
  const q2 = secondHalf.reduce((a, l) => a + Number(l.transaction.quantity), 0);
  const volume = q1 > 0 && q2 < q1 * 0.9 ? 70 : 25;
  const breadth = Math.min(100, Math.max(0, 80 - (self?.skuCount ?? 0) * 4));
  const customer = dataset.customers.find((c) => c.customer_id === customerId);
  const tenureDays = customer ? daysBetween(customer.opened_on, dataset.analysis_period.end) : 2000;
  const tenure = tenureDays < 365 ? 80 : tenureDays < 730 ? 40 : 15;
  const score = Math.round(
    concentration * cfg.concentration +
      pricePosition * cfg.price_position +
      recency * cfg.recency +
      volume * cfg.volume +
      breadth * cfg.breadth +
      tenure * cfg.tenure,
  );
  const clamped = Math.min(100, Math.max(0, score));
  return { score: clamped, band: riskBandFromScore(clamped) };
}

function midpoint(periodEnd: string): string {
  const t = Date.parse(`${periodEnd}T00:00:00Z`) - 183 * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
}

export function customerSnapshots(dataset: CanonicalDataset, lines: LineEconomics[]): CustomerSnapshot[] {
  const t12m = lines.filter((l) => l.in_t12m);
  const ids = [...new Set(t12m.map((l) => l.transaction.customer_id))];
  const prelim = ids.map((id) => {
    const group = t12m.filter((l) => l.transaction.customer_id === id);
    return {
      customer_id: id,
      revenue: group.reduce((a, l) => a + l.invoice_revenue.toNumber(), 0),
      skuCount: new Set(group.map((l) => l.transaction.sku)).size,
    };
  });
  return ids.map((id) => {
    const group = t12m.filter((l) => l.transaction.customer_id === id);
    const customer = dataset.customers.find((c) => c.customer_id === id);
    const risk = customerRisk(dataset, lines, id, prelim);
    return {
      customer_id: id,
      name: customer?.name ?? id,
      revenue: money(group.reduce((a, l) => a.plus(l.invoice_revenue), zero())).toFixed(4),
      pocket_contribution: money(group.reduce((a, l) => a.plus(l.pocket_contribution), zero())).toFixed(4),
      detected_leakage: '0.0000',
      modelled_opportunity: '0.0000',
      risk_band: risk.band,
      risk_score: risk.score,
    };
  });
}

export function customerRiskMap(
  snapshots: CustomerSnapshot[],
): Map<string, { band: RiskBand; score: number }> {
  return new Map(snapshots.map((s) => [s.customer_id, { band: s.risk_band, score: s.risk_score }]));
}
