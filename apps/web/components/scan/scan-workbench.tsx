'use client';

import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';
import { generateHarbourline } from '@marginshield/synthetic';
import {
  assessDataHealth,
  buildProjectFromTextFiles,
  inspectFileName,
  runScan,
} from '@marginshield/engine';
import type { HealthReport, LocalProjectBundle, ScanResult } from '@marginshield/engine';
import {
  AppShell,
  BankabilityRange,
  CoverageMeter,
  DoubleRuleTotal,
  EvidenceGradeBadge,
  FindingStatusBadge,
  LedgerTable,
  Money,
  RedInkBar,
  RiskIndicator,
  RunHash,
  ValueClassBadge,
} from '@marginshield/ui';
import type { ValueClass } from '@marginshield/ui';

function asValueClass(valueClass: string): ValueClass {
  switch (valueClass) {
    case 'DETECTED_LEAKAGE':
    case 'POLICY_LEAKAGE':
    case 'MODELLED_MARGIN_OPPORTUNITY':
    case 'CASH_ENTITLEMENT':
    case 'OPPORTUNITY':
    case 'INSIGHT':
    case 'OVERLAY':
    case 'BILLING_RISK':
      return valueClass;
    default:
      return 'INSIGHT';
  }
}

type Step = 'files' | 'mapping' | 'health' | 'results';

export function ScanWorkbench() {
  const [step, setStep] = useState<Step>('files');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [bundle, setBundle] = useState<LocalProjectBundle | null>(null);
  const [health, setHealth] = useState<HealthReport | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [label, setLabel] = useState('Local project');

  const loadHarbourline = () => {
    setError(null);
    startTransition(() => {
      const ds = generateHarbourline({ seed: 42, variant: 'planted', mode: 'compact' });
      const healthReport = assessDataHealth({
        transactions: ds.transactions,
        agreements: ds.agreements,
        rebates: ds.rebates,
      });
      setBundle({
        files: [],
        transactions: ds.transactions,
        agreements: ds.agreements,
        rebates: ds.rebates,
        health: healthReport,
        sourceFingerprints: ['harbourline-seed-42'],
      });
      setHealth(healthReport);
      setLabel(ds.groundTruth.company);
      setStep('health');
    });
  };

  const onFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setError(null);
    try {
      const files: Array<{ name: string; text: string }> = [];
      for (const file of Array.from(fileList)) {
        const verdict = inspectFileName(file.name);
        if (!verdict.ok) throw new Error(verdict.reason);
        if (verdict.extension === '.xlsx') {
          throw new Error('XLSX values-only worker is next; convert to CSV for this build.');
        }
        files.push({ name: file.name, text: await file.text() });
      }
      const project = await buildProjectFromTextFiles(files);
      setBundle(project);
      setHealth(project.health);
      setLabel(files.map((f) => f.name).join(', '));
      setStep('mapping');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to ingest files');
    }
  };

  const run = () => {
    if (!bundle) return;
    setError(null);
    startTransition(() => {
      const scan = runScan({
        transactions: bundle.transactions,
        agreements: bundle.agreements,
        rebates: bundle.rebates,
        sourceFingerprints: bundle.sourceFingerprints,
      });
      setResult(scan);
      setStep('results');
    });
  };

  const detectedShare = useMemo(() => {
    if (!result) return 0;
    const total = result.headline.addressableMarginAud || 1;
    return result.headline.detectedLeakageAud / total;
  }, [result]);

  return (
    <AppShell
      title="MarginShield"
      nav={
        <nav className="flex flex-col gap-2 text-sm text-[var(--ink-2)]">
          <Link href="/">Home</Link>
          <span className="text-[var(--ink)]">Scan</span>
          <Link href="/demo">Demo</Link>
          <Link href="/styleguide">Styleguide</Link>
        </nav>
      }
    >
      <section className="ms-folio space-y-4 border border-[var(--ruling-soft)] p-6">
        <p className="text-xs uppercase tracking-wide text-[var(--ink-2)]">Local scan</p>
        <h1 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
          Files → Map → Health → Detect
        </h1>
        <p className="max-w-2xl text-sm text-[var(--ink-2)]">
          Source files are parsed in this browser session. Macro workbooks are rejected. This path
          does not upload customer rows to MarginShield servers.
        </p>

        <ol className="flex flex-wrap gap-4 text-sm">
          {(['files', 'mapping', 'health', 'results'] as Step[]).map((s) => (
            <li
              key={s}
              className={
                step === s
                  ? 'border-b-2 border-[var(--ink)] pb-1 font-medium text-[var(--ink)]'
                  : 'text-[var(--ink-2)]'
              }
            >
              {s}
            </li>
          ))}
        </ol>

        {error ? <p className="text-sm text-red-800">{error}</p> : null}

        {step === 'files' ? (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadHarbourline}
              disabled={pending}
              className="rounded-sm bg-[var(--ink)] px-4 py-2 text-sm text-[var(--folio)] disabled:opacity-60"
            >
              {pending ? 'Loading…' : 'Load Harbourline (fictional)'}
            </button>
            <label className="cursor-pointer rounded-sm border border-[var(--ruling)] px-4 py-2 text-sm">
              Upload CSV / TSV
              <input
                type="file"
                accept=".csv,.tsv,.txt"
                multiple
                className="hidden"
                onChange={(e) => void onFiles(e.target.files)}
              />
            </label>
          </div>
        ) : null}

        {step === 'mapping' && bundle ? (
          <div className="space-y-4">
            <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Suggested column mapping
            </h2>
            {bundle.files.map((f) => (
              <div key={f.name} className="space-y-2">
                <p className="text-sm">
                  {f.name} · role {f.roleGuess} · {f.rowCount.toLocaleString('en-AU')} rows
                </p>
                <LedgerTable
                  caption={`Mapping for ${f.name}`}
                  columns={['Source', 'Canonical', 'Confidence']}
                  rows={f.mapping.map((m) => [m.source, m.canonical ?? '—', m.confidence])}
                />
              </div>
            ))}
            <button
              type="button"
              className="rounded-sm bg-[var(--ink)] px-4 py-2 text-sm text-[var(--folio)]"
              onClick={() => {
                const next = assessDataHealth({
                  transactions: bundle.transactions,
                  agreements: bundle.agreements,
                  rebates: bundle.rebates,
                });
                setHealth(next);
                setStep('health');
              }}
            >
              Continue to data health
            </button>
          </div>
        ) : null}

        {step === 'health' && health ? (
          <div className="space-y-4">
            <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Data health · {label}
            </h2>
            <LedgerTable
              caption="Health gates"
              columns={['Gate', 'Status', 'Detail']}
              rows={health.gates.map((g) => [g.label, g.passed ? 'Pass' : g.severity, g.detail])}
            />
            <CoverageMeter
              coverage={health.economicCoverageEstimate}
              missingNote="Cost match estimate from direct_cost coverage"
            />
            <button
              type="button"
              disabled={!health.canRunChecks || pending}
              className="rounded-sm bg-[var(--ink)] px-4 py-2 text-sm text-[var(--folio)] disabled:opacity-40"
              onClick={run}
            >
              {pending ? 'Running…' : 'Run detection'}
            </button>
          </div>
        ) : null}

        {step === 'results' && result ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                Overview equation
              </h2>
              <RunHash hash={result.headline.runHash} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-[var(--ink-2)]">Detected leakage</p>
                <p className="text-2xl font-semibold">
                  <Money amount={result.headline.detectedLeakageAud} />
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--ink-2)]">Modelled opportunity</p>
                <p className="text-2xl font-semibold">
                  <Money amount={result.headline.modelledOpportunityAud} />
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--ink-2)]">Addressable margin</p>
                <p className="text-2xl font-semibold">
                  <Money amount={result.headline.addressableMarginAud} />
                </p>
              </div>
            </div>
            <DoubleRuleTotal
              label="Addressable margin"
              amount={result.headline.addressableMarginAud}
            />
            <RedInkBar detectedShare={detectedShare} modelledShare={1 - detectedShare} />
            <div className="grid gap-4 md:grid-cols-3">
              <BankabilityRange
                low={result.headline.expectedBankableLowAud}
                base={result.headline.expectedBankableBaseAud}
                high={result.headline.expectedBankableHighAud}
              />
              <CoverageMeter
                coverage={result.headline.economicCoverage}
                missingNote="Economic coverage from cost match"
              />
              <div className="space-y-3">
                <RiskIndicator
                  band={
                    result.headline.marginIntegrityIndex >= 80
                      ? 'LOW'
                      : result.headline.marginIntegrityIndex >= 60
                        ? 'MEDIUM'
                        : 'HIGH'
                  }
                  score={result.headline.marginIntegrityIndex}
                />
                <p className="text-sm text-[var(--ink-2)]">
                  Cash entitlement <Money amount={result.headline.cashEntitlementAud} />
                </p>
              </div>
            </div>
            <LedgerTable
              caption="Findings ledger"
              columns={['Check', 'Title', 'Class', 'Grade', 'Allocated']}
              rows={result.findings.slice(0, 20).map((f) => [
                f.checkId,
                f.title,
                <ValueClassBadge key={`${f.findingId}-vc`} valueClass={asValueClass(f.valueClass)} />,
                <EvidenceGradeBadge key={`${f.findingId}-eg`} grade={f.evidenceGrade} />,
                <Money key={`${f.findingId}-am`} amount={f.allocatedValueAud} />,
              ])}
            />
            <FindingStatusBadge status="DETECTED" />
          </div>
        ) : null}
      </section>
    </AppShell>
  );
}
