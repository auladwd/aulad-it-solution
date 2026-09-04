'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/app/admin/page';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { FiEdit, FiCheck, FiClock, FiLoader, FiX } from 'react-icons/fi';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'অপেক্ষমান', cls: 'status-pending' },
  { value: 'processing', label: 'প্রক্রিয়াধীন', cls: 'status-processing' },
  { value: 'completed', label: 'সম্পন্ন', cls: 'status-completed' },
  { value: 'cancelled', label: 'বাতিল', cls: 'status-cancelled' },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await axios.get('/api/orders');
    setOrders(res.data.orders);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status, adminNote = '', deliveryUrl = '') => {
    setUpdating(id);
    try {
      await axios.put(`/api/orders/${id}`, { status, adminNote, deliveryUrl });
      toast.success('স্ট্যাটাস আপডেট হয়েছে!');
      fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      toast.error('আপডেট ব্যর্থ হয়েছে');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <AdminLayout active="/admin/orders">
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white">🛒 অর্ডার ম্যানেজমেন্ট</h2>

        {loading ? (
          <div className="flex justify-center py-12"><div className="spinner" /></div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left text-slate-500 text-xs px-5 py-3">অর্ডার</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">ক্লায়েন্ট</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">মূল্য</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">তারিখ</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">স্ট্যাটাস</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan={6} className="text-center text-slate-500 py-12">কোনো অর্ডার নেই</td></tr>
                  ) : orders.map(order => (
                    <tr key={order._id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-3">
                        <p className="text-white text-sm font-medium">{order.serviceTitle}</p>
                        <p className="text-slate-600 text-xs">{order.orderId}</p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-slate-300 text-sm">{order.userName}</p>
                        <p className="text-slate-600 text-xs">{order.userEmail}</p>
                        {order.userPhone && <p className="text-slate-600 text-xs">{order.userPhone}</p>}
                      </td>
                      <td className="px-5 py-3 text-white font-semibold">৳{order.price?.toLocaleString()}</td>
                      <td className="px-5 py-3 text-slate-400 text-xs">
                        {format(new Date(order.createdAt), 'dd/MM/yy')}
                      </td>
                      <td className="px-5 py-3">
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order._id, e.target.value)}
                          disabled={updating === order._id}
                          className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none"
                        >
                          {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </td>
                      <td className="px-5 py-3">
                        <button onClick={() => setSelectedOrder(order)}
                          className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-400 transition-colors">
                          <FiEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass rounded-2xl p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold text-lg">অর্ডার বিবরণ</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white"><FiX /></button>
              </div>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">সার্ভিস</span>
                  <span className="text-white">{selectedOrder.serviceTitle}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">ক্লায়েন্ট</span>
                  <span className="text-white">{selectedOrder.userName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">মূল্য</span>
                  <span className="gradient-text font-bold">৳{selectedOrder.price?.toLocaleString()}</span>
                </div>
                {selectedOrder.requirements && (
                  <div className="text-sm">
                    <span className="text-slate-400 block mb-1">প্রয়োজনীয়তা</span>
                    <p className="text-slate-300 glass rounded-lg p-3 text-xs">{selectedOrder.requirements}</p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Delivery URL</label>
                  <input className="input-dark text-sm" defaultValue={selectedOrder.deliveryUrl} id="deliveryUrl" placeholder="https://your-delivery-link.com" />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Admin Note</label>
                  <textarea className="input-dark text-sm" rows={3} defaultValue={selectedOrder.adminNote} id="adminNote" placeholder="ক্লায়েন্টের জন্য নোট..." />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => updateStatus(selectedOrder._id, 'completed',
                    document.getElementById('adminNote').value,
                    document.getElementById('deliveryUrl').value)}
                  className="btn-primary text-sm flex-1 justify-center">
                  <FiCheck /> সম্পন্ন চিহ্নিত করুন
                </button>
                <button onClick={() => setSelectedOrder(null)} className="btn-outline text-sm"><FiX /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
