import { gcm } from "@noble/ciphers/aes.js";
import { randomBytes } from "@noble/hashes/utils.js";

export const DATABASE_KEY_BYTES = 32;

export function generateDatabaseKey(): Uint8Array {
  return randomBytes(DATABASE_KEY_BYTES);
}

export function encodeKey(key: Uint8Array): string {
  return Buffer.from(key).toString("base64");
}

export function decodeKey(serialized: string): Uint8Array {
  return new Uint8Array(Buffer.from(serialized, "base64"));
}

export function encryptBytes(key: Uint8Array, plaintext: Uint8Array): Uint8Array {
  const nonce = randomBytes(12);
  const ciphertext = gcm(key, nonce).encrypt(plaintext);
  const packed = new Uint8Array(nonce.length + ciphertext.length);
  packed.set(nonce, 0);
  packed.set(ciphertext, nonce.length);
  return packed;
}

export function decryptBytes(key: Uint8Array, packed: Uint8Array): Uint8Array {
  const nonce = packed.slice(0, 12);
  const ciphertext = packed.slice(12);
  return gcm(key, nonce).decrypt(ciphertext);
}

export function encryptJson(key: Uint8Array, value: unknown): string {
  const plaintext = new TextEncoder().encode(JSON.stringify(value));
  return Buffer.from(encryptBytes(key, plaintext)).toString("base64");
}

export function decryptJson(key: Uint8Array, serialized: string): unknown {
  const packed = new Uint8Array(Buffer.from(serialized, "base64"));
  const plaintext = decryptBytes(key, packed);
  return JSON.parse(new TextDecoder().decode(plaintext));
}
