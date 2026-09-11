export type HealthGate = {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
  severity: 'block' | 'warn' | 'info';
};

export type HealthReport = {
  gates: HealthGate[];
  canRunChecks: boolean;
  limitedHistory: boolean;
  economicCoverageEstimate: number;
};

function monthsCovered(dates: string[]): number {
  return new Set(dates.filter(Boolean).map((d) => d.slice(0, 7))).size;
}

export function assessDataHealth(input: {
  transactions: Array<Record<string, string | number>>;
  agreements?: Array<Record<string, string | number>>;
  rebates?: Array<Record<string, string | number>>;
}): HealthReport {
  const tx = input.transactions;
  const dates = tx.map((t) => String(t.invoice_date ?? ''));
  const months = monthsCovered(dates);
  const withCost = tx.filter((t) => Number(t.direct_cost ?? 0) > 0);
  const sales = tx.reduce((s, t) => s + Number(t.net_sales ?? 0), 0);
  const costSales = withCost.reduce((s, t) => s + Number(t.net_sales ?? 0), 0);
  const coverage = sales > 0 ? costSales / sales : 0;

  const gates: HealthGate[] = [
    {
      id: 'row_count',
      label: 'Transaction rows present',
      passed: tx.length > 0,
      detail: `${tx.length.toLocaleString('en-AU')} rows`,
      severity: 'block',
    },
    {
      id: 'history_months',
      label: 'Minimum history (12 complete months preferred)',
      passed: months >= 12,
      detail: `${months} distinct months`,
      severity: months >= 9 ? 'warn' : 'block',
    },
    {
      id: 'cost_match',
      label: 'Cost match ≥ 90% of T12M sales value',
      passed: coverage >= 0.9,
      detail: `${(coverage * 100).toFixed(1)}% of sales value has direct_cost`,
      severity: coverage >= 0.75 ? 'warn' : 'block',
    },
    {
      id: 'agreements',
      label: 'Customer agreements loaded (for P1/P2)',
      passed: (input.agreements?.length ?? 0) > 0,
      detail: `${input.agreements?.length ?? 0} agreement rows`,
      severity: 'warn',
    },
    {
      id: 'rebates',
      label: 'Rebate claims loaded (for B1)',
      passed: (input.rebates?.length ?? 0) > 0,
      detail: `${input.rebates?.length ?? 0} rebate rows`,
      severity: 'info',
    },
  ];

  return {
    gates,
    canRunChecks: !gates.some((g) => g.severity === 'block' && !g.passed),
    limitedHistory: months < 12,
    economicCoverageEstimate: Math.min(1, Math.round(coverage * 1000) / 1000),
  };
}
