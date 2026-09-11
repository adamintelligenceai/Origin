# Threat model

MarginShield is privacy-by-design and local-first. It is not “cyber safe” in any absolute sense. Controls reduce risk; residual risk remains.

## Assets

- Raw transaction, supplier, customer, agreement, rebate and freight files
- Canonical working database (OPFS)
- Findings, reports and recovery plans
- Encrypted `.msproj` project bundles
- Auth credentials, licence tokens, Stripe customer metadata
- Optional aggregate AI payloads

## Trust boundaries

1. User browser (Next.js UI, file ingestion)
2. Analysis Web Worker (DuckDB-Wasm + engine) — no general-purpose network after bootstrap
3. Same-origin static assets (Wasm, workers)
4. Server API (auth, licensing, lead form, Stripe, optional narrative proxy)
5. Supabase (metadata, RLS)
6. Stripe
7. Anthropic (optional, aggregates only)
8. Downloaded report and project files

Raw transaction rows must not cross boundary 3→4 in v1.

## Threats and mitigations

| Threat | Mitigation | Residual risk |
| --- | --- | --- |
| XSS | CSP, no `dangerouslySetInnerHTML` for uploads, React default escaping | Browser extension or 0-day |
| Malicious spreadsheet | Reject `.xlsm/.xlsb/.xls`, no macro/formula execution, no external links, size/sheet/column caps | Parser bugs |
| Formula injection on export | Prefix `= + - @` text fields using schema-aware escaping | User re-enables formulas |
| Data exfiltration via app | Worker network isolation after init, Privacy Proof drawer, no analytics on `/scan` `/demo` app routes | Malicious extension, OS malware |
| Server logging of rows | No request-body logging; allow-listed structured logs | Operator error |
| LLM leakage | Fact-token narratives, tokenised identifiers, consent, AI off by default | User pastes identifiers |
| Cross-tenant access | Supabase RLS, org isolation, licence scoped to org | Misconfigured RLS |
| Stolen `.msproj` | Argon2id + AES-256-GCM, no passphrase recovery | Weak passphrase |
| Credential/session theft | Magic link / OAuth, short-lived licence JWT, secure cookies | Phishing |
| Supply-chain | Lockfile, CI audit, licence scan, CodeQL | Compromised maintainer |
| Dependency compromise | Pin versions, `pnpm audit` | Transitive malware |

## Worker network isolation

Wasm and worker scripts load from the same origin. After initialisation, analysis code must not call `fetch`, `XMLHttpRequest` or `WebSocket`. Tests assert this. Isolation must not break the engine's own same-origin bootstrap.

## Claims we will not make

- Audit-proof
- Guaranteed accurate
- Assurance opinion
- Absolute security
