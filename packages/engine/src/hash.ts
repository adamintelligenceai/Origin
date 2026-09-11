import { sha256 as nobleSha256 } from '@noble/hashes/sha256';
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils';
import { ENGINE_MAJOR_VERSION, ENGINE_VERSION, METHOD_VERSION } from './version';
import type { CanonicalDataset } from './types';

export function sha256(value: string): string {
  return bytesToHex(nobleSha256(utf8ToBytes(value)));
}

export function findingId(checkId: string, grainKey: string, periodEnd: string): string {
  const digest = sha256(`${checkId}|${grainKey}|${periodEnd}|${ENGINE_MAJOR_VERSION}`);
  return `MSF-${digest.slice(0, 24)}`;
}

export function computeRunHash(dataset: CanonicalDataset): string {
  const files = Object.keys(dataset.source_file_hashes)
    .sort()
    .map((name) => `${name}:${dataset.source_file_hashes[name]}`)
    .join('|');
  const mapping = JSON.stringify(dataset.mapping_profile);
  const method = JSON.stringify(dataset.method_config);
  const period = `${dataset.analysis_period.start}:${dataset.analysis_period.end}`;
  const payload = [files, mapping, method, ENGINE_VERSION, METHOD_VERSION, period, dataset.reporting_currency].join(
    '||',
  );
  return sha256(payload);
}

export function hashBytes(data: Uint8Array): string {
  return bytesToHex(nobleSha256(data));
}
