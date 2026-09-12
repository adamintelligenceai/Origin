import { expect, test } from "vitest";
import { routeModel } from "./index";

test("high-sensitivity extraction stays local", () => {
  expect(routeModel("extraction", "high")).toBe("local");
});

test("classification of non-high data uses the economy tier", () => {
  expect(routeModel("classification", "low")).toBe("economy");
});

test("high-value reasoning uses frontier without implying permission", () => {
  expect(routeModel("high_value_reasoning", "high")).toBe("frontier");
});
