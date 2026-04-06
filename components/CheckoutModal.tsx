'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, MapPin, User, ArrowRight, Check, Loader2, Shield } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/products';

type Step = 'details' | 'payment' | 'success';

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('details');
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', country: 'United States', zip: '',
    card: '', expiry: '', cvv: '',
  });

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulated secure checkout
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    clearCart();
    setStep('success');
  };

  const cartTotal = total();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-dark rounded-3xl w-full max-w-2xl border border-white/8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 p-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center"
            >
              <Check size={32} className="text-gold" />
            </motion.div>
            <div>
              <h2 className="font-display text-4xl text-ivory mb-3">Order Confirmed</h2>
              <p className="text-silver font-light leading-relaxed max-w-sm">
                Your timepiece is being prepared with the utmost care. You will receive an email confirmation
                with tracking details within 24 hours.
              </p>
            </div>
            <div className="glass rounded-2xl p-5 w-full text-left border border-white/5">
              <p className="font-label text-gold mb-1">Order Reference</p>
              <p className="font-syne font-700 text-ivory text-lg">
                TH-{Math.random().toString(36).slice(2, 8).toUpperCase()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full border border-gold/30 text-gold font-label hover:bg-gold/10 transition-colors"
            >
              Continue Exploring
            </button>
          </motion.div>
        ) : (
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-label text-gold">Secure Checkout</span>
                <h2 className="font-display text-2xl text-ivory mt-1">
                  {step === 'details' ? 'Your Details' : 'Payment'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full glass border border-white/10 hover:border-gold/30 text-silver hover:text-ivory transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Order summary */}
            <div className="glass rounded-2xl p-5 mb-8 border border-white/5">
              <p className="font-label text-silver mb-3">Order Summary</p>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-silver">{item.name} × {item.quantity}</span>
                    <span className="text-ivory">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="h-px bg-white/5 my-2" />
                <div className="flex justify-between">
                  <span className="font-syne font-700 text-ivory">Total</span>
                  <span className="font-display text-gold text-xl">{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>

            {/* Steps progress */}
            <div className="flex items-center gap-3 mb-8">
              {(['details', 'payment'] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-700 transition-all duration-300 ${
                    step === s || (s === 'details' && step === 'payment')
                      ? 'bg-gold text-obsidian'
                      : 'glass border border-white/10 text-silver'
                  }`}>
                    {s === 'details' && step === 'payment' ? <Check size={12} /> : i + 1}
                  </div>
                  <span className={`font-label capitalize ${step === s ? 'text-ivory' : 'text-silver/50'}`}>{s}</span>
                  {i < 1 && <div className="flex-1 h-px bg-white/10" />}
                </div>
              ))}
            </div>

            <form onSubmit={step === 'payment' ? handleOrder : (e) => { e.preventDefault(); setStep('payment'); }}>
              <AnimatePresence mode="wait">
                {step === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <CheckoutInput label="Full Name" value={form.name} onChange={(v) => set('name', v)} type="text" icon={<User size={14} />} />
                      <CheckoutInput label="Email" value={form.email} onChange={(v) => set('email', v)} type="email" icon={<User size={14} />} />
                    </div>
                    <CheckoutInput label="Phone Number" value={form.phone} onChange={(v) => set('phone', v)} type="tel" icon={<User size={14} />} />
                    <CheckoutInput label="Shipping Address" value={form.address} onChange={(v) => set('address', v)} type="text" icon={<MapPin size={14} />} />
                    <div className="grid grid-cols-3 gap-4">
                      <CheckoutInput label="City" value={form.city} onChange={(v) => set('city', v)} type="text" />
                      <CheckoutInput label="ZIP" value={form.zip} onChange={(v) => set('zip', v)} type="text" />
                      <div>
                        <label className="font-label text-silver/60 text-xs block mb-2">Country</label>
                        <select
                          value={form.country}
                          onChange={(e) => set('country', e.target.value)}
                          className="w-full rounded-xl px-4 py-3 text-ivory text-sm"
                        >
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>UAE</option>
                          <option>Switzerland</option>
                          <option>France</option>
                          <option>Germany</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="glass rounded-xl p-4 border border-white/5 flex items-center gap-3">
                      <Shield size={16} className="text-gold" />
                      <p className="font-label text-silver text-xs">
                        Your payment is secured with 256-bit SSL encryption.
                      </p>
                    </div>
                    <CheckoutInput label="Card Number" value={form.card} onChange={(v) => set('card', v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19))} type="text" icon={<CreditCard size={14} />} placeholder="0000 0000 0000 0000" />
                    <div className="grid grid-cols-2 gap-4">
                      <CheckoutInput label="Expiry (MM/YY)" value={form.expiry} onChange={(v) => set('expiry', v)} type="text" placeholder="MM/YY" />
                      <CheckoutInput label="CVV" value={form.cvv} onChange={(v) => set('cvv', v.slice(0, 3))} type="text" placeholder="•••" />
                    </div>
                    <div className="flex items-center gap-4 opacity-60">
                      {['visa', 'mastercard', 'amex'].map((c) => (
                        <span key={c} className="font-label text-silver text-[0.6rem] border border-white/10 px-2 py-1 rounded uppercase tracking-widest">{c}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-4 mt-8">
                {step === 'payment' && (
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="px-6 py-4 rounded-full border border-white/10 text-silver hover:text-ivory font-label transition-colors"
                  >
                    Back
                  </button>
                )}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="flex-1 py-4 rounded-full bg-gold text-obsidian font-syne font-700 tracking-wider text-sm uppercase flex items-center justify-center gap-2 hover:bg-gold-light transition-colors glow-gold disabled:opacity-70"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      {step === 'details' ? 'Continue to Payment' : `Pay ${formatPrice(cartTotal)}`}
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CheckoutInput({
  label, value, onChange, type, icon, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; type: string;
  icon?: React.ReactNode; placeholder?: string;
}) {
  return (
    <div>
      <label className="font-label text-silver/60 text-xs block mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-silver">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 text-ivory text-sm placeholder:text-silver/30`}
        />
      </div>
    </div>
  );
}
