import {
  AppShell,
  BankabilityRange,
  BasisPoints,
  Button,
  CoverageMeter,
  DoubleRuleTotal,
  EvidenceGrade,
  FindingStatus,
  LedgerTable,
  LedgerTableBody,
  LedgerTableCell,
  LedgerTableHead,
  LedgerTableHeaderCell,
  LedgerTableRow,
  Money,
  Percentage,
  RedInkBar,
  RiskIndicator,
  RunHash,
  ValueClassBadge,
} from "@marginshield/ui";

/** Synthetic commercial values for styleguide — not live dashboard figures */
const SYNTHETIC = {
  detectedLeakage: 796_000,
  modelledOpportunity: 1_040_000,
  addressableMargin: 1_836_000,
  bankableLow: 520_000,
  bankableBase: 780_000,
  bankableHigh: 1_010_000,
  cashClaimable: 124_000,
  coverage: 82,
  runHash: "a3f8c2d91e4b7f06",
};

export default function StyleguidePage() {
  return (
    <AppShell>
      <header className="border-b border-ruling-soft bg-folio px-6 py-4">
        <h1 className="font-display text-3xl font-semibold text-ink">Ledger design system</h1>
        <p className="mt-1 text-sm text-ruling">
          MarginShield component library — synthetic values for demonstration only
        </p>
      </header>

      <div className="mx-auto max-w-5xl space-y-12 px-6 py-10">
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Typography &amp; money</h2>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-xs text-ruling">Money (compact)</p>
              <Money amount={SYNTHETIC.detectedLeakage} compact className="text-3xl font-semibold" />
            </div>
            <div>
              <p className="text-xs text-ruling">Negative</p>
              <Money amount={-45230} />
            </div>
            <div>
              <p className="text-xs text-ruling">Percentage</p>
              <Percentage value={0.246} />
            </div>
            <div>
              <p className="text-xs text-ruling">Basis points</p>
              <BasisPoints value={0.0035} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Classification</h2>
          <div className="flex flex-wrap gap-3">
            <ValueClassBadge valueClass="DETECTED_LEAKAGE" />
            <ValueClassBadge valueClass="MODELLED_MARGIN_OPPORTUNITY" />
            <ValueClassBadge valueClass="CASH_ENTITLEMENT" />
            <ValueClassBadge valueClass="BILLING_RISK" />
            <EvidenceGrade grade="A" />
            <EvidenceGrade grade="B" />
            <EvidenceGrade grade="C" />
            <FindingStatus status="DETECTED" />
            <FindingStatus status="VERIFIED" />
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">The Bleed</h2>
          <RedInkBar
            totalRevenue={85_000_000}
            segments={[
              { label: "Detected leakage", amount: SYNTHETIC.detectedLeakage, variant: "detected" },
              {
                label: "Modelled opportunity",
                amount: SYNTHETIC.modelledOpportunity,
                variant: "modelled",
              },
              { label: "Bankable base", amount: SYNTHETIC.bankableBase, variant: "bankable" },
            ]}
          />
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Headline metrics</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <BankabilityRange
              low={SYNTHETIC.bankableLow}
              base={SYNTHETIC.bankableBase}
              high={SYNTHETIC.bankableHigh}
            />
            <CoverageMeter
              percentage={SYNTHETIC.coverage}
              tooltip="Supplier cost, agreements and freight components partially missing."
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Ledger table</h2>
          <LedgerTable caption="Sample findings">
            <LedgerTableHead>
              <LedgerTableHeaderCell>Check</LedgerTableHeaderCell>
              <LedgerTableHeaderCell>Customer</LedgerTableHeaderCell>
              <LedgerTableHeaderCell align="right">Value</LedgerTableHeaderCell>
              <LedgerTableHeaderCell>Status</LedgerTableHeaderCell>
            </LedgerTableHead>
            <LedgerTableBody>
              <LedgerTableRow>
                <LedgerTableCell>P3</LedgerTableCell>
                <LedgerTableCell>C-014 · North Coast HVAC</LedgerTableCell>
                <LedgerTableCell align="right" numeric>
                  <Money amount={47818} />
                </LedgerTableCell>
                <LedgerTableCell>
                  <FindingStatus status="DETECTED" />
                </LedgerTableCell>
              </LedgerTableRow>
              <LedgerTableRow>
                <LedgerTableCell>P1</LedgerTableCell>
                <LedgerTableCell>C-031 · Metro Electrical</LedgerTableCell>
                <LedgerTableCell align="right" numeric>
                  <Money amount={124500} />
                </LedgerTableCell>
                <LedgerTableCell>
                  <FindingStatus status="REVIEWED" />
                </LedgerTableCell>
              </LedgerTableRow>
            </LedgerTableBody>
          </LedgerTable>
          <DoubleRuleTotal label="Total addressable margin" amount={SYNTHETIC.addressableMargin} />
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Controls</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <RiskIndicator score={42} band="MEDIUM" />
            <RunHash hash={SYNTHETIC.runHash} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
