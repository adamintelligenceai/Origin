export default function DevicesPage() {
  return (
    <main>
      <p className="eyebrow">Device directory</p>
      <h1>Paired devices.</h1>
      <p className="lede">
        Only device IDs, public keys, platform and last-seen metadata are stored here.
      </p>
      <section className="trust">
        <article>
          <span>Desktop</span>
          <h2>Canonical node</h2>
          <p>This is where source content is processed. Revoking it drops the local vault.</p>
        </article>
        <article>
          <span>Mobile</span>
          <h2>Companion</h2>
          <p>A new phone cannot read yesterday unless you explicitly transfer history.</p>
        </article>
        <article>
          <span>Relay</span>
          <h2>Content-blind</h2>
          <p>The cloud sees envelope IDs and expiry, not the plaintext inside.</p>
        </article>
      </section>
    </main>
  );
}
