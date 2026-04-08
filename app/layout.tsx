import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Script from 'next/script';
import Link from 'next/link';
import ModalProvider from '@/components/ModalProvider';
import FloatingNav from '@/components/FloatingNav';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';

export const viewport = "width=device-width, initial-scale=1, maximum-scale=1";

export const metadata: Metadata = {
  title: "THE HOUR — Digital Flagship",
  description: "Experience the pinnacle of Swiss horology through a cinematic digital flagship. THE HOUR curates exclusively for the world's most discerning collectors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <Script 
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js" 
          type="module"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-[#C8A97E] selection:text-black">
        <Providers>
          <SmoothScrollProvider>
            <Preloader />
            <Header />
            
            <main className="relative z-0">
              {children}
            </main>
            
            <FloatingNav />
            <CartDrawer />
            <AuthModal />
            <ModalProvider />
          </SmoothScrollProvider>
        </Providers>
        
        {/* Global Boutique Aesthetic Elements */}
        <div className="noise-overlay pointer-events-none" />
      </body>
    </html>
  );
}
