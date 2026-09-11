export const LEDGER_TOKENS = {
  ledger: "var(--ledger)",
  folio: "var(--folio)",
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  ruling: "var(--ruling)",
  rulingSoft: "var(--ruling-soft)",
  redInk: "var(--red-ink)",
  bank: "var(--bank)",
  manila: "var(--manila)",
  familyBuy: "var(--family-buy)",
  familyServe: "var(--family-serve)",
  familySell: "var(--family-sell)",
} as const;

export const FAMILY_HUES = {
  BUY: { label: "Buy", cssVar: "--family-buy", className: "text-[var(--family-buy)]" },
  SERVE: { label: "Serve", cssVar: "--family-serve", className: "text-[var(--family-serve)]" },
  SELL: { label: "Sell", cssVar: "--family-sell", className: "text-[var(--family-sell)]" },
} as const;
