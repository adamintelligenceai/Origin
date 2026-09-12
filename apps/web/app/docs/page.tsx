export default function DocsPage() {
  return (
    <main>
      <p className="eyebrow">Public docs</p>
      <h1>How the personal node works.</h1>
      <p className="lede">
        This is the public architecture summary. Private source content never belongs in these
        pages or in the service cloud.
      </p>
      <section className="trust">
        <article>
          <span>Local</span>
          <h2>Personal node</h2>
          <p>Desktop holds email, calendar notes, the Life Graph, receipts and the database key.</p>
        </article>
        <article>
          <span>Approve</span>
          <h2>Permission first</h2>
          <p>Mutations default to A3. Models cannot grant autonomy. Unknown actions fail closed.</p>
        </article>
        <article>
          <span>Cloud</span>
          <h2>Content-blind</h2>
          <p>Account, plan, device public keys, push routing and ciphertext relay. Nothing else.</p>
        </article>
      </section>
    </main>
  );
}
