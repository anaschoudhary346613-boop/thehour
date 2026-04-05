'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleConsultation = () => {
    const message = "Hello, I am interested in a private consultation regarding your timepiece collection.";
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end gap-4">
      {/* Tooltip / Teaser */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="glass-dark border border-gold/30 p-4 rounded-2xl shadow-2xl max-w-[240px] mb-2 cursor-pointer"
            onClick={() => { setIsOpen(true); setShowTooltip(false); }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="font-label text-gold text-[0.6rem] tracking-widest uppercase">Concierge Online</span>
            </div>
            <p className="font-inter text-ivory text-xs font-light leading-relaxed">
              Seeking a rare complication? Our advisors are ready to assist you.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="glass-dark border border-white/10 rounded-[2rem] shadow-2xl w-[320px] overflow-hidden"
          >
            <div className="bg-gradient-to-br from-gold/10 to-transparent p-6 pb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <span className="font-label text-gold text-[0.6rem] tracking-[0.3em] uppercase block mb-1">Private Client Services</span>
                   <h3 className="font-display text-2xl text-ivory uppercase tracking-tight">Concierge</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-silver transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 glass-dark border-white/5 p-3 rounded-xl mb-4">
                 <div className="relative">
                    <div className="w-10 h-10 rounded-full border border-gold/30 bg-graphite overflow-hidden">
                       <div className="w-full h-full bg-gradient-to-tr from-gold/20 to-transparent" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-obsidian" />
                 </div>
                 <div>
                    <p className="font-syne font-600 text-ivory text-sm">Sebastian</p>
                    <p className="font-label text-silver/40 text-[0.55rem] tracking-widest">Master Horologist</p>
                 </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-4">
              <p className="text-silver/60 font-inter font-light text-xs leading-relaxed">
                Connect directly with our experts for specialized advice on heritage pieces, private viewings, or collection management.
              </p>

              <button
                onClick={handleConsultation}
                className="w-full py-4 rounded-xl bg-gold text-obsidian font-syne font-800 tracking-[0.1em] uppercase text-[0.65rem] flex items-center justify-center gap-2 hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(184,151,58,0.2)]"
              >
                Start Private Chat
                <ArrowRight size={14} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[0.5rem] font-label text-silver/30 uppercase tracking-widest">
                <ShieldCheck size={10} />
                End-to-End Encrypted Consultation
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? 'bg-white/5 border border-white/10 text-gold rotate-90' : 'bg-gold text-obsidian glow-gold'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} fill="currentColor" />}
      </motion.button>
    </div>
  );
}
