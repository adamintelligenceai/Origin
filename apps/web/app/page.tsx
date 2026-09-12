import Link from "next/link";

const PRODUCT_NAME = "Project Chief";

export default function HomePage() {
  return (
    <main>
      <nav>
        <strong>{PRODUCT_NAME}</strong>
        <span>Private beta</span>
      </nav>
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
          <p>Turns email, meetings and commitments into a short decision queue.</p>
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
    </main>
  );
}
