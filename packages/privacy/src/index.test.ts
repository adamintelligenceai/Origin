import { describe, expect, it } from "vitest";
import { authorizeExternalContext, prepareExternalContext } from "./index.js";

describe("PrivacyGateway", () => {
  it("rejects disallowed categories", () => {
    expect(() =>
      authorizeExternalContext({
        purpose: "draft",
        requested: ["email_excerpt"],
        allowed: ["calendar_availability"]
      })
    ).toThrow(/denied/);
  });

  it("minimises and pseudonymises before an external call", () => {
    const result = prepareExternalContext({
      purpose: "extract_commitments",
      text: "Jordan Blake promised the proposal by Friday.",
      requested: ["email_excerpt"],
      allowed: ["email_excerpt"],
      sensitivity: "medium",
      maxChars: 40,
      provider: "openai",
      identities: { "Jordan Blake": "Person-A" }
    });
    expect(result.text).toContain("Person-A");
    expect(result.text).not.toContain("Jordan Blake");
    expect(result.receipt.externalModelUsed).toBe(true);
    expect(result.receipt.categoriesSent).toEqual(["email_excerpt"]);
  });
});
