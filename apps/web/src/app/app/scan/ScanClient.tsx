'use client';

import {
  classifyDataset,
  inspectFileName,
  mapHeaders,
  parseCsv,
  sha256Hex,
  sniffWorkbookSecurity,
} from '@marginshield/engine';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type LocalFile = {
  id: string;
  name: string;
  size: number;
  hash?: string;
  kind?: string;
  coverage?: number;
  headers?: string[];
  mapping?: Record<string, string | null>;
  securityOk: boolean;
  securityNote: string;
  previewRows?: string[][];
};

type Step = 'files' | 'mapping' | 'health' | 'tieout';

export default function ScanClient() {
  const [step, setStep] = useState<Step>('files');
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(
    'All parsing stays in this browser tab. Raw rows are not uploaded to MarginShield servers.',
  );

  const salesFiles = useMemo(() => files.filter((f) => f.kind === 'sales_lines'), [files]);

  async function onPick(list: FileList | null) {
    if (!list?.length) return;
    setBusy(true);
    try {
      const next: LocalFile[] = [];
      for (const file of Array.from(list)) {
        const nameCheck = inspectFileName(file.name, file.size);
        const buf = new Uint8Array(await file.arrayBuffer());
        const sniff = await sniffWorkbookSecurity(buf);
        const securityOk = nameCheck.ok && sniff.ok;
        let securityNote = !nameCheck.ok
          ? nameCheck.reason
          : !sniff.ok
            ? sniff.reason
            : 'Accepted for local parse';

        let headers: string[] = [];
        let previewRows: string[][] = [];
        let mapping: Record<string, string | null> | undefined;
        let coverage = 0;
        let kind = 'unknown';
        let hash: string | undefined;

        if (securityOk && /\.(csv|tsv|txt)$/i.test(file.name)) {
          const text = new TextDecoder('utf-8').decode(buf);
          hash = await sha256Hex(text);
          const parsed = parseCsv(text);
          headers = parsed.headers;
          previewRows = parsed.rows.slice(0, 5);
          const mapped = mapHeaders(headers);
          mapping = mapped.mapping;
          coverage = mapped.coverage;
          kind = classifyDataset(file.name, headers);
        } else if (securityOk) {
          hash = await sha256Hex(buf);
          kind = classifyDataset(file.name, []);
          securityNote =
            'Workbook accepted for local handling. Sheet extraction wires to DuckDB-Wasm in the worker path.';
        }

        next.push({
          id: `${file.name}-${file.size}-${hash ?? 'x'}`,
          name: file.name,
          size: file.size,
          hash,
          kind,
          coverage,
          headers,
          mapping,
          securityOk,
          securityNote,
          previewRows,
        });
      }
      setFiles((prev) => [...prev, ...next]);
      setNote(`Loaded ${next.length} file(s) locally. Nothing left the browser.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-ledger">
      <div className="border-b border-ruling-soft bg-folio">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="text-sm">
            <span className="font-semibold">MarginShield</span>
            <span className="mx-2 text-ruling">/</span>
            <span className="text-ink-2">Local scan</span>
          </div>
          <Link href="/app" className="text-sm text-ink-2 hover:text-ink">
            Executive overview
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Secure local ingestion</h1>
        <p className="mt-2 max-w-2xl text-ink-2">{note}</p>

        <ol className="mt-6 flex flex-wrap gap-2 text-sm">
          {(['files', 'mapping', 'health', 'tieout'] as Step[]).map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => setStep(s)}
                className={`border px-3 py-1.5 capitalize ${
                  step === s ? 'border-ink bg-ink text-folio' : 'border-ruling-soft bg-folio text-ink-2'
                }`}
              >
                {s === 'tieout' ? 'Tie-out' : s}
              </button>
            </li>
          ))}
        </ol>

        {step === 'files' && (
          <section className="mt-8 border border-ruling-soft bg-folio p-5">
            <h2 className="text-lg font-semibold">Files</h2>
            <p className="mt-1 text-sm text-ink-2">
              Drop Harbourline CSV/XLSX exports. Macro-enabled workbooks are rejected before parse.
            </p>
            <label className="mt-4 inline-flex cursor-pointer border border-ink bg-ink px-4 py-2 text-sm text-folio">
              {busy ? 'Reading…' : 'Choose local files'}
              <input
                type="file"
                className="hidden"
                multiple
                accept=".csv,.tsv,.txt,.xlsx,.xls"
                onChange={(e) => onPick(e.target.files)}
              />
            </label>

            <ul className="mt-6 space-y-3">
              {files.map((f) => (
                <li key={f.id} className="border border-ruling-soft p-3 text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-medium">{f.name}</div>
                    <div className={f.securityOk ? 'text-bank' : 'text-red-ink'}>
                      {f.securityOk ? 'Secure' : 'Blocked'}
                    </div>
                  </div>
                  <div className="mt-1 text-ink-2">
                    {(f.size / 1024).toFixed(1)} KB · kind {f.kind}
                    {f.hash ? ` · sha256 ${f.hash.slice(0, 12)}` : ''}
                  </div>
                  <div className="mt-1 text-ink-2">{f.securityNote}</div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {step === 'mapping' && (
          <section className="mt-8 border border-ruling-soft bg-folio p-5">
            <h2 className="text-lg font-semibold">Mapping</h2>
            <p className="mt-1 text-sm text-ink-2">
              Synonym mapping runs locally. Confirm NET SALES / COST / FREIGHT / REBATE semantics before
              calculate.
            </p>
            {files.filter((f) => f.headers?.length).map((f) => (
              <div key={f.id} className="mt-4 overflow-x-auto">
                <div className="text-sm font-medium">
                  {f.name} · coverage {Math.round((f.coverage ?? 0) * 100)}%
                </div>
                <table className="mt-2 w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-ink text-left text-ink-2">
                      <th className="px-2 py-1">Source header</th>
                      <th className="px-2 py-1">Canonical field</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(f.mapping ?? {}).map(([src, dest]) => (
                      <tr key={src} className="border-b border-ruling-soft">
                        <td className="px-2 py-1">{src}</td>
                        <td className="px-2 py-1 font-mono">{dest ?? '— unmapped'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            {!files.some((f) => f.headers?.length) && (
              <p className="mt-4 text-sm text-ink-2">Load CSV files in the Files step to preview mapping.</p>
            )}
          </section>
        )}

        {step === 'health' && (
          <section className="mt-8 border border-ruling-soft bg-folio p-5">
            <h2 className="text-lg font-semibold">Data health</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              <li>Files loaded: {files.length}</li>
              <li>Blocked by security: {files.filter((f) => !f.securityOk).length}</li>
              <li>Sales-like datasets: {salesFiles.length}</li>
              <li>
                Average mapping coverage:{' '}
                {files.length
                  ? `${Math.round(
                      (files.reduce((s, f) => s + (f.coverage ?? 0), 0) / files.length) * 100,
                    )}%`
                  : '—'}
              </li>
            </ul>
            <p className="mt-4 text-sm text-ink-2">
              Duplicate detection, economic coverage gates and NOT ASSESSED states deepen as DuckDB-Wasm
              materialises canonical tables in the worker.
            </p>
          </section>
        )}

        {step === 'tieout' && (
          <section className="mt-8 border border-ruling-soft bg-folio p-5">
            <h2 className="text-lg font-semibold">Tie-out</h2>
            <p className="mt-2 text-sm text-ink-2">
              Confirm T12M sales against the customer’s control total before running checks. This build
              keeps control totals in-browser only.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <span className="text-ink-2">Control total (AUD)</span>
                <input
                  className="mt-1 w-full border border-ruling-soft bg-ledger px-3 py-2 font-mono"
                  placeholder="85000000"
                />
              </label>
              <label className="text-sm">
                <span className="text-ink-2">Observed sales (from local files)</span>
                <input
                  className="mt-1 w-full border border-ruling-soft bg-ledger px-3 py-2 font-mono"
                  disabled
                  value={salesFiles.length ? 'Computed after DuckDB load' : 'No sales file yet'}
                />
              </label>
            </div>
            <Link
              href="/app"
              className="mt-6 inline-flex border border-ink bg-ink px-4 py-2 text-sm text-folio"
            >
              Continue to overview (demo engine)
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
