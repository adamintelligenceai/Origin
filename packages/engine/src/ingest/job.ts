import { defaultMethodConfig } from '../config';
import { dataHealth, type HealthIssue } from './health';
import { monthsBetween } from '../dates';
import { runScan } from '../run';
import type { CanonicalDataset, MethodConfig, ScanResult } from '../types';
import {
  buildCanonicalDataset,
  defaultSalesMapping,
  DEFAULT_SEMANTICS,
  type MappedTable,
  type SemanticConfirmation,
} from './canonical';
import { classifyUpload } from './limits';
import { parseCsv, parseXlsx, type ParsedTable } from './parse';
import { inferTableRole } from './roles';
import { suggestMapping } from './map';

export interface UploadFile {
  name: string;
  text?: string;
  buffer?: ArrayBuffer;
}

export interface PreparedTable {
  name: string;
  table: ParsedTable;
  role: ReturnType<typeof inferTableRole>;
  mapping: Record<string, string>;
  suggestions: ReturnType<typeof suggestMapping>;
}

export function parseUpload(file: UploadFile): ParsedTable[] {
  const size = file.buffer?.byteLength ?? file.text?.length ?? 0;
  const classified = classifyUpload(file.name, size);
  if (!classified.ok) throw new Error(classified.reason);
  const lower = file.name.toLowerCase();
  if (lower.endsWith('.csv')) {
    if (file.text === undefined) throw new Error(`CSV ${file.name} is missing text`);
    return [parseCsv(file.name, file.text)];
  }
  if (!file.buffer) throw new Error(`Workbook ${file.name} is missing bytes`);
  return parseXlsx(file.name, file.buffer);
}

export function prepareUploads(files: UploadFile[]): PreparedTable[] {
  const out: PreparedTable[] = [];
  for (const file of files) {
    const tables = parseUpload(file);
    for (const table of tables) {
      const name = table.sheet ? `${file.name}#${table.sheet}` : file.name;
      const role = inferTableRole(file.name, table);
      const suggestions = suggestMapping(table);
      const mapping =
        role === 'sales'
          ? defaultSalesMapping(table)
          : Object.fromEntries(table.headers.map((h) => [h, h]));
      out.push({ name, table, role, mapping, suggestions });
    }
  }
  return out;
}

export function runIngestedScan(input: {
  tables: MappedTable[];
  semantics?: SemanticConfirmation;
  method_config?: MethodConfig;
  sales_tieout_confirmed?: boolean;
  known_sales_total?: string;
  source_texts?: Record<string, string>;
}): { dataset: CanonicalDataset; result: ScanResult; health: HealthIssue[] } {
  const dataset = buildCanonicalDataset({
    tables: input.tables,
    semantics: input.semantics ?? DEFAULT_SEMANTICS,
    method_config: input.method_config ?? defaultMethodConfig(),
    sales_tieout_confirmed: input.sales_tieout_confirmed,
    known_sales_total: input.known_sales_total,
    source_texts: input.source_texts,
  });
  const result = runScan(dataset);
  const currencies = [...new Set(dataset.transactions.map((t) => t.currency))];
  const costCoverage =
    dataset.transactions.length === 0
      ? 0
      : dataset.transactions.filter((t) => Number(t.erp_cost) > 0).length / dataset.transactions.length;
  const duplicateRate =
    result.duplicates.reduce((a, g) => a + g.count, 0) / Math.max(1, dataset.transactions.length);
  const health = dataHealth({
    monthCount: monthsBetween(dataset.analysis_period.start, dataset.analysis_period.end),
    costCoverage,
    duplicateRate,
    currencies,
    fxAvailable: currencies.length <= 1,
    salesTieoutConfirmed: dataset.sales_tieout_confirmed,
  });
  return { dataset, result, health };
}
