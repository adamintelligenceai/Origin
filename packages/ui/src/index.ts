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

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
