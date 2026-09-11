import { describe, expect, it } from "vitest";
import * as fc from "fast-check";
import { makeFindingId } from "./finding-id";
import { makeRunHash } from "./run-hash";
import { allocateSellTranches } from "./tranche";

describe("finding id", () => {
  it("is stable for the same grain and prefixed with MSF-", () => {
    const input = {
      checkId: "P3",
      grainKeys: { sku: "SKU-1", customer_id: "C-014" },
      periodEnd: "2026-06-30",
    };
    const first = makeFindingId(input);
    const second = makeFindingId({
      ...input,
      grainKeys: { customer_id: "C-014", sku: "SKU-1" },
    });
    expect(first).toBe(second);
    expect(first).toMatch(/^MSF-[0-9a-f]{24}$/);
  });

  it("changes when the check or period changes", () => {
    const base = {
      grainKeys: { customer_id: "C-1" },
      periodEnd: "2026-06-30",
    };
    expect(makeFindingId({ ...base, checkId: "P1" })).not.toBe(
      makeFindingId({ ...base, checkId: "P2" }),
    );
  });
});

describe("run hash", () => {
  it("is deterministic and independent of object key order and file hash order", () => {
    const a = makeRunHash({
      sourceFileHashes: ["bbb", "aaa"],
      mappingProfile: { sales: "invoice_no" },
      methodConfiguration: { materiality: 250 },
      analysisPeriod: { start: "2025-07-01", end: "2026-06-30" },
      currencyConfiguration: { reporting: "AUD" },
    });
    const b = makeRunHash({
      sourceFileHashes: ["aaa", "bbb"],
      mappingProfile: { sales: "invoice_no" },
      methodConfiguration: { materiality: 250 },
      analysisPeriod: { start: "2025-07-01", end: "2026-06-30" },
      currencyConfiguration: { reporting: "AUD" },
    });
    expect(a).toBe(b);
    expect(a).toHaveLength(64);
  });

  it("does not include a timestamp", () => {
    const hash = makeRunHash({
      sourceFileHashes: ["abc"],
      mappingProfile: {},
      methodConfiguration: {},
      analysisPeriod: { start: "2025-07-01", end: "2026-06-30" },
      currencyConfiguration: { reporting: "AUD" },
    });
    expect(hash).not.toMatch(/2026-09-11/);
  });
});

describe("sell-side tranche allocation", () => {
  it("sums to the maximum overlapping gap", () => {
    const result = allocateSellTranches([
      { checkId: "P1", gap: 100 },
      { checkId: "P3", gap: 180 },
      { checkId: "P5", gap: 40 },
    ]);
    const allocatedSum = result.reduce((sum, row) => sum + row.allocated, 0);
    expect(allocatedSum).toBe(180);
    expect(result.find((row) => row.checkId === "P1")?.allocated).toBe(100);
    expect(result.find((row) => row.checkId === "P3")?.allocated).toBe(80);
    expect(result.find((row) => row.checkId === "P5")?.allocated).toBe(0);
  });

  it("property: sum(allocated) equals max(gap) for non-negative gaps", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 0, max: 1_000_000 }), { minLength: 6, maxLength: 6 }),
        (values) => {
          const checks = ["P1", "P2", "P3", "P4", "P5", "P6"] as const;
          const gaps = checks.map((checkId, index) => ({
            checkId,
            gap: values[index] ?? 0,
          }));
          const result = allocateSellTranches(gaps);
          const allocatedSum = result.reduce((sum, row) => sum + row.allocated, 0);
          const maxGap = Math.max(...gaps.map((gap) => gap.gap), 0);
          expect(allocatedSum).toBe(maxGap);
        },
      ),
    );
  });
});
