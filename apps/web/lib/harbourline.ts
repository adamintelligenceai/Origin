import { generateHarbourline, type HarbourlineBundle } from '@marginshield/synthetic';
import { runScan, type CanonicalDataset, type ScanResult } from '@marginshield/engine';

let planted: { bundle: HarbourlineBundle; result: ScanResult } | undefined;

export function harbourlineDemoBundle(): { dataset: CanonicalDataset; result: ScanResult; files: Record<string, string> } {
  if (!planted) {
    const bundle = generateHarbourline({ seed: 42, variant: 'planted', scale: 'compact' });
    planted = { bundle, result: runScan(bundle.dataset) };
  }
  return {
    dataset: structuredClone(planted.bundle.dataset),
    result: planted.result,
    files: planted.bundle.files,
  };
}

export function harbourlineDemoScan(): ScanResult {
  return harbourlineDemoBundle().result;
}

export function harbourlineMessyFiles(): Record<string, string> {
  return generateHarbourline({ seed: 42, variant: 'messy', scale: 'compact' }).files;
}
