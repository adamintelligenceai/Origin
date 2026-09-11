import Link from 'next/link';
import { computeMarginIntegrityIndex } from '@marginshield/engine';
import { formatMoneyAUD } from '@marginshield/ui';

/** Demo placeholders use engine helpers only — headline figures arrive from the scan engine in later phases. */
export default function DemoPage() {
  const mii = computeMarginIntegrityIndex({
    verifiedOrDetectedLeakage: 0,
    modelledMarginOpportunity: 0,
    t12mNetSales: 1,
  });

  return (
    <main className="ms-ledger-bg min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-[var(--ink-2)]">
          ← MarginShield
        </Link>
        <h1 className="mt-6 text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
          Demo scan
        </h1>
        <p className="mt-3 text-[var(--ink-2)]">
          Harbourline Trade Supply is a fictional demonstration company. The local engine and
          planted dataset land in Phases 2–3. Current scaffold confirms package wiring only.
        </p>
        <dl className="mt-8 grid gap-4 border-t border-[var(--ruling-soft)] pt-6 text-sm">
          <div className="flex justify-between">
            <dt>Detected leakage (pre-scan)</dt>
            <dd>{formatMoneyAUD(0)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Margin Integrity Index (empty run)</dt>
            <dd>{mii}</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
