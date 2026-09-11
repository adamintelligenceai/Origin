import Decimal from 'decimal.js';

Decimal.set({ precision: 28, rounding: Decimal.ROUND_HALF_EVEN });

export const MONEY_DP = 4;
export const RATE_DP = 8;

export type Dec = Decimal;

export function d(value: Decimal.Value): Decimal {
  return value instanceof Decimal ? value : new Decimal(value);
}

export function money(value: Decimal.Value): Decimal {
  return d(value).toDecimalPlaces(MONEY_DP);
}

export function rate(value: Decimal.Value): Decimal {
  return d(value).toDecimalPlaces(RATE_DP);
}

export function zero(): Decimal {
  return money(0);
}

export function max0(value: Decimal.Value): Decimal {
  return Decimal.max(zero(), money(value));
}

export function moneyString(value: Decimal.Value): string {
  return money(value).toFixed(MONEY_DP);
}

export function parseMoney(value: string | number | Decimal): Decimal {
  return money(value);
}

export function sumMoney(values: readonly Decimal.Value[]): Decimal {
  return values.reduce<Decimal>((acc, value) => acc.plus(money(value)), zero());
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
