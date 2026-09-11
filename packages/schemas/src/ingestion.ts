export const ACCEPTED_UPLOAD_EXTENSIONS = [".csv", ".xlsx"] as const;

export const REJECTED_UPLOAD_EXTENSIONS = [".xlsm", ".xlsb", ".xls"] as const;

export const FILE_SAFETY_LIMITS = {
  maxFileBytes: 250 * 1024 * 1024,
  maxSheetCount: 32,
  maxColumnCount: 256,
  maxRowEstimate: 2_000_000,
} as const;

export const FORMULA_INJECTION_PREFIXES = ["=", "+", "-", "@"] as const;
