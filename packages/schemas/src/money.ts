/**
 * Canonical money representation.
 * Authoritative arithmetic is DECIMAL(18,4) in DuckDB.
 * These types carry already-quantised amounts; never use IEEE floats as source of truth.
 */
export interface Money {
  amount: string;
  currency: string;
}

export interface ConvertedMoney extends Money {
  originalAmount: string;
  originalCurrency: string;
  fxRate: string;
  rateDate: string;
  reportingCurrency: string;
}

export const DEFAULT_REPORTING_CURRENCY = "AUD";

export function money(amount: string, currency = DEFAULT_REPORTING_CURRENCY): Money {
  return { amount, currency };
}
