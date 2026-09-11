import {
  BankabilityRange,
  BasisPoints,
  CoverageMeter,
  DoubleRuleTotal,
  EvidenceGrade,
  FindingStatus,
  LedgerTable,
  Money,
  Percentage,
  RedInkBar,
  RiskIndicator,
  RunHash,
  ValueClassBadge,
} from '@marginshield/ui';

export const metadata = {
  title: 'Ledger styleguide',
};

const SAMPLE_ROWS = [
  {
    id: '1',
    check: 'P1',
    customer: 'Meridian Mechanical',
    amount: 48_200,
    grade: 'A' as const,
    status: 'DETECTED' as const,
    valueClass: 'DETECTED_LEAKAGE' as const,
  },
  {
    id: '2',
    check: 'P3',
    customer: 'Northbridge HVAC',
    amount: 91_400,
    grade: 'B' as const,
    status: 'REVIEWED' as const,
    valueClass: 'MODELLED_MARGIN_OPPORTUNITY' as const,
  },
  {
    id: '3',
    check: 'B1',
    customer: '—',
    amount: 124_000,
    grade: 'A' as const,
    status: 'VERIFIED' as const,
    valueClass: 'CASH_ENTITLEMENT' as const,
  },
];

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <p className="text-sm uppercase tracking-[0.16em] text-ink-2">Ledger design system</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Styleguide</h1>
      <p className="mt-2 max-w-2xl text-ink-2">
        Synthetic commercial values only. Shared Ledger primitives for marketing, demo and the
        authenticated application.
      </p>

      <Section title="Money & rates">
        <div className="flex flex-wrap gap-6 text-lg">
          <Money value={796_000} tone="detected" />
          <Money value={1_044_000} compact tone="modelled" />
          <Money value={780_000} tone="bank" />
          <Percentage value={0.872} />
          <BasisPoints value={-45} showSign />
        </div>
      </Section>

      <Section title="Badges & status">
        <div className="flex flex-wrap gap-2">
          <EvidenceGrade grade="A" />
          <EvidenceGrade grade="B" />
          <EvidenceGrade grade="C" />
          <ValueClassBadge valueClass="DETECTED_LEAKAGE" />
          <ValueClassBadge valueClass="MODELLED_MARGIN_OPPORTUNITY" />
          <ValueClassBadge valueClass="CASH_ENTITLEMENT" />
          <FindingStatus status="DETECTED" />
          <FindingStatus status="ACTION_PLANNED" />
          <RiskIndicator band="LOW" />
          <RiskIndicator band="MEDIUM" />
          <RiskIndicator band="HIGH" />
          <RunHash hash="harbourline-demo-seed-42-abcdef" />
        </div>
      </Section>

      <Section title="Red ink bar">
        <RedInkBar
          revenue={85_000_000}
          segments={[
            { id: 'd', label: 'Detected', amount: 796_000, kind: 'detected' },
            { id: 'm', label: 'Modelled', amount: 1_044_000, kind: 'modelled' },
          ]}
        />
      </Section>

      <Section title="Bankability & coverage">
        <div className="grid gap-6 md:grid-cols-2">
          <BankabilityRange low={520_000} base={780_000} high={1_010_000} />
          <CoverageMeter coverage={87} />
        </div>
      </Section>

      <Section title="Ledger table">
        <LedgerTable
          caption="Sample findings"
          rowKey={(r) => r.id}
          rows={SAMPLE_ROWS}
          columns={[
            { key: 'check', header: 'Check', render: (r) => r.check },
            { key: 'customer', header: 'Customer', render: (r) => r.customer },
            {
              key: 'class',
              header: 'Class',
              render: (r) => <ValueClassBadge valueClass={r.valueClass} />,
            },
            {
              key: 'grade',
              header: 'Evidence',
              render: (r) => <EvidenceGrade grade={r.grade} />,
            },
            {
              key: 'status',
              header: 'Status',
              render: (r) => <FindingStatus status={r.status} />,
            },
            {
              key: 'amount',
              header: 'Allocated',
              align: 'right',
              render: (r) => <Money value={r.amount} compact tone="detected" />,
            },
          ]}
        />
        <div className="mt-4 max-w-sm">
          <DoubleRuleTotal label="Sample total">
            <Money value={263_600} />
          </DoubleRuleTotal>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 border border-ruling-soft bg-folio p-5">{children}</div>
    </section>
  );
}
