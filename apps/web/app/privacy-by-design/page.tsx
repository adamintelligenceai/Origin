import { MarketingShell } from '../../components/MarketingShell';

export default function PrivacyByDesignPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl">Privacy by design</h1>
        <p className="mt-4">Your transaction files are processed on your computer, not uploaded to ours.</p>
        <ul className="mt-8 list-disc space-y-2 pl-5 text-ink-2">
          <li>File processing is local.</li>
          <li>Row data remains in the browser (OPFS / memory).</li>
          <li>The server stores metadata and licence state only.</li>
          <li>Optional AI commentary uses aggregate fact tokens and tokenised identifiers.</li>
          <li>Local scan data can be deleted from Privacy Proof.</li>
        </ul>
        <p className="mt-8 text-sm">These are implemented controls, not an absolute security claim.</p>
      </article>
    </MarketingShell>
  );
}
