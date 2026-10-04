'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/app/admin/page';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FiGrid,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiCheck,
  FiX,
  FiRefreshCw,
  FiLayers,
  FiTag,
  FiEye,
} from 'react-icons/fi';

const PRESET_ICONS = ['🏫', '🎓', '🕌', '🏥', '🩺', '🛒', '🛍️', '💼', '🚗', '✈️', '🍕', '🏨', '🏋️', '📱', '💻', '🌐', '🏠', '⚡', '🎨', '🚀'];
const PRESET_COLORS = [
  '#7C3AED', '#0891B2', '#15803D', '#BE185D', '#C2410C',
  '#B45309', '#4338CA', '#4F46E5', '#EC4899', '#10B981',
  '#F59E0B', '#3B82F6', '#8B5CF6', '#14B8A6', '#64748B'
];

const EMPTY_FORM = {
  name: '',
  nameBn: '',
  slug: '',
  icon: '🌐',
  color: '#7C3AED',
  description: '',
  descriptionBn: '',
  order: 0,
  isActive: true,
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/categories?all=true');
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error(err);
      toast.error('ক্যাটাগরি লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    axios
      .get('/api/categories?all=true')
      .then((res) => {
        if (!ignore) setCategories(res.data.categories || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleOpenCreate = () => {
    setEditId(null);
    setForm({
      ...EMPTY_FORM,
      order: categories.length + 1,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditId(cat._id);
    setForm({
      name: cat.name,
      nameBn: cat.nameBn,
      slug: cat.slug,
      icon: cat.icon || '🌐',
      color: cat.color || '#7C3AED',
      description: cat.description || '',
      descriptionBn: cat.descriptionBn || '',
      order: cat.order || 0,
      isActive: cat.isActive !== undefined ? cat.isActive : true,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await axios.put(`/api/categories/${editId}`, form);
        toast.success('ক্যাটাগরি আপডেট করা হয়েছে!');
      } else {
        await axios.post('/api/categories', form);
        toast.success('নতুন ক্যাটাগরি তৈরি হয়েছে!');
      }
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'সমস্যা হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, nameBn) => {
    if (!confirm(`"${nameBn}" ক্যাটাগরি মুছে ফেলতে চান?`)) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.success('ক্যাটাগরি মুছে ফেলা হয়েছে!');
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.error || 'মুছতে সমস্যা হয়েছে');
    }
  };

  const handleNameChange = (val) => {
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-');
    setForm((prev) => ({
      ...prev,
      name: val,
      slug: editId ? prev.slug : autoSlug,
    }));
  };

  return (
    <AdminLayout active="/admin/categories">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
              <FiLayers className="text-cyan-400" /> ক্যাটাগরি ম্যানেজমেন্ট
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              সার্ভিস ও পণ্যের জন্য নতুন ক্যাটাগরি তৈরি, কালার নির্ধারণ ও সাজান
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchCategories}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="রিফ্রেশ"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleOpenCreate}
              className="btn-primary text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30"
            >
              <FiPlus size={16} /> নতুন ক্যাটাগরি
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl font-bold">
              <FiTag />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">মোট ক্যাটাগরি</p>
              <p className="text-white text-xl font-bold">{categories.length} টি</p>
            </div>
          </div>

          <div className="glass rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
              <FiCheck />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">সক্রিয় ক্যাটাগরি</p>
              <p className="text-emerald-400 text-xl font-bold">
                {categories.filter((c) => c.isActive).length} টি
              </p>
            </div>
          </div>

          <div className="glass rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-bold">
              <FiGrid />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">ব্যবহারের স্থান</p>
              <p className="text-cyan-300 text-sm font-semibold">হোমপেজ, সার্ভিস ও ফিল্টার</p>
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="glass rounded-2xl overflow-hidden border border-slate-800/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-5 py-3.5">ক্যাটাগরি ও ব্যাজ</th>
                  <th className="px-5 py-3.5">স্লাগ (Slug)</th>
                  <th className="px-5 py-3.5">ক্রমিক (Order)</th>
                  <th className="px-5 py-3.5">স্ট্যাটাস</th>
                  <th className="px-5 py-3.5 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-5 py-4">
                        <div className="h-6 bg-slate-800 rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-500">
                      কোনো ক্যাটাগরি নেই। &quot;নতুন ক্যাটাগরি&quot; বাটনে ক্লিক করে যোগ করুন।
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                            style={{ backgroundColor: cat.color || '#7C3AED' }}
                          >
                            <span>{cat.icon || '🌐'}</span>
                            <span>{cat.nameBn}</span>
                          </span>
                          <span className="text-slate-400 text-xs font-medium">({cat.name})</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                        {cat.slug}
                      </td>
                      <td className="px-5 py-3.5 text-slate-300 font-semibold">
                        {cat.order || 0}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            cat.isActive
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
                          }`}
                        >
                          {cat.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(cat)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white transition-colors"
                            title="সম্পাদনা"
                          >
                            <FiEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id, cat.nameBn)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                            title="মুছে ফেলুন"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col border border-purple-500/30 shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/70">
                <h3 className="text-white font-bold text-base flex items-center gap-2">
                  <FiLayers className="text-cyan-400" />
                  {editId ? 'ক্যাটাগরি সম্পাদনা' : 'নতুন ক্যাটাগরি তৈরি'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
                {/* Live Badge Preview */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-xs">লাইভ প্রিভিউ:</span>
                  <span
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all"
                    style={{ backgroundColor: form.color || '#7C3AED' }}
                  >
                    <span className="text-sm">{form.icon || '🌐'}</span>
                    <span>{form.nameBn || form.name || 'ক্যাটাগরি প্রিভিউ'}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 text-xs font-semibold mb-1 block">
                      ক্যাটাগরি নাম (English) *
                    </label>
                    <input
                      type="text"
                      className="input-dark text-sm w-full"
                      value={form.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Real Estate"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs font-semibold mb-1 block">
                      ক্যাটাগরি নাম (বাংলা) *
                    </label>
                    <input
                      type="text"
                      className="input-dark text-sm w-full"
                      value={form.nameBn}
                      onChange={(e) => setForm({ ...form, nameBn: e.target.value })}
                      placeholder="রিয়েল এস্টেট"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 text-xs font-semibold mb-1 block">
                      স্লাগ (URL Slug) *
                    </label>
                    <input
                      type="text"
                      className="input-dark text-sm w-full font-mono"
                      value={form.slug}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                        })
                      }
                      placeholder="real-estate"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs font-semibold mb-1 block">
                      ক্রমিক নম্বর (Display Order)
                    </label>
                    <input
                      type="number"
                      className="input-dark text-sm w-full"
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    />
                  </div>
                </div>

                {/* Icon Selection */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-300 text-xs font-semibold">
                      আইকন / ইমোজি:
                    </label>
                    <span className="text-lg bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {form.icon}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-slate-950/60 rounded-xl border border-slate-800 max-h-24 overflow-y-auto">
                    {PRESET_ICONS.map((ic) => (
                      <button
                        key={ic}
                        type="button"
                        onClick={() => setForm({ ...form, icon: ic })}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all ${
                          form.icon === ic
                            ? 'bg-purple-600 scale-110 shadow-md shadow-purple-600/50'
                            : 'bg-slate-900 hover:bg-slate-800'
                        }`}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-300 text-xs font-semibold">
                      থিম কালার:
                    </label>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: form.color }}
                      />
                      <span className="font-mono text-xs text-slate-400">{form.color}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                    {PRESET_COLORS.map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setForm({ ...form, color: col })}
                        className={`w-7 h-7 rounded-lg transition-transform ${
                          form.color === col
                            ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950'
                            : 'hover:scale-110 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: col }}
                      />
                    ))}
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-none"
                      title="কাস্টম কালার বাছুন"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 text-xs font-semibold mb-1 block">
                      বিবরণ (English)
                    </label>
                    <textarea
                      rows={2}
                      className="input-dark text-xs w-full"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Websites for property & housing"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs font-semibold mb-1 block">
                      বিবরণ (বাংলা)
                    </label>
                    <textarea
                      rows={2}
                      className="input-dark text-xs w-full"
                      value={form.descriptionBn}
                      onChange={(e) => setForm({ ...form, descriptionBn: e.target.value })}
                      placeholder="জমি, বাড়ি ও ফ্ল্যাট কেনা-বেচার ওয়েবসাইট"
                    />
                  </div>
                </div>

                {/* Active Switch */}
                <label className="flex items-center gap-2.5 text-slate-300 text-sm cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="accent-purple-500 w-4 h-4"
                  />
                  <span>সক্রিয় (Active) রাখুন — সাইটে প্রদর্শন করা হবে</span>
                </label>

                {/* Modal Actions */}
                <div className="flex gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary text-sm flex-1 flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <span className="spinner w-4 h-4 border-2" />
                    ) : (
                      <>
                        <FiCheck /> {editId ? 'আপডেট করুন' : 'তৈরি করুন'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-outline text-sm px-5"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
