import { WaitlistForm } from "./waitlist-form";

export default function WaitlistPage() {
  return (
    <main>
      <p className="eyebrow">Waitlist</p>
      <h1>Founding access.</h1>
      <p className="lede">The first 100 seats are invited. Brand name is still undecided.</p>
      <WaitlistForm />
    </main>
  );
}
