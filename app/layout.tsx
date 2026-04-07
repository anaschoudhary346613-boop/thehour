import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Script from 'next/script';
import ModalProvider from '@/components/ModalProvider';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE HOUR — Exclusive Luxury Timepieces",
  description: "Curating the world's most sought-after watches for collectors who demand perfection. Experience the pinnacle of horology.",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script 
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js" 
          type="module"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-gs-black text-gs-gold font-inter antialiased overflow-x-hidden selection:bg-gs-gold selection:text-gs-black">
        <Providers>
          <Navbar />
          {children}
          <BottomNav />
          <CartDrawer />
          <ModalProvider />
        </Providers>
        
        {/* Global Boutique Aesthetic Elements */}
        <div className="noise-overlay pointer-events-none" />
      </body>
    </html>
  );
}
