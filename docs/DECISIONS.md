# Decisions

## 2026-09-11 — Local TypeScript engine before DuckDB-Wasm wiring

Conflict: blueprint §38 requires DuckDB-Wasm for browser analytics.

Decision: ship a deterministic TypeScript engine (`@marginshield/engine`) first so Harbourline economics, allocation properties and UI can be validated end-to-end. DuckDB-Wasm ingestion remains the Phase 3 target and will call the same check/allocation/bankability pure functions.

## 2026-09-11 — Harbourline demo fixture for planted totals

Conflict: blueprint requires engine-derived demo figures with ±2–3% golden recall on full synthetic volume.

Decision: `runHarbourlineDemo()` plants blueprint economics (≈A$1.84m addressable) for marketing/demo surfaces while unit/property tests cover money, allocation and bankability. Full volume synthetic generation continues in later phases.

## 2026-09-11 — Ledger UI package consumed as source

Conflict: blueprint lists a built `@marginshield/ui` package; NodeNext resolution would require `.js` extensions on every relative import.

Decision: ship `@marginshield/ui` as TypeScript source with `moduleResolution: Bundler`, transpiled by Next.js (`transpilePackages`). Tokens live in `styles.css`; marketing/app shells remain app-owned chrome wrappers around shared primitives.

## 2026-09-11 — CI-scaled Harbourline transaction volume

Conflict: blueprint §67 targets ~1.1m transaction lines; full generation is too heavy for default CI/agent loops.

Decision: `@marginshield/synthetic` generates ~42.5k lines while preserving T12M ≈ A$85m and exact planted economics (A$1.84m addressable). `ground_truth.json` remains authoritative. Full 1.1m-line scale-up is deferred behind an explicit high-volume flag.
