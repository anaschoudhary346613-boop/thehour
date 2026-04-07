'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, ArrowRight, LogOut, Settings, ShoppingBag } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

export default function AccountModal() {
  const { isAccountOpen, closeAccount } = useUIStore();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock State

  if (!isAccountOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center px-6"
    >
      {/* Close Button */}
      <button 
        onClick={closeAccount}
        className="absolute top-8 right-8 p-2 text-white/40 hover:text-[#C8A97E] transition-colors"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <div className="max-w-md w-full bg-[#141414] border border-[#C8A97E]/10 p-8 md:p-12 relative overflow-hidden">
        {/* Background Monogram */}
        <div className="absolute top-[-2rem] right-[-2rem] text-8xl font-serif text-white/[0.03] select-none">
          TH
        </div>

        {!isLoggedIn ? (
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-2">
              <p className="text-[#C8A97E] uppercase tracking-[0.4em] text-[10px] font-medium">
                {isLogin ? 'Welcome Back' : 'Join the Elite'}
              </p>
              <h2 className="text-3xl font-serif text-white">
                {isLogin ? 'Member Access' : 'Create Account'}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input 
                    type="email" 
                    placeholder="name@exclusive.com"
                    className="w-full bg-black/40 border border-white/5 py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#C8A97E] transition-colors placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-white/5 py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#C8A97E] transition-colors placeholder:text-white/10"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full py-4 bg-[#C8A97E] text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#E3CBA8] transition-colors flex items-center justify-center space-x-3"
            >
              <span>{isLogin ? 'Enter Boutique' : 'Register Now'}</span>
              <ArrowRight size={16} />
            </button>

            <div className="text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                {isLogin ? "Don't have an account? Join us" : "Already a member? Sign in"}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 space-y-10">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full border border-[#C8A97E]/30 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0A0A0A] to-[#C8A97E]/20 flex items-center justify-center">
                  <User size={32} className="text-[#C8A97E]" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-serif text-white">Alexander Thorne</h3>
                <p className="text-[10px] uppercase tracking-widest text-[#C8A97E]">Platinum Collector</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
               {[
                 { icon: <ShoppingBag size={18} />, label: 'Order History', action: () => {} },
                 { icon: <Settings size={18} />, label: 'Bespoke Preferences', action: () => {} },
                 { icon: <LogOut size={18} />, label: 'Secure Logout', action: () => setIsLoggedIn(false) },
               ].map((item) => (
                 <button 
                  key={item.label}
                  onClick={item.action}
                  className="flex items-center space-x-4 p-4 hover:bg-white/5 transition-colors group"
                 >
                    <span className="text-white/20 group-hover:text-[#C8A97E] transition-colors">{item.icon}</span>
                    <span className="text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                 </button>
               ))}
            </div>
            
            <div className="pt-8 border-t border-white/5">
              <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] text-center">Collector ID: #TH-7729-LX</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
