export function formatAud(value: number | string, compact = false): string {
  return formatMoney(value, { compact, digits: 0 });
}

export function formatMoney(
  value: number | string,
  opts: { compact?: boolean; digits?: number } = {},
): string {
  const n = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(n)) return 'A$—';
  const abs = Math.abs(n);
  const sign = n < 0;
  const digits = opts.digits ?? 0;
  let body: string;
  if (opts.compact && abs >= 1_000_000) body = `A$${(abs / 1_000_000).toFixed(2)}m`;
  else if (opts.compact && abs >= 1_000 && digits === 0) body = `A$${(abs / 1_000).toFixed(0)}k`;
  else {
    const amount = new Intl.NumberFormat('en-AU', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(abs);
    body = `A$${amount}`;
  }
  return sign ? `(${body})` : body;
}

export function formatFact(key: string, value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'yes' : 'no';
  if (typeof value === 'string' && !/^-?\d+(\.\d+)?$/.test(value)) return value;
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return String(value);
  if (/month|count|peers|lines/.test(key) && Number.isInteger(n)) return String(n);
  if (/pp/.test(key)) return `${n.toFixed(1)} pp`;
  if (/(^|_)(change|rate|pct|percentile)$/.test(key) || /pass_through/.test(key) || key.endsWith('_change')) {
    if (Math.abs(n) <= 5) return formatPct(n);
  }
  if (/(price|cost|gap|amount|value|surcharge|handling|freight|credit|min_order|earned|claimed)/.test(key)) {
    return Math.abs(n) >= 1000 ? formatMoney(n, { compact: true, digits: 0 }) : formatMoney(n, { digits: 2 });
  }
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(4);
}

export function formatPct(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatBps(value: number): string {
  return `${Math.round(value)} bp`;
}

export function formatRunHash(hash: string): string {
  return hash.slice(0, 12);
}

export const VALUE_CLASS_LABEL: Record<string, string> = {
  DETECTED_LEAKAGE: 'Detected leakage',
  POLICY_LEAKAGE: 'Policy leakage',
  MODELLED_MARGIN_OPPORTUNITY: 'Modelled opportunity',
  CASH_ENTITLEMENT: 'Cash entitlement',
  OPPORTUNITY: 'Opportunity',
  INSIGHT: 'Insight',
  OVERLAY: 'Overlay',
  BILLING_RISK: 'Billing risk',
};
