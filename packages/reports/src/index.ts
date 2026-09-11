export const BOARD_PACK_PAGES = [
  "Cover",
  "Executive answer",
  "Detected vs modelled",
  "The Bleed",
  "Leakage Ledger",
  "Top findings",
  "Recovery plan",
  "Customer/commercial risk",
  "Method and assumptions",
  "Data health, tie-outs and disclaimer",
] as const;

export const ACTION_WORKBOOK_SHEETS = [
  "Executive",
  "Detected leakage",
  "Modelled opportunities",
  "By sales representative",
  "By customer",
  "By product",
  "Recovery plan",
  "Assumptions",
  "Evidence index",
] as const;

export const BOARD_PACK_DISCLAIMER =
  "MarginShield is a commercial diagnostic based on client-supplied data, configured assumptions and the MarginShield methodology. It is not an audit, assurance engagement, valuation opinion or guarantee that identified opportunities will be realised.";

export function reportFooter(input: {
  runHash: string;
  periodLabel: string;
  methodVersion: string;
}): string {
  return `MarginShield by Evidence Room · ${input.periodLabel} · method ${input.methodVersion} · run ${input.runHash}`;
}
