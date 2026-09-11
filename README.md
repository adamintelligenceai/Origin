# MarginShield

**Protect every point of margin.**

MarginShield reconstructs transaction-level economics across a distributor's customers and products, identifies document-backed leakage and modelled margin opportunities, traces every finding to source evidence and turns the result into commercial actions.

Customer-facing brand: **MarginShield**. Parent attribution: **by Evidence Room**.

`docs/BLUEPRINT.md` is the single source of truth.

## Architecture

Local-first. Sales, cost, freight and agreement files are processed in the browser with DuckDB-Wasm. The server holds auth, licensing, billing and optional aggregate commentary — not raw transaction rows.

## Requirements

- Node.js 22+
- pnpm 10.33.3

## Commands

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm test
pnpm test:golden
pnpm test:privacy
pnpm e2e
pnpm synth
pnpm build
```

Copy `.env.example` to `apps/web/.env.local` for optional server integrations. The product must run without `ANTHROPIC_API_KEY`.

## Packages

| Package               | Role                                    |
| --------------------- | --------------------------------------- |
| `apps/web`            | Next.js marketing, demo and application |
| `packages/engine`     | Deterministic calculation engine        |
| `packages/ui`         | Ledger design system                    |
| `packages/reports`    | Board pack and action workbook          |
| `packages/synthetic`  | Harbourline Trade Supply generator      |
| `packages/schemas`    | Shared types and method configuration   |
| `packages/api-client` | Licence and metadata types              |

## Synthetic company

Harbourline Trade Supply Pty Ltd is a **fictional demonstration company**. Never hard-code its planted headline figures into the dashboard; those values come from the engine.
