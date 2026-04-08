import type { Metadata } from "next";
import { Inter, Cinzel } from 'next/font/google';
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/Providers";
import Script from 'next/script';
import ModalProvider from '@/components/ModalProvider';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const viewport = "width=device-width, initial-scale=1, maximum-scale=1";

export const metadata: Metadata = {
  title: "THE HOUR — Digital Flagship | Exceptional Horology",
  description: "Experience the pinnacle of Swiss horology through a cinematic digital flagship. THE HOUR curates exclusively for the world's most discerning collectors.",
  metadataBase: new URL('https://thehour.vercel.app'),
  openGraph: {
    title: "THE HOUR — Digital Flagship",
    description: "Experience the pinnacle of Swiss horology.",
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "THE HOUR — Digital Flagship",
    description: "Experience the pinnacle of Swiss horology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} bg-black font-sans`}>
      <head>
        <Script 
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js" 
          type="module"
          strategy="afterInteractive"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "THE HOUR",
              "url": "https://thehour.vercel.app",
              "logo": "https://thehour.vercel.app/logo.png",
              "description": "Premium luxury watch digital flagship.",
              "sameAs": [
                "https://instagram.com/thehour",
                "https://twitter.com/thehour"
              ]
            })
          }}
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-[#C8A97E] selection:text-black overflow-x-hidden">
        <Providers>
          <Preloader />
          <Header />
          <CustomCursor />
          <SmoothScrollProvider>
            <PageTransition>
              <main className="relative z-10 min-h-[100dvh]">
                {children}
              </main>
            </PageTransition>
            
            <CartDrawer />
            <AuthModal />
            <ModalProvider />
          </SmoothScrollProvider>
          <Toaster position="top-center" richColors />
        </Providers>
        
        <div className="noise-overlay pointer-events-none" />
      </body>
    </html>
  );
}
