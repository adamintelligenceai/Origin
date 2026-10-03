# Origin

Origin is a portfolio dashboard built on the [eToro Public API](https://public-api.etoro.com).
It reads an account's full state from the eToro PnL endpoint
(`GET /trading/info/{env}/pnl`) and presents equity, available cash, invested
capital, profit/loss, open positions, and copy-trading mirrors in a modern web
UI.

The app runs **end-to-end with zero credentials** thanks to a built-in demo
mode, and connects to a real eToro account when credentials are supplied.

## Architecture

| Layer    | Tech                          | Location  |
| -------- | ----------------------------- | --------- |
| Frontend | React 18 + Vite + TypeScript  | `src/`    |
| Backend  | Express + TypeScript (via tsx)| `server/` |
| Tests    | Vitest + Supertest            | `**/__tests__/` |

The backend exposes a small API:

- `GET /api/health` — service status and mode.
- `GET /api/portfolio` — the aggregated `AccountSnapshot`.

In development the Vite dev server (`:5173`) proxies `/api` to the Express
backend (`:8787`). In production the backend serves the built frontend from
`dist/`.

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start API + web (http://localhost:5173)
```

By default the app starts in **demo mode** and shows a deterministic sample
portfolio, so it works immediately without any eToro credentials.

## Scripts

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Run the API and web dev server together            |
| `npm run build`     | Build the frontend to `dist/`                      |
| `npm start`         | Serve the built app + API in production mode        |
| `npm test`          | Run the Vitest unit/integration suite              |
| `npm run typecheck` | Type-check the whole project                       |
| `npm run lint`      | Lint with ESLint                                   |

## Connecting a real account

Copy `.env.example` to `.env` and provide **either** a Bearer token **or** an
API-key pair (never both), then set `ETORO_DEMO_MODE=false`:

```bash
ETORO_DEMO_MODE=false
ETORO_ENV=real
ETORO_ACCESS_TOKEN=<sso access token>
# or
ETORO_API_KEY=<partner key>
ETORO_USER_KEY=<per-user key>
```

## eToro API conventions honored

The client (`server/etoro/client.ts`) follows the platform rules:

- **Auth is mutually exclusive** — Bearer *or* `x-api-key` + `x-user-key`,
  never both.
- **`x-request-id`** (UUID v4) is generated per request for tracing.
- **Comma-separated ID lists** use a literal `,` (never `%2C`).
- **Demo vs real** is encoded in the path segment (`/demo/` vs `/real/`).
- **`unrealizedPnL?.pnL`** is optional-chained because it is absent for closed
  positions.
- **Retries** apply only to `429`/`5xx`; `4xx` errors surface immediately.
