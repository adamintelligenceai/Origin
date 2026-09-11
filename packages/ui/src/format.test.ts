import { describe, expect, it } from "vitest";
import { LEDGER_TOKENS } from "./tokens";
import { contrastRatio, formatMoney, formatPercentage } from "./format";

describe("ledger formatters", () => {
  it("uses accounting parentheses for negatives", () => {
    expect(formatMoney(-1234.5)).toBe("(A$1,234.50)");
    expect(formatPercentage(-2.4)).toBe("(2.4%)");
  });

  it("compacts large Australian amounts", () => {
    expect(formatMoney(796_000, { compact: true })).toBe("A$796k");
    expect(formatMoney(1_040_000, { compact: true })).toBe("A$1.04m");
  });
});

describe("ledger contrast", () => {
  it("meets WCAG AA for body ink on folio and ledger", () => {
    expect(contrastRatio(LEDGER_TOKENS.ink, LEDGER_TOKENS.folio)).toBeGreaterThanOrEqual(7);
    expect(contrastRatio(LEDGER_TOKENS.ink, LEDGER_TOKENS.ledger)).toBeGreaterThanOrEqual(7);
    expect(contrastRatio(LEDGER_TOKENS.redInk, LEDGER_TOKENS.folio)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(LEDGER_TOKENS.bank, LEDGER_TOKENS.folio)).toBeGreaterThanOrEqual(4.5);
  });
});
