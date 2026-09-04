'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { format } from 'date-fns';
import { FiPackage, FiUser, FiClock, FiCheck, FiX, FiLoader } from 'react-icons/fi';

const STATUS_CONFIG = {
  pending: { label: 'অপেক্ষমান', icon: <FiClock />, cls: 'status-pending' },
  processing: { label: 'প্রক্রিয়াধীন', icon: <FiLoader />, cls: 'status-processing' },
  completed: { label: 'সম্পন্ন', icon: <FiCheck />, cls: 'status-completed' },
  cancelled: { label: 'বাতিল', icon: <FiX />, cls: 'status-cancelled' },
};

export default function DashboardPage() {
  const { user, dbUser, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/orders?email=${user.email}`)
        .then(res => setOrders(res.data.orders))
        .finally(() => setOrdersLoading(false));
    }
  }, [user]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center"><div className="spinner" /></div>;
  }

  return (
    <main>
      <Navbar />
      <div className="pt-28 section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="glass rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-5">
            {user.photoURL ? (
              <Image src={user.photoURL} alt={user.displayName} width={72} height={72} className="rounded-full border-2 border-purple-500" />
            ) : (
              <div className="w-18 h-18 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
                {user.displayName?.[0]}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-black text-white">{t.dashboard.title}</h1>
              <p className="text-slate-400">{user.displayName} • {user.email}</p>
              <span className="badge text-xs mt-1">{dbUser?.role === 'admin' ? '👑 Admin' : '👤 User'}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'orders', label: t.dashboard.orders, icon: <FiPackage /> },
              { id: 'profile', label: t.dashboard.profile, icon: <FiUser /> },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              {ordersLoading ? (
                <div className="flex justify-center py-12"><div className="spinner" /></div>
              ) : orders.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <p className="text-5xl mb-4">📦</p>
                  <h3 className="text-white text-xl font-semibold mb-2">{t.dashboard.noOrders}</h3>
                  <p className="text-slate-500 mb-6">আমাদের সার্ভিস অর্ডার করুন।</p>
                  <Link href="/services" className="btn-primary">সার্ভিস দেখুন</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => {
                    const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                    return (
                      <div key={order._id} className="glass rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-white font-semibold">{order.serviceTitle}</h3>
                            <span className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${statusConf.cls}`}>
                              {statusConf.icon} {statusConf.label}
                            </span>
                          </div>
                          <p className="text-slate-500 text-sm">অর্ডার ID: {order.orderId}</p>
                          <p className="text-slate-600 text-xs mt-1">
                            {format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black gradient-text">৳{order.price?.toLocaleString()}</p>
                          <p className={`text-xs mt-1 ${order.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {order.paymentStatus === 'paid' ? '✓ পেইড' : '⏳ অপেক্ষমান'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="glass rounded-2xl p-8 max-w-lg">
              <h2 className="text-white font-bold text-xl mb-6">প্রোফাইল তথ্য</h2>
              <div className="space-y-4">
                {[
                  { label: 'নাম', value: user.displayName },
                  { label: 'ইমেইল', value: user.email },
                  { label: 'মোট অর্ডার', value: `${orders.length} টি` },
                  { label: 'একাউন্ট ধরন', value: dbUser?.role === 'admin' ? 'Admin' : 'User' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-slate-700">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
