import { MarketingShell } from '../../../components/MarketingShell';

export default function TermsPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl">Terms</h1>
        <p className="mt-4">
          MarginShield is licensed software. Authorised use is controlled by licence, copyright and contract. Client-side
          delivery of the calculation engine does not hide the methodology. Findings are a commercial diagnostic, not an
          audit or assurance opinion.
        </p>
      </article>
    </MarketingShell>
  );
}
