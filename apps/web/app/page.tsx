import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Private Chief of Staff</p>
        <h1>Wake up with less to do.</h1>
        <p className="lede">
          A private Chief of Staff that finds what needs attention, prepares the decision, and
          carries approved work through.
        </p>
        <div className="actions">
          <Link href="/waitlist">Join founding access</Link>
          <Link href="/trust" className="secondary">
            See how it works
          </Link>
        </div>
      </section>
      <section className="trust">
        <article>
          <span>01</span>
          <h2>Sees what matters</h2>
          <p>
            Turns mail, meetings, phone, SMS, LinkedIn, Instagram, Facebook and X into a short
            decision queue. Social uses local OAuth. Bodies stay on this device.
          </p>
        </article>
        <article>
          <span>02</span>
          <h2>Asks before it acts</h2>
          <p>Consequential actions stay behind explicit approval and clear permission rules.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Proves the result</h2>
          <p>An action is not complete until the external system is checked again.</p>
        </article>
      </section>
      <section className="trust">
        <article>
          <span>Not a chat</span>
          <h2>Work, not a prompt box</h2>
          <p>The morning opens on Today. Chief answers become structured work items.</p>
        </article>
        <article>
          <span>Demo</span>
          <h2>Approve, then verify</h2>
          <p>Today → Decision → Approve → Executing → Verified → Receipt. Never sooner.</p>
        </article>
        <article>
          <span>Trust</span>
          <h2>Give yourself a Chief of Staff</h2>
          <p>Founding access is limited. The service cloud stays useless to an attacker.</p>
        </article>
      </section>
    </main>
  );
}
