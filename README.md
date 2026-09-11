# MarginShield

**Commercial margin control for distributors.**

MarginShield reconstructs transaction-level economics across a distributor's customers and products, identifies document-backed leakage and modelled margin opportunities, traces every finding to source evidence, and turns the result into commercial actions.

**by Evidence Room**

## Stack

- pnpm workspaces + Turborepo
- Next.js (App Router) + React + TypeScript strict
- Tailwind CSS v4 + Ledger design system
- DuckDB-Wasm (browser-local analysis)
- Vitest, fast-check, Playwright, axe

## Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the web app |
| `pnpm build` | Production build |
| `pnpm typecheck` | TypeScript across packages |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit / property tests |
| `pnpm test:golden` | Harbourline golden tests |
| `pnpm test:privacy` | Privacy / network assertions |
| `pnpm e2e` | Playwright end-to-end |
| `pnpm synth` | Generate Harbourline synthetic data |

## Architecture

Raw transaction rows are processed **locally in the browser** (DuckDB-Wasm). The server handles auth, licensing, Stripe, and optional aggregate AI narrative only — never raw rows.

Authoritative product specification: [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md).

## Packages

| Package | Role |
|---|---|
| `apps/web` | Marketing site + scan app |
| `packages/engine` | Deterministic margin engine |
| `packages/ui` | Ledger design system |
| `packages/reports` | Board pack / action workbook |
| `packages/synthetic` | Harbourline generator |
| `packages/schemas` | Shared Zod schemas |
| `packages/api-client` | Typed API client |

## Licence

Proprietary. See `docs/OPEN_SOURCE.md` for third-party attributions.
