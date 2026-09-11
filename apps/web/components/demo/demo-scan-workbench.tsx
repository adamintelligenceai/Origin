'use client';

import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';
import { generateHarbourline } from '@marginshield/synthetic';
import { runScan } from '@marginshield/engine';
import type { ScanResult } from '@marginshield/engine';
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

export function DemoScanWorkbench() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [meta, setMeta] = useState<{ txCount: number; company: string } | null>(null);

  const run = () => {
    startTransition(() => {
      const ds = generateHarbourline({ seed: 42, variant: 'planted', mode: 'compact' });
      const scan = runScan({
        transactions: ds.transactions,
        rebates: ds.rebates,
        sourceFingerprints: ['harbourline-demo-seed-42'],
      });
      setResult(scan);
      setMeta({ txCount: ds.transactions.length, company: ds.groundTruth.company });
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
          <span className="text-[var(--ink)]">Demo scan</span>
          <Link href="/styleguide">Styleguide</Link>
        </nav>
      }
    >
      <section className="ms-folio space-y-4 border border-[var(--ruling-soft)] p-6">
        <p className="text-xs uppercase tracking-wide text-[var(--ink-2)]">
          Fictional demonstration company
        </p>
        <h1 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
          Harbourline Trade Supply
        </h1>
        <p className="max-w-2xl text-[var(--ink-2)]">
          Runs the same deterministic engine used by the product against synthetic Harbourline
          files. No customer transaction rows leave this browser session.
        </p>
        <button
          type="button"
          onClick={run}
          disabled={pending}
          className="rounded-sm bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--folio)] disabled:opacity-60"
        >
          {pending ? 'Running scan…' : result ? 'Re-run demo scan' : 'Run demo scan'}
        </button>
      </section>

      {result && meta ? (
        <>
          <section className="ms-folio space-y-4 border border-[var(--ruling-soft)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                Overview equation
              </h2>
              <RunHash hash={result.headline.runHash} />
            </div>
            <p className="text-sm text-[var(--ink-2)]">
              {meta.company} · {meta.txCount.toLocaleString('en-AU')} transaction lines · coverage{' '}
              {Math.round(result.headline.economicCoverage * 100)}%
            </p>
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
                missingNote="Demo coverage is illustrative for Harbourline synthetic inputs."
              />
              <div className="space-y-3">
                <RiskIndicator band="MEDIUM" score={54} />
                <p className="text-sm text-[var(--ink-2)]">
                  Cash entitlement now <Money amount={result.headline.cashEntitlementAud} />
                </p>
                <p className="text-sm text-[var(--ink-2)]">
                  Margin Integrity Index {result.headline.marginIntegrityIndex}
                </p>
              </div>
            </div>
          </section>

          <section className="ms-folio space-y-4 border border-[var(--ruling-soft)] p-6">
            <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Leakage ledger
            </h2>
            <LedgerTable
              caption="Findings from the deterministic Harbourline demo scan"
              columns={['Check', 'Title', 'Class', 'Grade', 'Allocated']}
              rows={result.findings.slice(0, 12).map((f) => [
                f.checkId,
                f.title,
                <ValueClassBadge key={`${f.findingId}-vc`} valueClass={asValueClass(f.valueClass)} />,
                <EvidenceGradeBadge key={`${f.findingId}-eg`} grade={f.evidenceGrade} />,
                <Money key={`${f.findingId}-am`} amount={f.allocatedValueAud} />,
              ])}
            />
            <FindingStatusBadge status="DETECTED" />
          </section>
        </>
      ) : null}
    </AppShell>
  );
}
