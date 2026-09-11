/** RFC4180-ish delimited text parser (no formula evaluation). */

export type ParsedTable = {
  headers: string[];
  rows: string[][];
};

function detectDelimiter(sample: string): ',' | '\t' | ';' {
  const first = sample.split(/\r?\n/, 1)[0] ?? '';
  const commas = (first.match(/,/g) ?? []).length;
  const tabs = (first.match(/\t/g) ?? []).length;
  const semis = (first.match(/;/g) ?? []).length;
  if (tabs > commas && tabs > semis) return '\t';
  if (semis > commas) return ';';
  return ',';
}

export function parseDelimitedText(text: string, delimiter?: ',' | '\t' | ';'): ParsedTable {
  const delim = delimiter ?? detectDelimiter(text);
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i]!;
    const next = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === delim) {
      row.push(field);
      field = '';
      continue;
    }
    if (ch === '\n' || (ch === '\r' && next === '\n')) {
      row.push(field);
      field = '';
      if (row.some((c) => c.length > 0) || row.length > 1) rows.push(row);
      row = [];
      if (ch === '\r') i += 1;
      continue;
    }
    if (ch === '\r') {
      row.push(field);
      field = '';
      if (row.some((c) => c.length > 0) || row.length > 1) rows.push(row);
      row = [];
      continue;
    }
    field += ch;
  }
  row.push(field);
  if (row.some((c) => c.length > 0) || row.length > 1) rows.push(row);

  if (rows.length === 0) return { headers: [], rows: [] };
  return {
    headers: rows[0]!.map((h) => h.trim()),
    rows: rows.slice(1),
  };
}

export function tableToObjects(table: ParsedTable): Array<Record<string, string>> {
  return table.rows.map((cells) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < table.headers.length; i += 1) {
      obj[table.headers[i]!] = cells[i] ?? '';
    }
    return obj;
  });
}
