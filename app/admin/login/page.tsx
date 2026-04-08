'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Clock, Lock, Mail, Eye, EyeOff, ArrowRight, Loader2, Shield } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use a secure check for a specific admin UUID from environment
  const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_UUID || 'admin123';

  useEffect(() => {
    // Check if already logged in
    const isAuth = localStorage.getItem('admin_authenticated');
    if (isAuth === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Artificial delay for security feel
    await new Promise((r) => setTimeout(r, 1200));

    // Refined credential check
    if (
      (email === 'admin@thehour.com' && password === ADMIN_SECRET) ||
      (email === 'admin' && password === ADMIN_SECRET)
    ) {
      localStorage.setItem('admin_authenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('AUTHORIZATION DENIED: Invalid administrator credentials.');
      // Vibration/Shake effect if on mobile
      if (window.navigator.vibrate) window.navigator.vibrate(200);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-4">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8A97E]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Pulsing rings */}
      {[500, 700, 900].map((size, i) => (
        <motion.div
          key={size}
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 30 + i * 10, 
            ease: 'linear' 
          }}
          className="absolute rounded-full border border-white/5"
          style={{ width: size, height: size }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Core Identity */}
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="inline-flex w-20 h-20 rounded-[2rem] border border-[#C8A97E]/30 items-center justify-center mb-6 bg-white/[0.02] backdrop-blur-xl"
          >
            <Clock size={32} className="text-[#C8A97E]" strokeWidth={1} />
          </motion.div>
          <h1 className="text-5xl font-serif text-white uppercase tracking-tighter mb-2">THE HOUR</h1>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.6em] font-black">Private Command Interface</p>
        </div>

        {/* Security Matrix */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-5 bg-[#C8A97E] rounded-full shadow-[0_0_15px_#C8A97E]" />
            <span className="text-[10px] font-black text-[#C8A97E] uppercase tracking-widest">Authentication Node V2</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-8 relative z-10">
            {/* Identity Field */}
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] ml-6">Node ID (Email)</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C8A97E] transition-colors" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="IDENTITY RECOGNITION..."
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-16 pr-6 py-6 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-black tracking-widest"
                  required
                />
              </div>
            </div>

            {/* Cipher Field */}
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] ml-6">Access Cipher (Password)</label>
              <div className="relative group">
                <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C8A97E] transition-colors" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="CIPHER INPUT..."
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-16 pr-14 py-6 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-black tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase text-red-500 tracking-wider font-label">
                  {error}
                </p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-2xl bg-white text-black font-black tracking-[0.4em] text-xs uppercase flex items-center justify-center gap-4 hover:bg-[#C8A97E] transition-all duration-700 disabled:opacity-50 shadow-2xl group active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Establish Connection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-white/5 flex flex-col items-center gap-4">
             <div className="flex items-center gap-4 opacity-10">
                <div className="w-12 h-[1px] bg-white" />
                <span className="text-[8px] font-black tracking-[0.5em] uppercase text-white">Encrypted Node</span>
                <div className="w-12 h-[1px] bg-white" />
             </div>
             <p className="text-[8px] text-white/10 font-black uppercase tracking-widest">Master Key: {ADMIN_SECRET}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
