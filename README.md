# MarginShield

**Protect every point of margin.**

MarginShield reconstructs transaction-level economics across a distributor's customers and products, identifies document-backed leakage and modelled margin opportunities, traces every finding to source evidence and turns the result into commercial actions.

by Evidence Room

## What this is

Commercial margin control for mid-market distributors. Files in, evidence-backed findings out. Transaction rows are processed locally in the browser — they are not uploaded to MarginShield servers.

## Repository

pnpm workspaces + Turborepo.

| Path | Role |
| --- | --- |
| `apps/web` | Next.js marketing site, demo scan and authenticated application |
| `packages/engine` | Deterministic calculation engine |
| `packages/synthetic` | Harbourline Trade Supply generator |
| `packages/schemas` | Canonical Zod schemas |
| `packages/ui` | Ledger design system |
| `packages/reports` | Board pack, action workbook, evidence ledger |
| `packages/api-client` | Licence, billing and narrative client types |

Authoritative specification: [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md).

## Prerequisites

- Node.js 20+
- pnpm 10

## Getting started

```bash
pnpm install
pnpm synth -- --seed 42 --variant planted
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The demo scan uses the fictional company **Harbourline Trade Supply Pty Ltd**. It is not a real customer.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Next.js development server |
| `pnpm build` | Production build |
| `pnpm typecheck` | TypeScript across the workspace |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit, property and golden tests |
| `pnpm test:golden` | Harbourline detector accuracy |
| `pnpm test:privacy` | Network isolation / payload tests |
| `pnpm e2e` | Playwright |
| `pnpm synth` | Generate Harbourline source files |

## Privacy

Raw transaction rows never leave the browser in v1. Optional AI commentary uses aggregate fact tokens only, and is off by default for real scans.

## Licence

Proprietary. See `docs/OPEN_SOURCE.md` for third-party notices.
