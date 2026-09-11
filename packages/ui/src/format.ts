/**
 * Display formatters. These are presentation helpers only.
 * Authoritative money arithmetic remains DuckDB DECIMAL.
 */
export type MoneyInput = string | number;

function toNumber(value: MoneyInput): number {
  return typeof value === "number" ? value : Number(value);
}

export function formatMoney(
  value: MoneyInput,
  options: { currency?: string; compact?: boolean } = {},
): string {
  const amount = toNumber(value);
  const currency = options.currency ?? "AUD";
  const negative = amount < 0;
  const absolute = Math.abs(amount);

  const formatted = options.compact
    ? compactAud(absolute)
    : new Intl.NumberFormat("en-AU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(absolute);

  const withCurrency = currency === "AUD" ? `A$${formatted}` : `${currency} ${formatted}`;
  return negative ? `(${withCurrency})` : withCurrency;
}

function compactAud(absolute: number): string {
  if (absolute >= 1_000_000) {
    const millions = absolute / 1_000_000;
    return `${trimZeros(millions.toFixed(2))}m`;
  }
  if (absolute >= 1_000) {
    const thousands = absolute / 1_000;
    return `${trimZeros(thousands.toFixed(0))}k`;
  }
  return new Intl.NumberFormat("en-AU", {
    maximumFractionDigits: 0,
  }).format(absolute);
}

function trimZeros(value: string): string {
  return value.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

export function formatPercentage(value: MoneyInput, digits = 1): string {
  const amount = toNumber(value);
  const formatted = new Intl.NumberFormat("en-AU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Math.abs(amount));
  return amount < 0 ? `(${formatted}%)` : `${formatted}%`;
}

export function formatBasisPoints(value: MoneyInput): string {
  const amount = toNumber(value);
  const formatted = new Intl.NumberFormat("en-AU", {
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
  return amount < 0 ? `(${formatted} bp)` : `${formatted} bp`;
}

export function formatRunHash(hash: string): string {
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

export function relativeLuminance(hex: string): number {
  const normalised = hex.replace("#", "");
  const r = channel(parseInt(normalised.slice(0, 2), 16) / 255);
  const g = channel(parseInt(normalised.slice(2, 4), 16) / 255);
  const b = channel(parseInt(normalised.slice(4, 6), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function channel(value: number): number {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
