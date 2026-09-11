# Decisions

Record intentional departures from `docs/BLUEPRINT.md` here.

| Date | Decision | Rationale | Blueprint section |
|---|---|---|---|
| 2026-09-11 | Package scope `@marginshield/*` | npm-safe scoped names matching product brand | §57 |
| 2026-09-11 | Phase 0 scaffolds packages with stub exports until each phase lands | Sequential phase rule; keep typecheck green | §110 |
| 2026-09-11 | Australian spelling `licence:audit` script | Matches AU English product copy | §56 |

| 2026-09-11 | Next.js webpack `extensionAlias` maps `.js` → `.ts` for workspace source packages | Allows TypeScript ESM `.js` import specifiers while `transpilePackages` consumes source | §58 |
| 2026-09-11 | Phase 0 package exports point at `src/` until packages emit `dist/` in CI build graph | Keeps local DX simple; Next transpilePackages consumes TS directly | §110 |
