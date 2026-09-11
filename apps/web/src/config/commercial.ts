import type { CommercialConfig } from '@marginshield/schemas';
import { DEFAULT_COMMERCIAL } from '@marginshield/schemas';

/** All commercial prices live here — never hard-code in components. */
export const commercial: CommercialConfig = { ...DEFAULT_COMMERCIAL };

export const brand = {
  product: 'MarginShield',
  parent: 'Evidence Room',
  lockup: 'MarginShield',
  attribution: 'by Evidence Room',
  category: 'Commercial Margin Control',
  tagline: 'Protect every point of margin.',
  oneLiner:
    'MarginShield reconstructs transaction-level economics across a distributor’s customers and products, identifies document-backed leakage and modelled margin opportunities, traces every finding to source evidence and turns the result into commercial actions.',
} as const;
