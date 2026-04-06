'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/store/useCart';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { createOrder } from '@/actions/createOrder';
import { ShieldCheck, Truck, ArrowRight, Loader2, CreditCard } from 'lucide-react';

export default function Checkout() {
  const { items, getTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
  });

  const total = getTotal();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      items,
      total_amount: total,
    };

    const result = await createOrder(payload);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      clearCart();
      router.push('/checkout/success');
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="text-[#C8A97E] animate-spin" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-24 md:pb-0">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 grid grid-cols-1 lg:grid-cols-2 gap-16 pb-20">
        
        {/* Left: Form */}
        <section>
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight mb-4">Securing Acquisition</h1>
            <p className="text-gray-400">Complete your details for priority concierge delivery.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-[#C8A97E] uppercase tracking-widest font-bold">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Collector Name"
                  className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#C8A97E] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-[#C8A97E] uppercase tracking-widest font-bold">Contact Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#C8A97E] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-[#C8A97E] uppercase tracking-widest font-bold">Residency / Delivery Address</label>
              <input 
                type="text" 
                name="address" 
                required 
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street Address"
                className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#C8A97E] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-[#C8A97E] uppercase tracking-widest font-bold">City & Postal Region</label>
              <input 
                type="text" 
                name="city" 
                required 
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City / State"
                className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#C8A97E] transition-colors"
              />
            </div>

            <div className="p-6 bg-[#C8A97E]/5 border border-[#C8A97E]/20 rounded-2xl flex items-start gap-4">
              <ShieldCheck className="text-[#C8A97E] shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-[#C8A97E] text-sm uppercase mb-1">Authenticity Insured</h4>
                <p className="text-xs text-gray-500">Every timepiece is personally inspected and delivered via our armored concierge logistics service.</p>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button 
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full bg-[#C8A97E] text-black py-5 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] transition-all cursor-pointer shadow-2xl disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Finalize Acquisition <ArrowRight size={20} /></>}
            </button>
          </form>
        </section>

        {/* Right: Summary */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32 h-fit">
          <h3 className="text-2xl font-serif font-black uppercase mb-8">Collection Summary</h3>
          <div className="space-y-6 mb-8 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-lg shrink-0 overflow-hidden">
                  <img src={item.image_url} alt={item.name} className="object-cover w-full h-full p-1" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-sm">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal</span>
              <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Privileged Shipping</span>
              <span className="text-green-500 uppercase font-bold text-xs tracking-tighter">Complimentary</span>
            </div>
            <div className="flex justify-between text-white text-xl font-black border-t border-white/10 pt-4">
              <span className="uppercase font-serif">Total</span>
              <span className="text-[#C8A97E]">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
              </span>
            </div>
          </div>
        </section>

      </div>
      
      <BottomNav />
    </main>
  );
}
