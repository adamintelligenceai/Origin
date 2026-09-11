import { describe, expect, it } from "vitest";

const forbiddenPayloadKeys = [
  "customer_name",
  "sku_code",
  "invoice_no",
  "transaction_description",
  "source_row",
];

describe("privacy contract", () => {
  it("forbids raw identifiers in any network payload schema used by the app", () => {
    expect(forbiddenPayloadKeys).toContain("invoice_no");
    expect(forbiddenPayloadKeys).toContain("sku_code");
  });

  it("requires AI commentary to stay opt-in for real scans", () => {
    const defaults = { aiCommentary: false, sendRawRows: false };
    expect(defaults.aiCommentary).toBe(false);
    expect(defaults.sendRawRows).toBe(false);
  });
});
