import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { FILE_LIMITS } from './limits';

export interface ParsedTable {
  name: string;
  sheet?: string;
  headers: string[];
  rows: string[][];
}

export function parseCsv(name: string, text: string): ParsedTable {
  const result = Papa.parse<string[]>(text, { skipEmptyLines: 'greedy' });
  const all = (result.data ?? []).filter((row) => row.some((cell) => String(cell).trim() !== ''));
  const headers = (all[0] ?? []).map((h) => String(h));
  const rows = all.slice(1).map((row) => row.map((c) => String(c ?? '')));
  if (headers.length > FILE_LIMITS.maxColumnCount) {
    throw new Error(`Column count exceeds ${FILE_LIMITS.maxColumnCount}`);
  }
  return { name, headers, rows };
}

export function parseXlsx(name: string, buffer: ArrayBuffer): ParsedTable[] {
  const workbook = XLSX.read(buffer, { type: 'array', cellFormula: false, cellHTML: false, bookVBA: false });
  if (workbook.SheetNames.length > FILE_LIMITS.maxSheetCount) {
    throw new Error(`Sheet count exceeds ${FILE_LIMITS.maxSheetCount}`);
  }
  return workbook.SheetNames.map((sheet) => {
    const worksheet = workbook.Sheets[sheet];
    if (!worksheet) return { name, sheet, headers: [], rows: [] };
    const aoa = XLSX.utils.sheet_to_json<(string | number | boolean | null)[]>(worksheet, {
      header: 1,
      raw: false,
      defval: '',
    });
    const headers = (aoa[0] ?? []).map((h) => String(h));
    if (headers.length > FILE_LIMITS.maxColumnCount) {
      throw new Error(`Column count exceeds ${FILE_LIMITS.maxColumnCount}`);
    }
    const rows = aoa.slice(1).map((row) => (row ?? []).map((c) => String(c ?? '')));
    return { name, sheet, headers, rows };
  });
}

export function detectExternalLinks(text: string): boolean {
  return /https?:\/\/|file:\/\/|externaldata/i.test(text.slice(0, 50_000));
}
