# Founder dogfood report

Audit roles: staff security engineer, staff product engineer, adversarial QA, privacy engineer.

## P0

None in the synthetic path. Quality gates are green for local fixtures.

## P1

- Live Google OAuth client IDs are not configured. Calendar/Gmail connectors are library-complete with mocks.
- Native SQLCipher / Tauri Stronghold wiring is specified but not bound to a signed desktop build yet.
- Playwright browsers are not required in CI; the product loop is covered by component tests.

## P2

- Anthropic and local-model adapters are explicit stubs.
- Mobile uses fixture data until desktop pairing is dogfooded on device.

## Checklist run (synthetic)

| Case                                | Result                         |
| ----------------------------------- | ------------------------------ |
| Prompt injection cannot grant tools | Pass                           |
| Mutated approved payload rejected   | Pass                           |
| Approval replay rejected            | Pass                           |
| Unknown action class fails closed   | Pass                           |
| Cloud schema forbids content fields | Pass                           |
| Store logs exclude private content  | Pass                           |
| Sync replay rejected                | Pass                           |
| OAuth reconnect/revoke              | Blocked on live credentials    |
| Token refresh                       | Blocked on live credentials    |
| Duplicate Gmail events              | Detector dedupes by kind+title |
| Wipe                                | Pass on encrypted store        |
