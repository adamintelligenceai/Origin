import { describe, expect, it } from "vitest";
import { routeModel } from "./index";

describe("routeModel", () => {
  it("keeps high-sensitivity extraction local", () => {
    expect(routeModel("extraction", "high")).toBe("local");
  });

  it("routes drafting to the standard tier", () => {
    expect(routeModel("draft", "medium")).toBe("standard");
  });
});
