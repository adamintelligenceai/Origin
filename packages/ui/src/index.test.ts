import { describe, expect, it } from "vitest";
import { formatMoney, cn } from "./index.js";

describe("ui", () => {
  it("formats money with accounting negatives", () => {
    expect(formatMoney(-1000)).toContain("(");
  });

  it("formats compact money", () => {
    expect(formatMoney(796000, { compact: true })).toBe("A$796k");
  });

  it("merges class names", () => {
    expect(cn("a", undefined, "c")).toBe("a c");
  });
});
