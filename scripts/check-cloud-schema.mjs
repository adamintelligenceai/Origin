import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const candidates = [path.join(root, "apps", "web", "cloud-schema.json")];

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

let failed = false;

for (const file of candidates) {
  if (!fs.existsSync(file)) continue;
  const raw = fs.readFileSync(file, "utf8").toLowerCase();
  for (const token of forbidden) {
    if (raw.includes(token)) {
      console.error(`Forbidden cloud schema token "${token}" found in ${file}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log("Cloud schema guard passed.");
