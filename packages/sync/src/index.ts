import { gcm } from "@noble/ciphers/aes.js";
import { x25519 } from "@noble/curves/ed25519.js";
import { randomBytes } from "@noble/hashes/utils.js";

export interface DeviceIdentity {
  deviceId: string;
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

export interface SyncEnvelope {
  version: number;
  id: string;
  sequence: number;
  senderDeviceId: string;
  recipientDeviceId: string;
  nonce: string;
  ciphertext: string;
  expiresAt: string;
}

function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

function fromBase64(value: string): Uint8Array {
  return new Uint8Array(Buffer.from(value, "base64"));
}

export function createDeviceIdentity(deviceId: string): DeviceIdentity {
  const secretKey = x25519.utils.randomSecretKey();
  const publicKey = x25519.getPublicKey(secretKey);
  return { deviceId, publicKey, secretKey };
}

export function deriveSharedSecret(local: DeviceIdentity, remotePublicKey: Uint8Array): Uint8Array {
  return x25519.getSharedSecret(local.secretKey, remotePublicKey).slice(0, 32);
}

export function sealEnvelope(
  sender: DeviceIdentity,
  recipient: DeviceIdentity,
  sequence: number,
  payload: unknown,
  expiresAt: string
): SyncEnvelope {
  const key = deriveSharedSecret(sender, recipient.publicKey);
  const nonce = randomBytes(12);
  const plaintext = new TextEncoder().encode(JSON.stringify(payload));
  const ciphertext = gcm(key, nonce).encrypt(plaintext);
  return {
    version: 1,
    id: Buffer.from(randomBytes(16)).toString("hex"),
    sequence,
    senderDeviceId: sender.deviceId,
    recipientDeviceId: recipient.deviceId,
    nonce: toBase64(nonce),
    ciphertext: toBase64(ciphertext),
    expiresAt
  };
}

export function openEnvelope(
  recipient: DeviceIdentity,
  sender: DeviceIdentity,
  envelope: SyncEnvelope,
  seenIds: Set<string>,
  lastSequence: number
): unknown {
  if (envelope.version !== 1) {
    throw new Error("Unsupported envelope version");
  }
  if (seenIds.has(envelope.id) || envelope.sequence <= lastSequence) {
    throw new Error("Replay rejected");
  }
  if (Date.parse(envelope.expiresAt) < Date.now()) {
    throw new Error("Envelope expired");
  }
  const key = deriveSharedSecret(recipient, sender.publicKey);
  const plaintext = gcm(key, fromBase64(envelope.nonce)).decrypt(fromBase64(envelope.ciphertext));
  seenIds.add(envelope.id);
  return JSON.parse(new TextDecoder().decode(plaintext));
}

export function cloudVisibleFields(envelope: SyncEnvelope): {
  id: string;
  recipientDeviceId: string;
  expiresAt: string;
} {
  return {
    id: envelope.id,
    recipientDeviceId: envelope.recipientDeviceId,
    expiresAt: envelope.expiresAt
  };
}
