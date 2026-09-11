const FORMULA_PREFIX = /^[=+\-@]/;

export function parseAuDate(value: string): string | undefined {
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const dmy = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy) {
    const day = dmy[1]?.padStart(2, '0');
    const month = dmy[2]?.padStart(2, '0');
    const year = dmy[3];
    return `${year}-${month}-${day}`;
  }
  const serial = Number(trimmed);
  if (Number.isFinite(serial) && serial > 20000 && serial < 60000) {
    const excelEpoch = Date.UTC(1899, 11, 30) + serial * 86_400_000;
    return new Date(excelEpoch).toISOString().slice(0, 10);
  }
  return undefined;
}

export function parseAuNumber(value: string): string | undefined {
  let v = value.trim();
  if (!v) return undefined;
  v = v.replace(/^\$/, '');
  const trailingNeg = v.endsWith('-') && !v.startsWith('-');
  if (trailingNeg) v = `-${v.slice(0, -1)}`;
  const paren = v.match(/^\((.*)\)$/);
  if (paren?.[1]) v = `-${paren[1]}`;
  v = v.replace(/,/g, '');
  if (!/^-?\d+(\.\d+)?$/.test(v)) return undefined;
  const n = Number(v);
  if (!Number.isFinite(n)) return undefined;
  return n.toFixed(4);
}

export function escapeSpreadsheetText(value: string, isNumericColumn: boolean): string {
  if (isNumericColumn) return value;
  if (FORMULA_PREFIX.test(value)) return `'${value}`;
  return value;
}

export function looksLikeFormula(value: string): boolean {
  return FORMULA_PREFIX.test(value.trim());
}
