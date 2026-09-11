import Link from 'next/link';
import {
  AppShell,
  BankabilityRange,
  BasisPoints,
  CoverageMeter,
  DoubleRuleTotal,
  EvidenceGradeBadge,
  FindingStatusBadge,
  LedgerTable,
  Money,
  Percentage,
  RedInkBar,
  RiskIndicator,
  RunHash,
  ValueClassBadge,
} from '@marginshield/ui';

export default function StyleguidePage() {
  return (
    <AppShell
      title="Ledger"
      nav={
        <nav className="flex flex-col gap-2 text-sm text-[var(--ink-2)]">
          <Link href="/">Home</Link>
          <Link href="/demo">Demo</Link>
          <span className="text-[var(--ink)]">Styleguide</span>
        </nav>
      }
    >
      <section className="ms-folio space-y-4 border border-[var(--ruling-soft)] p-6">
        <h1 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
          Ledger design system
        </h1>
        <p className="text-[var(--ink-2)]">
          Synthetic commercial values for visual QA only — not live scan output.
        </p>
        <RunHash hash="run_phase1_styleguide_synthetic" />
      </section>

      <section className="ms-folio space-y-4 border border-[var(--ruling-soft)] p-6">
        <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
          Numbers
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            Money <Money amount={796_000} />
          </div>
          <div>
            Negative <Money amount={-12_450} />
          </div>
          <div>
            Percent <Percentage value={0.246} /> · <BasisPoints bps={35} />
          </div>
        </div>
      </section>

      <section className="ms-folio space-y-4 border border-[var(--ruling-soft)] p-6">
        <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
          Classification
        </h2>
        <div className="flex flex-wrap gap-2">
          <ValueClassBadge valueClass="DETECTED_LEAKAGE" />
          <ValueClassBadge valueClass="MODELLED_MARGIN_OPPORTUNITY" />
          <ValueClassBadge valueClass="CASH_ENTITLEMENT" />
          <ValueClassBadge valueClass="BILLING_RISK" />
          <EvidenceGradeBadge grade="A" />
          <EvidenceGradeBadge grade="B" />
          <EvidenceGradeBadge grade="C" />
          <FindingStatusBadge status="DETECTED" />
          <FindingStatusBadge status="VERIFIED" />
        </div>
      </section>

      <section className="ms-folio space-y-4 border border-[var(--ruling-soft)] p-6">
        <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
          Composition
        </h2>
        <RedInkBar detectedShare={0.43} modelledShare={0.57} />
        <CoverageMeter coverage={0.82} missingNote="Missing: variable cost-to-serve (5)." />
        <BankabilityRange low={520_000} base={780_000} high={1_010_000} />
        <RiskIndicator band="MEDIUM" score={54} />
        <DoubleRuleTotal label="Total addressable margin" amount={1_840_000} />
      </section>

      <section className="ms-folio space-y-4 border border-[var(--ruling-soft)] p-6">
        <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
          Ledger table
        </h2>
        <LedgerTable
          caption="Synthetic Harbourline sample rows"
          columns={['Customer', 'Check', 'Class', 'Amount']}
          rows={[
            ['Northshore HVAC', 'P1', <ValueClassBadge key="a" valueClass="DETECTED_LEAKAGE" />, <Money key="am" amount={286_000} />],
            ['Bayview Electrical', 'P3', <ValueClassBadge key="b" valueClass="MODELLED_MARGIN_OPPORTUNITY" />, <Money key="bm" amount={411_000} />],
          ]}
        />
      </section>
    </AppShell>
  );
}
