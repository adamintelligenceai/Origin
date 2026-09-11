# MarginShield threat model (initial)

## Assets

- Raw transaction data (browser-local)
- Supplier and customer pricing
- Agreements and rebates
- Finding reports and project files
- Credentials and licence data

## Trust boundaries

- Browser UI
- Web Worker / DuckDB-Wasm (Phase 3+)
- Server API (metadata only)
- Supabase, Stripe, Anthropic (optional narrative)

## Key mitigations

- Raw rows never sent to server in v1
- Uploaded spreadsheets treated as hostile input
- CSP, COOP/COEP on app routes (Phase 10)
- Supabase RLS for tenant isolation (Phase 13)
- Formula-injection protection on exports (Phase 10)

## Residual risk

Client-side logic is inspectable in the browser. Licensing and contractual terms govern authorised use.
