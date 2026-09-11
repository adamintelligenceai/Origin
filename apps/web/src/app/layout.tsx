import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { brand } from '@/config/commercial';

export const metadata: Metadata = {
  title: {
    default: `${brand.product} — ${brand.category}`,
    template: `%s · ${brand.product}`,
  },
  description: brand.oneLiner,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="min-h-screen antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
