import { commercial } from '../../config/commercial';
import { MarketingShell } from '../../components/MarketingShell';

function aud(n: number) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n);
}

export default function PricingPage() {
  const offers = [commercial.offers.leakageScan, commercial.offers.foundingScan, commercial.offers.monitor];
  return (
    <MarketingShell>
      <article className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="font-display text-5xl">Pricing hypotheses</h1>
        <p className="mt-3 text-ink-2">Prices live in configuration and can change without rewriting the product.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <section key={offer.id} className="border border-ruling-soft bg-folio p-5">
              <h2 className="font-display text-3xl">{offer.name}</h2>
              <p className="mt-3 font-display text-4xl">
                {aud(offer.price)}
                {offer.cadence === 'month' ? '/month' : ''}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {offer.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {'note' in offer && offer.note ? <p className="mt-4 text-xs text-ink-2">{offer.note}</p> : null}
            </section>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
