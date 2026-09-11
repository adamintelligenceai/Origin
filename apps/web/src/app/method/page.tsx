import { brand } from '@/config/commercial';

export const metadata = { title: 'Method' };

export default function MethodPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Method</h1>
      <p className="mt-4 text-ink-2">
        {brand.product} combines established transaction-economics concepts with its Leakage Ledger
        methodology for classification, evidence, overlap control, bankability planning and outcome
        measurement.
      </p>
      <ol className="mt-8 list-decimal space-y-4 pl-5 text-ink-2">
        <li>
          <strong className="text-ink">Ingest</strong> — map distributor exports locally in the
          browser.
        </li>
        <li>
          <strong className="text-ink">Reconstruct economics</strong> — price and cost waterfalls
          without double-counting.
        </li>
        <li>
          <strong className="text-ink">Test</strong> — run Buy, Serve and Sell check families.
        </li>
        <li>
          <strong className="text-ink">Classify</strong> — separate detected leakage from modelled
          opportunity.
        </li>
        <li>
          <strong className="text-ink">Evidence</strong> — every material number drills to source.
        </li>
        <li>
          <strong className="text-ink">Model action</strong> — guarded price scenarios and break-even
          volume.
        </li>
        <li>
          <strong className="text-ink">Track outcome</strong> — calibrate capture assumptions over
          time.
        </li>
      </ol>
      <p className="mt-8 text-sm text-ruling">
        MarginShield does not claim to have invented the pocket-price waterfall. Its proprietary
        product methodology is the integrated system of classification, single-count tranche
        allocation, evidence lineage and bankability planning.
      </p>
    </div>
  );
}
