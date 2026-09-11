# MarginShield

**Commercial margin control** for distributors — by Evidence Room.

MarginShield reconstructs transaction-level economics across customers and products, identifies document-backed leakage and modelled margin opportunities, traces every finding to source evidence and turns the result into commercial actions.

`docs/BLUEPRINT.md` is the authoritative product specification.

## Repository structure

```text
marginshield/
├── apps/web/           Next.js application (marketing, demo, authenticated app)
├── packages/
│   ├── engine/         Deterministic calculation engine
│   ├── ui/             Ledger design system components
│   ├── reports/        Board pack and export generators
│   ├── synthetic/      Harbourline synthetic data generator
│   ├── schemas/        Shared Zod schemas
│   └── api-client/     Server API client
├── tests/              Golden, privacy, security, e2e
└── docs/               Blueprint, method, security documentation
```

## Getting started

```bash
pnpm install
pnpm dev          # Start Next.js at http://localhost:3000
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development servers |
| `pnpm build` | Production build |
| `pnpm typecheck` | TypeScript strict check |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit tests |
| `pnpm test:golden` | Golden / ground-truth tests |
| `pnpm test:privacy` | Privacy assertion tests |
| `pnpm e2e` | Playwright end-to-end tests |
| `pnpm synth` | Generate synthetic Harbourline data |

## Privacy

Transaction files are processed locally in the browser. Raw row-level data is not uploaded to the server in v1.

## Licence

Proprietary — Evidence Room.
