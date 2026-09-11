import { commercial } from '@/config/commercial';
import { formatAudDisplay } from '@/lib/utils';
import Link from 'next/link';

export const metadata = { title: 'Pricing' };

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
      <p className="mt-3 text-ink-2">
        Hypothesis pricing — configurable without code changes. These are commercial starting
        points, not guarantees.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card
          title="Margin Leakage Scan"
          price={formatAudDisplay(commercial.scanPriceAud)}
          body="Diagnostic scan, methodology review, board pack, action workbook, evidence ledger, review meeting."
        />
        <Card
          title="Founding Client Scan"
          price={formatAudDisplay(commercial.foundingScanPriceAud)}
          body="Limited founding-client offer. Case-study permission is separately consented."
          featured
        />
        <Card
          title="Margin Monitor"
          price={`${formatAudDisplay(commercial.monitorMonthlyAud)}/mo`}
          body="Refreshed scan, comparison, recovery-plan monitoring and trend reporting."
        />
      </div>
      <div className="mt-10">
        <Link href="/book" className="border border-ink bg-ink px-4 py-2 text-folio">
          Book a Margin Scan
        </Link>
      </div>
    </div>
  );
}

function Card({
  title,
  price,
  body,
  featured,
}: {
  title: string;
  price: string;
  body: string;
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? 'border border-ink bg-ink p-6 text-folio'
          : 'border border-ruling-soft bg-folio p-6'
      }
    >
      <div className={featured ? 'text-manila text-sm' : 'text-ink-2 text-sm'}>{title}</div>
      <div className="mt-2 text-3xl font-semibold tabular">{price}</div>
      <p className={`mt-3 text-sm ${featured ? 'text-ruling-soft' : 'text-ink-2'}`}>{body}</p>
    </div>
  );
}
