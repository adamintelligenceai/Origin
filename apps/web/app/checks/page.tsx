import { checkQuestion } from '@marginshield/engine';
import type { CheckId } from '@marginshield/schemas';
import { MarketingShell } from '../../components/MarketingShell';

const CHECKS: CheckId[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'S1', 'S2', 'S3', 'B1', 'B2', 'B3'];

export default function ChecksPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl">Checks</h1>
        <div className="mt-10 space-y-8">
          {CHECKS.map((id) => (
            <section key={id} className="ledger-rule pb-6">
              <h2 className="font-display text-3xl">{id}</h2>
              <p className="mt-2">{checkQuestion(id)}</p>
            </section>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
