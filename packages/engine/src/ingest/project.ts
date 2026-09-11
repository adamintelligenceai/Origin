import { argon2id } from 'hash-wasm';
import type { CanonicalDataset, Headlines, MappingProfile, MethodConfig, ScanResult } from '../types';
import type { Finding } from '@marginshield/schemas';
import type { EvidenceRow } from '../types';

export interface RecoveryEntry {
  finding_id: string;
  status: Finding['status'];
  owner: string;
  realized_confirmed: boolean;
}

export interface ProjectPayload {
  mapping: MappingProfile;
  method_config: MethodConfig;
  findings: Finding[];
  headlines: Headlines;
  evidence: EvidenceRow[];
  outcomes: RecoveryEntry[];
  period: ScanResult['period'];
  run_hash: string;
  engine_version: string;
  method_version: string;
  dataset?: CanonicalDataset;
}

export interface MsprojEnvelope {
  version: 1;
  kdf: 'argon2id';
  kdf_params: { m: number; t: number; p: number; hashLen: number };
  salt: string;
  nonce: string;
  ciphertext: string;
  metadata_version: 1;
  includes_raw: boolean;
}

const KDF = { m: 19_456, t: 2, p: 1, hashLen: 32 } as const;

function toB64(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function fromB64(value: string): Uint8Array {
  const bin = atob(value);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const raw = await argon2id({
    password: passphrase,
    salt,
    parallelism: KDF.p,
    iterations: KDF.t,
    memorySize: KDF.m,
    hashLength: KDF.hashLen,
    outputType: 'binary',
  });
  return crypto.subtle.importKey('raw', toArrayBuffer(raw), 'AES-GCM', false, ['encrypt', 'decrypt']);
}

export async function encryptProject(
  payload: ProjectPayload,
  passphrase: string,
): Promise<MsprojEnvelope> {
  if (!passphrase) throw new Error('Passphrase is required');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);
  const encoded = new TextEncoder().encode(JSON.stringify(payload));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: toArrayBuffer(nonce) }, key, encoded);
  return {
    version: 1,
    kdf: 'argon2id',
    kdf_params: { m: KDF.m, t: KDF.t, p: KDF.p, hashLen: KDF.hashLen },
    salt: toB64(salt),
    nonce: toB64(nonce),
    ciphertext: toB64(new Uint8Array(cipher)),
    metadata_version: 1,
    includes_raw: Boolean(payload.dataset),
  };
}

export async function decryptProject(envelope: MsprojEnvelope, passphrase: string): Promise<ProjectPayload> {
  if (envelope.kdf !== 'argon2id') throw new Error('Unsupported project KDF');
  const salt = fromB64(envelope.salt);
  const nonce = fromB64(envelope.nonce);
  const key = await deriveKey(passphrase, salt);
  const bytes = fromB64(envelope.ciphertext);
  try {
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: toArrayBuffer(nonce) }, key, toArrayBuffer(bytes));
    return JSON.parse(new TextDecoder().decode(plain)) as ProjectPayload;
  } catch {
    throw new Error('Unable to open project. Check the passphrase.');
  }
}

export function projectFromScan(
  result: ScanResult,
  options: {
    mapping: MappingProfile;
    method_config: MethodConfig;
    outcomes: RecoveryEntry[];
    dataset?: CanonicalDataset;
  },
): ProjectPayload {
  return {
    mapping: options.mapping,
    method_config: options.method_config,
    findings: result.findings,
    headlines: result.headlines,
    evidence: result.evidence,
    outcomes: options.outcomes,
    period: result.period,
    run_hash: result.run_hash,
    engine_version: result.engine_version,
    method_version: result.method_version,
    dataset: options.dataset,
  };
}
