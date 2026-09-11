#!/usr/bin/env node
/**
 * Licence inventory and deny-list check.
 * Walks installed package.json files rather than `pnpm licenses`,
 * which can fail when the global store index is incomplete.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DENY = new Set(["GPL-2.0", "GPL-3.0", "AGPL-3.0", "AGPL-1.0", "SSPL-1.0"]);
const ROOT = process.cwd();
const PNPM_DIR = join(ROOT, "node_modules", ".pnpm");

function extractLicense(pkg) {
  if (typeof pkg.license === "string") return pkg.license;
  if (Array.isArray(pkg.licenses)) {
    return pkg.licenses
      .map((item) => (typeof item === "string" ? item : item.type))
      .filter(Boolean)
      .join(" OR ");
  }
  if (pkg.license && typeof pkg.license === "object" && pkg.license.type) {
    return pkg.license.type;
  }
  return "UNKNOWN";
}

function collect() {
  const rows = new Map();
  let entries = [];
  try {
    entries = readdirSync(PNPM_DIR, { withFileTypes: true });
  } catch {
    throw new Error("node_modules/.pnpm not found. Run pnpm install first.");
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pkgPath = join(PNPM_DIR, entry.name, "node_modules");
    let children = [];
    try {
      children = readdirSync(pkgPath, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const child of children) {
      const names = child.name.startsWith("@")
        ? readdirSync(join(pkgPath, child.name)).map((scoped) => `${child.name}/${scoped}`)
        : [child.name];
      for (const name of names) {
        if (name.startsWith("@marginshield/")) continue;
        let manifest;
        try {
          manifest = JSON.parse(readFileSync(join(pkgPath, name, "package.json"), "utf8"));
        } catch {
          continue;
        }
        const license = extractLicense(manifest);
        const key = `${manifest.name}@${manifest.version}`;
        rows.set(key, {
          name: manifest.name,
          version: manifest.version,
          license,
        });
      }
    }
  }

  return [...rows.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function licenseDenied(license) {
  return license
    .split(/ OR | AND |\/|\+/)
    .map((part) => part.replace(/[()]/g, "").trim())
    .some(
      (part) => DENY.has(part) || DENY.has(`${part}-only`) || DENY.has(part.replace("-only", "")),
    );
}

const rows = collect();
const denied = rows.filter((row) => licenseDenied(row.license));

if (denied.length > 0) {
  console.error("Disallowed licences detected:");
  for (const row of denied) {
    console.error(`- ${row.name}@${row.version} (${row.license})`);
  }
  process.exit(1);
}

const lines = [
  "# Open-source disclosures",
  "",
  "MarginShield uses third-party open-source software. This inventory is generated from installed packages by `pnpm audit:licences`.",
  "",
  "SheetJS Community Edition, where used for `.xlsx` parsing, is Apache-2.0 and must retain its copyright notice.",
  "",
  "This product is not an audit opinion and does not claim that a client-side method pack hides proprietary methodology.",
  "",
  "| Package | Licence | Version |",
  "| --- | --- | --- |",
  ...rows.map((row) => `| ${row.name} | ${row.license} | ${row.version} |`),
  "",
];

writeFileSync(join(ROOT, "docs/OPEN_SOURCE.md"), lines.join("\n"));
console.log(`Wrote docs/OPEN_SOURCE.md (${rows.length} packages).`);
