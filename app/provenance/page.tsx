'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, Award, Calendar, Hash, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ProvenancePage() {
  const [serial, setSerial] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serial) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data, error } = await supabase
        .from('watches')
        .select('*')
        .eq('serial_number', serial.toUpperCase())
        .single();

      if (error) throw new Error('We could not find this watch in our records.');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,169,126,0.05),_transparent_70%)]" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif text-white/[0.01] pointer-events-none select-none">CHECK</div>
      </div>

      <Link href="/" className="absolute top-12 left-12 group flex items-center gap-3 text-white/20 hover:text-[#C8A97E] transition-colors uppercase tracking-[0.4em] text-[9px] font-bold z-10">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-2xl text-center">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mx-auto w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#C8A97E]"
                >
                  <ShieldCheck size={24} />
                </motion.div>
                <h2 className="text-[#C8A97E] text-[10px] uppercase tracking-[0.6em] font-black">Official Record</h2>
                <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-tighter leading-none">Check Watch <br/> Authenticity</h1>
              </div>

              <form onSubmit={handleVerify} className="max-w-md mx-auto relative group">
                <input 
                  type="text" 
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  placeholder="ENTER WATCH NUMBER"
                  className="w-full bg-transparent border-b border-white/10 py-6 text-center text-xl md:text-2xl font-mono uppercase tracking-[0.3em] outline-none focus:border-[#C8A97E] transition-all placeholder:text-white/5"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-0 bottom-6 text-white/20 hover:text-[#C8A97E] transition-colors"
                >
                  <Search size={24} className={loading ? 'animate-spin' : ''} />
                </button>
                {error && <p className="text-[9px] text-red-500/60 uppercase tracking-widest mt-6 font-bold">{error}</p>}
              </form>

              <p className="text-white/20 text-[9px] uppercase tracking-widest leading-relaxed max-w-sm mx-auto font-bold italic">
                You can check if your watch is real by entering the serial number found on the back of the watch.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              {/* Certificate Card */}
              <div className="bg-[#0A0A0A] border border-[#C8A97E]/30 p-8 md:p-16 rounded-[3rem] relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent opacity-40" />
                 
                 <div className="relative z-10 flex flex-col items-center gap-10">
                    <div className="flex flex-col items-center gap-4">
                       <Award className="text-[#C8A97E]" size={48} />
                       <span className="text-[#C8A97E] text-[10px] font-black uppercase tracking-[0.8em]">Watch is 100% Real</span>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-white font-serif text-5xl md:text-7xl tracking-tighter uppercase leading-none">{result.name}</h3>
                       <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold">Made by {result.brand}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-12 border-t border-white/5 w-full">
                       <div className="flex flex-col gap-2">
                          <span className="flex items-center gap-2 text-[9px] text-white/20 uppercase tracking-widest font-bold"><Hash size={10} /> Number</span>
                          <span className="text-white font-mono uppercase lg:text-lg">{result.serial_number}</span>
                       </div>
                       <div className="flex flex-col gap-2">
                          <span className="flex items-center gap-2 text-[9px] text-white/20 uppercase tracking-widest font-bold"><Calendar size={10} /> Sold Date</span>
                          <span className="text-white font-mono uppercase lg:text-lg">JULY 2026</span>
                       </div>
                       <div className="flex flex-col gap-2 md:items-end">
                          <span className="flex items-center gap-2 text-[9px] text-white/20 uppercase tracking-widest font-bold"><Award size={10} /> Status</span>
                          <span className="text-green-500 font-mono uppercase lg:text-lg">VERIFIED</span>
                       </div>
                    </div>

                    <button 
                      onClick={() => setResult(null)}
                      className="mt-8 text-[9px] text-white/30 uppercase tracking-[0.4em] hover:text-white transition-colors font-bold"
                    >
                      Check Another Watch
                    </button>
                 </div>

                 <div className="absolute bottom-[-10%] right-[-5%] text-[20vw] font-serif text-white/[0.02] pointer-events-none select-none">OK</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
