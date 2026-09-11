import { describe, expect, it } from "vitest";
import { ValueClassSchema, CheckIdSchema } from "./index.js";

describe("schemas", () => {
  it("validates value classes", () => {
    expect(ValueClassSchema.parse("DETECTED_LEAKAGE")).toBe("DETECTED_LEAKAGE");
  });

  it("validates check ids", () => {
    expect(CheckIdSchema.parse("P1")).toBe("P1");
  });
});
