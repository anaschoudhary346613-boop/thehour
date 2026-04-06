'use client';

import { Check, ArrowRight, Package, Home } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { motion } from 'framer-motion';

export default function Success() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      <Navbar />
      
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative mx-auto w-24 h-24 bg-[#C8A97E]/20 rounded-full flex items-center justify-center border border-[#C8A97E]/30 animate-pulse">
          <Check size={48} className="text-[#C8A97E]" />
        </div>
        
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tight">Acquisition Confirmed</h1>
          <p className="text-gray-400 text-sm">
            Thank you for your commitment to High Horology. Your order has been secured and sent to our concierge team.
          </p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
          <div className="flex items-start gap-4">
            <Package className="text-[#C8A97E] shrink-0" size={20} />
            <div>
              <p className="font-bold text-sm uppercase">Concierge Dispatch</p>
              <p className="text-xs text-gray-500">Your timepiece is undergoing final inspection and will be dispatched via armored courier within 24 hours.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            href="/dashboard"
            className="w-full bg-[#C8A97E] text-black py-4 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] transition-all cursor-pointer shadow-2xl"
          >
            View Dashboard <ArrowRight size={20} />
          </Link>
          <Link 
            href="/"
            className="w-full bg-white/10 text-white py-4 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/20 transition-all cursor-pointer"
          >
            Return to Gallery <Home size={20} />
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
