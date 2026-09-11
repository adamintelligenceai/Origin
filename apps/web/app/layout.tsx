import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { brand } from "../config/brand";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./globals.css";

const barlowSemi = localFont({
  src: [
    {
      path: "../fonts/barlow-semi-condensed-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/barlow-semi-condensed-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/barlow-semi-condensed-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = localFont({
  src: [
    {
      path: "../fonts/barlow-condensed-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/barlow-condensed-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const ibmPlex = localFont({
  src: [
    {
      path: "../fonts/ibm-plex-sans-condensed-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-numeric",
  display: "swap",
});

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
    <html
      lang="en-AU"
      className={cn("h-full", barlowSemi.variable, barlowCondensed.variable, ibmPlex.variable)}
    >
      <body className="flex min-h-full flex-col bg-ledger font-sans text-ink antialiased">
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
