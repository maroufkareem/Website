import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Inter } from "next/font/google";
import ScrollAnimations from "@/app/components/ScrollAnimations";
import TrialDialog from "@/app/components/TrialDialog";
import "./globals.css";

/* Loaded through next/font rather than an @import in globals.css: the
   production CSS pipeline strips external @import rules, so the fonts never
   downloaded on the deployed site and everything silently fell back to
   Georgia/Arial — which also shifted alignment and margins, since the
   fallbacks have different metrics. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteTitle = "The Marouf Method | Cambridge Biology & Psychology";
const siteDescription =
  "Premium Cambridge Biology and Psychology education by Dr. Kareem Wael Maarouf.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drkareemmarouf.com"),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    siteName: "The Marouf Method",
    title: siteTitle,
    description: siteDescription,
    url: "/",
    type: "website",
    locale: "en_US",
    images: [{ url: "/marouf-assets/hero.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/marouf-assets/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <body>
        <ScrollAnimations />
        {children}
        <TrialDialog />
      </body>
    </html>
  );
}
