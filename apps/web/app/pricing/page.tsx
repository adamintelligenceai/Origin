import Link from "next/link";

export default function PricingPage() {
  return (
    <main>
      <p className="eyebrow">Founding cohort</p>
      <h1>One Executive plan.</h1>
      <p className="lede">
        14-day trial. A$69/month for the first 100 users. No permanent free tier.
      </p>
      <section className="trust">
        <article>
          <span>Includes</span>
          <h2>Personal node</h2>
          <p>Desktop is canonical. Mobile pairs after you approve the device.</p>
        </article>
        <article>
          <span>Limits</span>
          <h2>Local cost ledger</h2>
          <p>Model spend is tracked on device. The cloud never sees prompts or source content.</p>
        </article>
        <article>
          <span>Leave</span>
          <h2>Cancel in one action</h2>
          <p>
            Billing lives on the control plane. Source content is never sent to Stripe.{" "}
            <Link href="/billing">Open billing</Link>
          </p>
        </article>
      </section>
    </main>
  );
}
