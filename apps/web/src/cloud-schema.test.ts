import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const forbidden = [
  "email_body",
  "email_subject",
  "calendar_title",
  "document_content",
  "prompt",
  "model_response",
  "oauth_refresh_token",
  "private_key",
  "life_graph",
  "commitment_statement",
  "action_payload"
];

describe("cloud schema", () => {
  it("rejects forbidden content-bearing fields", () => {
    const raw = readFileSync(
      new URL("../cloud-schema.json", import.meta.url),
      "utf8"
    ).toLowerCase();
    for (const token of forbidden) {
      expect(raw.includes(token)).toBe(false);
    }
  });
});
