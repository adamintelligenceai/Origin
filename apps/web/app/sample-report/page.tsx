import { boardPackMarkdown } from '@marginshield/reports/text';
import { harbourlineDemoScan } from '../../lib/harbourline';
import { MarketingShell } from '../../components/MarketingShell';

export default function SampleReportPage() {
  const markdown = boardPackMarkdown(harbourlineDemoScan());
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl">Sample report</h1>
        <p className="mt-2 text-sm text-ink-2">Generated from the Harbourline engine. Fictional demonstration company.</p>
        <pre className="mt-8 overflow-auto whitespace-pre-wrap bg-folio p-6 text-sm">{markdown}</pre>
      </article>
    </MarketingShell>
  );
}
