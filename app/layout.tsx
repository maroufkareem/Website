import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
