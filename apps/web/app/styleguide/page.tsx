import type { Metadata } from "next";
import { BankabilityRange } from "@/components/ledger/bankability-range";
import { BasisPoints } from "@/components/ledger/basis-points";
import { CoverageMeter } from "@/components/ledger/coverage-meter";
import { EvidenceGrade } from "@/components/ledger/evidence-grade";
import { FindingStatus } from "@/components/ledger/finding-status";
import {
  DoubleRuleTotal,
  LedgerBody,
  LedgerHead,
  LedgerTable,
} from "@/components/ledger/ledger-table";
import { Money } from "@/components/ledger/money";
import { Percentage } from "@/components/ledger/percentage";
import { RedInkBar } from "@/components/ledger/red-ink-bar";
import { RiskIndicator } from "@/components/ledger/risk-indicator";
import { RunHash } from "@/components/ledger/run-hash";
import { ValueClassBadge } from "@/components/ledger/value-class-badge";
import { AppShell } from "@/components/shell/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Ledger styleguide",
};

const SYNTHETIC = {
  detected: 796_000,
  modelled: 1_040_000,
  addressable: 1_840_000,
  bankableLow: 520_000,
  bankableBase: 780_000,
  bankableHigh: 1_010_000,
  cash: 124_000,
} as const;

export default function StyleguidePage() {
  return (
    <AppShell currentPath="/styleguide">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-2">
          <h1 className="font-display text-4xl text-ink">Ledger</h1>
          <p className="max-w-2xl text-ink-2">
            Design system for MarginShield. Figures on this page are labelled synthetic
            illustrations, not live engine output.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="font-display text-2xl">Overview equation</h2>
          <div className="grid gap-4 rounded-sm border border-ruling-soft bg-folio p-6 sm:grid-cols-3">
            <div>
              <p className="font-display text-3xl text-red-ink">
                <Money value={SYNTHETIC.detected} compact />
              </p>
              <p className="text-sm text-ink-2">Detected leakage</p>
            </div>
            <div>
              <p className="font-display text-3xl text-red-ink">
                <Money value={SYNTHETIC.modelled} compact />
              </p>
              <p className="text-sm text-ink-2">Modelled opportunity</p>
            </div>
            <div>
              <p className="font-display text-3xl text-ink">
                <Money value={SYNTHETIC.addressable} compact />
              </p>
              <p className="text-sm text-ink-2">Addressable margin</p>
            </div>
          </div>
          <RedInkBar
            detectedShare={43}
            modelledShare={57}
            label="The Bleed — synthetic illustration"
          />
          <BankabilityRange
            low={SYNTHETIC.bankableLow}
            base={SYNTHETIC.bankableBase}
            high={SYNTHETIC.bankableHigh}
          />
          <p className="text-sm">
            Cash claimable now <Money value={SYNTHETIC.cash} compact />
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">Classification</h2>
          <div className="flex flex-wrap gap-2">
            <ValueClassBadge valueClass="DETECTED_LEAKAGE" />
            <ValueClassBadge valueClass="MODELLED_MARGIN_OPPORTUNITY" />
            <ValueClassBadge valueClass="CASH_ENTITLEMENT" />
            <ValueClassBadge valueClass="BILLING_RISK" />
            <EvidenceGrade grade="A" />
            <EvidenceGrade grade="B" />
            <EvidenceGrade grade="C" />
            <FindingStatus status="DETECTED" />
            <FindingStatus status="VERIFIED" />
            <FindingStatus status="REJECTED" />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">Ledger table</h2>
          <LedgerTable caption="Synthetic Harbourline illustration — not engine output">
            <LedgerHead>
              <tr>
                <th className="py-2 pr-4">Check</th>
                <th className="py-2 text-right">Allocated</th>
                <th className="py-2 text-right">Share</th>
                <th className="py-2 text-right">Trend</th>
              </tr>
            </LedgerHead>
            <LedgerBody>
              <tr>
                <td className="py-2">P3 Cost pass-through</td>
                <td className="py-2 text-right">
                  <Money value={411000} />
                </td>
                <td className="py-2 text-right">
                  <Percentage value={22.3} />
                </td>
                <td className="py-2 text-right">
                  <BasisPoints value={18} />
                </td>
              </tr>
              <tr>
                <td className="py-2">P1 Agreement variance</td>
                <td className="py-2 text-right">
                  <Money value={-1200} />
                </td>
                <td className="py-2 text-right">
                  <Percentage value={15.5} />
                </td>
                <td className="py-2 text-right">
                  <BasisPoints value={-4} />
                </td>
              </tr>
              <DoubleRuleTotal label="Addressable margin">
                <Money value={SYNTHETIC.addressable} />
              </DoubleRuleTotal>
            </LedgerBody>
          </LedgerTable>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <CoverageMeter coverage={82} missing={["variable cost-to-serve"]} />
          <RiskIndicator score={44} band="MEDIUM" />
          <div>
            <p className="text-sm text-ink-2">Run hash</p>
            <RunHash hash="8f3c91ab0d12e4b77c90aa12ff0091cd" />
          </div>
          <form className="space-y-2">
            <label htmlFor="sample-input" className="text-sm">
              Materiality (AUD)
            </label>
            <Input id="sample-input" defaultValue="250" inputMode="decimal" />
            <div className="flex gap-2">
              <Button type="button">Save assumption</Button>
              <Button type="button" variant="outline">
                Reset
              </Button>
            </div>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
