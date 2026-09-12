import { expect, test } from "vitest";

test("mobile companion does not ship a cloud content endpoint in phase 0", () => {
  expect(process.env.EXPO_PUBLIC_PROJECT_CHIEF_CONTENT_API).toBeUndefined();
});
