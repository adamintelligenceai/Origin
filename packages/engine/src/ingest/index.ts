import { parseDelimitedText, tableToObjects } from './csv.js';
import { sha256Hex } from './hash.js';
import { applyColumnMapping, suggestColumnMapping } from './mapping.js';
import type { CanonicalField, MappingSuggestion } from './mapping.js';
import { assessDataHealth } from './health.js';
import type { HealthGate, HealthReport } from './health.js';
import {
  assertWithinProjectLimits,
  inspectFileName,
  PROJECT_LIMITS,
  WORKBOOK_PARSE_POLICY,
} from './security.js';

export type IngestedFile = {
  name: string;
  bytes: number;
  sha256: string;
  extension: string;
  roleGuess: 'transactions' | 'agreements' | 'rebates' | 'costs' | 'freight' | 'unknown';
  headers: string[];
  mapping: MappingSuggestion[];
  rowCount: number;
  rows: Array<Record<string, string>>;
};

function guessRole(headers: string[]): IngestedFile['roleGuess'] {
  const h = headers.map((x) => x.toLowerCase()).join('|');
  if (h.includes('rebate') || h.includes('earned') || h.includes('claimed')) return 'rebates';
  if (h.includes('agreement') || h.includes('valid_to') || h.includes('agreed')) return 'agreements';
  if (h.includes('landed') || h.includes('effective_from')) return 'costs';
  if (h.includes('freight_cost')) return 'freight';
  if (h.includes('invoice') || h.includes('sku') || h.includes('qty')) return 'transactions';
  return 'unknown';
}

export async function ingestTextFile(input: {
  name: string;
  text: string;
  totalBytesSoFar?: number;
  fileCountSoFar?: number;
}): Promise<IngestedFile> {
  const verdict = inspectFileName(input.name);
  if (!verdict.ok) throw new Error(verdict.reason);
  if (verdict.extension === '.xlsx') {
    throw new Error(
      'XLSX binary parsing runs in the browser worker (values-only). Convert to CSV for Node/CLI, or use the scan UI.',
    );
  }

  const bytes = new TextEncoder().encode(input.text);
  assertWithinProjectLimits({
    fileCount: (input.fileCountSoFar ?? 0) + 1,
    fileBytes: bytes.byteLength,
    totalBytes: (input.totalBytesSoFar ?? 0) + bytes.byteLength,
  });

  const table = parseDelimitedText(input.text);
  const objects = tableToObjects(table);
  const mapping = suggestColumnMapping(table.headers);
  const mapped = applyColumnMapping(
    objects,
    Object.fromEntries(mapping.map((m) => [m.source, m.canonical])) as Record<
      string,
      CanonicalField | null
    >,
  );

  return {
    name: input.name,
    bytes: bytes.byteLength,
    sha256: await sha256Hex(bytes),
    extension: verdict.extension,
    roleGuess: guessRole(table.headers),
    headers: table.headers,
    mapping,
    rowCount: mapped.length,
    rows: mapped,
  };
}

export type LocalProjectBundle = {
  files: IngestedFile[];
  transactions: Array<Record<string, string | number>>;
  agreements: Array<Record<string, string | number>>;
  rebates: Array<Record<string, string | number>>;
  health: HealthReport;
  sourceFingerprints: string[];
};

function coerceNumbers(rows: Array<Record<string, string>>): Array<Record<string, string | number>> {
  const numeric = new Set([
    'qty',
    'list_price',
    'unit_price',
    'net_sales',
    'direct_cost',
    'freight_charged',
    'agreed_price',
    'earned_aud',
    'claimed_aud',
    'landed_cost',
    'freight_cost',
    'plant_gap_aud',
  ]);
  return rows.map((row) => {
    const out: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(row)) {
      if (numeric.has(k) && v !== '' && !Number.isNaN(Number(v))) out[k] = Number(v);
      else out[k] = v;
    }
    return out;
  });
}

export async function buildProjectFromTextFiles(
  files: Array<{ name: string; text: string }>,
): Promise<LocalProjectBundle> {
  const ingested: IngestedFile[] = [];
  let total = 0;
  for (const f of files) {
    const item = await ingestTextFile({
      name: f.name,
      text: f.text,
      totalBytesSoFar: total,
      fileCountSoFar: ingested.length,
    });
    total += item.bytes;
    ingested.push(item);
  }

  const byRole = (role: IngestedFile['roleGuess']) =>
    coerceNumbers(ingested.filter((f) => f.roleGuess === role).flatMap((f) => f.rows));

  const transactions = byRole('transactions');
  const agreements = byRole('agreements');
  const rebates = byRole('rebates');

  return {
    files: ingested,
    transactions,
    agreements,
    rebates,
    health: assessDataHealth({ transactions, agreements, rebates }),
    sourceFingerprints: ingested.map((f) => `${f.name}:${f.sha256}`),
  };
}

export {
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
};

export type { MappingSuggestion, HealthReport, HealthGate, CanonicalField };
