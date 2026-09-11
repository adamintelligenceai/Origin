export async function sha256Hex(data: ArrayBuffer | Uint8Array | string): Promise<string> {
  const bytes =
    typeof data === 'string'
      ? new TextEncoder().encode(data)
      : data instanceof Uint8Array
        ? data
        : new Uint8Array(data);

  // Node 22+ and browsers expose crypto.subtle; vitest/node may need webcrypto.
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    const { createHash } = await import('node:crypto');
    return createHash('sha256').update(Buffer.from(bytes)).digest('hex');
  }
  const digest = await subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Minimal CSV parser (RFC4180-ish) for browser + Node tests. */
export function parseCsv(text: string): { headers: string[]; rows: string[][] } {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let i = 0;
  let inQuotes = false;

  while (i < text.length) {
    const ch = text[i]!;
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      cell += ch;
      i += 1;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (ch === ',') {
      row.push(cell);
      cell = '';
      i += 1;
      continue;
    }
    if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i += 1;
      row.push(cell);
      cell = '';
      if (row.some((c) => c.length > 0) || row.length > 1) rows.push(row);
      row = [];
      i += 1;
      continue;
    }
    cell += ch;
    i += 1;
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  if (rows.length === 0) return { headers: [], rows: [] };
  const headers = rows[0]!.map((h) => h.trim());
  return { headers, rows: rows.slice(1) };
}

export function parseAuNumber(raw: string): number | null {
  let s = raw.trim();
  if (!s) return null;
  s = s.replace(/A\$/gi, '').replace(/\$/g, '').replace(/,/g, '').replace(/\s/g, '');
  let neg = false;
  if (s.startsWith('(') && s.endsWith(')')) {
    neg = true;
    s = s.slice(1, -1);
  } else if (s.endsWith('-')) {
    neg = true;
    s = s.slice(0, -1);
  } else if (s.startsWith('-')) {
    neg = true;
    s = s.slice(1);
  }
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return neg ? -n : n;
}

export function parseAuDate(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = /^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})$/.exec(s);
  if (!m) return null;
  const d = Number(m[1]);
  const mo = Number(m[2]);
  let y = Number(m[3]);
  if (y < 100) y += 2000;
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
