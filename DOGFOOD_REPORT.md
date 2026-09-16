# Founder dogfood report

Audit roles: staff security engineer, staff product engineer, adversarial QA, privacy engineer.

## P0

None in the synthetic path. Quality gates are green for local fixtures.

## P1

- Live Google / LinkedIn / Meta / X client IDs are env-driven and fail closed. Dogfood with real mail still needs those IDs registered at each provider.
- Native SQLCipher is still the preferred long-term engine. The desktop vault is an AES-256-GCM snapshot plus OS app-data files mode 0600 (Linux CI has no keyring).
- Playwright browsers are not required in CI; the product loop is covered by component tests.
- Signed / updateable desktop builds are not produced by this repository yet.

## P2

- Mobile companion pairing uses a local code; Expo SecureStore + encrypted sync still need a device in hand.
- Stripe Checkout is test-mode / env-gated until live keys exist.
- Counsel has not replaced privacy/terms placeholders.

## Checklist run (synthetic)

| Case                                | Result                                      |
| ----------------------------------- | ------------------------------------------- |
| Prompt injection cannot grant tools | Pass                                        |
| Mutated approved payload rejected   | Pass                                        |
| Approval replay rejected            | Pass                                        |
| Unknown action class fails closed   | Pass                                        |
| Cloud schema forbids content fields | Pass                                        |
| Store logs exclude private content  | Pass                                        |
| Sync replay rejected                | Pass                                        |
| OAuth reconnect/revoke              | Pass (fixture + live loopback code path)    |
| Token refresh                       | Pass (fixture no-op; live mock host)        |
| Duplicate Gmail events              | Detector dedupes by kind+title              |
| Wipe                                | Pass on encrypted store                     |
| Kill switch pauses mutations        | Pass                                        |
| Diagnostics exclude content/secrets | Pass                                        |
| Offline banner                      | Pass on the desktop surface                 |
