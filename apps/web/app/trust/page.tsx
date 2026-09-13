export default function TrustPage() {
  return (
    <main>
      <p className="eyebrow">Trust architecture</p>
      <h1>Your service provider shouldn't need a copy of your life.</h1>
      <p className="lede">
        Personal context is stored locally by default. The service cloud is limited to account,
        billing, device public keys, push routing and content-free telemetry.
      </p>
      <section className="trust">
        <article>
          <span>Local</span>
          <h2>On this device</h2>
          <p>
            Phone, SMS, mail, calendar, LinkedIn, Instagram, Facebook, X, Life Graph, receipts
            and the database key stay on the personal node. Social tokens use local OAuth.
          </p>
        </article>
        <article>
          <span>Vault</span>
          <h2>Tokens stay home</h2>
          <p>
            OAuth refresh tokens never pass through the service cloud. Revoke drops them locally.
          </p>
        </article>
        <article>
          <span>Relay</span>
          <h2>Ciphertext only</h2>
          <p>
            Device sync is ciphertext plus routing metadata. There is no plaintext recovery escrow.
          </p>
        </article>
      </section>
    </main>
  );
}
