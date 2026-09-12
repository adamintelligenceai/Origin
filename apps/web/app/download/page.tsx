export default function DownloadPage() {
  return (
    <main>
      <p className="eyebrow">Personal node</p>
      <h1>Download the desktop app.</h1>
      <p className="lede">Desktop is canonical in V1. Mobile is the companion after pairing.</p>
      <section className="trust">
        <article>
          <span>macOS</span>
          <h2>Signed build</h2>
          <p>
            Alpha builds will be signed and updateable. Preview runs locally from the monorepo
            today.
          </p>
        </article>
        <article>
          <span>Windows</span>
          <h2>Same privacy boundary</h2>
          <p>No remote script origins. Capabilities stay at the Tauri default set.</p>
        </article>
        <article>
          <span>Mobile</span>
          <h2>Pairs later</h2>
          <p>The companion cannot decrypt history unless you transfer it from a trusted device.</p>
        </article>
      </section>
    </main>
  );
}
