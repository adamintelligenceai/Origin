import { COMMERCIAL } from '@/config/commercial';

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold text-ink">Pricing</h1>
      <div className="mt-8 space-y-6">
        <article className="rounded-lg border border-ruling-soft p-6">
          <h2 className="text-xl font-semibold">Margin Leakage Scan</h2>
          <p className="mt-2 text-2xl tabular-nums">
            A${COMMERCIAL.marginLeakageScan.aud.toLocaleString('en-AU')}
          </p>
          <p className="mt-2 text-sm text-ink-2">{COMMERCIAL.marginLeakageScan.description}</p>
        </article>
        <article className="rounded-lg border border-ruling-soft p-6">
          <h2 className="text-xl font-semibold">Founding Client Scan</h2>
          <p className="mt-2 text-2xl tabular-nums">
            A${COMMERCIAL.foundingClientScan.aud.toLocaleString('en-AU')}
          </p>
          <p className="mt-2 text-sm text-ink-2">{COMMERCIAL.foundingClientScan.description}</p>
        </article>
        <article className="rounded-lg border border-ruling-soft p-6">
          <h2 className="text-xl font-semibold">Margin Monitor</h2>
          <p className="mt-2 text-2xl tabular-nums">
            A${COMMERCIAL.marginMonitor.aud.toLocaleString('en-AU')}/month
          </p>
          <p className="mt-2 text-sm text-ink-2">{COMMERCIAL.marginMonitor.description}</p>
        </article>
      </div>
    </main>
  );
}
