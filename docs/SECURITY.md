# MarginShield Security

See `THREAT_MODEL.md` and `BLUEPRINT.md` §§41–51.

## Implemented controls (Phase 0)

- Security headers on Next.js routes (X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- No secrets in repository (`.env.example` only)
- CI: CodeQL, secret scanning, dependency audit

Additional controls are added in Phases 3 and 10.
