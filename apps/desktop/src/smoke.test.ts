import { canModelGrantAutonomy } from "@project-chief/permissions";
import { expect, test } from "vitest";

test("desktop shell cannot let a model grant autonomy", () => {
  expect(canModelGrantAutonomy(4)).toBe(false);
});
