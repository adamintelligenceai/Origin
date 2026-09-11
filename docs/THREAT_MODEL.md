# Threat model

Status: initial (Phase 0). Expanded in Phase 10.

MarginShield is a local-first commercial diagnostic. Raw transaction rows must not leave the browser in v1. Security claims describe implemented controls, not aspirations. Do not use “cyber safe”, “audit-proof” or “guaranteed accurate”.

## Assets

- Raw transaction data, supplier pricing, customer pricing, agreements, rebates
- Finding reports, encrypted `.msproj` files
- Credentials, licence data, optional consented headline metrics

## Threats

- XSS and malicious spreadsheet content
- Dependency and supply-chain compromise
- Data exfiltration, server logging, LLM leakage
- Cross-tenant access
- Stolen project files
- Formula injection in exports
- Credential and session theft
- Malicious browser extensions

## Trust boundaries

Browser UI → analysis Web Worker (DuckDB-Wasm) → OPFS / encrypted project file.

Server APIs handle auth, licensing, lead forms, Stripe and optional aggregate narrative only.

Third parties: Supabase, Stripe, Anthropic (optional).

## Mitigations (target)

- Same-origin Wasm; worker network isolation after bootstrap
- Reject macro-enabled workbooks; treat uploads as hostile
- Spreadsheet formula-injection escaping on export
- AES-256-GCM project files with Argon2id KDF
- No request-body logging of financial payloads
- Supabase RLS on every user-owned table
- Fact-token narrative substitution so models cannot author numbers
- Privacy Proof drawer describing application-initiated network activity only

## Residual risk

A technically capable party can inspect client-side methodology. Licensing, copyright and contract protect authorised use; JavaScript obfuscation is not a moat. Browser extensions and the host operating system sit outside application control.
