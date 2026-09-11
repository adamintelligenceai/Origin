# Design and technical decisions

`docs/BLUEPRINT.md` is authoritative. This file records departures, interpretations and implementation choices.

## D001 — Compact Harbourline default for tests and demo

**Decision.** Default `pnpm synth` and in-app demo generation use `--scale compact` (approximately 8–12k transaction lines, T12M sales still approximately A$85m). `--scale full` remains available for the 1.1m-line engineering benchmark.

**Rationale.** A 1.1m-line fixture is too large to commit, too slow for unit/golden CI, and unnecessary to prove detector correctness. Planted economics and classification totals are preserved at compact scale.

**Blueprint.** §67, §109, §112.

## D002 — Decimal money in TypeScript; DuckDB-Wasm reserved for large-file load

**Decision.** Authoritative check arithmetic uses `decimal.js` with 28-digit precision, bankers' rounding, money quantized to 4 decimal places and rates to 8. File parse, mapping and `runScan` run in-process (and in `apps/web/workers/scan.worker.ts` when the bundler can instantiate it). DuckDB-Wasm is not the money path in v1. SQL projections live in `packages/engine/src/sql/views.sql` for the future large-file loader.

**Rationale.** Native DuckDB bindings are not portable across the browser worker and Vitest. The TypeScript engine is deterministic, testable and matches the DECIMAL discipline. Shipping a second arithmetic engine before the golden tests are the single source of truth would create silent drift.

**Blueprint.** §38, §40, §58, §59, `.cursor/rules/30-engine.mdc`.

## D003 — Demo dashboard is the same application as authenticated scans

**Decision.** `/demo` loads Harbourline into the same scan store and app shell used by `/scan`. Marketing headline figures are produced by calling the engine on synthetic data at render time, not by hard-coded constants.

**Blueprint.** §68, §85, §118, §122.

## D004 — P1 back-billing is opt-in

**Decision.** P1 under-billing is always `DETECTED_LEAKAGE`. `CASH_ENTITLEMENT` is recorded only when `methodConfig.p1BackBillingEnabled` is true. Default is false.

**Blueprint.** §30 P1.

## D005 — Elasticity model not implemented

**Decision.** v1 exposes static-volume upside and user-adjusted volume via a manual slider. No regression-based elasticity.

**Blueprint.** §26.

## D007 — COEP not global

**Decision.** Cross-Origin-Embedder-Policy is not set on all routes because it breaks the Next.js document bootstrap. COOP, CSP, frame-ancestors and worker isolation still apply. COEP will be added on the analysis worker bootstrap path when threaded Wasm is enabled for large-file mode.

**Blueprint.** §49.

## D006 — Origin repository replaced

**Decision.** This repository previously hosted an eToro portfolio dashboard branded Origin. The product specified by `docs/BLUEPRINT.md` is MarginShield. No Origin/eToro dashboard code remains. The public brand is MarginShield; parent attribution is Evidence Room. Adam Intelligence must not appear in product copy.

**Blueprint.** §1.3.

## D008 — .msproj uses Argon2id via hash-wasm

**Decision.** Local project encryption uses Argon2id (`hash-wasm`) with m=19456 KiB, t=2, p=1, then AES-256-GCM with a random 12-byte nonce. Default export omits raw tables.

**Blueprint.** §45.
