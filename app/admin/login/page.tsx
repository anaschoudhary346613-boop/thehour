'use client';

import { useState } from 'react';
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    // Admin credential check (demo)
    if (email === 'admin@thehour.com' && password === 'admin123') {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid administrator credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center relative overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-15" />
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />

      {/* Animated rings */}
      {[200, 350, 500].map((size, i) => (
        <motion.div
          key={size}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20 + i * 8, ease: 'linear' }}
          className="absolute rounded-full border border-gold/5"
          style={{ width: size, height: size }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="inline-flex w-16 h-16 rounded-full border border-gold/30 items-center justify-center mb-4"
          >
            <Clock size={24} className="text-gold" strokeWidth={1} />
          </motion.div>
          <h1 className="font-display text-3xl text-ivory">The Hour</h1>
          <p className="font-label text-silver mt-2">Administrator Access</p>
        </div>

        {/* Card */}
        <div className="glass-dark rounded-3xl p-8 border border-white/8">
          <div className="flex items-center gap-2 mb-8">
            <Shield size={14} className="text-gold" />
            <span className="font-label text-gold">Secure Admin Portal</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="font-label text-silver/60 text-xs block mb-2">Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@thehour.com"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-ivory text-sm placeholder:text-silver/30"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-label text-silver/60 text-xs block mb-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl pl-10 pr-10 py-3 text-ivory text-sm placeholder:text-silver/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-silver hover:text-ivory transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-rose text-xs font-label"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-4 rounded-full bg-gold text-obsidian font-syne font-700 tracking-wider text-sm uppercase flex items-center justify-center gap-2 hover:bg-gold-light transition-colors glow-gold disabled:opacity-70 mt-2"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Access Dashboard <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          <p className="font-label text-silver/30 text-center mt-6 text-[0.6rem]">
            Demo: admin@thehour.com / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
