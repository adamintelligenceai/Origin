# Security

Security claims describe implemented controls. MarginShield is privacy-by-design and local-first. It is not “audit-proof” and does not issue assurance opinions.

## Current controls (Phase 0)

- No secrets in the repository; `.env.example` lists names only
- Commercial prices live in `apps/web/config/commercial.ts`
- Upload policy encoded in `@marginshield/schemas`: `.csv` and `.xlsx` only; `.xlsm`, `.xlsb`, `.xls` rejected
- CodeQL, secret scanning (Gitleaks) and dependency/licence audit workflows
- Forbidden brand-reference check in the homepage end-to-end test

## Planned controls

See `docs/THREAT_MODEL.md` and blueprint §§41–51, 96–99, 107:

- Worker network isolation after Wasm bootstrap
- CSP, COOP/COEP, HSTS, Permissions-Policy
- Encrypted `.msproj` (Argon2id + AES-256-GCM)
- Stripe webhook signature validation
- Supabase RLS on every user-owned table
- No third-party analytics on `/scan`, `/demo` or authenticated app routes
