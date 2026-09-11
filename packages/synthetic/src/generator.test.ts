import { describe, expect, it } from "vitest";
import { generateHarbourline } from "./generator.js";
import {
  CASH_ENTITLEMENT_TARGET,
  COMPANY,
  DETECTED_LEAKAGE_TARGET,
  MODELLED_TARGET,
  PLANTED_TOTAL,
} from "./config.js";

describe("harbourline generator", () => {
  it("produces deterministic file hashes for the same seed", async () => {
    const a = await generateHarbourline({
      seed: 42,
      variant: "planted",
      outputDir: "/tmp/ms-test-a",
      scale: 0.001,
    });
    const b = await generateHarbourline({
      seed: 42,
      variant: "planted",
      outputDir: "/tmp/ms-test-b",
      scale: 0.001,
    });
    expect(a.groundTruth.file_hashes["transactions.csv"]).toBe(
      b.groundTruth.file_hashes["transactions.csv"],
    );
  });

  it("targets approximately A$85m T12M sales at full scale", async () => {
    const result = await generateHarbourline({
      seed: 42,
      variant: "planted",
      outputDir: "/tmp/ms-revenue-test",
      scale: 0.01,
    });
    const expected = COMPANY.targetT12mRevenue * 0.01;
    expect(result.t12mRevenue).toBeGreaterThan(expected * 0.7);
    expect(result.t12mRevenue).toBeLessThan(expected * 1.3);
  });

  it("plants classification totals matching blueprint targets", async () => {
    const scale = 0.001;
    const result = await generateHarbourline({
      seed: 42,
      variant: "planted",
      outputDir: "/tmp/ms-planted-test",
      scale,
    });
    expect(result.groundTruth.totals.addressable_margin).toBe(Math.round(PLANTED_TOTAL * scale));
    expect(result.groundTruth.totals.detected_leakage).toBe(
      Math.round(DETECTED_LEAKAGE_TARGET * scale),
    );
    expect(result.groundTruth.totals.modelled_opportunity).toBe(Math.round(MODELLED_TARGET * scale));
    expect(result.groundTruth.totals.cash_entitlement).toBe(
      Math.round(CASH_ENTITLEMENT_TARGET * scale),
    );
    expect(result.groundTruth.issues).toHaveLength(10);
  });

  it("matches blueprint planted total of approximately A$1.84m", () => {
    expect(PLANTED_TOTAL).toBeGreaterThan(1_800_000);
    expect(PLANTED_TOTAL).toBeLessThan(1_900_000);
  });

  it("clean variant has no intentional planted cases", async () => {
    const result = await generateHarbourline({
      seed: 42,
      variant: "clean",
      outputDir: "/tmp/ms-clean-test",
      scale: 0.001,
    });
    expect(result.groundTruth.issues).toHaveLength(0);
    expect(result.groundTruth.totals.addressable_margin).toBe(0);
  });
});
