import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { SanityLive } from "@/sanity/live";
import "./globals.css";

// Display serif — variable weight (100–900) + optical sizing, used by type-display / type-title
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Interface sans — weights 300/400 only (see DESIGN.md)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"],
});

// Metadata mono — eyebrows, pills, counters
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "400",
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
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
