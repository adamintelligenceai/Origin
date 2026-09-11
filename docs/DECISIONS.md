# MarginShield Design Decisions

Record departures from `BLUEPRINT.md` here.

## Phase 0

- Initial repository scaffold created from blueprint v2.0.
- Barlow fonts loaded via Next.js font pipeline (self-hosted at build time, no runtime Google Fonts request).

## Phase 2

- Harbourline Trade Supply synthetic generator with seeded Mulberry32 RNG.
- Variants: clean, planted, messy, partial.
- Outputs CSV source files, optional messy XLSX sample, and `ground_truth.json`.
- Planted economics targets match blueprint §68 (A$1.84m addressable, classification split).
- `--scale` parameter for CI-friendly generation without full 1.1m lines.
