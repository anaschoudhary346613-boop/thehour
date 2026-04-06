'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Logo from './Logo';

type Mode = 'login' | 'signup';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }

      setSuccess(true);
      setTimeout(onClose, 1800);
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#0F0F0F] border border-[#C5A059]/30 p-12 rounded-2xl w-full max-w-md flex flex-col items-center text-center shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="py-8">
            <h2 className="text-3xl font-serif text-[#C5A059] mb-4">ACCESS GRANTED</h2>
            <p className="text-gray-400">Welcome to the inner circle of The Hour.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-serif text-[#C5A059] mb-4">
              {mode === 'login' ? 'THE HOUR PRIVATE ACCESS' : 'JOIN THE LEGACY'}
            </h2>
            <p className="text-gray-400 mb-8">
              {mode === 'login' ? 'Sign in to access your curated collection.' : 'Register to begin your journey with High Horology.'}
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col">
              <AnimatePresence>
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden w-full"
                  >
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border border-gray-600 rounded-lg p-4 text-white mb-4 focus:border-[#C5A059] outline-none"
                      required={mode === 'signup'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-gray-600 rounded-lg p-4 text-white mb-4 focus:border-[#C5A059] outline-none"
                required
              />

              <div className="relative w-full">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-gray-600 rounded-lg p-4 text-white mb-4 focus:border-[#C5A059] outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 -mt-2 text-gray-500 hover:text-[#C5A059] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}

              {mode === 'login' && (
                <div className="w-full text-right mb-4">
                  <button type="button" className="text-gray-500 hover:text-[#C5A059] text-xs transition-colors">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C5A059] text-black py-4 rounded-full font-bold mt-4 hover:bg-white transition-colors flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : (mode === 'login' ? 'SIGN IN' : 'REGISTER')}
              </button>

              <button 
                type="button" 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} 
                className="text-gray-500 hover:text-white mt-6 text-sm transition-colors"
               >
                 {mode === 'login' ? 'Need an account? Register' : 'Already a member? Sign in'}
               </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
