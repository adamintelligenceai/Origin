import Link from "next/link";

export default function PricingPage() {
  return (
    <main>
      <p className="eyebrow">Founding cohort</p>
      <h1>One Executive plan.</h1>
      <p className="lede">
        14-day trial. A$69/month for the first 100 users. No permanent free tier. Gamified
        progression included from day one.
      </p>
      <section className="trust">
        <article>
          <span>Includes</span>
          <h2>Personal node</h2>
          <p>Desktop is canonical. Mobile pairs after you approve the device.</p>
        </article>
        <article>
          <span>Progress</span>
          <h2>Chief levels & achievements</h2>
          <p>XP, streaks, weekly goals, and ten achievements — computed locally, not in the cloud.</p>
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
      <section className="trust">
        <article>
          <span>Sell</span>
          <h2>Commercial pack ready</h2>
          <p>
            One-pager, sales deck, GTM playbook, and launch package live in{" "}
            <code>docs/commercial/</code> for founders closing founding cohort deals.
          </p>
        </article>
        <article>
          <span>Limits</span>
          <h2>Local cost ledger</h2>
          <p>Model spend is tracked on device. The cloud never sees prompts or source content.</p>
        </article>
        <article>
          <span>Demo</span>
          <h2>60-second close</h2>
          <p>
            Today → Approve → Verified → Receipt → XP unlocked. See{" "}
            <Link href="/progress">Chief progression</Link>.
          </p>
        </article>
      </section>
    </main>
  );
}
