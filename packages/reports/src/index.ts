import type { ScanHeadlines } from '@marginshield/schemas';

export const BOARD_PACK_DISCLAIMER =
  'MarginShield is a commercial diagnostic based on client-supplied data, configured assumptions and the MarginShield methodology. It is not an audit, assurance engagement, valuation opinion or guarantee that identified opportunities will be realised.';

export interface BoardPackMeta {
  period: string;
  runHash: string;
  methodVersion: string;
  generatedAt: string;
}

export function buildExecutiveSummary(headlines: ScanHeadlines): string {
  const detected = headlines.detected_leakage.amount;
  const modelled = headlines.modelled_margin_opportunity.amount;
  const bankable = headlines.expected_bankable_base.amount;

  return `MarginShield identified A$${detected} of detected leakage and A$${modelled} of modelled commercial opportunity in the supplied dataset. Under the base-case planning assumptions, A$${bankable} is classified as expected bankable value over the next 12 months.`;
}
