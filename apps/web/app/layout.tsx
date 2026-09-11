import type { Metadata } from "next";
import type { ReactNode } from "react";
import { brand } from "../config/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: brand.productName,
    template: `%s · ${brand.productName}`,
  },
  description: brand.oneLine,
  applicationName: brand.productName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-AU" className="h-full">
      <body className="min-h-full flex flex-col bg-ledger text-ink antialiased">{children}</body>
    </html>
  );
}
