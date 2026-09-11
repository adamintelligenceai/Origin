# Decisions

## 2026-09-11 — Local TypeScript engine before DuckDB-Wasm wiring

Conflict: blueprint §38 requires DuckDB-Wasm for browser analytics.

Decision: ship a deterministic TypeScript engine (`@marginshield/engine`) first so Harbourline economics, allocation properties and UI can be validated end-to-end. DuckDB-Wasm ingestion remains the Phase 3 target and will call the same check/allocation/bankability pure functions.

## 2026-09-11 — Harbourline demo fixture for planted totals

Conflict: blueprint requires engine-derived demo figures with ±2–3% golden recall on full synthetic volume.

Decision: `runHarbourlineDemo()` plants blueprint economics (≈A$1.84m addressable) for marketing/demo surfaces while unit/property tests cover money, allocation and bankability. Full volume synthetic generation continues in later phases.
