import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Script from 'next/script';
import ModalProvider from '@/components/ModalProvider';
import FloatingNav from '@/components/FloatingNav';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: "THE HOUR — Digital Flagship",
  description: "Experience the pinnacle of Swiss horology through a cinematic digital flagship. THE HOUR curates exclusively for the world's most discerning collectors.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
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
      <body className="bg-black text-white antialiased overflow-x-hidden selection:bg-[#C8A97E] selection:text-black">
        <Providers>
          {/* Fixed Logo Anchor */}
          <div className="fixed top-8 left-8 z-[100] w-14 h-14 md:w-16 md:h-16 group pointer-events-auto cursor-pointer">
            <img 
              src="/logo.png" 
              alt="THE HOUR" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <main className="relative z-0">
            {children}
          </main>
          
          <FloatingNav />
          <CartDrawer />
          <ModalProvider />
        </Providers>
        
        {/* Global Boutique Aesthetic Elements */}
        <div className="noise-overlay pointer-events-none" />
      </body>
    </html>
  );
}
