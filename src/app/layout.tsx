import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Analytics from "@/components/Analytics";
import { SanityLive } from "@/sanity/live";
import "./globals.css";

// Display serif — self-hosted latin subset, wght 100–300 + opsz 24–144 (see
// scripts/fonts/build-fraunces.sh). Used by type-display / type-title / type-quote.
const fraunces = localFont({
  src: [
    { path: "./fonts/Fraunces-Roman.woff2", weight: "100 300", style: "normal" },
    { path: "./fonts/Fraunces-Italic.woff2", weight: "100 300", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Interface sans — weights 300/400 only (see DESIGN.md)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"],
});

// Metadata mono — eyebrows, pills, counters. Deferred, not removed: no preload (nothing mono is
// above the fold on mobile), so it's still fetched once the CSS uses it, just not competing at start
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

// Defaults for every route; the home page overrides them from Site settings
export const metadata: Metadata = {
  title: "Kayana Moment — Graduation Photography Agency",
  description:
    "We make your Graduation effortless captured. Professional graduation photography, portraits, and event coverage.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    // The inline script adds .js before paint so .reveal content stays visible without JS
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <SanityLive />
        {isDraft ? <VisualEditing /> : <Analytics />}
      </body>
    </html>
  );
}
