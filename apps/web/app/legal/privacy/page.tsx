import { MarketingShell } from '../../../components/MarketingShell';

export default function LegalPrivacyPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl">Privacy</h1>
        <p className="mt-4">
          MarginShield by Evidence Room processes customer transaction files locally in the browser for v1 scans. Server
          systems store account, organisation, licence and optional consented headline metrics only. See Privacy by
          design for architecture.
        </p>
      </article>
    </MarketingShell>
  );
}
