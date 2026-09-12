import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const forbidden = [
  "email_body",
  "email_subject",
  "oauth_refresh_token",
  "private_key",
  "prompt",
  "model_response",
  "action_payload",
];

test("control-plane schema stays content-blind", () => {
  const raw = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "cloud-schema.json"),
    "utf8",
  ).toLowerCase();
  for (const token of forbidden) {
    expect(raw.includes(token), token).toBe(false);
  }
});
