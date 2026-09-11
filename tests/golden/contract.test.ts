import { describe, expect, it } from "vitest";
import { GOLDEN_THRESHOLDS, PLANTED_APPROXIMATE_AUD } from "@marginshield/schemas";

describe("golden suite contract", () => {
  it("holds Harbourline planted totals as generator targets, not dashboard hard-codes", () => {
    expect(PLANTED_APPROXIMATE_AUD.totalAddressable).toBe(1_840_000);
    expect(GOLDEN_THRESHOLDS.plantedPairRecall).toBeGreaterThanOrEqual(0.95);
  });
});
