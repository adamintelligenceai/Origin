# MarginShield

**MarginShield by Evidence Room** — commercial margin control for distributors.

## Quick start

```bash
pnpm install
pnpm --filter @marginshield/schemas build
pnpm --filter @marginshield/engine build
pnpm --filter @marginshield/web dev
```

Open [http://localhost:3000](http://localhost:3000). Demo scan: `/demo`. Executive view: `/app`.

## Packages

- `apps/web` — Next.js marketing site + demo/app
- `packages/engine` — deterministic calculation engine
- `packages/schemas` — shared Zod schemas
- `packages/synthetic` — Harbourline generator (in progress)
- `packages/ui` / `reports` / `api-client` — scaffolded

## Commands

| Command | Purpose |
|---|---|
| `pnpm --filter @marginshield/web dev` | Local web |
| `pnpm --filter @marginshield/engine test` | Engine unit tests |
| `pnpm --filter @marginshield/web build` | Production build |

Authoritative product specification: `docs/BLUEPRINT.md`.
