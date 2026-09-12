export default function AccountPage() {
  return (
    <main>
      <p className="eyebrow">Account</p>
      <h1>Plan and devices.</h1>
      <p className="lede">
        This control plane never stores email bodies, calendar titles or prompts.
      </p>
      <section className="trust">
        <article>
          <span>Plan</span>
          <h2>Executive</h2>
          <p>Founding cohort. Cancellation does not require sending personal source content.</p>
        </article>
        <article>
          <span>Devices</span>
          <h2>Public keys only</h2>
          <p>Device IDs, platforms and last-seen metadata. No inbox contents.</p>
        </article>
        <article>
          <span>Export</span>
          <h2>Happens locally</h2>
          <p>Account deletion here cannot recover a wiped personal node. That is intentional.</p>
        </article>
      </section>
    </main>
  );
}
