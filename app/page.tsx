'use client';

import CinematicHero from "@/components/CinematicHero";
import BrandStrip from "@/components/BrandStrip";
import CategoryBanners from "@/components/CategoryBanners";
import AboutCard from "@/components/AboutCard";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid ledger address (email).');
      return;
    }
    toast.success('ACCESS GRANTED. You are now subscribed to the private ledger.', {
      description: 'Expect our next transmission soon.',
      action: {
        label: 'Dismiss',
        onClick: () => console.log('Dismissed'),
      },
    });
    setEmail('');
  };

  return (
    <div className="bg-[#0A0A0A] overflow-x-hidden">
      {/* Hero Section */}
      <CinematicHero />
      
      {/* 1. Shop By Brand Section */}
      <BrandStrip />

      {/* 2. Stacked Category Banners */}
      <CategoryBanners />

      {/* 3. We Are The Hour - Story Card */}
      <AboutCard />

      {/* Minimalist Footer & Newsletter */}
      <footer className="w-full bg-[#050505] pt-32 pb-40 px-6 md:px-12 border-t border-white/5 flex flex-col items-center">
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-xl w-full text-center mb-32"
        >
          <h3 className="text-white text-3xl md:text-5xl font-serif mb-8 tracking-tighter uppercase leading-tight">
            Subscribe to our<br/>private ledger
          </h3>
          <form onSubmit={handleSubscribe} className="relative w-full group">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL" 
              className="w-full bg-transparent border-b border-white/20 py-6 px-2 text-white text-xs md:text-sm outline-none focus:border-[#C8A97E] transition-all duration-500 placeholder:text-white/10 font-bold tracking-[0.2em]" 
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#C8A97E] transition-all duration-500 transform hover:translate-x-1"
            >
              <span className="text-xl font-light">&rarr;</span>
            </button>
          </form>
          <p className="text-[9px] text-white/10 uppercase tracking-[0.4em] mt-6 font-bold">
            Stay updated on new arrivals & private events
          </p>
        </motion.div>

        {/* Footer Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-7xl border-b border-white/5 pb-24 mb-16">
          <div className="flex flex-col gap-6">
            <span className="text-[#C8A97E] text-[10px] uppercase tracking-[0.4em] font-bold">Shopping</span>
            <div className="flex flex-col gap-4">
              {[
                { name: 'All Watches', href: '/shop' },
                { name: 'Automatics', href: '/shop?category=Automatics' },
                { name: 'Chronographs', href: '/shop?category=Chronographs' },
                { name: 'Heritage', href: '/shop?category=Heritage' }
              ].map(item => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="text-white/30 hover:text-white transition-all duration-500 ease-[0.25,1,0.5,1] text-[10px] uppercase tracking-widest font-bold"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-[#C8A97E] text-[10px] uppercase tracking-[0.4em] font-bold">Support</span>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Contact Us', href: '/concierge' },
                { name: 'Provenance', href: '/verify' },
                { name: 'Track Order', href: '/dashboard' },
                { name: 'Warranty', href: '/verify' }
              ].map(item => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="text-white/30 hover:text-white transition-all duration-500 ease-[0.25,1,0.5,1] text-[10px] uppercase tracking-widest font-bold"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-[#C8A97E] text-[10px] uppercase tracking-[0.4em] font-bold">Legal</span>
            <div className="flex flex-col gap-4">
              {['Terms', 'Privacy', 'Authenticity', 'Cookies'].map(item => (
                <Link key={item} href="#" className="text-white/30 hover:text-white transition-all duration-500 ease-[0.25,1,0.5,1] text-[10px] uppercase tracking-widest font-bold">{item}</Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Link href="/" className="transition-transform duration-700 hover:scale-110 w-fit">
              <Image 
                src="/logo.png" 
                width={64} 
                height={64} 
                className="opacity-30 mix-blend-exclusion hover:opacity-100 transition-all duration-700" 
                alt="Logo" 
              />
            </Link>
            <p className="text-white/20 text-[9px] uppercase tracking-[0.2em] font-medium leading-loose">
              The Hour — World's finest destination for luxury timepieces.
            </p>
          </div>
        </div>

        {/* Final Copyright */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 opacity-20">
          <span className="text-[9px] uppercase tracking-widest font-bold text-white">© 2026 THE HOUR — ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            <span className="text-[9px] uppercase tracking-widest font-bold text-white cursor-pointer hover:text-[#C8A97E] transition-colors duration-500">Instagram</span>
            <span className="text-[9px] uppercase tracking-widest font-bold text-white cursor-pointer hover:text-[#C8A97E] transition-colors duration-500">Twitter</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
