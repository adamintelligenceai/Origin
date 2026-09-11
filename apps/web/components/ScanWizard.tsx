'use client';

import { CANONICAL_FIELDS, TABLE_ROLES } from '@marginshield/engine';
import { formatAud } from '@marginshield/ui';
import Link from 'next/link';
import { useScan } from './ScanProvider';

export function ScanWizard() {
  const {
    wizardStep,
    setWizardStep,
    prepared,
    addFiles,
    loadMessyWizard,
    loadDemo,
    scanning,
    updateMapping,
    setTableRole,
    semantics,
    setSemantics,
    previewHealth,
    health,
    runCalculate,
    result,
    error,
    dataset,
  } = useScan();

  return (
    <div>
      <ol className="flex flex-wrap gap-2 text-sm">
        {(['files', 'mapping', 'health', 'tieout', 'done'] as const).map((step, i) => (
          <li
            key={step}
            className={`border px-2 py-1 ${wizardStep === step ? 'border-ink bg-ink text-folio' : 'border-ruling-soft'}`}
          >
            {i + 1}. {step}
          </li>
        ))}
      </ol>
      {error ? <p className="mt-4 text-sm text-red-ink">{error}</p> : null}

      {wizardStep === 'files' ? (
        <section className="mt-8 space-y-4">
          <p className="text-sm text-ink-2">CSV or XLSX only. Macro workbooks are rejected. Files stay in this browser.</p>
          <input
            type="file"
            multiple
            accept=".csv,.xlsx"
            className="block text-sm"
            onChange={(event) => {
              if (event.target.files?.length) void addFiles(event.target.files);
            }}
          />
          <div className="flex flex-wrap gap-3">
            <button type="button" className="bg-ink px-4 py-2 text-folio" onClick={loadMessyWizard}>
              Load Harbourline messy files
            </button>
            <button type="button" className="border border-ink px-4 py-2" onClick={loadDemo} disabled={scanning}>
              {scanning ? 'Scanning…' : 'Skip to planted demo'}
            </button>
          </div>
        </section>
      ) : null}

      {wizardStep === 'mapping' || wizardStep === 'health' || wizardStep === 'tieout' ? (
        <section className="mt-8">
          <h2 className="font-display text-2xl">Mapping</h2>
          <p className="mt-1 text-sm text-ink-2">Synonyms first. Confirm net sales, cost and freight before running.</p>
          <div className="mt-4 space-y-6">
            {prepared.map((table) => (
              <div key={table.name} className="border border-ruling-soft p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-xl">{table.name}</h3>
                  <label className="text-sm">
                    Role{' '}
                    <select
                      className="border border-ink bg-folio px-2 py-1"
                      value={table.role}
                      onChange={(e) => setTableRole(table.name, e.target.value as (typeof TABLE_ROLES)[number])}
                    >
                      {TABLE_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {table.role === 'sales' ? (
                  <table className="mt-3 w-full text-left text-sm">
                    <thead>
                      <tr className="ledger-rule">
                        <th>Source</th>
                        <th>Maps to</th>
                        <th>Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.table.headers.map((header) => {
                        const suggestion = table.suggestions.find((s) => s.source === header);
                        return (
                          <tr key={header} className="ledger-rule">
                            <td>{header}</td>
                            <td>
                              <select
                                className="border border-ink bg-folio px-2 py-1"
                                value={table.mapping[header] ?? ''}
                                onChange={(e) => updateMapping(table.name, header, e.target.value)}
                              >
                                <option value="">Ignore</option>
                                {CANONICAL_FIELDS.map((field) => (
                                  <option key={field} value={field}>
                                    {field}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="tabular-nums">{suggestion ? `${Math.round(suggestion.confidence * 100)}%` : '—'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p className="mt-2 text-sm text-ink-2">{table.table.rows.length} rows · headers used as-is</p>
                )}
              </div>
            ))}
          </div>
          <fieldset className="mt-6 space-y-2 text-sm">
            <legend className="font-display text-xl">Semantic confirmation</legend>
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={semantics.net_sales_includes_discount}
                onChange={(e) => setSemantics({ ...semantics, net_sales_includes_discount: e.target.checked })}
              />
              Net sales still includes discount (do not subtract again)
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={semantics.net_sales_includes_credit}
                onChange={(e) => setSemantics({ ...semantics, net_sales_includes_credit: e.target.checked })}
              />
              Net sales still includes credits
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={semantics.net_sales_includes_freight}
                onChange={(e) => setSemantics({ ...semantics, net_sales_includes_freight: e.target.checked })}
              />
              Net sales still includes freight
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={semantics.cost_is_landed}
                onChange={(e) => setSemantics({ ...semantics, cost_is_landed: e.target.checked })}
              />
              Mapped cost is true landed cost
            </label>
          </fieldset>
          {wizardStep === 'mapping' ? (
            <button type="button" className="mt-6 bg-ink px-4 py-2 text-folio" onClick={() => void previewHealth()} disabled={scanning}>
              {scanning ? 'Profiling…' : 'Confirm mapping and check data health'}
            </button>
          ) : null}
        </section>
      ) : null}

      {wizardStep === 'health' || wizardStep === 'tieout' ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Data health</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {health.length === 0 ? <li>No blocking issues.</li> : null}
            {health.map((issue) => (
              <li key={issue.code}>
                <span className="uppercase">{issue.severity}</span> · {issue.message}
              </li>
            ))}
          </ul>
          {dataset ? (
            <p className="mt-3 text-sm">
              {dataset.transactions.length} sales lines · {dataset.customers.length} customers · period{' '}
              {dataset.analysis_period.start} → {dataset.analysis_period.end}
            </p>
          ) : null}
          {wizardStep === 'health' ? (
            <button type="button" className="mt-4 border border-ink px-4 py-2" onClick={() => setWizardStep('tieout')}>
              Continue to tie-out
            </button>
          ) : null}
        </section>
      ) : null}

      {wizardStep === 'tieout' ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Sales tie-out</h2>
          <p className="mt-2 text-sm text-ink-2">
            Reconstructed invoice revenue{' '}
            {formatAud(
              dataset ? dataset.transactions.reduce((a, t) => a + Number(t.invoice_revenue), 0) : 0,
              true,
            )}
            . Confirm this agrees to source reporting before treating the run as tied out.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="bg-ink px-4 py-2 text-folio"
              disabled={scanning}
              onClick={() => void runCalculate(undefined, true)}
            >
              {scanning ? 'Calculating…' : 'Confirm tie-out and calculate'}
            </button>
            <button
              type="button"
              className="border border-ink px-4 py-2"
              disabled={scanning}
              onClick={() => void runCalculate(undefined, false)}
            >
              Calculate without tie-out
            </button>
          </div>
        </section>
      ) : null}

      {wizardStep === 'done' && result ? (
        <section className="mt-8">
          <p className="text-sm text-ink-2">Scan complete. Figures are engine output, not placeholders.</p>
          <p className="mt-2 font-display text-3xl">{formatAud(result.headlines.addressable_margin, true)} addressable</p>
          <Link href="/overview" className="mt-4 inline-block bg-ink px-4 py-2 text-folio">
            Open overview
          </Link>
        </section>
      ) : null}
    </div>
  );
}
