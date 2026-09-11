export { ENGINE_VERSION } from '@marginshield/schemas';
export { allocateSellTranches } from './allocation.js';
export type { SellGap, TrancheAllocation } from './allocation.js';
export { computeMarginIntegrityIndex } from './mii.js';
export { runScan } from './scan.js';
export type { ScanInput } from './scan.js';
export type { Finding, ScanResult, ScanHeadline, ValueClass, EvidenceGrade } from './types.js';
export {
  bankableScenario,
  DEFAULT_CAPTURE_BASE,
  EVIDENCE_WEIGHT,
} from './bankability/capture.js';
export { buildRunHash, buildFindingId } from './hash/run-hash.js';
