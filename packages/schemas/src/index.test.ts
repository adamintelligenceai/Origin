import { describe, expect, it } from "vitest";
import { CHECK_IDS, VALUE_CLASSES } from "./enums";
import { GOLDEN_THRESHOLDS, PLANTED_APPROXIMATE_AUD } from "./harbourline";
import { COVERAGE_WEIGHTS } from "./method-config";

describe("schemas", () => {
  it("includes every check family detector", () => {
    expect(CHECK_IDS).toEqual([
      "B1",
      "B2",
      "B3",
      "S1",
      "S2",
      "S3",
      "P1",
      "P2",
      "P3",
      "P4",
      "P5",
      "P6",
      "P7",
    ]);
  });

  it("keeps detected leakage distinct from modelled opportunity", () => {
    expect(VALUE_CLASSES).toContain("DETECTED_LEAKAGE");
    expect(VALUE_CLASSES).toContain("MODELLED_MARGIN_OPPORTUNITY");
    expect(VALUE_CLASSES).not.toContain("GROSS_LEAKAGE");
  });

  it("coverage weights sum to 100", () => {
    const total = Object.values(COVERAGE_WEIGHTS).reduce((sum, weight) => sum + weight, 0);
    expect(total).toBe(100);
  });

  it("matches blueprint golden thresholds", () => {
    expect(GOLDEN_THRESHOLDS.plantedPairRecall).toBe(0.95);
    expect(GOLDEN_THRESHOLDS.economicTotalTolerance).toBe(0.03);
    expect(GOLDEN_THRESHOLDS.headlineTotalTolerance).toBe(0.02);
  });

  it("planted totals classify into detected vs modelled buckets", () => {
    const detected =
      PLANTED_APPROXIMATE_AUD.P1 +
      PLANTED_APPROXIMATE_AUD.S1 +
      PLANTED_APPROXIMATE_AUD.S2 +
      PLANTED_APPROXIMATE_AUD.S3 +
      PLANTED_APPROXIMATE_AUD.B1;
    const modelled =
      PLANTED_APPROXIMATE_AUD.P2 +
      PLANTED_APPROXIMATE_AUD.P3 +
      PLANTED_APPROXIMATE_AUD.P4 +
      PLANTED_APPROXIMATE_AUD.P5 +
      PLANTED_APPROXIMATE_AUD.P6;
    expect(detected).toBe(PLANTED_APPROXIMATE_AUD.detectedOrPolicy);
    expect(modelled).toBe(PLANTED_APPROXIMATE_AUD.modelledOpportunity);
    expect(detected + modelled).toBe(PLANTED_APPROXIMATE_AUD.totalAddressable);
  });
});
