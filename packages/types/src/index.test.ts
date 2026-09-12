import { expect, test } from "vitest";
import type { ActionType } from "./index";

const ACTION_TYPES = [
  "email.draft",
  "email.send",
  "calendar.create",
  "calendar.update",
  "calendar.delete",
] as const satisfies readonly ActionType[];

test("V1 action catalog is a closed set", () => {
  expect(ACTION_TYPES).toHaveLength(5);
});
