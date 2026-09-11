export const metadata = { title: 'Privacy by design' };

export default function PrivacyByDesignPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy by design</h1>
      <p className="mt-4 text-ink-2">
        Raw transaction rows are processed in your browser. MarginShield&apos;s v1 architecture does
        not upload line-level commercial data to our servers.
      </p>
      <ul className="mt-8 space-y-3 text-ink-2">
        <li>File processing is local-first (DuckDB-Wasm / deterministic engine).</li>
        <li>Server stores metadata, licensing and optional consented headline metrics only.</li>
        <li>Optional AI commentary receives aggregate fact tokens — never invoice rows.</li>
        <li>Security claims describe implemented controls, not absolute guarantees.</li>
      </ul>
    </div>
  );
}
