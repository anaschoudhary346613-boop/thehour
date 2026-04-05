import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppConcierge from "@/components/WhatsAppConcierge";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"], // Added 700 for better bold states
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Hour — Hyper-Luxury Timepieces",
  description:
    "A curated selection of ultra-rare, handcrafted timepieces for the discerning few. Where craftsmanship meets eternity.",
  keywords: ["luxury watches", "haute horlogerie", "timepieces", "The Hour", "Geneva"],
  openGraph: {
    title: "The Hour — Hyper-Luxury Timepieces",
    description: "Discover exceptional timepieces that transcend time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-ivory font-inter antialiased overflow-x-hidden selection:bg-gold selection:text-obsidian">
        <Preloader />
        <CustomCursor />
        <div className="noise-overlay" />
        <Providers>{children}</Providers>
        <WhatsAppConcierge />
      </body>
    </html>
  );
}
