export { classifyUpload, FILE_LIMITS, ACCEPTED_EXTENSIONS, REJECTED_EXTENSIONS } from './limits';
export { parseCsv, parseXlsx, detectExternalLinks } from './parse';
export { suggestMapping, applyMapping } from './map';
export { mapHeader, SYNONYMS, normaliseHeader, CANONICAL_FIELDS } from './synonyms';
export { parseAuDate, parseAuNumber, escapeSpreadsheetText, looksLikeFormula } from './normalise';
export { isolateWorkerNetwork } from './worker-isolation';
export { dataHealth } from './health';
export type { HealthIssue } from './health';
export type { ParsedTable } from './parse';
export type { MappingSuggestion } from './map';
export { inferTableRole, TABLE_ROLES } from './roles';
export type { TableRole } from './roles';
export {
  buildCanonicalDataset,
  defaultSalesMapping,
  DEFAULT_SEMANTICS,
} from './canonical';
export type { MappedTable, SemanticConfirmation } from './canonical';
export { prepareUploads, parseUpload, runIngestedScan } from './job';
export type { UploadFile, PreparedTable } from './job';
export { encryptProject, decryptProject, projectFromScan } from './project';
export type { MsprojEnvelope, ProjectPayload, RecoveryEntry } from './project';
