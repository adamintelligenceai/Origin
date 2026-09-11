/** Secure local file intake limits and format gates. */

const BLOCKED = new Set([
  '.xlsm', '.xlsb', '.xltm', '.xlam', '.xls', '.exe', '.js', '.mjs', '.cjs',
  '.vbs', '.ps1', '.bat', '.cmd', '.sh', '.html', '.htm', '.svg',
]);

const ALLOWED = new Set(['.csv', '.tsv', '.txt', '.xlsx']);

export const PROJECT_LIMITS = {
  maxFiles: 40,
  maxFileBytes: 80 * 1024 * 1024,
  maxTotalBytes: 400 * 1024 * 1024,
  maxRowsPerTable: 2_000_000,
} as const;

export type FileNameVerdict = { ok: true; extension: string } | { ok: false; reason: string };

export function inspectFileName(fileName: string): FileNameVerdict {
  const lower = fileName.trim().toLowerCase();
  const dot = lower.lastIndexOf('.');
  if (dot < 0) return { ok: false, reason: 'File has no extension.' };
  const extension = lower.slice(dot);
  if (BLOCKED.has(extension)) {
    return {
      ok: false,
      reason: `Blocked format (${extension}). Macro-enabled and legacy binary workbooks are rejected.`,
    };
  }
  if (!ALLOWED.has(extension)) {
    return {
      ok: false,
      reason: `Unsupported format (${extension}). Use CSV, TSV, TXT or XLSX without macros.`,
    };
  }
  return { ok: true, extension };
}

export function assertWithinProjectLimits(input: {
  fileCount: number;
  fileBytes: number;
  totalBytes: number;
}): void {
  if (input.fileCount > PROJECT_LIMITS.maxFiles) {
    throw new Error(`Too many files (max ${PROJECT_LIMITS.maxFiles}).`);
  }
  if (input.fileBytes > PROJECT_LIMITS.maxFileBytes) {
    throw new Error(`File exceeds ${PROJECT_LIMITS.maxFileBytes} byte limit.`);
  }
  if (input.totalBytes > PROJECT_LIMITS.maxTotalBytes) {
    throw new Error(`Project exceeds ${PROJECT_LIMITS.maxTotalBytes} byte limit.`);
  }
}

/** Values-only workbook policy — never evaluate formulas/macros/links. */
export const WORKBOOK_PARSE_POLICY = {
  evaluateFormulas: false,
  executeMacros: false,
  followExternalLinks: false,
  valuesOnly: true,
} as const;
