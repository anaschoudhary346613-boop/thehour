'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ConciergePage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Help with Booking',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col md:flex-row">
      
      {/* LEFT SIDE: Cinematic Atmosphere */}
      <div className="w-full md:w-1/2 relative min-h-[40vh] md:min-h-screen overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=2000&auto=format&fit=crop" 
              alt="Our Store" 
              className="w-full h-full object-cover opacity-40 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/40 to-transparent" />
         </div>

         <div className="relative z-10 h-full flex flex-col justify-end p-12 md:p-24 space-y-8">
            <h2 className="text-[#C8A97E] text-[10px] uppercase tracking-[0.5em] font-black">Get in Touch</h2>
            <h1 className="text-5xl md:text-8xl font-serif uppercase tracking-tighter leading-none text-white">Customer <br/> Support</h1>
            <p className="max-w-md text-white/40 text-[11px] uppercase tracking-widest leading-relaxed font-sans font-bold italic">
              "If you need a special watch or have any questions about your order, please message our team. We are here to help you."
            </p>

            <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10">
               <div className="space-y-2">
                 <span className="text-[9px] text-[#C8A97E] uppercase tracking-widest font-black">Main Office</span>
                 <p className="text-[10px] text-white/40 tracking-widest leading-none">Geneva Office, Switzerland</p>
               </div>
               <div className="space-y-2">
                 <span className="text-[9px] text-[#C8A97E] uppercase tracking-widest font-black">Email Us</span>
                 <p className="text-[10px] text-white/40 tracking-widest leading-none">support@thehour.com</p>
               </div>
            </div>
         </div>
      </div>

      {/* RIGHT SIDE: Message Form */}
      <div className="w-full md:w-1/2 bg-[#0A0A0A] p-12 md:p-24 flex flex-col justify-center">
         <div className="max-w-md mx-auto w-full">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-12"
                >
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-8">
                      <div className="group">
                        <label className="text-[9px] text-white/20 uppercase tracking-widest mb-3 block group-focus-within:text-[#C8A97E] transition-colors font-bold">What do you need help with?</label>
                        <select 
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                          className="w-full bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.2em] outline-none focus:border-[#C8A97E] transition-all text-white/60 focus:text-white"
                        >
                          <option value="Help with Booking" className="bg-[#0A0A0A]">Help with Buying</option>
                          <option value="Repair" className="bg-[#0A0A0A]">Repair & Service</option>
                          <option value="Other" className="bg-[#0A0A0A]">Other Questions</option>
                        </select>
                      </div>

                      <div className="group">
                        <label className="text-[9px] text-white/20 uppercase tracking-widest mb-3 block group-focus-within:text-[#C8A97E] transition-colors font-bold">Your Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.2em] outline-none focus:border-[#C8A97E] transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="group">
                            <label className="text-[9px] text-white/20 uppercase tracking-widest mb-3 block group-focus-within:text-[#C8A97E] transition-colors font-bold">Your Email</label>
                            <input 
                              type="email" 
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.2em] outline-none focus:border-[#C8A97E] transition-all"
                            />
                         </div>
                         <div className="group">
                            <label className="text-[9px] text-white/20 uppercase tracking-widest mb-3 block group-focus-within:text-[#C8A97E] transition-colors font-bold">Phone Number</label>
                            <input 
                              type="tel" 
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.2em] outline-none focus:border-[#C8A97E] transition-all"
                            />
                         </div>
                      </div>

                      <div className="group">
                        <label className="text-[9px] text-white/20 uppercase tracking-widest mb-3 block group-focus-within:text-[#C8A97E] transition-colors font-bold">Message</label>
                        <textarea 
                          required
                          rows={4}
                          value={formData.details}
                          onChange={(e) => setFormData({...formData, details: e.target.value})}
                          placeholder="Tell us what you need..."
                          className="w-full bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.1em] outline-none focus:border-[#C8A97E] transition-all resize-none placeholder:text-white/5"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white text-black py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#C8A97E] transition-all rounded-xl flex items-center justify-center gap-3"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-10"
                >
                   <div className="w-24 h-24 rounded-full bg-[#C8A97E]/10 border border-[#C8A97E]/30 flex items-center justify-center text-[#C8A97E] mx-auto">
                      <CheckCircle2 size={48} />
                   </div>
                   <div className="space-y-4">
                      <h2 className="text-[#C8A97E] text-xs font-bold uppercase tracking-[0.5em]">Message Sent</h2>
                      <h3 className="text-4xl md:text-5xl font-serif tracking-tight uppercase">Thank You</h3>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold leading-relaxed max-w-sm mx-auto">
                        We have received your request. Our team will contact you soon on your phone or email.
                      </p>
                   </div>
                   <Link href="/" className="inline-block pt-12">
                      <button className="text-[11px] text-[#C8A97E] uppercase tracking-[0.4em] border-b border-[#C8A97E]/30 pb-2 hover:border-[#C8A97E] transition-all">
                        Back to Home
                      </button>
                   </Link>
                </motion.div>
              )}
            </AnimatePresence>
         </div>
      </div>

    </div>
  );
}
