export default function BillingPage() {
  return (
    <main>
      <p className="eyebrow">Billing</p>
      <h1>Stripe customer of record.</h1>
      <p className="lede">
        Cancellation is one action. No personal source content is sent to Stripe.
      </p>
      <section className="trust">
        <article>
          <span>Charge</span>
          <h2>A$69 / month</h2>
          <p>Founding price for the first 100 seats after the 14-day trial.</p>
        </article>
        <article>
          <span>Cancel</span>
          <h2>One action</h2>
          <p>The personal node keeps working offline. Cloud features stop with the subscription.</p>
        </article>
        <article>
          <span>Data</span>
          <h2>Content-free</h2>
          <p>Stripe receives customer and payment fields only. Never mail, calendar or prompts.</p>
        </article>
      </section>
    </main>
  );
}
