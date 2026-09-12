# Security review required

These decisions are implemented and must be reviewed before founder dogfood with real Gmail.

## Local store

- Records are AES-256-GCM wrapped with a locally generated 256-bit key.
- The key is stored only through the `SecretStore` interface. Production desktop must bind this to Tauri Stronghold or the OS credential manager.
- Native SQLCipher is the preferred long-term engine. It is **not** silently replaced with plaintext. The current engine is an encrypted snapshot store so Phase 3 can ship without a plaintext fallback.
- No `localStorage` / IndexedDB path exists for private records.

## OAuth

- Authorization Code + PKCE + loopback is implemented as a library.
- Refresh tokens are written only to `SecretStore`.
- No Project Chief cloud proxy is present.
- Live Google client IDs are not committed. Connectors run against fixtures until dogfood credentials exist.

## Model route

- Consumer ChatGPT/Claude/Gemini/Grok subscriptions are rejected as production APIs.
- The OpenAI adapter requires an API product key and never logs prompts.

## Sync

- Envelopes use X25519 + AES-GCM from `@noble/*`.
- Cloud-visible fields are envelope id, recipient device id and expiry only.
- There is no key escrow. A new device cannot decrypt history without an explicit pairing transfer.

## Tauri

- Capabilities remain `core:default` only.
- CSP still denies remote script origins.
