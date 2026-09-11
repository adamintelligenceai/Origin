# Technical decisions

## Phase 0

- Replaced the prior Origin eToro dashboard repository with the MarginShield monorepo scaffold per `docs/BLUEPRINT.md`.
- Next.js Google Fonts loader used for Barlow during Phase 0; self-hosted fonts via `next/font/local` planned for Phase 1 to eliminate runtime Google Fonts requests per blueprint §73.
- Synthetic generator CLI writes `ground_truth.json` summary in Phase 0; full Harbourline file generation deferred to Phase 2.
