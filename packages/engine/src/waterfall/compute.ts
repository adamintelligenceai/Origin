export type WaterfallSummary = {
  listValueAud: number;
  invoiceRevenueAud: number;
  pocketRevenueAud: number;
  trueLandedCostAud: number;
  pocketContributionAud: number;
  economicCoverage: number;
};

export function computeWaterfall(
  transactions: Array<Record<string, string | number>>,
  opts?: { periodStart?: string },
): WaterfallSummary {
  const start = opts?.periodStart ?? '2025-07-01';
  const t12 = transactions.filter((t) => String(t.invoice_date ?? '') >= start);
  const listValueAud = Math.round(
    t12.reduce((s, t) => s + Number(t.list_price ?? 0) * Number(t.qty ?? 0), 0),
  );
  const invoiceRevenueAud = Math.round(t12.reduce((s, t) => s + Number(t.net_sales ?? 0), 0));
  const trueLandedCostAud = Math.round(t12.reduce((s, t) => s + Number(t.direct_cost ?? 0), 0));
  const withCostSales = t12
    .filter((t) => Number(t.direct_cost ?? 0) > 0)
    .reduce((s, t) => s + Number(t.net_sales ?? 0), 0);
  const economicCoverage =
    invoiceRevenueAud > 0 ? Math.min(1, Math.round((withCostSales / invoiceRevenueAud) * 1000) / 1000) : 0;
  const pocketRevenueAud = invoiceRevenueAud;
  return {
    listValueAud,
    invoiceRevenueAud,
    pocketRevenueAud,
    trueLandedCostAud,
    pocketContributionAud: pocketRevenueAud - trueLandedCostAud,
    economicCoverage,
  };
}
