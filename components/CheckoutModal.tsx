'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Package, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { supabase } from '@/lib/supabase';

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { items, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const total = getTotal();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Please sign in to complete your acquisition.');
      }

      // Create Order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          status: 'pending',
          shipping_address: address,
          contact_phone: phone,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create Order Items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setSuccess(true);
      clearCart();
    } catch (err: any) {
      alert(err.message || 'An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gs-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="glass rounded-[40px] p-8 md:p-12 w-full max-w-2xl border border-gs-gold/10 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gs-gold/5 blur-[100px] -z-10" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gs-gold/10 text-gs-gold/50 hover:text-gs-gold transition-colors"
        >
          <X size={18} />
        </button>

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 rounded-full bg-gs-gold/20 border border-gs-gold/40 flex items-center justify-center mx-auto mb-8">
              <Check size={40} className="text-gs-gold" />
            </div>
            <h2 className="text-4xl font-black text-gs-gold-light uppercase tracking-tighter mb-4">Acquisition Confirmed</h2>
            <p className="text-gs-gold/60 max-w-md mx-auto mb-12">
              Your masterpiece is being prepared. Our concierge will contact you shortly to arrange secure, white-glove delivery.
            </p>
            <button 
              onClick={onClose}
              className="btn-gold px-12"
            >
              Return to Gallery
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Summary */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-gs-gold-light uppercase tracking-tight mb-2">Order Summary</h2>
                <p className="text-gs-gold/40 text-xs uppercase tracking-widest font-bold">Review your selection</p>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gs-black/40 rounded-xl border border-gs-gold/10 p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gs-gold-light uppercase truncate">{item.name}</p>
                      <p className="text-[10px] text-gs-gold/40 font-bold uppercase">{item.quantity} × ${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gs-gold/10">
                <div className="flex justify-between items-baseline">
                  <span className="text-gs-gold/40 text-[10px] font-bold uppercase tracking-widest">Total Investment</span>
                  <span className="text-3xl font-black text-gs-gold-light">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-gs-gold/40">
                  <ShieldCheck size={16} className="text-gs-gold/60" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Insured Worldwide Transit</span>
                </div>
                <div className="flex items-center gap-3 text-gs-gold/40">
                  <Truck size={16} className="text-gs-gold/60" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">White-Glove Delivery</span>
                </div>
              </div>
            </div>

            {/* Right: Checkout Form */}
            <form onSubmit={handleCheckout} className="space-y-6">
              <h3 className="text-lg font-black text-gs-gold-light uppercase tracking-tight">Delivery Details</h3>
              
              <div className="space-y-4">
                <textarea
                  placeholder="Shipping Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-2xl bg-gs-black/40 border border-gs-gold/10 p-4 text-gs-gold-light text-xs font-bold transition-all focus:border-gs-gold/40 focus:bg-gs-black/60 outline-none h-32 resize-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Contact Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl bg-gs-black/40 border border-gs-gold/10 p-4 text-gs-gold-light text-xs font-bold transition-all focus:border-gs-gold/40 focus:bg-gs-black/60 outline-none"
                  required
                />
              </div>

              <div className="bg-gs-gold/5 rounded-2xl p-4 border border-gs-gold/10">
                <p className="text-[10px] text-gs-gold/60 font-bold uppercase tracking-widest leading-relaxed">
                  By confirming, you agree to our private acquisition terms. Payment will be coordinated by our concierge team via secure bank transfer or private link.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-beige py-5 text-sm shadow-xl shadow-gs-gold/5 flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <Package size={20} />
                    Confirm Acquisition
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
