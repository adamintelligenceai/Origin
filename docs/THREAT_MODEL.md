# Threat model (v1)

## Assets
Raw transactions, agreements, rebates, findings, `.msproj` bundles, credentials, licence tokens.

## Trust boundaries
Browser · analysis worker · Next.js API · Supabase · Stripe · optional Anthropic narrative proxy.

## Key mitigations
- Local-first row processing; no raw-row upload in v1
- Reject macro-enabled workbooks; treat uploads as hostile
- Spreadsheet formula-injection escaping on export
- Optional AI receives aggregate fact tokens only
- RLS on all user-owned tables; no request-body logging of financial rows
- CSP / COOP / COEP on app routes

Residual risk remains: malicious browser extensions, endpoint compromise, dependency supply chain.
