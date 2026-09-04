'use client';
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import {
  FiHome, FiPackage, FiShoppingCart, FiUsers, FiFileText,
  FiStar, FiMenu, FiX, FiTrendingUp, FiCheck, FiClock,
  FiAlertCircle, FiDollarSign, FiActivity, FiRefreshCw,
  FiExternalLink, FiPlus, FiArrowUpRight, FiFilter, FiLayers
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

const NAV_ITEMS = [
  { href: '/admin', label: 'ড্যাশবোর্ড', icon: <FiHome /> },
  { href: '/admin/services', label: 'সার্ভিস', icon: <FiPackage /> },
  { href: '/admin/orders', label: 'অর্ডার', icon: <FiShoppingCart /> },
  { href: '/admin/users', label: 'ব্যবহারকারী', icon: <FiUsers /> },
  { href: '/admin/blog', label: 'ব্লগ', icon: <FiFileText /> },
  { href: '/admin/testimonials', label: 'মতামত', icon: <FiStar /> },
];

const CAT_COLORS = {
  school: '#7C3AED',
  college: '#0891B2',
  madrasa: '#15803D',
  clinic: '#BE185D',
  hospital: '#C2410C',
  grocery: '#B45309',
  ecommerce: '#7C3AED',
  portfolio: '#4338CA',
  other: '#475569',
};

export function AdminLayout({ children, active }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || !isAdmin || user.email !== 'auladdevops@gmail.com') {
        router.push('/login');
      }
    }
  }, [user, isAdmin, loading, router]);

  if (loading || !isAdmin || user?.email !== 'auladdevops@gmail.com') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b14]">
        <div className="flex flex-col items-center gap-3">
          <div className="spinner w-9 h-9 border-2 border-purple-500 border-t-transparent" />
          <p className="text-slate-400 text-sm">অ্যাডমিন অ্যাক্সেস ভেরিফাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-200">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''} transition-all duration-300 z-50`}>
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <HiSparkles className="text-white text-lg" />
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide">Aulad IT</p>
              <p className="text-cyan-400 text-xs font-semibold">Master Admin</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`sidebar-link flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === item.href
                  ? 'bg-gradient-to-r from-purple-600/30 to-cyan-500/10 text-white border border-purple-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className={`text-base ${active === item.href ? 'text-cyan-400' : 'text-slate-400'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/80 mt-auto bg-slate-900/30">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-xs font-bold text-purple-300">
              AD
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">Aulad Hossen</p>
              <p className="text-[11px] text-emerald-400 font-medium">Super Admin</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 transition-colors"
          >
            <FiExternalLink className="text-xs" /> মূল সাইট দেখুন
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="md:ml-[260px] min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="glass border-b border-slate-800/70 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              aria-label="Open sidebar"
            >
              <FiMenu className="text-2xl" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-white text-base font-bold tracking-tight">Admin Console</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/50 text-xs text-slate-300">
              <span className="text-purple-400">👑</span>
              <span className="font-mono text-emerald-300">{user?.email}</span>
            </div>
            <Link
              href="/admin/services"
              className="btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5 shadow-sm"
            >
              <FiPlus className="text-sm" /> নতুন সার্ভিস
            </Link>
          </div>
        </header>

        {/* Dynamic Page Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

// Custom Glassmorphism Tooltip for Recharts
function CustomChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3.5 border border-purple-500/30 shadow-2xl backdrop-blur-lg bg-slate-900/95 text-xs space-y-1.5 min-w-[140px]">
        <p className="font-bold text-slate-200 border-b border-slate-800 pb-1">{label} ২০২৬</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-white font-mono">
              {entry.name === 'রেভিনিউ' || entry.name === 'মোট বুকিং'
                ? `৳${Number(entry.value).toLocaleString()}`
                : `${entry.value}টি`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chartMetric, setChartMetric] = useState('revenue'); // 'revenue' | 'orders'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/stats');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  // Time-based Bengali greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'শুভ সকাল';
    if (hour < 16) return 'শুভ দুপুর';
    if (hour < 18) return 'শুভ অপরাহ্ন';
    return 'শুভ সন্ধ্যা';
  }, []);

  const stats = data?.stats || {};
  const timeline = data?.revenueTimeline || [];
  const topServices = data?.topSellingServices || [];
  const recentOrders = data?.recentOrders || [];

  return (
    <AdminLayout active="/admin">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── 1. Top Welcome Banner & Quick Actions ── */}
        <div className="glass rounded-2xl p-6 sm:p-7 relative overflow-hidden border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-cyan-950/30">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-purple-600/10 filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-cyan-600/10 filter blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="badge text-xs px-2.5 py-0.5 border border-purple-500/30 bg-purple-500/10 text-purple-300">
                  👑 মাস্টার অ্যাডমিন মোড
                </span>
                <span className="text-slate-400 text-xs">• লাইভ কানেক্টেড</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {greeting}, <span className="gradient-text">আওলাদ ভাই</span> 👋
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                আপনার ওয়েবসাইট সার্ভিসের বিক্রয়, ক্লায়েন্টদের অর্ডার এবং রেভিনিউ সম্পর্কিত রিয়েল-টাইম তথ্য একনজরে পর্যালোচনা করুন।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="btn-outline text-xs px-3.5 py-2.5 flex items-center gap-2 rounded-xl"
                title="তথ্য রিফ্রেশ করুন"
              >
                <FiRefreshCw className={`text-sm ${refreshing ? 'animate-spin text-cyan-400' : ''}`} />
                <span>{refreshing ? 'আপডেট হচ্ছে...' : 'রিফ্রেশ'}</span>
              </button>
              <Link
                href="/admin/orders"
                className="btn-outline text-xs px-3.5 py-2.5 flex items-center gap-2 rounded-xl text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10"
              >
                <FiShoppingCart className="text-sm" /> অর্ডার দেখুন
              </Link>
              <Link
                href="/admin/services"
                className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2 rounded-xl"
              >
                <FiPlus className="text-sm" /> নতুন সার্ভিস
              </Link>
            </div>
          </div>
        </div>

        {/* ── 2. Primary KPI Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Revenue */}
          <div className="glass rounded-2xl p-5 border border-slate-800/80 hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">মোট আদায়কৃত রেভিনিউ</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">
                  ৳{(stats.totalRevenue || 0).toLocaleString()}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl group-hover:scale-110 transition-transform">
                <FiTrendingUp />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">প্রাক্কলিত পাইপলাইন:</span>
              <span className="text-cyan-400 font-semibold font-mono">
                +৳{(stats.potentialRevenue || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div className="glass rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 group relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">মোট অর্ডার সংখ্যা</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">
                  {stats.totalOrders || 0}
                  <span className="text-sm font-normal text-slate-500 ml-1">টি</span>
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl group-hover:scale-110 transition-transform">
                <FiShoppingCart />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">অপেক্ষমান অর্ডার:</span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold">
                {stats.pendingOrders || 0} টি নতুন
              </span>
            </div>
          </div>

          {/* Card 3: Active Services */}
          <div className="glass rounded-2xl p-5 border border-slate-800/80 hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">অ্যাক্টিভ সার্ভিসসমূহ</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">
                  {stats.totalServices || 0}
                  <span className="text-sm font-normal text-slate-500 ml-1">টি প্যাকেজ</span>
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl group-hover:scale-110 transition-transform">
                <FiPackage />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">ক্যাটাগরি রেডি:</span>
              <span className="text-purple-300 font-semibold">৮টি ক্যাটাগরি লাইভ</span>
            </div>
          </div>

          {/* Card 4: Average Order Value */}
          <div className="glass rounded-2xl p-5 border border-slate-800/80 hover:border-amber-500/30 transition-all duration-300 group relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">গড় অর্ডার মূল্য (AOV)</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">
                  ৳{(stats.avgOrderValue || 0).toLocaleString()}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl group-hover:scale-110 transition-transform">
                <FiActivity />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">সাকসেস রেট:</span>
              <span className="text-emerald-400 font-semibold font-mono">
                {stats.completionRate || 0}% সম্পন্ন
              </span>
            </div>
          </div>
        </div>

        {/* ── 3. Interactive Charts & Order Pipeline Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Chart Column (8 cols) */}
          <div className="lg:col-span-8 glass rounded-2xl p-5 sm:p-6 border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="text-purple-400" />
                  <h3 className="text-lg font-bold text-white tracking-tight">রেভিনিউ ও বিক্রয় অ্যানালিটিক্স</h3>
                </div>
                <p className="text-slate-400 text-xs mt-0.5">বিগত ৬ মাসের আর্থিক আয় ও বুকিং ট্রেন্ড চার্ট</p>
              </div>

              {/* Metric Toggle Tabs */}
              <div className="inline-flex p-1 bg-slate-900/80 rounded-xl border border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setChartMetric('revenue')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    chartMetric === 'revenue'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ৳ রেভিনিউ (টাকা)
                </button>
                <button
                  onClick={() => setChartMetric('orders')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    chartMetric === 'orders'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🛒 অর্ডার ভলিউম
                </button>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-[310px] w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  {chartMetric === 'revenue' ? (
                    <AreaChart data={timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis
                        dataKey="month"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={{ stroke: '#334155' }}
                      />
                      <YAxis
                        stroke="#64748b"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `৳${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                      />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="bookings"
                        name="মোট বুকিং"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#bookingGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        name="রেভিনিউ"
                        stroke="#8b5cf6"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#revenueGrad)"
                      />
                    </AreaChart>
                  ) : (
                    <BarChart data={timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis
                        dataKey="month"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={{ stroke: '#334155' }}
                      />
                      <YAxis
                        stroke="#64748b"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Bar dataKey="orders" name="অর্ডার" fill="#06b6d4" radius={[6, 6, 0, 0]}>
                        {timeline.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === timeline.length - 1 ? '#8b5cf6' : '#0891b2'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                  চার্ট লোড হচ্ছে...
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-purple-500" /> আদায়কৃত রেভিনিউ
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" /> সম্ভাব্য বুকিং পরিমাণ
                </span>
              </div>
              <span className="text-slate-500">স্বয়ংক্রিয় ডাটাবেজ সমন্বয় সক্রিয়</span>
            </div>
          </div>

          {/* Side Column: Order Pipeline & Quick Health (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Status Breakdown */}
            <div className="glass rounded-2xl p-5 sm:p-6 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FiLayers className="text-cyan-400" /> অর্ডার পাইপলাইন
                </h3>
                <span className="text-xs text-slate-400 font-mono">মোট {stats.totalOrders || 0}টি</span>
              </div>

              <div className="space-y-3">
                {/* Pending */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm font-bold">
                      <FiClock />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">অপেক্ষমান (Pending)</p>
                      <p className="text-[11px] text-yellow-300/80">নতুন অর্ডার যাচাই বাকি</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-yellow-400 font-mono">{stats.pendingOrders || 0}</span>
                </div>

                {/* Processing */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
                      <FiActivity />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">প্রক্রিয়াধীন (Processing)</p>
                      <p className="text-[11px] text-cyan-300/80">ডেভেলপমেন্টের কাজ চলছে</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-cyan-400 font-mono">{stats.processingOrders || 0}</span>
                </div>

                {/* Completed */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                      <FiCheck />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">সম্পন্ন (Completed)</p>
                      <p className="text-[11px] text-emerald-300/80">সফলভাবে ডেলিভারি ও পেইড</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-emerald-400 font-mono">{stats.completedOrders || 0}</span>
                </div>
              </div>

              {/* Fast link */}
              <Link
                href="/admin/orders"
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700/60 transition-colors"
              >
                সব অর্ডার প্রসেস করুন <FiArrowUpRight />
              </Link>
            </div>

            {/* Quick Admin Summary card */}
            <div className="glass rounded-2xl p-5 border border-slate-800/80 space-y-3">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">সিস্টেম সারসংক্ষেপ</p>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">রেজিস্টার্ড গ্রাহক:</span>
                  <span className="text-white font-semibold font-mono">{stats.totalUsers || 0} জন</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">প্রকাশিত ব্লগ আর্টিকেল:</span>
                  <span className="text-white font-semibold font-mono">{stats.totalBlogs || 0} টি</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">হোস্টিং পরিবেশ:</span>
                  <span className="text-emerald-400 font-semibold">Vercel Production</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── 4. Top Selling Services Section ── */}
        <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h3 className="text-xl font-bold text-white tracking-tight">টপ সেলিং ও জনপ্রিয় সার্ভিসসমূহ</h3>
              </div>
              <p className="text-slate-400 text-xs mt-1">
                ক্লায়েন্টদের সর্বাধিক অর্ডার ও অর্জিত রেভিনিউর ভিত্তিতে র্যাঙ্কিং
              </p>
            </div>
            <Link
              href="/admin/services"
              className="btn-outline text-xs px-3.5 py-2 rounded-xl text-purple-300 border-purple-500/30 self-start sm:self-auto"
            >
              সব সার্ভিস ক্যাটালগ →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topServices.map((service, index) => {
              const catColor = CAT_COLORS[service.category] || '#7C3AED';
              return (
                <div
                  key={service._id || index}
                  className="glass rounded-2xl p-4 sm:p-5 border border-slate-800/90 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group bg-slate-900/40 hover:bg-slate-900/70"
                >
                  <div>
                    {/* Top Row: Rank & Category */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                            index === 0
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : index === 1
                              ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40'
                              : index === 2
                              ? 'bg-amber-700/20 text-amber-400 border border-amber-700/40'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          #{index + 1}
                        </span>
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: catColor }}
                        >
                          {service.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                        <FiStar className="fill-amber-400" />
                        <span>{service.rating || 5}.0</span>
                      </div>
                    </div>

                    {/* Service Title */}
                    <h4 className="text-white font-bold text-base leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {service.titleBn || service.title}
                    </h4>
                    <p className="text-slate-400 text-xs mt-1 truncate">{service.title}</p>

                    {/* Sales Metrics */}
                    <div className="grid grid-cols-2 gap-3 mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div>
                        <p className="text-slate-400 text-[11px]">মোট বিক্রয়</p>
                        <p className="text-white font-bold text-sm font-mono mt-0.5">
                          {service.totalOrders} টি অর্ডার
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[11px]">সার্ভিস মূল্য</p>
                        <p className="text-emerald-400 font-bold text-sm font-mono mt-0.5">
                          ৳{service.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Popularity Bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>জনপ্রিয়তা স্কোর</span>
                        <span className="font-semibold text-purple-300">{service.popularityPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${service.popularityPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      মোট আয়: ৳{(service.totalRevenue || 0).toLocaleString()}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      target="_blank"
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      লাইভ দেখুন <FiArrowUpRight />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 5. Recent Orders Table ── */}
        <div className="glass rounded-2xl overflow-hidden border border-slate-800/80">
          <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiShoppingCart className="text-cyan-400" /> সাম্প্রতিক গ্রাহক অর্ডার
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">ওয়েবসাইট থেকে আসা সাম্প্রতিকতম অর্ডার তালিকা</p>
            </div>
            <Link
              href="/admin/orders"
              className="btn-outline text-xs px-3.5 py-1.5 rounded-xl self-start sm:self-auto"
            >
              সব অর্ডার পরিচালনা করুন →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              এখনো কোনো অর্ডার আসেনি।
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <th className="px-5 py-3.5">অর্ডার আইডি ও তারিখ</th>
                    <th className="px-5 py-3.5">ক্লায়েন্ট বিবরণ</th>
                    <th className="px-5 py-3.5">নির্বাচিত সার্ভিস</th>
                    <th className="px-5 py-3.5">মূল্য</th>
                    <th className="px-5 py-3.5">স্ট্যাটাস</th>
                    <th className="px-5 py-3.5 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentOrders.map((order) => {
                    const statusConfig = {
                      pending: { label: 'অপেক্ষমান', cls: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
                      processing: { label: 'প্রক্রিয়াধীন', cls: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
                      completed: { label: 'সম্পন্ন', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                      cancelled: { label: 'বাতিল', cls: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
                    }[order.status] || { label: order.status, cls: 'bg-slate-700 text-slate-300' };

                    const dateStr = order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString('bn-BD', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'N/A';

                    return (
                      <tr
                        key={order._id}
                        className="hover:bg-slate-800/30 transition-colors group"
                      >
                        <td className="px-5 py-4">
                          <p className="font-mono text-xs font-semibold text-purple-300">
                            {order.orderId}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{dateStr}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-white font-semibold text-sm">{order.userName}</p>
                          <p className="text-slate-400 text-xs font-mono">{order.userPhone || order.userEmail}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-slate-200 text-sm font-medium line-clamp-1">
                            {order.serviceTitle}
                          </p>
                          {order.requirements && (
                            <p className="text-[11px] text-slate-500 line-clamp-1 italic mt-0.5">
                              "{order.requirements}"
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-white">
                          ৳{order.price?.toLocaleString()}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${statusConfig.cls}`}
                          >
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            href="/admin/orders"
                            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors inline-block"
                          >
                            ম্যানেজ করুন
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── 6. Admin Fast Toolkit / Shortcuts ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Link
            href="/admin/users"
            className="glass rounded-xl p-4 border border-slate-800/80 hover:border-purple-500/30 transition-all flex items-center gap-3.5 group no-underline"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
              <FiUsers />
            </div>
            <div>
              <p className="text-white font-bold text-sm">ব্যবহারকারী তালিকা</p>
              <p className="text-slate-400 text-xs">নিবন্ধিত ক্লায়েন্ট প্রোফাইল দেখুন</p>
            </div>
          </Link>

          <Link
            href="/admin/blog"
            className="glass rounded-xl p-4 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex items-center gap-3.5 group no-underline"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
              <FiFileText />
            </div>
            <div>
              <p className="text-white font-bold text-sm">ব্লগ পাবলিশ করুন</p>
              <p className="text-slate-400 text-xs">এসইও আর্টিকেল ও আপডেট লিখুন</p>
            </div>
          </Link>

          <Link
            href="/admin/testimonials"
            className="glass rounded-xl p-4 border border-slate-800/80 hover:border-amber-500/30 transition-all flex items-center gap-3.5 group no-underline"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
              <FiStar />
            </div>
            <div>
              <p className="text-white font-bold text-sm">ক্লায়েন্ট মতামত</p>
              <p className="text-slate-400 text-xs">রিভিউ ও রেটিং পর্যবেক্ষণ করুন</p>
            </div>
          </Link>
        </div>

      </div>
    </AdminLayout>
  );
}
