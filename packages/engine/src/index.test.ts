import { describe, expect, it } from "vitest";
import { createRunHashInput, ENGINE_VERSION } from "./index.js";

describe("engine", () => {
  it("exports version", () => {
    expect(ENGINE_VERSION).toBe("0.1.0");
  });

  it("creates deterministic run hash input", () => {
    const a = createRunHashInput({ b: "2", a: "1" });
    const b = createRunHashInput({ a: "1", b: "2" });
    expect(a).toBe(b);
    expect(a).toBe("a:1|b:2");
  });
});
