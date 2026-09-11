export function formatAud(value: number | string, compact = false): string {
  const n = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(n)) return 'A$—';
  const abs = Math.abs(n);
  const sign = n < 0;
  let body: string;
  if (compact && abs >= 1_000_000) body = `A$${(abs / 1_000_000).toFixed(2)}m`;
  else if (compact && abs >= 1_000) body = `A$${(abs / 1_000).toFixed(0)}k`;
  else {
    body = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(abs);
  }
  return sign ? `(${body})` : body;
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
