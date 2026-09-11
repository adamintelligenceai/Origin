import { MarketingShell } from '../../components/MarketingShell';

export default function MethodPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl">The Leakage Ledger method</h1>
        <p className="mt-4 text-ink-2">
          MarginShield combines established transaction-economics concepts with classification, evidence, overlap control,
          bankability planning and outcome measurement. It does not claim to have invented the pocket-price waterfall.
        </p>
        <ol className="mt-10 space-y-4">
          {['Ingest', 'Reconstruct economics', 'Test', 'Classify', 'Evidence', 'Model action', 'Track outcome'].map(
            (step) => (
              <li key={step} className="ledger-rule py-3 font-display text-2xl">
                {step}
              </li>
            ),
          )}
        </ol>
        <h2 className="mt-12 font-display text-3xl">Detected versus modelled</h2>
        <p className="mt-3">
          Detected leakage has a documentary or approved-policy basis. Modelled opportunity is economically plausible but
          not a contractual entitlement. The two are never added together as “guaranteed savings”.
        </p>
        <h2 className="mt-10 font-display text-3xl">Worked Harbourline example</h2>
        <p className="mt-3">
          Harbourline Trade Supply Pty Ltd is a fictional demonstration company. A planted cost-pass-through gap on a
          plumbing SKU shows landed cost rising faster than realised price. The engine restores margin to the pre-shock
          baseline, allocates overlapping sell-side detectors with a running maximum, and traces the finding to cost and
          invoice rows.
        </p>
      </article>
    </MarketingShell>
  );
}
