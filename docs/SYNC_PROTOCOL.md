# Desktop ↔ mobile sync protocol

Status: **SECURITY REVIEW REQUIRED**

## Construction

1. Each device generates an X25519 identity keypair (`@noble/curves`).
2. Pairing is an authenticated ceremony. V1 intends QR of the mobile public key plus a short confirmation code shown on desktop.
3. The sender derives a shared secret with the recipient public key and seals an AES-GCM envelope.
4. Envelope version is `1`. Fields: `id`, `sequence`, `senderDeviceId`, `recipientDeviceId`, `nonce`, `ciphertext`, `expiresAt`.
5. Recipients reject duplicate ids and non-increasing sequences.
6. The cloud relay may store only ciphertext and routing metadata.
7. Ciphertext expires. Expired envelopes are dropped unread.
8. Revoking a device deletes its public key from the directory. Historical envelopes remain undecryptable to a newly paired device unless the user performs an explicit export/import.

## Test vectors

See `@project-chief/sync` unit tests: seal, open, replay rejection, and cloud-visible field redaction.
