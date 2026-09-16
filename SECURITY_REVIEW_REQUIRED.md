# Security review required

These decisions are implemented and must be reviewed before founder dogfood with real Gmail.

## Local store

- Records are AES-256-GCM wrapped with a locally generated 256-bit key.
- The key is stored only through the `SecretStore` interface.
- Desktop binds secrets to `{appData}/vault` files with mode `0600` (directory `0700`). Linux CI has no D-Bus keyring; this is the documented fallback, not a plaintext database.
- Encrypted snapshots persist under `{appData}/store/snapshot.json`. The file is ciphertext. Native SQLCipher remains the preferred long-term engine and is **not** replaced with plaintext.
- No `localStorage` / IndexedDB path exists for private records. Onboarding consent is a vault flag.

## OAuth

- Authorization Code + PKCE + loopback (`127.0.0.1:53682`) for Google, LinkedIn, Instagram, Facebook and X.
- Live mode fails closed without a client ID. Fixture mode never calls the token host.
- Refresh tokens are written only to `SecretStore`. The loopback listener returns `code` + `state` to the local runtime; it does not proxy tokens.
- No Project Chief cloud proxy is present.
- Google onboarding scopes remain `gmail.readonly`, `calendar.readonly`, `drive.readonly`. Send/events scopes exist in the library for approved mutations only.

## Model route

- Consumer ChatGPT/Claude/Gemini/Grok subscriptions are rejected as production APIs.
- OpenAI and Anthropic adapters require API product keys and never log prompts.
- High-sensitivity tasks cannot leave the device.

## Sync

- Envelopes use X25519 + AES-GCM from `@noble/*`.
- Cloud-visible fields are envelope id, recipient device id and expiry only.
- There is no key escrow. A new device cannot decrypt history without an explicit pairing transfer.

## Tauri

- Capabilities remain `core:default` only. Vault/snapshot/OAuth loopback are explicit Rust commands, not `fs` permissions granted to the webview.
- CSP still denies remote script origins.
