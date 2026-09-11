import Link from 'next/link';
import { brand, commercial } from '@/config/commercial';
import { formatAudDisplay } from '@/lib/utils';

export default function HomePage() {
  return (
    <div>
      <section className="bleed-band text-folio">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <p className="text-sm uppercase tracking-[0.18em] text-manila">{brand.category}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {brand.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ruling-soft">{brand.oneLiner}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/demo" className="bg-folio px-5 py-3 text-ink hover:bg-ledger">
              Run the demo scan
            </Link>
            <Link
              href="/book"
              className="border border-folio/40 px-5 py-3 text-folio hover:bg-folio/10"
            >
              Book a Margin Scan
            </Link>
          </div>
          <p className="mt-8 text-sm text-ruling-soft">
            Your transaction files are processed on your computer, not uploaded to ours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">One number isn&apos;t enough.</h2>
        <p className="mt-3 max-w-2xl text-ink-2">
          MarginShield separates evidence-backed leakage from modelled commercial opportunity, then
          shows a planning range for what may be bankable — without pretending every gap is lost
          cash.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            ['Detected leakage', 'Document or policy-supported variance'],
            ['Modelled opportunity', 'Commercial optimisation without contractual entitlement'],
            ['Expected bankable', 'Assumption-driven planning range'],
            ['Cash claimable now', 'Documentary entitlement within claim window'],
          ].map(([title, body]) => (
            <div key={title} className="border border-ruling-soft bg-folio p-5">
              <div className="text-sm font-medium text-ink">{title}</div>
              <p className="mt-2 text-sm text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ruling-soft bg-folio">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Revenue can grow while commercial economics quietly deteriorate.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-2">
            Your ERP recorded every transaction. MarginShield shows the commercial relationship that
            changed — cost movements that outran price, agreements that expired, freight that went
            unrecovered.
          </p>
          <div className="mt-8 grid max-w-xl gap-2 font-mono text-sm tabular">
            <div className="flex justify-between border-b border-ruling-soft py-2">
              <span>Supplier cost</span>
              <span className="text-red-ink">+14.1%</span>
            </div>
            <div className="flex justify-between border-b border-ruling-soft py-2">
              <span>Realised customer price</span>
              <span>+1.8%</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Pocket margin</span>
              <span>24.6% → 12.2%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Engagements</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="border border-ruling-soft bg-folio p-6">
            <div className="text-sm text-ink-2">Margin Leakage Scan</div>
            <div className="mt-2 text-3xl font-semibold tabular">
              {formatAudDisplay(commercial.scanPriceAud)}
            </div>
            <p className="mt-3 text-sm text-ink-2">
              One diagnostic scan, board pack, action workbook, evidence ledger and review meeting.
            </p>
          </div>
          <div className="border border-ink bg-ink p-6 text-folio">
            <div className="text-sm text-manila">Founding Client Scan</div>
            <div className="mt-2 text-3xl font-semibold tabular">
              {formatAudDisplay(commercial.foundingScanPriceAud)}
            </div>
            <p className="mt-3 text-sm text-ruling-soft">
              Limited founding-client offer. Case-study permission is separately consented.
            </p>
          </div>
          <div className="border border-ruling-soft bg-folio p-6">
            <div className="text-sm text-ink-2">Margin Monitor</div>
            <div className="mt-2 text-3xl font-semibold tabular">
              {formatAudDisplay(commercial.monitorMonthlyAud)}
              <span className="text-base font-normal text-ink-2">/mo</span>
            </div>
            <p className="mt-3 text-sm text-ink-2">
              Refreshed scan, prior-period comparison, recovery-plan monitoring and trend reporting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
