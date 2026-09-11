# MarginShield Threat Model

See `BLUEPRINT.md` §46 for the full threat model specification.

## Assets

- Raw transaction data, supplier pricing, customer pricing, agreements, rebates
- Finding reports, project files, credentials, licence data

## Trust boundaries

- Browser / Web Worker (local-first processing)
- Server API (metadata only in v1)
- Supabase, Stripe, Anthropic (optional narrative)

## Residual risk

MarginShield implements privacy-by-design and security controls. No absolute security claims are made.

Detailed mitigations are documented as each phase completes.
