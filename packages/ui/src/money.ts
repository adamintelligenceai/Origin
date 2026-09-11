export interface FormatMoneyOptions {
  currency?: string;
  locale?: string;
  compact?: boolean;
}

/** Format decimal money strings with tabular-friendly output */
export function formatMoney(
  amount: string | number,
  options: FormatMoneyOptions = {},
): string {
  const { currency = 'AUD', locale = 'en-AU', compact = false } = options;
  const value = typeof amount === 'string' ? Number.parseFloat(amount) : amount;

  if (Number.isNaN(value)) {
    return '—';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value);
}
