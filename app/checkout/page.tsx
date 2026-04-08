'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, CreditCard, Landmark, QrCode } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/lib/products';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useStore();
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState<'wire' | 'upi'>('wire');
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) {
      // In a real app, we would call the Server Action here to save the order to Supabase
      setStep(3);
      clearCart();
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl text-white mb-6 uppercase tracking-widest font-serif">Vault is Empty</h1>
        <Link href="/shop" className="text-[#C8A97E] hover:text-white transition-colors uppercase tracking-[0.2em] text-xs underline underline-offset-8 font-bold font-sans">Return to Collection</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* LEFT SIDE: Acquisition Process */}
      <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col overflow-y-auto max-h-screen custom-scrollbar">
        <Link href="/" className="group flex items-center gap-3 text-white/30 hover:text-[#C8A97E] transition-colors mb-16 uppercase tracking-widest text-[10px] font-bold">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Exit Boutique
        </Link>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-[#C8A97E] text-xs font-bold uppercase tracking-[0.5em] mb-4">Phase 01</h2>
                <h3 className="text-4xl md:text-5xl font-serif tracking-tight uppercase">Acquisition Intake</h3>
              </div>

              <form onSubmit={handleConfirm} className="space-y-10">
                <div className="space-y-8">
                  <div className="group">
                    <label className="text-[9px] text-white/30 uppercase tracking-widest mb-3 block group-focus-within:text-[#C8A97E] transition-colors font-bold">Collector Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.2em] outline-none focus:border-[#C8A97E] transition-all"
                    />
                  </div>
                  <div className="group">
                    <label className="text-[9px] text-white/30 uppercase tracking-widest mb-3 block group-focus-within:text-[#C8A97E] transition-colors font-bold">Direct Secure Line</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.2em] outline-none focus:border-[#C8A97E] transition-all"
                    />
                  </div>
                  <div className="group">
                    <label className="text-[9px] text-white/30 uppercase tracking-widest mb-3 block group-focus-within:text-[#C8A97E] transition-colors font-bold">Destination Address</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.1em] outline-none focus:border-[#C8A97E] transition-all resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#C8A97E] transition-all rounded-xl"
                >
                  Configure Transfer
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-[#C8A97E] text-xs font-bold uppercase tracking-[0.5em] mb-4">Phase 02</h2>
                <h3 className="text-4xl md:text-5xl font-serif tracking-tight uppercase">Transfer Protocol</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-8 border rounded-2xl flex flex-col items-center gap-4 transition-all ${paymentMethod === 'wire' ? 'bg-white/10 border-[#C8A97E]' : 'bg-white/[0.03] border-white/5 opacity-40 hover:opacity-100'}`}
                >
                  <Landmark className={paymentMethod === 'wire' ? 'text-[#C8A97E]' : 'text-white'} size={32} />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Secure Bank Wire</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-8 border rounded-2xl flex flex-col items-center gap-4 transition-all ${paymentMethod === 'upi' ? 'bg-white/10 border-[#C8A97E]' : 'bg-white/[0.03] border-white/5 opacity-40 hover:opacity-100'}`}
                >
                  <QrCode className={paymentMethod === 'upi' ? 'text-[#C8A97E]' : 'text-white'} size={32} />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Concierge UPI</span>
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                 <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest italic font-sans">
                  "Upon confirmation, your personal concierge will generate a secure invoice and initiate the white-glove logistics protocol. Payments are verified within our Geneva clearing house."
                 </p>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleConfirm}
                  className="w-full bg-white text-black py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#C8A97E] transition-all rounded-xl"
                >
                   Finalize Acquisition
                </button>
                <button onClick={() => setStep(1)} className="text-[9px] text-white/20 uppercase tracking-widest hover:text-white transition-colors py-4 font-bold">Edit Acquisition Details</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12 text-center py-20"
            >
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-[#C8A97E]/10 border border-[#C8A97E]/30 flex items-center justify-center text-[#C8A97E]">
                   <CheckCircle2 size={48} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-[#C8A97E] text-xs font-bold uppercase tracking-[0.5em]">Artifact Secured</h2>
                <h3 className="text-4xl md:text-5xl font-serif tracking-tight uppercase">Invoice Generated</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed font-sans">
                  The documentation has been dispatched to your secure line. Please complete the transfer using the instructions provided.
                </p>
              </div>

              <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-3xl space-y-8 text-left max-w-md mx-auto">
                 <div>
                    <span className="text-[9px] text-white/20 uppercase tracking-widest block mb-2 font-bold">Transfer Reference</span>
                    <span className="text-[#C8A97E] font-mono text-xl uppercase tracking-tighter">THE-HOUR-ACQ-{Math.floor(Math.random() * 90000) + 10000}</span>
                 </div>
                 
                 {paymentMethod === 'wire' ? (
                   <div className="space-y-4 text-[10px] uppercase tracking-widest text-[#C8A97E]/70 font-bold">
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Bank</span> <span>Swiss Private Bank</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>Recipient</span> <span>THE HOUR LUXURY LTD.</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-2"><span>SWIFT/BIC</span> <span>THLH-CH-8892</span></div>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center gap-4 py-4">
                      <div className="w-40 h-40 bg-white p-2 rounded-xl">
                         <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=thehour@concierge" alt="UPI QR" className="w-full h-full" />
                      </div>
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Scan with BHIM/UPI</span>
                   </div>
                 )}
              </div>

              <Link href="/dashboard" className="block pt-8">
                 <button className="w-full max-w-md bg-white text-black py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#C8A97E] transition-all rounded-xl">
                   Enter My Vault
                 </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT SIDE: Summary Showcase */}
      <div className="w-full md:w-1/2 bg-[#0A0A0A] p-8 md:p-16 lg:p-24 border-l border-white/5 flex flex-col justify-center min-h-[400px]">
         <div className="max-w-md mx-auto w-full space-y-12">
            <div>
              <h2 className="text-white/40 text-[9px] uppercase tracking-[0.5em] font-bold mb-8">Acquisition Summary</h2>
              <div className="space-y-10">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-20 h-20 bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden p-4">
                       <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                       <h4 className="text-[9px] text-[#C8A97E] uppercase tracking-widest font-bold mb-1">{item.brand}</h4>
                       <h3 className="text-white font-serif text-lg leading-tight uppercase">{item.name}</h3>
                       <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Qty: {item.quantity}</span>
                    </div>
                    <div className="text-white font-serif text-lg">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/10 space-y-6">
               <div className="flex justify-between items-end text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
                  <span>Logistics & Authentication</span>
                  <span className="text-white">Complementary</span>
               </div>
               <div className="flex justify-between items-end pt-4">
                  <span className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">Total Acquisition</span>
                  <span className="text-4xl md:text-5xl font-serif text-[#C8A97E] leading-none">{formatPrice(getCartTotal())}</span>
               </div>
            </div>

            {/* Confidence Decal */}
            <div className="flex items-center gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
               <div className="w-10 h-10 rounded-full bg-[#C8A97E]/10 flex items-center justify-center text-[#C8A97E]">
                  <Landmark size={20} />
               </div>
               <p className="text-[9px] text-white/30 uppercase tracking-widest leading-relaxed font-bold">
                  Encrypted secure transfer protocols applied to all high-value shipments.
               </p>
            </div>
         </div>
      </div>

    </div>
  );
}
