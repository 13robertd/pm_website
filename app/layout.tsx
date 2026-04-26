import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter is a clean, modern sans-serif used by Stripe, Linear, etc.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// SEO-friendly default metadata. Update once branding is finalized.
export const metadata: Metadata = {
  title: "Modern Property Management for Bay Area Owners",
  description:
    "Fast, professional, tech-enabled property management and homeowner services across Sunnyvale, San Jose, Santa Clara, Mountain View, Cupertino, and the South Bay.",
  keywords: [
    "Bay Area property management",
    "South Bay property management",
    "Sunnyvale property manager",
    "San Jose property management",
    "Silicon Valley rental management",
    "homeowner services Bay Area",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
