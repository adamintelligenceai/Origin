import { generateHarbourline } from '@marginshield/synthetic';
import { runScan, type ScanResult } from '@marginshield/engine';

let cached: { result: ScanResult } | undefined;

export function harbourlineDemoScan(): ScanResult {
  if (!cached) {
    const bundle = generateHarbourline({ seed: 42, variant: 'planted', scale: 'compact' });
    cached = { result: runScan(bundle.dataset) };
  }
  return cached.result;
}
