# MarginShield

**Commercial margin control for distributors**

MarginShield reconstructs transaction-level economics across a distributor's customers and products, identifies document-backed leakage and modelled margin opportunities, traces every finding to source evidence and turns the result into commercial actions.

by Evidence Room

## Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start development servers |
| `pnpm build` | Production build |
| `pnpm typecheck` | TypeScript check |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit tests |
| `pnpm test:golden` | Golden / regression tests |
| `pnpm test:privacy` | Privacy tests |
| `pnpm e2e` | Playwright E2E |
| `pnpm synth` | Generate synthetic Harbourline data |

## Architecture

Monorepo with pnpm workspaces and Turborepo:

- `apps/web` — Next.js application (marketing, demo, authenticated app)
- `packages/engine` — Deterministic margin analysis engine
- `packages/ui` — Ledger design system
- `packages/schemas` — Shared Zod schemas
- `packages/synthetic` — Harbourline synthetic data generator
- `packages/reports` — PDF and Excel report generation
- `packages/api-client` — Server API client

## Documentation

Single source of truth: [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md)

## Privacy

Transaction files are processed locally in the browser. Raw row data is not uploaded to MarginShield servers in v1.

## Licence

Proprietary — Evidence Room
