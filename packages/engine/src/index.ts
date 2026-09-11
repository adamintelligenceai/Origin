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
export { fnv1a, buildRunHash, buildFindingId } from './hash/run-hash.js';
export {
  buildProjectFromTextFiles,
  ingestTextFile,
  WORKBOOK_PARSE_POLICY,
  PROJECT_LIMITS,
  suggestColumnMapping,
  applyColumnMapping,
  assessDataHealth,
  inspectFileName,
  assertWithinProjectLimits,
  parseDelimitedText,
  tableToObjects,
  sha256Hex,
} from './ingest/index.js';
export type {
  IngestedFile,
  LocalProjectBundle,
  MappingSuggestion,
  HealthReport,
  HealthGate,
  CanonicalField,
} from './ingest/index.js';
export { computeWaterfall } from './waterfall/compute.js';
export type { WaterfallSummary } from './waterfall/compute.js';
export { findingsFromEconomics } from './checks/economic.js';
export { collectFindings } from './checks/merge.js';
