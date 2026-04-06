import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Script from 'next/script';
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import BottomNav from "@/components/BottomNav";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE HOUR — Exclusive Luxury Timepieces",
  description:
    "Curating the world's most sought-after watches for collectors who demand perfection. Experience the pinnacle of horology.",
  keywords: ["luxury watches", "haute horlogerie", "THE HOUR", "Geneva", "Swiss watches"],
  openGraph: {
    title: "THE HOUR — Exclusive Luxury Timepieces",
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
      <body className="bg-black text-white font-inter antialiased overflow-x-hidden selection:bg-gold selection:text-black">
        <Script 
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js" 
          type="module"
          strategy="afterInteractive"
        />
        <Preloader />
        <CustomCursor />
        <div className="noise-overlay" />
        <Providers>{children}</Providers>
        <BottomNav />
      </body>
    </html>
  );
}
