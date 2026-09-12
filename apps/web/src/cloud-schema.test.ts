import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
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

  it("keeps API route sources free of forbidden content fields", () => {
    const root = new URL("../app/api", import.meta.url);
    const files = collectTs(root.pathname);
    const joined = files.map((file) => readFileSync(file, "utf8").toLowerCase()).join("\n");
    for (const token of forbidden) {
      expect(joined.includes(token)).toBe(false);
    }
  });
});

function collectTs(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const next = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectTs(next));
    } else if (entry.name.endsWith(".ts")) {
      files.push(next);
    }
  }
  return files;
}
