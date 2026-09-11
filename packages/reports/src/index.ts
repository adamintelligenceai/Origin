/** Report builders land in Phase 11. */
export const BOARD_PACK_PAGE_LIMIT = 10 as const;

/** Prevent CSV/XLSX formula injection on exported text fields. */
export function escapeSpreadsheetText(value: string): string {
  if (/^[=+\-@]/.test(value)) return `'${value}`;
  return value;
}
