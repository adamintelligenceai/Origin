# Open Source

Third-party software used by MarginShield is listed below. Keep this inventory current when dependencies change.

## Attribution notes

- **SheetJS Community Edition** — used for `.xlsx` parsing where licensed for this use. Include required attribution in product About / Open Source screens.
- **DuckDB / DuckDB-Wasm** — MIT
- **Apache Arrow** — Apache-2.0
- **Next.js / React** — MIT
- **Zod**, **Papa Parse**, **Vitest**, **Playwright**, **fast-check** — MIT / Apache as applicable

## Licence scan

Run `pnpm licence:audit` in CI (Phase 0+). Do not ship incompatible licences without a documented decision in `DECISIONS.md`.

## Generating inventory

After `pnpm install`, licence audit script walks the lockfile and emits a summary. Full SPDX inventory is generated in CI artefacts.
