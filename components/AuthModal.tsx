'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';

export default function AuthModal() {
  const { isAuthOpen, toggleAuth, setUser } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Registration sent. Please check your email and confirm.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setUser(data.user);
        toggleAuth(false);
      }
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleAuth(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <button 
              onClick={() => toggleAuth(false)}
              className="absolute top-8 right-10 text-white/30 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="relative z-10">
              <div className="mb-12">
                <h2 className="text-[#C8A97E] text-xs font-bold uppercase tracking-[0.5em] mb-4">Customer Login</h2>
                <h3 className="text-3xl md:text-4xl font-serif text-white tracking-tight uppercase leading-none">
                  {isSignUp ? 'New Account' : 'Welcome Back'}
                </h3>
              </div>

              <form onSubmit={handleAuth} className="space-y-10">
                <div className="space-y-8">
                  <div className="relative group">
                    <Mail className="absolute left-0 top-3 text-white/20 group-focus-within:text-[#C8A97E] transition-colors" size={16} />
                    <input 
                      type="email" 
                      placeholder="ENTER EMAIL" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-[11px] uppercase tracking-widest text-white outline-none focus:border-[#C8A97E] transition-all placeholder:text-white/10"
                    />
                  </div>
                  
                  <div className="relative group">
                    <Lock className="absolute left-0 top-3 text-white/20 group-focus-within:text-[#C8A97E] transition-colors" size={16} />
                    <input 
                      type="password" 
                      placeholder="PASSWORD" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-[11px] uppercase tracking-widest text-white outline-none focus:border-[#C8A97E] transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>

                {message && (
                  <p className="text-[9px] text-[#C8A97E] uppercase tracking-widest font-bold text-center bg-[#C8A97E]/5 py-3 rounded-lg border border-[#C8A97E]/20">
                    {message}
                  </p>
                )}

                <button 
                  disabled={loading}
                  className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#C8A97E] transition-all active:scale-95 flex items-center justify-center gap-3 rounded-xl disabled:opacity-50"
                >
                  {loading ? 'Please wait...' : (isSignUp ? 'Create My Account' : 'Login Now')}
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[9px] text-white/30 uppercase tracking-[0.2em] hover:text-[#C8A97E] transition-colors font-bold"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'New here? Create an Account'}
                </button>
              </div>
            </div>

            {/* Subtle Volumetric lighting */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C8A97E]/5 rounded-full blur-[100px] pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
