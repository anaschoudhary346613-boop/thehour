'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, Loader2, FileText, CheckCircle2 } from 'lucide-react';

export default function VerifyPage() {
  const [serial, setSerial] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = () => {
    if (!serial) return;
    setIsVerifying(true);
    setResult(null);

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      setResult({
        model: "Audemars Piguet Royal Oak",
        reference: "15510ST.OO.1320ST.01",
        status: "Verified Authentic",
        date: "Production Year: 2023",
        owner: "THE HOUR Exclusive Stock"
      });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-[#C8A97E]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center gap-12">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-white/5 rounded-full border border-white/10"
          >
            <ShieldCheck size={32} className="text-[#C8A97E]" />
          </motion.div>
          <span className="text-[#C8A97E] text-[10px] uppercase tracking-[0.6em] font-bold">
            The Provenance Ledger
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tighter uppercase leading-none">
            Verify Your<br/>Timepiece
          </h1>
        </div>

        {/* Search Input Container */}
        <div className="relative w-full group">
          <input 
            type="text" 
            placeholder="ENTER SERIAL NUMBER" 
            value={serial}
            onChange={(e) => setSerial(e.target.value.toUpperCase())}
            className="w-full bg-transparent border-b border-white/20 py-10 px-4 text-white text-3xl md:text-5xl font-serif text-center outline-none focus:border-[#C8A97E] transition-all placeholder:text-white/5 tracking-tighter" 
          />
          <button 
            onClick={handleVerify}
            disabled={isVerifying}
            className="absolute right-0 bottom-12 p-4 text-[#C8A97E] hover:scale-110 transition-transform disabled:opacity-50"
          >
            {isVerifying ? <Loader2 className="animate-spin" size={32} /> : <Search size={32} />}
          </button>
        </div>

        {/* Verification Result Card */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 text-left"
            >
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#C8A97E]/20 rounded-full animate-pulse shadow-[0_0_50px_rgba(200,169,126,0.3)]" />
                <CheckCircle2 size={64} className="text-[#C8A97E] relative z-10" />
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#C8A97E] text-black text-[9px] font-bold uppercase tracking-widest rounded-full">
                    Official Certification
                  </span>
                  <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
                    ID: {serial}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-white leading-tight">
                  {result.model}
                </h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-white/10">
                   <div className="flex flex-col">
                      <span className="text-white/20 text-[8px] uppercase tracking-widest font-bold mb-1">Status</span>
                      <span className="text-white text-xs font-medium uppercase tracking-widest">{result.status}</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-white/20 text-[8px] uppercase tracking-widest font-bold mb-1">Origin</span>
                      <span className="text-white text-xs font-medium uppercase tracking-widest">{result.owner}</span>
                   </div>
                </div>
              </div>

              <div className="hidden md:block h-32 w-px bg-white/10" />

              <div className="flex flex-col items-center gap-4">
                <button className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors text-white">
                  <FileText size={24} />
                </button>
                <span className="text-white/30 text-[8px] uppercase tracking-widest font-bold">PDF Report</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold max-w-md leading-relaxed">
          Use the private key provided with your physical purchase to unlock high-resolution provenance reports.
        </p>
      </div>
    </main>
  );
}
