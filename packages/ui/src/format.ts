/** Australian money formatting with accounting negatives. */
export function formatMoneyAUD(amount: number, fractionDigits = 0): string {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(abs);
  if (amount < 0) return `(${formatted})`;
  return formatted;
}

export function formatPercent(value: number, fractionDigits = 1): string {
  const pct = value * 100;
  const formatted = new Intl.NumberFormat('en-AU', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(Math.abs(pct));
  const body = `${formatted}%`;
  return pct < 0 ? `(${body})` : body;
}

export function formatBasisPoints(bps: number): string {
  const formatted = new Intl.NumberFormat('en-AU', {
    maximumFractionDigits: 0,
  }).format(Math.abs(bps));
  const body = `${formatted} bps`;
  return bps < 0 ? `(${body})` : body;
}
