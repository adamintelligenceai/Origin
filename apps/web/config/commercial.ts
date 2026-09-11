export const commercial = {
  currency: 'AUD',
  offers: {
    leakageScan: {
      id: 'leakage-scan',
      name: 'Margin Leakage Scan',
      price: 9500,
      cadence: 'once' as const,
      includes: [
        'One diagnostic scan',
        'Methodology review',
        'Board pack',
        'Action workbook',
        'Evidence ledger',
        'Review meeting',
      ],
    },
    foundingScan: {
      id: 'founding-scan',
      name: 'Founding Client Scan',
      price: 4950,
      cadence: 'once' as const,
      limited: true,
      includes: [
        'Founding-client diagnostic scan',
        'Board pack and action workbook',
        'Evidence ledger',
        'Review meeting',
      ],
      note: 'Case-study permission is separately consented. It is never a hidden condition of this price.',
    },
    monitor: {
      id: 'margin-monitor',
      name: 'Margin Monitor',
      price: 1950,
      cadence: 'month' as const,
      includes: [
        'Refreshed scan',
        'Prior-period comparison',
        'Resolved/new finding tracking',
        'Recovery-plan monitoring',
        'Trend reporting',
      ],
    },
  },
} as const;
