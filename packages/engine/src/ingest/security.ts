export type FileSecurityVerdict =
  | { ok: true }
  | { ok: false; reason: string; code: 'MACRO' | 'EXTERNAL_LINK' | 'UNSUPPORTED' | 'TOO_LARGE' | 'EMPTY' };

const BLOCKED_EXT = new Set(['.xlsm', '.xlsb', '.xltm', '.docm', '.pptm']);
const ALLOWED_EXT = new Set(['.csv', '.tsv', '.txt', '.xlsx', '.xls']);

export const DEFAULT_MAX_FILE_BYTES = 80 * 1024 * 1024;

export function inspectFileName(
  fileName: string,
  sizeBytes: number,
  maxBytes = DEFAULT_MAX_FILE_BYTES,
): FileSecurityVerdict {
  const lower = fileName.toLowerCase();
  const dot = lower.lastIndexOf('.');
  const ext = dot >= 0 ? lower.slice(dot) : '';

  if (!fileName.trim()) return { ok: false, code: 'EMPTY', reason: 'File name is empty.' };
  if (sizeBytes <= 0) return { ok: false, code: 'EMPTY', reason: 'File is empty.' };
  if (sizeBytes > maxBytes) {
    return {
      ok: false,
      code: 'TOO_LARGE',
      reason: `File exceeds ${Math.round(maxBytes / (1024 * 1024))} MB limit.`,
    };
  }
  if (BLOCKED_EXT.has(ext)) {
    return {
      ok: false,
      code: 'MACRO',
      reason: 'Macro-enabled workbooks are rejected. Export to CSV or macro-free XLSX.',
    };
  }
  if (!ALLOWED_EXT.has(ext)) {
    return {
      ok: false,
      code: 'UNSUPPORTED',
      reason: `Unsupported file type ${ext || '(none)'}. Use CSV or XLSX.`,
    };
  }
  return { ok: true };
}

/** Lightweight XLSX zip sniff for external links / vbaProject. */
export async function sniffWorkbookSecurity(bytes: Uint8Array): Promise<FileSecurityVerdict> {
  if (bytes.length < 4 || bytes[0] !== 0x50 || bytes[1] !== 0x4b) {
    return { ok: true };
  }
  const text = new TextDecoder('latin1').decode(bytes.slice(0, Math.min(bytes.length, 2_000_000)));
  if (/xl\/vbaProject\.bin/i.test(text) || /vbaProject\.bin/i.test(text)) {
    return { ok: false, code: 'MACRO', reason: 'Workbook contains VBA macros and was rejected.' };
  }
  if (/externalLink|externalLinks|oleObject/i.test(text)) {
    return {
      ok: false,
      code: 'EXTERNAL_LINK',
      reason: 'Workbook appears to contain external links/OLE objects and was rejected.',
    };
  }
  return { ok: true };
}
