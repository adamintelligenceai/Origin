export const FILE_LIMITS = {
  maxFileBytes: 80 * 1024 * 1024,
  maxSheetCount: 12,
  maxColumnCount: 80,
  maxRowEstimate: 1_600_000,
} as const;

export const REJECTED_EXTENSIONS = ['.xlsm', '.xlsb', '.xls', '.exe', '.dll', '.js', '.vbs', '.zip'];

export const ACCEPTED_EXTENSIONS = ['.csv', '.xlsx'] as const;

export function classifyUpload(filename: string, byteLength: number): { ok: true } | { ok: false; reason: string } {
  const lower = filename.toLowerCase();
  if (REJECTED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return { ok: false, reason: `Rejected file type: ${filename}` };
  }
  if (!ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return { ok: false, reason: `Unsupported file type: ${filename}` };
  }
  if (byteLength > FILE_LIMITS.maxFileBytes) {
    return { ok: false, reason: `File exceeds ${FILE_LIMITS.maxFileBytes} byte limit` };
  }
  return { ok: true };
}
