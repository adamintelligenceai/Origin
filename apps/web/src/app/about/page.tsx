import { brand } from '@/config/commercial';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 text-ink-2">
        {brand.product} {brand.attribution}. Built for mid-market distributors who need commercial
        margin control without an ERP replacement project.
      </p>
      <p className="mt-4 text-ink-2">
        We do not invent customer testimonials, ROI claims or security certifications. The product
        must earn credibility through evidence trails and reproducible economics.
      </p>
    </div>
  );
}
