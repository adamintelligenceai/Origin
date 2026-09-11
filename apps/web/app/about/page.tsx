import { founder } from '../../config/founder';
import { MarketingShell } from '../../components/MarketingShell';

export default function AboutPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl">MarginShield by Evidence Room</h1>
        <p className="mt-4">
          MarginShield reconstructs distributor economics line by line and identifies where realised pricing, costs,
          agreements and commercial policy no longer line up.
        </p>
        <h2 className="mt-10 font-display text-3xl">{founder.name}</h2>
        <p className="text-ink-2">{founder.title}</p>
        <p className="mt-3">{founder.bio}</p>
      </article>
    </MarketingShell>
  );
}
