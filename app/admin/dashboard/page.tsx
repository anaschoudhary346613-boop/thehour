'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Package, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle,
  Plus,
  BarChart3,
  LogOut,
  Settings,
  Bell,
  Trash2,
  LayoutDashboard,
  ChevronRight,
  Menu,
  X,
  DollarSign,
  ShieldCheck,
  ArrowUpRight,
  Pencil
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';

const NAV = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Inventory', href: '/admin/dashboard?tab=products', icon: Package },
  { label: 'Orders', href: '/admin/dashboard?tab=orders', icon: ShoppingBag },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [ordersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*').order('created_at', { ascending: false })
      ]);

      if (ordersRes.data) setOrders(ordersRes.data);
      if (productsRes.data) setProducts(productsRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const stats = useMemo(() => [
    { label: 'Total Revenue', value: formatPrice(orders.reduce((acc, o) => acc + Number(o.total_amount || 0), 0)), change: '+12.4%', icon: DollarSign, color: 'text-gold' },
    { label: 'Live Orders', value: orders.filter(o => o.status !== 'Delivered').length.toString(), change: `+${orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString()).length} today`, icon: ShoppingBag, color: 'text-ivory' },
    { label: 'Avg Sale', value: formatPrice(orders.length ? orders.reduce((acc, o) => acc + Number(o.total_amount || 0), 0) / orders.length : 0), change: '+2.1%', icon: TrendingUp, color: 'text-gold' },
    { label: 'Inventory', value: products.length.toString(), change: 'Stable', icon: Package, color: 'text-ivory/40' },
  ], [orders, products]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order record?')) return;
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    if (!error) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex font-inter selection:bg-gold selection:text-obsidian">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0 h-screen sticky top-0 border-r border-white/5 flex flex-col overflow-hidden z-20"
        style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(32px)' }}
      >
        <div className="px-6 py-10 border-b border-white/5 flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 90 }}
            className="w-10 h-10 rounded-full border border-gold flex items-center justify-center shrink-0 bg-gold/5"
          >
            <Clock size={16} className="text-gold" strokeWidth={1} />
          </motion.div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col overflow-hidden">
              <span className="font-syne font-800 text-[1.1rem] tracking-[0.1em] text-ivory leading-none uppercase">
                The <span className="text-gold-gradient">Hour</span>
              </span>
              <span className="font-label text-silver/30 text-[0.45rem] mt-1 tracking-[0.3em]">Admin Portal</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {NAV.map(({ label, icon: Icon, href }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label.toUpperCase())}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 w-full group relative ${
                activeTab === label.toUpperCase() ? 'bg-gold/5 text-gold' : 'text-silver/40 hover:text-ivory hover:bg-white/5'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {sidebarOpen && <span className="font-label text-[0.65rem] tracking-[0.2em] pt-0.5">{label}</span>}
              {activeTab === label.toUpperCase() && <motion.div layoutId="activeSide" className="absolute left-0 w-1 h-6 bg-gold rounded-full" />}
            </button>
          ))}
        </nav>

        <div className="px-4 py-8 border-t border-white/5 space-y-2">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-silver/40 hover:text-ivory hover:bg-white/5 transition-all w-full group">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            {sidebarOpen && <span className="font-label text-[0.6rem] tracking-[0.25em]">Collapse</span>}
          </button>
          <Link href="/" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-silver/40 hover:text-rose transition-all group">
            <LogOut size={18} />
            {sidebarOpen && <span className="font-label text-[0.6rem] tracking-[0.25em]">Exit Admin</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-10 lg:p-14 max-w-[1600px] mx-auto bg-[radial-gradient(circle_at_top_right,rgba(184,151,58,0.03),transparent)]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-gold/10 border-t-gold rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'OVERVIEW' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <AdminHeader title="Overview" subtitle="Systems Status: Nominal" />
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={stat.label} 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="glass rounded-3xl p-6 border border-white/5 hover:border-gold/20 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-2.5 rounded-xl bg-white/5 text-gold group-hover:bg-gold group-hover:text-obsidian transition-all"><stat.icon size={18} /></div>
                        <span className="font-label text-gold/40 text-[0.6rem] tracking-widest">{stat.change}</span>
                      </div>
                      <p className="font-display text-4xl text-ivory mb-1 tracking-tight">{stat.value}</p>
                      <p className="font-label text-silver/40 text-[0.65rem] tracking-[0.2em]">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Orders Table */}
                <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
                  <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <h3 className="font-syne font-800 text-ivory uppercase tracking-widest text-[0.8rem]">Recent Transactions</h3>
                    <button onClick={() => setActiveTab('ORDERS')} className="font-label text-gold/60 hover:text-gold transition-colors text-[0.6rem] tracking-[0.3em]">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="font-label text-silver/40 text-[0.55rem] tracking-[0.3em] uppercase border-b border-white/5 bg-white/[0.01]">
                          <th className="px-8 py-5">Order ID</th>
                          <th className="px-8 py-5">Customer</th>
                          <th className="px-8 py-5">Value</th>
                          <th className="px-8 py-5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-inter">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                            <td className="px-8 py-6 font-syne font-700 text-gold text-[0.75rem]">{order.id.split('-')[0].toUpperCase()}</td>
                            <td className="px-8 py-6 text-ivory">
                              <p className="font-medium">{order.customer_name}</p>
                              <p className="text-[0.6rem] text-silver/40 uppercase tracking-widest mt-1">{order.customer_email}</p>
                            </td>
                            <td className="px-8 py-6 font-syne font-800 text-ivory">{formatPrice(order.total_amount)}</td>
                            <td className="px-8 py-6">
                              <StatusBadge status={order.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'INVENTORY' && (
              <motion.div key="inventory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <AdminHeader 
                  title="Inventory" 
                  subtitle="Catalogue Assets" 
                  action={<button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold text-obsidian font-syne font-800 tracking-widest uppercase text-[0.7rem] hover:bg-gold-light shadow-xl"><Plus size={16} /> Asset Entry</button>}
                />
                <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="font-label text-silver/40 text-[0.55rem] tracking-[0.3em] uppercase border-b border-white/5 bg-white/[0.01]">
                          <th className="px-10 py-6">Asset Name</th>
                          <th className="px-10 py-6">Category</th>
                          <th className="px-10 py-6">Valuation</th>
                          <th className="px-10 py-6">Stock</th>
                          <th className="px-10 py-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                            <td className="px-10 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/5 relative">
                                  <Image src={p.image_urls?.[0] || '/watch-01.png'} alt={p.name} fill className="object-cover" />
                                </div>
                                <p className="font-syne font-700 text-ivory text-sm">{p.name}</p>
                              </div>
                            </td>
                            <td className="px-10 py-6 font-label text-[0.55rem] tracking-[0.2em] text-silver/60 uppercase">{p.category}</td>
                            <td className="px-10 py-6 font-syne font-800 text-gold text-lg tracking-tight">{formatPrice(p.price)}</td>
                            <td className="px-10 py-6 font-syne font-600 text-ivory text-xs">{p.stock} units</td>
                            <td className="px-10 py-6 flex items-center gap-3">
                              <button className="text-silver/30 hover:text-gold transition-colors"><Pencil size={18} /></button>
                              <button className="text-silver/30 hover:text-rose transition-colors"><Trash2 size={18} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'ORDERS' && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <AdminHeader title="Transactions" subtitle="Order Fullfillment" />
                <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="font-label text-silver/40 text-[0.55rem] tracking-[0.3em] uppercase border-b border-white/5 bg-white/[0.01]">
                          <th className="px-8 py-5">Order ID</th>
                          <th className="px-8 py-5">Client</th>
                          <th className="px-8 py-5">Status</th>
                          <th className="px-8 py-5">Change Status</th>
                          <th className="px-8 py-5">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-all">
                            <td className="px-8 py-6 font-syne font-700 text-gold text-[0.75rem]">{o.id.toUpperCase()}</td>
                            <td className="px-8 py-6">
                              <p className="font-medium text-ivory">{o.customer_name}</p>
                              <p className="text-[0.6rem] text-silver/40 uppercase tracking-widest">{o.customer_email}</p>
                            </td>
                            <td className="px-8 py-6"><StatusBadge status={o.status} /></td>
                            <td className="px-8 py-6">
                               <select 
                                 value={o.status}
                                 onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                 className="bg-obsidian border border-white/10 rounded-xl px-4 py-2 text-[0.6rem] font-label tracking-widest text-silver hover:border-gold transition-all"
                               >
                                 <option value="Pending">Pending</option>
                                 <option value="Authenticating">Authenticating</option>
                                 <option value="Dispatched">Dispatched</option>
                                 <option value="Delivered">Delivered</option>
                               </select>
                            </td>
                            <td className="px-8 py-6">
                              <button onClick={() => deleteOrder(o.id)} className="text-silver/20 hover:text-rose transition-colors"><Trash2 size={18} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

function AdminHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="mb-12 flex items-center justify-between">
      <div>
        <p className="font-label text-gold/60 mb-2 tracking-[0.4em] uppercase text-[0.6rem]">{subtitle}</p>
        <h2 className="font-display text-5xl text-ivory uppercase tracking-tighter leading-none">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        {action}
        <div className="flex items-center gap-4 glass px-5 py-3 rounded-2xl border border-white/5">
          <div className="flex flex-col items-end">
             <span className="font-label text-white/30 text-[0.5rem] tracking-[0.2em] mb-0.5">System Status</span>
             <span className="font-label text-silver text-[0.65rem] tracking-widest uppercase">Encryption Active</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_10px_rgba(184,151,58,0.4)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    'Pending': 'border-silver/20 text-silver/60 bg-white/5',
    'Authenticating': 'border-gold/20 text-gold bg-gold/5',
    'Dispatched': 'border-gold/50 text-gold bg-gold/10',
    'Delivered': 'border-green-500/20 text-green-500 bg-green-500/5'
  };
  return (
    <span className={`font-label text-[0.5rem] tracking-[0.2em] px-3 py-1 rounded-full border uppercase ${colors[status] || colors.Pending}`}>
      {status}
    </span>
  );
}
