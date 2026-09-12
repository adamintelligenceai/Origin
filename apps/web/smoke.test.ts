import { describe, expect, it } from "vitest";

describe("web scaffold", () => {
  it("reserves cloud for account metadata only", () => {
    expect(["account_id", "plan"]).not.toContain("email_body");
  });
});
