'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/app/admin/page';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiExternalLink } from 'react-icons/fi';

const CATEGORIES = ['school', 'college', 'madrasa', 'clinic', 'hospital', 'grocery', 'ecommerce', 'portfolio', 'other'];

const EMPTY_FORM = {
  title: '', titleBn: '', slug: '', category: 'school', description: '', descriptionBn: '',
  features: '', featuresBn: '', price: '', originalPrice: '', thumbnail: '',
  techStack: '', demoUrl: '', deliveryDays: 7, isActive: true, isFeatured: false,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    const res = await axios.get('/api/services');
    setServices(res.data.services);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        deliveryDays: Number(form.deliveryDays),
        features: form.features ? form.features.split('\n').filter(Boolean) : [],
        featuresBn: form.featuresBn ? form.featuresBn.split('\n').filter(Boolean) : [],
        techStack: form.techStack ? form.techStack.split(',').map(s => s.trim()).filter(Boolean) : [],
      };

      if (editId) {
        await axios.put(`/api/services/${editId}`, payload);
        toast.success('সার্ভিস আপডেট হয়েছে!');
      } else {
        await axios.post('/api/services', payload);
        toast.success('নতুন সার্ভিস যোগ হয়েছে!');
      }
      setShowForm(false);
      setForm(EMPTY_FORM);
      setEditId(null);
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.error || 'সমস্যা হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service) => {
    setForm({
      title: service.title, titleBn: service.titleBn || '',
      slug: service.slug, category: service.category,
      description: service.description, descriptionBn: service.descriptionBn || '',
      features: service.features?.join('\n') || '',
      featuresBn: service.featuresBn?.join('\n') || '',
      price: service.price, originalPrice: service.originalPrice || '',
      thumbnail: service.thumbnail || '', techStack: service.techStack?.join(', ') || '',
      demoUrl: service.demoUrl || '', deliveryDays: service.deliveryDays,
      isActive: service.isActive, isFeatured: service.isFeatured,
    });
    setEditId(service._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('এই সার্ভিস মুছে ফেলবেন?')) return;
    await axios.delete(`/api/services/${id}`);
    toast.success('মুছে ফেলা হয়েছে!');
    fetchServices();
  };

  return (
    <AdminLayout active="/admin/services">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">📦 সার্ভিস ম্যানেজমেন্ট</h2>
          <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(EMPTY_FORM); }}
            className="btn-primary text-sm">
            <FiPlus /> নতুন সার্ভিস
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-bold text-lg">{editId ? 'সার্ভিস সম্পাদনা' : 'নতুন সার্ভিস যোগ'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Title (English) *</label>
                <input className="input-dark" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="School Website" required />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">শিরোনাম (বাংলা) *</label>
                <input className="input-dark" value={form.titleBn} onChange={e => setForm({...form, titleBn: e.target.value})} placeholder="স্কুল ওয়েবসাইট" required />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Slug (URL) *</label>
                <input className="input-dark" value={form.slug} onChange={e => setForm({...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} placeholder="school-website" required />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Category *</label>
                <select className="input-dark" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">মূল্য (৳) *</label>
                <input type="number" className="input-dark" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="1499" required />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">আসল মূল্য (৳)</label>
                <input type="number" className="input-dark" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} placeholder="2999" />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">ডেলিভারি (দিন)</label>
                <input type="number" className="input-dark" value={form.deliveryDays} onChange={e => setForm({...form, deliveryDays: e.target.value})} />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">থাম্বনেইল URL</label>
                <input className="input-dark" value={form.thumbnail} onChange={e => setForm({...form, thumbnail: e.target.value})} placeholder="https://..." />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Demo URL</label>
                <input className="input-dark" value={form.demoUrl} onChange={e => setForm({...form, demoUrl: e.target.value})} placeholder="https://demo.vercel.app" />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Tech Stack (comma separated)</label>
                <input className="input-dark" value={form.techStack} onChange={e => setForm({...form, techStack: e.target.value})} placeholder="Next.js, MongoDB, Tailwind" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">বিবরণ (EN)</label>
                <textarea className="input-dark" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">বিবরণ (BN)</label>
                <textarea className="input-dark" rows={3} value={form.descriptionBn} onChange={e => setForm({...form, descriptionBn: e.target.value})} />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Features (EN, প্রতি লাইনে একটি)</label>
                <textarea className="input-dark" rows={4} value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="Responsive Design&#10;Admin Panel&#10;SEO Optimized" />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Features (BN, প্রতি লাইনে একটি)</label>
                <textarea className="input-dark" rows={4} value={form.featuresBn} onChange={e => setForm({...form, featuresBn: e.target.value})} placeholder="রেসপনসিভ ডিজাইন&#10;অ্যাডমিন প্যানেল" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="accent-purple-500" />
                Active
              </label>
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} className="accent-yellow-500" />
                Featured
              </label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? <span className="spinner w-5 h-5 border-2" /> : <><FiCheck /> সংরক্ষণ</>}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">
                <FiX /> বাতিল
              </button>
            </div>
          </form>
        )}

        {/* Services Table */}
        {loading ? (
          <div className="flex justify-center py-12"><div className="spinner" /></div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left text-slate-500 text-xs px-5 py-3">সার্ভিস</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">ক্যাটাগরি</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">মূল্য</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">স্ট্যাটাস</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr><td colSpan={5} className="text-center text-slate-500 py-12">কোনো সার্ভিস নেই। প্রথম সার্ভিস যোগ করুন!</td></tr>
                  ) : services.map(service => (
                    <tr key={service._id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-3">
                        <p className="text-white font-medium text-sm">{service.title}</p>
                        <p className="text-slate-600 text-xs">{service.slug}</p>
                      </td>
                      <td className="px-5 py-3"><span className="badge text-xs">{service.category}</span></td>
                      <td className="px-5 py-3 text-white font-semibold">৳{service.price?.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${service.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-xs text-slate-400">{service.isActive ? 'Active' : 'Inactive'}</span>
                          {service.isFeatured && <span className="text-xs text-yellow-400">⭐</span>}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(service)} className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-400 transition-colors"><FiEdit /></button>
                          {service.demoUrl && (
                            <a href={service.demoUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-cyan-500/20 text-cyan-400 transition-colors"><FiExternalLink /></a>
                          )}
                          <button onClick={() => handleDelete(service._id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
