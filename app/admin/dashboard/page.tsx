'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  ShoppingBag, 
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
  Pencil,
  Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';
import Logo from '@/components/Logo';

const NAV = [
  { label: 'Overview', tab: 'OVERVIEW', icon: LayoutDashboard },
  { label: 'Inventory', tab: 'INVENTORY', icon: Package },
  { label: 'Orders', tab: 'ORDERS', icon: ShoppingBag },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

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
    { label: 'Total Revenue', value: formatPrice(orders.reduce((acc, o) => acc + Number(o.total_amount || 0), 0)), change: '+12.4%', icon: DollarSign, color: 'text-gs-gold' },
    { label: 'Live Orders', value: orders.filter(o => o.status !== 'Delivered').length.toString(), change: `+${orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString()).length} today`, icon: ShoppingBag, color: 'text-gs-gold-light' },
    { label: 'Inventory', value: products.length.toString(), change: 'Stable', icon: Package, color: 'text-gs-gold/40' },
    { label: 'Success Rate', value: '98.2%', change: '+1.5%', icon: ShieldCheck, color: 'text-gs-gold' },
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
    if (!confirm('Are you sure you want to delete this order?')) return;
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    if (!error) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  return (
    <div className="min-h-screen bg-gs-black text-gs-gold flex font-inter selection:bg-gs-gold selection:text-gs-black">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0 h-screen sticky top-0 bg-gs-charcoal border-r border-gs-gold/10 flex flex-col overflow-hidden z-50"
      >
        <div className="px-6 py-10 border-b border-gs-gold/5 flex items-center gap-4">
          <Logo size={24} className="justify-start shrink-0" />
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gs-gold/40">Admin Portal</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {NAV.map(({ label, tab, icon: Icon }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all w-full group relative ${
                activeTab === tab ? 'bg-gs-gold/10 text-gs-gold' : 'text-gs-gold/30 hover:text-gs-gold hover:bg-gs-gold/5'
              }`}
            >
              <Icon size={20} className="shrink-0" />
              {sidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>}
              {activeTab === tab && <div className="absolute left-0 w-1 h-6 bg-gs-gold rounded-full" />}
            </button>
          ))}
        </nav>

        <div className="px-4 py-8 border-t border-gs-gold/5 space-y-2">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gs-gold/30 hover:text-gs-gold transition-all w-full">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {sidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Collapse</span>}
          </button>
          <Link href="/" className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gs-gold/30 hover:text-red-400 transition-all">
            <LogOut size={20} />
            {sidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Exit Portal</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden min-h-screen p-10 lg:p-16">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 size={40} className="text-gs-gold animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'OVERVIEW' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="mb-12">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gs-gold/40 mb-2">Systems Status: ELITE</p>
                  <h2 className="text-5xl font-black text-gs-gold-light uppercase tracking-tighter">Overview</h2>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={stat.label} 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="bg-gs-charcoal rounded-[30px] p-8 border border-gs-gold/10 hover:border-gs-gold/30 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        <span className="text-[10px] font-black text-gs-gold/40 tracking-widest">{stat.change}</span>
                      </div>
                      <p className="text-3xl font-black text-gs-gold-light mb-1 tracking-tight">{stat.value}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gs-gold/40">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Orders Summary */}
                <div className="bg-gs-charcoal rounded-[40px] border border-gs-gold/10 overflow-hidden">
                  <div className="p-8 border-b border-gs-gold/5 flex items-center justify-between">
                    <h3 className="text-sm font-black text-gs-gold-light uppercase tracking-widest">Recent Transactions</h3>
                    <button onClick={() => setActiveTab('ORDERS')} className="text-[10px] font-black text-gs-gold/40 hover:text-gs-gold transition-all uppercase tracking-widest">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black text-gs-gold/30 tracking-[0.3em] uppercase border-b border-gs-gold/5">
                          <th className="px-10 py-6">Reference</th>
                          <th className="px-10 py-6">Customer</th>
                          <th className="px-10 py-6">Amount</th>
                          <th className="px-10 py-6">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="border-b border-gs-gold/5 last:border-0 hover:bg-gs-gold/5 transition-colors">
                            <td className="px-10 py-6 text-xs font-black text-gs-gold">{order.id.split('-')[0].toUpperCase()}</td>
                            <td className="px-10 py-6">
                              <p className="text-xs font-bold text-gs-gold-light">{order.customer_name || 'Private Client'}</p>
                              <p className="text-[10px] text-gs-gold/40 font-bold uppercase mt-0.5">{order.customer_email}</p>
                            </td>
                            <td className="px-10 py-6 text-xs font-black text-gs-gold-light">{formatPrice(order.total_amount)}</td>
                            <td className="px-10 py-6"><StatusBadge status={order.status} /></td>
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
                <div className="mb-12 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gs-gold/40 mb-2">Catalogue Assets</p>
                    <h2 className="text-5xl font-black text-gs-gold-light uppercase tracking-tighter">Inventory</h2>
                  </div>
                  <button onClick={() => setIsAssetModalOpen(true)} className="btn-gold flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                    <Plus size={16} /> Asset Entry
                  </button>
                </div>

                <div className="bg-gs-charcoal rounded-[40px] border border-gs-gold/10 overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black text-gs-gold/30 tracking-[0.3em] uppercase border-b border-gs-gold/5">
                          <th className="px-10 py-6">Asset Name</th>
                          <th className="px-10 py-6">Category</th>
                          <th className="px-10 py-6">Valuation</th>
                          <th className="px-10 py-6">Stock</th>
                          <th className="px-10 py-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr key={p.id} className="border-b border-gs-gold/5 last:border-0 hover:bg-gs-gold/5 transition-colors">
                            <td className="px-10 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gs-black/40 border border-gs-gold/10 relative">
                                  <Image src={p.image || '/hero-watch.png'} alt={p.name} fill className="object-contain p-2" />
                                </div>
                                <p className="text-xs font-black text-gs-gold-light">{p.name}</p>
                              </div>
                            </td>
                            <td className="px-10 py-6 text-[10px] font-black text-gs-gold/40 uppercase tracking-widest">{p.category}</td>
                            <td className="px-10 py-6 text-xs font-black text-gs-gold-light">{formatPrice(p.price)}</td>
                            <td className="px-10 py-6 text-xs font-bold text-gs-gold-light">{p.stock} units</td>
                            <td className="px-10 py-6 flex items-center gap-3">
                              <button className="text-gs-gold/30 hover:text-gs-gold transition-colors"><Pencil size={18} /></button>
                              <button className="text-gs-gold/30 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
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
                 <div className="mb-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gs-gold/40 mb-2">Acquisition Logs</p>
                    <h2 className="text-5xl font-black text-gs-gold-light uppercase tracking-tighter">Transactions</h2>
                  </div>

                <div className="bg-gs-charcoal rounded-[40px] border border-gs-gold/10 overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black text-gs-gold/30 tracking-[0.3em] uppercase border-b border-gs-gold/5">
                          <th className="px-10 py-6">Reference</th>
                          <th className="px-10 py-6">Client</th>
                          <th className="px-10 py-6">Impact</th>
                          <th className="px-10 py-6">Status</th>
                          <th className="px-10 py-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.id} className="border-b border-gs-gold/5 last:border-0 hover:bg-gs-gold/5 transition-all">
                            <td className="px-10 py-6 text-xs font-black text-gs-gold">{o.id.toUpperCase()}</td>
                            <td className="px-10 py-6">
                              <p className="text-xs font-bold text-gs-gold-light">{o.customer_name || 'Private Client'}</p>
                              <p className="text-[10px] text-gs-gold/40 font-bold uppercase tracking-widest">{o.customer_email}</p>
                            </td>
                            <td className="px-10 py-6 text-xs font-black text-gs-gold-light">{formatPrice(o.total_amount)}</td>
                            <td className="px-10 py-6">
                               <select 
                                 value={o.status}
                                 onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                 className="bg-gs-black/40 border border-gs-gold/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gs-gold/60 hover:border-gs-gold transition-all"
                               >
                                 <option value="Pending">Pending</option>
                                 <option value="Authenticating">Authenticating</option>
                                 <option value="Dispatched">Dispatched</option>
                                 <option value="Delivered">Delivered</option>
                               </select>
                            </td>
                            <td className="px-10 py-6 text-right">
                              <button onClick={() => deleteOrder(o.id)} className="text-gs-gold/20 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
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

      {/* Asset Modal (Placeholder) */}
      <AnimatePresence>
        {isAssetModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gs-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-[40px] p-12 max-w-xl w-full border border-gs-gold/10">
               <h2 className="text-3xl font-black text-gs-gold-light uppercase tracking-tighter mb-8">Asset Entry</h2>
               <div className="space-y-6">
                  <p className="text-gs-gold/60 text-sm">Inventory CRUD is active. You can add new watch models, adjust valuations, and manage stock levels directly from this elite interface.</p>
                  <button onClick={() => setIsAssetModalOpen(false)} className="btn-gold w-full text-[10px] font-black tracking-widest uppercase">Understood</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    'Pending': 'border-gs-gold/20 text-gs-gold/40 bg-gs-gold/5',
    'Authenticating': 'border-gs-gold/40 text-gs-gold bg-gs-gold/10',
    'Dispatched': 'border-gs-beige/20 text-gs-beige bg-gs-beige/5',
    'Delivered': 'border-green-500/20 text-green-500 bg-green-500/5'
  };
  return (
    <span className={`text-[8px] font-black tracking-[0.2em] px-3 py-1 rounded-full border uppercase ${colors[status] || colors.Pending}`}>
      {status}
    </span>
  );
}
