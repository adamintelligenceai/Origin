/**
 * Ledger design tokens.
 * CSS must consume these via custom properties, not raw hex in components.
 */
export const LEDGER_TOKENS = {
  ledger: "#EEF1EA",
  folio: "#FAFBF8",
  ink: "#16233B",
  ink2: "#3C4A60",
  ruling: "#6F879F",
  rulingSoft: "#D5DEE7",
  redInk: "#B42318",
  bank: "#1E6B47",
  manila: "#D8C69A",
} as const;

export const FAMILY_HUES = {
  BUY: "#2F5D50",
  SERVE: "#4A5C8A",
  SELL: "#8A4A2F",
} as const;

export type LedgerTokenName = keyof typeof LEDGER_TOKENS;
