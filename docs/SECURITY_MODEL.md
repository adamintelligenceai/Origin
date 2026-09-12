# Security Model & Release Gates

## Threat model

Protect against:
- stolen cloud database;
- malicious/support insider;
- compromised web frontend;
- prompt injection in email/docs/web content;
- OAuth token theft;
- accidental telemetry leakage;
- compromised dependency;
- malicious sync payload;
- lost user device;
- model hallucinating an action;
- connector partial failure;
- replayed approval/action.

Not fully solvable in software:
- already-compromised/rooted endpoint;
- malicious OS/admin;
- unknown platform zero-days;
- user voluntarily sending secrets elsewhere.

The product must describe those limits accurately.

## Required controls

### Local data
- encrypted SQLite/SQLCipher before real personal data;
- database key generated locally;
- key stored in OS protected credential mechanism;
- sensitive screen locks after inactivity;
- optional biometric gate for approvals;
- local plaintext temp files prohibited.

### Secrets
- never store tokens in JS AsyncStorage/localStorage;
- never log OAuth tokens;
- refresh tokens on desktop stay in protected secret vault;
- no secrets in `.env` in packaged builds;
- key rotation path documented.

### Tauri
- explicit capabilities only;
- deny remote origins;
- strict CSP;
- no arbitrary shell;
- no broad filesystem read;
- IPC payload schemas;
- keep Tauri/Rust dependencies patched;
- signed releases.

### Mobile
- SecureStore only for small key material;
- encrypted SQLite for structured private state;
- no sensitive notification body unless user enables previews;
- device compromise warning if platform signals available.

### Cloud
- no source content columns;
- no free-form logging fields from clients;
- telemetry endpoint uses fixed event enum and numeric/boolean metadata allowlist;
- Row Level Security;
- least-privileged service keys;
- secrets in managed secret store;
- production/staging separation.

### Model providers
- business/API terms, not consumer subscriptions;
- training opt-out/default no-train confirmed;
- retention configuration documented;
- eligible ZDR where commercially feasible;
- context minimisation before calls;
- provider appears in privacy receipt.

### Connectors
- incremental OAuth scopes;
- connector methods are typed;
- idempotency keys for mutation where possible;
- post-action verification;
- rate-limit/backoff;
- revocation;
- no hidden background write action.

## Security-sensitive code review class

The following files/modules require a higher gate:
- crypto/key derivation;
- OAuth/token storage;
- sync envelope;
- Tauri capabilities/CSP;
- permission engine;
- connector mutation;
- cloud auth/RLS;
- update/signing;
- telemetry schemas.

For these modules:
1. Cursor implementation
2. Claude adversarial review
3. ChatGPT architecture/security review
4. static analysis + unit/integration tests
5. manual diff acceptance
6. human security specialist review before broad public launch

## Launch gates

### Gate A — founder dogfood
- fake data tests pass
- local encryption implemented
- no secrets in repository
- A3 default for mutation
- content-free logs
- connector revoke works

### Gate B — invited alpha
- full prompt-injection suite
- local wipe/export
- crash telemetry scrubbed
- signed desktop builds
- privacy/data-flow map
- Google test-user/OAuth settings controlled
- backup/recovery limitations disclosed

### Gate C — paid founding users
- published privacy notice + terms
- subprocessor list
- billing cancellation
- incident runbook
- vulnerability reporting channel
- OAuth verification plan/status compatible with scopes
- dependency/SAST/secrets CI
- targeted external review for highest-risk boundaries

### Gate D — public scale
- independent penetration test
- remediation complete
- secure SDLC documented
- annual security review budget
- privacy/legal review for initial launch regions
- formal retention/deletion matrix
- restore/business-continuity testing

## Marketing claims prohibited until verified

Do not say:
- "zero knowledge"
- "100% on device"
- "your data never leaves your device"
- "unhackable"
- "military-grade"
- "fully GDPR/CCPA compliant"
- "anonymous"

Preferred truthful phrasing:
- "Personal context is stored locally by default."
- "Our service cloud is designed not to require your email and document contents."
- "When a task uses an external AI provider, Vela/PRODUCT_NAME shows that route and sends task-bounded context."
