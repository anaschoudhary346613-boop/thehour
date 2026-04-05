'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, Loader2 } from 'lucide-react';

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
    // Simulate auth (Supabase integration placeholder)
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(onClose, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-dark rounded-3xl p-8 md:p-12 w-full max-w-md border border-white/8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full glass border border-white/10 hover:border-gold/30 text-silver hover:text-ivory transition-colors"
        >
          <X size={14} />
        </button>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <Check size={28} className="text-gold" />
            </div>
            <p className="font-syne font-700 text-ivory text-xl">Welcome back</p>
            <p className="font-label text-silver text-center">You have been authenticated successfully</p>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <span className="font-label text-gold">The Hour</span>
              <h2 className="font-display text-3xl text-ivory mt-2">
                {mode === 'login' ? 'Welcome\nBack' : 'Create\nAccount'}
              </h2>
              <p className="text-silver text-sm mt-3">
                {mode === 'login'
                  ? 'Access your curated collection and order history'
                  : 'Join the inner circle of discerning collectors'}
              </p>
            </div>

            {/* Mode toggle */}
            <div className="flex gap-1 p-1 rounded-full glass border border-white/8 mb-8">
              {(['login', 'signup'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-full text-sm font-syne font-600 capitalize transition-all duration-300 ${
                    mode === m ? 'bg-gold text-obsidian' : 'text-silver hover:text-ivory'
                  }`}
                >
                  {m === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence>
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FloatingLabel
                      id="auth-name"
                      label="Full Name"
                      icon={<User size={14} />}
                      value={name}
                      onChange={setName}
                      type="text"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <FloatingLabel
                id="auth-email"
                label="Email Address"
                icon={<Mail size={14} />}
                value={email}
                onChange={setEmail}
                type="email"
              />

              <div className="relative">
                <FloatingLabel
                  id="auth-password"
                  label="Password"
                  icon={<Lock size={14} />}
                  value={password}
                  onChange={setPassword}
                  type={showPass ? 'text' : 'password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-silver hover:text-ivory transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {error && (
                <p className="text-rose text-xs font-label">{error}</p>
              )}

              {mode === 'login' && (
                <div className="text-right">
                  <button type="button" className="font-label text-silver/50 hover:text-gold transition-colors text-xs">
                    Forgot Password?
                  </button>
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
                className="w-full py-4 rounded-full bg-gold text-obsidian font-syne font-700 tracking-wider text-sm uppercase flex items-center justify-center gap-2 hover:bg-gold-light transition-colors glow-gold disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function FloatingLabel({
  id,
  label,
  icon,
  value,
  onChange,
  type = 'text',
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-silver">{icon}</div>
      <label
        htmlFor={id}
        className={`absolute left-10 transition-all duration-200 pointer-events-none ${
          active
            ? 'top-2 text-[0.6rem] font-label text-gold'
            : 'top-1/2 -translate-y-1/2 text-sm text-silver'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl pl-10 pr-4 pt-6 pb-2 text-ivory text-sm"
        autoComplete="off"
      />
    </div>
  );
}
