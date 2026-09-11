export const COMMERCIAL = {
  currency: "AUD",
  locale: "en-AU",
  products: {
    marginLeakageScan: {
      name: "Margin Leakage Scan",
      price: 9500,
      description:
        "One diagnostic scan, methodology review, board pack, action workbook, evidence ledger and review meeting.",
    },
    foundingClientScan: {
      name: "Founding Client Scan",
      price: 4950,
      description: "Limited founding-client offer. Case-study permission separately consented.",
    },
    marginMonitor: {
      name: "Margin Monitor",
      price: 1950,
      billingPeriod: "month" as const,
      description:
        "Refreshed scan, prior-period comparison, resolved/new finding tracking, recovery-plan monitoring and trend reporting.",
    },
  },
} as const;

export type CommercialProduct = keyof typeof COMMERCIAL.products;

export function formatCommercialPrice(amount: number): string {
  return new Intl.NumberFormat(COMMERCIAL.locale, {
    style: "currency",
    currency: COMMERCIAL.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
