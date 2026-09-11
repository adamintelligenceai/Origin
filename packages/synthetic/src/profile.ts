/** Fictional demonstration company — never present as a real customer. */
export const HARBOURLINE_PROFILE = {
  name: 'Harbourline Trade Supply Pty Ltd',
  fictional: true as const,
  approxT12mRevenueAud: 85_000_000,
  sectors: ['HVAC', 'Electrical', 'Plumbing'] as const,
  branches: 6,
} as const;
