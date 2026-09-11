/** Commercial pricing — single source of truth per blueprint §4 */

export interface PricePoint {
  aud: number;
  description: string;
}

export const COMMERCIAL = {
  marginLeakageScan: {
    aud: 9_500,
    description:
      'One diagnostic scan, methodology review, board pack, action workbook, evidence ledger and review meeting.',
  },
  foundingClientScan: {
    aud: 4_950,
    description: 'Limited founding-client offer. Case-study permission is separately consented.',
  },
  marginMonitor: {
    aud: 1_950,
    per: 'month' as const,
    description:
      'Refreshed scan, prior-period comparison, resolved/new finding tracking, recovery-plan monitoring and trend reporting.',
  },
} satisfies Record<string, PricePoint | (PricePoint & { per: 'month' })>;
