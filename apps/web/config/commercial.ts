export const commercialOffer = {
  currency: "AUD",
  leakageScan: {
    name: "Margin Leakage Scan",
    price: 9500,
    cadence: "once" as const,
    includes: [
      "one diagnostic scan",
      "methodology review",
      "board pack",
      "action workbook",
      "evidence ledger",
      "review meeting",
    ],
  },
  foundingClientScan: {
    name: "Founding Client Scan",
    price: 4950,
    cadence: "once" as const,
    includes: [
      "one diagnostic scan at founding-client pricing",
      "methodology review",
      "board pack",
      "action workbook",
      "evidence ledger",
      "review meeting",
    ],
    caseStudyPermissionSeparate: true,
  },
  marginMonitor: {
    name: "Margin Monitor",
    price: 1950,
    cadence: "month" as const,
    includes: [
      "refreshed scan",
      "prior-period comparison",
      "resolved/new finding tracking",
      "recovery-plan monitoring",
      "trend reporting",
    ],
  },
} as const;

export type CommercialOffer = typeof commercialOffer;
