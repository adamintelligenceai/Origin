# Security controls

Implemented and intended controls for MarginShield v1. Claims describe what the software does, not aspirations presented as fact.

## Local-first processing

Sales, cost, freight and agreement files are parsed in the browser. Canonical tables live in OPFS. Raw rows are not posted to MarginShield APIs.

## Project encryption

`.msproj` uses Argon2id (hash-wasm) key derivation and AES-256-GCM. Passphrase never leaves the device. Nonces are unique per encryption. Raw tables are opt-in.

## Headers (application routes)

- Content-Security-Policy (strict `connect-src`)
- Cross-Origin-Opener-Policy
- Referrer-Policy: `no-referrer`
- X-Content-Type-Options: `nosniff`
- Permissions-Policy (camera, mic, geo disabled)
- `frame-ancestors 'none'`
- HSTS in production

Cross-Origin-Embedder-Policy is not set globally (see `docs/DECISIONS.md` D007). Worker isolation still denies fetch/XHR/WebSocket after analysis-worker initialisation.

## File handling

Accepted: `.csv`, `.xlsx`. Rejected: `.xlsm`, `.xlsb`, `.xls`, executables, password-protected workbooks. Uploaded content is untrusted. Cell values are never rendered as HTML.

## Exports

Spreadsheet text fields beginning with `=`, `+`, `-`, `@` are escaped. Numeric negatives are not corrupted.

## Server

- No raw rows stored
- Supabase RLS on user-owned tables
- Service-role key server-only
- Rate limiting on public endpoints
- Stripe webhook signature validation
- No secrets in the repository or client bundle except publishable keys

## AI

Optional. Deterministic product works without a key. Payloads are aggregates with fact tokens. Unknown tokens are rejected. First use requires consent and payload preview.

## Analytics

No third-party analytics or session replay on `/scan`, `/demo` or authenticated app routes.
