# Security

## Controls implemented (v1 target)

- Local-first processing of raw rows (DuckDB-Wasm in worker)
- Worker network isolation after same-origin asset bootstrap
- Reject unsupported / macro-capable workbook formats
- Spreadsheet formula-injection escaping on export
- Optional encrypted `.msproj` (AES-256-GCM + Argon2id)
- CSP, COOP/COEP (app routes), HSTS (production), Referrer-Policy, Permissions-Policy
- No third-party analytics on `/scan`, `/demo`, or authenticated app routes
- Supabase RLS; service role server-only
- Stripe webhook signature validation
- No request-body logging on sensitive routes
- AI OFF by default for real scans; aggregate fact tokens only

## Claims

Describe implemented controls. Never claim “cyber safe”, “audit-proof”, or guaranteed accuracy.
