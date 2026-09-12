import { expect, test } from "vitest";
import { authorizeExternalContext, minimiseText } from "./index";

test("disallowed data categories fail closed", () => {
  expect(() =>
    authorizeExternalContext({
      purpose: "draft",
      requested: ["email_excerpt"],
      allowed: ["calendar_availability"],
      provider: "openai",
    }),
  ).toThrow(/denied/);
});

test("allowed categories produce a local privacy receipt", () => {
  const receipt = authorizeExternalContext({
    purpose: "conflict-check",
    requested: ["calendar_availability"],
    allowed: ["calendar_availability"],
    provider: "openai",
  });
  expect(receipt.externalModelUsed).toBe(true);
  expect(receipt.categoriesSent).toEqual(["calendar_availability"]);
});

test("minimiseText is a hard character cap until phase 6 redaction exists", () => {
  expect(minimiseText("abcd", 2)).toBe("ab");
});
