import { describe, expect, it } from "vitest";

describe("performance contract", () => {
  it("records the Harbourline engineering benchmark, not a customer guarantee", () => {
    const benchmark = {
      lines: 1_100_000,
      targetSeconds: 45,
      note: "Reference Apple Silicon Mac + current Chrome",
    };
    expect(benchmark.targetSeconds).toBe(45);
  });
});
