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

export const metadata: Metadata = {
  title: "The Marouf Method | Cambridge Biology & Psychology",
  description:
    "Premium Cambridge Biology and Psychology education by Dr. Kareem Wael Maarouf.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
