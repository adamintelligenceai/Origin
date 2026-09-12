import { describe, expect, it } from "vitest";
import { authorizeExternalContext } from "./index";

describe("authorizeExternalContext", () => {
  it("fails closed when requested categories exceed allowlist", () => {
    expect(() =>
      authorizeExternalContext({
        purpose: "draft",
        requested: ["email_excerpt", "document_excerpt"],
        allowed: ["email_excerpt"],
        provider: "openai"
      })
    ).toThrow(/denied categories/);
  });

  it("returns a privacy receipt for allowed categories", () => {
    const receipt = authorizeExternalContext({
      purpose: "draft",
      requested: ["email_excerpt"],
      allowed: ["email_excerpt", "document_excerpt"],
      provider: "openai"
    });
    expect(receipt.externalModelUsed).toBe(true);
    expect(receipt.categoriesSent).toEqual(["email_excerpt"]);
  });
});
