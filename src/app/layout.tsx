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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
