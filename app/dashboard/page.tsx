'use client';

import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { User, LogOut, Package, CreditCard, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const { user, loading, signOut } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-black text-white pb-24 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-48">
        <header className="mb-12">
          <p className="text-[#C8A97E] font-bold tracking-[0.3em] uppercase mb-2 text-xs">Private Member Portal</p>
          <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight">
            Welcome, {user.user_metadata?.full_name || 'Collector'}
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-[#C8A97E]/20 flex items-center justify-center border border-[#C8A97E]/40">
                  <User size={40} className="text-[#C8A97E]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{user.user_metadata?.full_name || 'Anonymous User'}</h3>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#C8A97E]/30 transition-colors group cursor-pointer">
                  <Package className="text-[#C8A97E] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold mb-1">My Collection</h4>
                  <p className="text-xs text-gray-500">Track your past acquisitions and service history.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#C8A97E]/30 transition-colors group cursor-pointer">
                  <CreditCard className="text-[#C8A97E] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold mb-1">Financial Records</h4>
                  <p className="text-xs text-gray-500">Securely view invoices and valuation certificates.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#C8A97E]/30 transition-colors group cursor-pointer">
                  <ShieldCheck className="text-[#C8A97E] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold mb-1">Provenance Protection</h4>
                  <p className="text-xs text-gray-500">Verify authenticity via blocked blockchain records.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#C8A97E]/10 border border-[#C8A97E]/20 flex items-center justify-between group cursor-pointer">
                   <div>
                    <h4 className="font-bold text-[#C8A97E]">Concierge Support</h4>
                    <p className="text-[10px] text-[#C8A97E]/60 uppercase tracking-widest">Connect with our specialists</p>
                   </div>
                   <ChevronRight className="text-[#C8A97E]" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions / Settings */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-4 uppercase tracking-widest text-[#C8A97E] text-xs">Account Settings</h3>
              <button 
                onClick={signOut}
                className="w-full flex items-center gap-3 p-4 rounded-2xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-bold">Sign Out</span>
              </button>
            </div>
            
            <div className="bg-gs-gold/5 border border-gs-gold/10 rounded-3xl p-6">
              <p className="text-[10px] text-[#C8A97E]/60 uppercase tracking-widest mb-4">Membership Tier</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-serif font-black uppercase text-[#C8A97E]">Heritage Elite</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
