import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface MoneyProps {
  amount: number;
  currency?: string;
  locale?: string;
  compact?: boolean;
  className?: string;
  showSign?: boolean;
}

export function formatMoney(
  amount: number,
  options: { currency?: string; locale?: string; compact?: boolean } = {},
): string {
  const { currency = "AUD", locale = "en-AU", compact = false } = options;

  if (compact && Math.abs(amount) >= 1000) {
    const abs = Math.abs(amount);
    const sign = amount < 0 ? "(" : "";
    const suffix = amount < 0 ? ")" : "";
    if (abs >= 1_000_000) {
      return `${sign}A$${(abs / 1_000_000).toFixed(2).replace(/\.00$/, "")}m${suffix}`;
    }
    return `${sign}A$${Math.round(abs / 1000)}k${suffix}`;
  }

  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));

  if (amount < 0) {
    return `(${formatted})`;
  }
  return formatted;
}

export function Money({
  amount,
  currency = "AUD",
  locale = "en-AU",
  compact = false,
  className,
}: MoneyProps): ReactNode {
  return (
    <span className={cn("tabular-nums", amount < 0 && "text-red-ink", className)}>
      {formatMoney(amount, { currency, locale, compact })}
    </span>
  );
}
