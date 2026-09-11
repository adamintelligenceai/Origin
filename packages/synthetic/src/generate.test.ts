import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { PLANTED_APPROXIMATE_AUD } from "@marginshield/schemas";
import { generateHarbourline } from "./generate";

function hash(contents: string): string {
  return createHash("sha256").update(contents).digest("hex");
}

describe("Harbourline generator", () => {
  it("is deterministic for the same seed and variant", () => {
    const first = generateHarbourline({ seed: 42, variant: "planted", lineTarget: 4000 });
    const second = generateHarbourline({ seed: 42, variant: "planted", lineTarget: 4000 });
    const sales = first.files.find((file) => file.name.includes("sales"));
    const sales2 = second.files.find((file) => file.name.includes("sales"));
    expect(sales).toBeDefined();
    expect(sales2).toBeDefined();
    expect(hash(sales?.contents ?? "")).toBe(hash(sales2?.contents ?? ""));
    expect(first.groundTruth.t12mSalesAud).toBe(second.groundTruth.t12mSalesAud);
  });

  it("produces T12M sales near A$85m after scaling", () => {
    const result = generateHarbourline({ seed: 42, variant: "planted", lineTarget: 8000 });
    expect(result.groundTruth.t12mSalesAud).toBeGreaterThan(80_000_000);
    expect(result.groundTruth.t12mSalesAud).toBeLessThan(90_000_000);
  });

  it("plants the blueprint totals on the planted variant", () => {
    const result = generateHarbourline({ seed: 42, variant: "planted", lineTarget: 2000 });
    expect(result.groundTruth.totals.totalAddressable).toBe(
      PLANTED_APPROXIMATE_AUD.totalAddressable,
    );
    expect(result.groundTruth.totals.detectedOrPolicy).toBe(
      PLANTED_APPROXIMATE_AUD.detectedOrPolicy,
    );
    expect(result.groundTruth.totals.modelledOpportunity).toBe(
      PLANTED_APPROXIMATE_AUD.modelledOpportunity,
    );
    expect(result.groundTruth.totals.cashEntitlement).toBe(PLANTED_APPROXIMATE_AUD.cashEntitlement);
    expect(result.groundTruth.planted).toHaveLength(10);
  });

  it("does not plant intentional cases on the clean variant", () => {
    const result = generateHarbourline({ seed: 42, variant: "clean", lineTarget: 1000 });
    expect(result.groundTruth.planted).toEqual([]);
    expect(result.groundTruth.totals.totalAddressable).toBe(0);
  });

  it("omits agreement and freight files on the partial variant", () => {
    const result = generateHarbourline({ seed: 42, variant: "partial", lineTarget: 500 });
    expect(result.files.some((file) => file.name === "customer_agreements.csv")).toBe(false);
    expect(result.files.some((file) => file.name === "freight.csv")).toBe(false);
  });

  it("does not use real brand names", () => {
    const result = generateHarbourline({ seed: 42, variant: "planted", lineTarget: 500 });
    const blob = result.files.map((file) => file.contents).join("\n");
    expect(blob).not.toMatch(/Apple|Microsoft|Schneider|Reece|Blackwoods/i);
  });
});
