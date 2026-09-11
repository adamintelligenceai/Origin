import type { Metadata } from 'next';
import { Barlow_Condensed, Barlow_Semi_Condensed } from 'next/font/google';
import './globals.css';
import { ScanProvider } from '../components/ScanProvider';

const sans = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans-actual',
  display: 'swap',
});

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display-actual',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MarginShield',
    template: '%s · MarginShield',
  },
  description:
    'Find evidence-backed leakage and commercial margin opportunities across every customer and product—without replacing your ERP.',
  applicationName: 'MarginShield',
  authors: [{ name: 'Evidence Room' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${sans.variable} ${display.variable}`}>
      <body className={`${sans.className} min-h-screen antialiased`}>
        <ScanProvider>{children}</ScanProvider>
      </body>
    </html>
  );
}
