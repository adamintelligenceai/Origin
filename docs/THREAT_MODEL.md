# Threat Model

## Assets

- Raw transaction data (browser-local)
- Supplier / customer pricing
- Agreements and rebates
- Finding reports and project files (`.msproj`)
- Credentials and licence data

## Trust boundaries

| Boundary | Trust |
|---|---|
| Browser UI | Untrusted input; CSP hardened |
| Analysis Web Worker | No general network after bootstrap |
| Next.js API | Auth, licence, Stripe, aggregate AI only |
| Supabase | Metadata + RLS; no raw rows |
| Stripe | Billing only |
| Anthropic | Optional aggregate fact tokens only |

## Threats and mitigations

| Threat | Mitigation | Residual risk |
|---|---|---|
| XSS via uploaded cells | Never `dangerouslySetInnerHTML` for uploads; text escaping | Browser extension compromise |
| Malicious spreadsheet | Reject `.xlsm`/`.xlsb`/`.xls`; no macros/external links | Parser bugs |
| Data exfiltration | Local-first DuckDB; Privacy Proof drawer; privacy tests | Malicious extension |
| LLM leakage | Aggregate tokenised facts only; AI off by default | Misconfiguration |
| Formula injection on export | Escape `=+-@` text fields | Custom export paths |
| Stolen `.msproj` | AES-256-GCM + Argon2id; no passphrase recovery | Weak user passphrase |
| Cross-tenant access | Supabase RLS on every user-owned table | Misconfigured policies |
| Supply-chain attack | Lockfile, licence audit, dependency audit, CodeQL | Zero-day deps |

## Claims language

Use **privacy-by-design**, **security controls**, and **local-first processing**. Do not claim absolute security or “audit-proof”.
