# Desktop rollback

The personal node is local-first. Rolling back a desktop release does not require a cloud data migration.

## Unsigned preview / CI artifact

1. Freeze mutating connectors with the control-plane `kill_switch` or `mutations_enabled=false`.
2. Instruct users to quit Project Chief.
3. Replace the application bundle with the previous known-good artifact.
4. Do not delete `{appData}/vault` or `{appData}/store/snapshot.json` unless the user asked for a wipe. Those files are ciphertext plus OS-permissioned secrets.
5. Launch the previous build. It must open the existing encrypted snapshot with the same database key.

## If the snapshot format is incompatible

Fail closed. Do not convert ciphertext to plaintext. Ship a forward-only importer in a patched build, or ask the user to export an encrypted bundle from the last working version before wiping.

## If an OAuth client ID was rotated

Users reconnect on-device. Refresh tokens never existed in the service cloud, so there is nothing to revoke server-side except the provider consent screen.

## Cloud control plane

The web app only stores account, plan, device public keys, push routing and content-free telemetry. Reverting that deploy cannot recover personal content and cannot decrypt a device.
