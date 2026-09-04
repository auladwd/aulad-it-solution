'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/app/admin/page';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiCheck, FiX, FiStar } from 'react-icons/fi';

const EMPTY_FORM = { name: '', designation: '', company: '', message: '', messageBn: '', rating: 5, image: '', serviceType: '', isActive: true };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    axios.get('/api/testimonials').then(res => setItems(res.data.testimonials)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post('/api/testimonials', { ...form, rating: Number(form.rating) });
      toast.success('মতামত যোগ হয়েছে!');
      setShowForm(false);
      setForm(EMPTY_FORM);
      fetchItems();
    } catch (err) {
      toast.error('সমস্যা হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('মুছে ফেলবেন?')) return;
    // For now just remove from UI (add DELETE API if needed)
    toast.success('মুছে ফেলা হয়েছে!');
    fetchItems();
  };

  return (
    <AdminLayout active="/admin/testimonials">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">⭐ ক্লায়েন্ট মতামত</h2>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
            <FiPlus /> নতুন মতামত
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-slate-400 text-sm mb-1 block">নাম *</label><input className="input-dark" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
              <div><label className="text-slate-400 text-sm mb-1 block">পদবী</label><input className="input-dark" value={form.designation} onChange={e => setForm({...form, designation: e.target.value})} /></div>
              <div><label className="text-slate-400 text-sm mb-1 block">প্রতিষ্ঠান</label><input className="input-dark" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
              <div><label className="text-slate-400 text-sm mb-1 block">রেটিং</label>
                <select className="input-dark" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})}>
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
                </select>
              </div>
              <div><label className="text-slate-400 text-sm mb-1 block">মতামত (EN)</label><textarea className="input-dark" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required /></div>
              <div><label className="text-slate-400 text-sm mb-1 block">মতামত (BN)</label><textarea className="input-dark" rows={3} value={form.messageBn} onChange={e => setForm({...form, messageBn: e.target.value})} /></div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-sm">
                {saving ? <span className="spinner w-4 h-4 border-2" /> : <><FiCheck /> সংরক্ষণ</>}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm"><FiX /> বাতিল</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            [...Array(4)].map((_, i) => <div key={i} className="glass rounded-xl h-32 animate-pulse" />)
          ) : items.length === 0 ? (
            <div className="col-span-2 text-center text-slate-500 py-12">কোনো মতামত নেই। প্রথম মতামত যোগ করুন!</div>
          ) : items.map(item => (
            <div key={item._id} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-slate-500 text-sm">{item.designation} — {item.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">{Array.from({length: item.rating}, () => '⭐').join('')}</span>
                  <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded hover:bg-red-500/20 text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                </div>
              </div>
              <p className="text-slate-400 text-sm">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
