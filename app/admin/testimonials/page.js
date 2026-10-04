'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/app/admin/page';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiCheck, FiX, FiStar, FiUser } from 'react-icons/fi';
import ImageUpload from '@/components/shared/ImageUpload';

const EMPTY_FORM = {
  name: '',
  designation: '',
  company: '',
  message: '',
  messageBn: '',
  rating: 5,
  image: '',
  serviceType: '',
  isActive: true,
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    axios
      .get('/api/testimonials')
      .then((res) => setItems(res.data.testimonials || []))
      .catch((err) => {
        console.error(err);
        toast.error('মতামত লোড করতে ব্যর্থ হয়েছে');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let ignore = false;
    axios
      .get('/api/testimonials')
      .then((res) => {
        if (!ignore) setItems(res.data.testimonials || []);
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
    if (!confirm('এই মতামতটি মুছে ফেলবেন?')) return;
    try {
      await axios.delete(`/api/testimonials/${id}`);
      toast.success('মুছে ফেলা হয়েছে!');
      fetchItems();
    } catch (err) {
      toast.error('মুছতে সমস্যা হয়েছে');
    }
  };

  return (
    <AdminLayout active="/admin/testimonials">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">⭐ ক্লায়েন্ট মতামত</h2>
            <p className="text-slate-400 text-sm mt-1">ক্লায়েন্টের রিভিউ এবং ছবি পরিচালনা করুন</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setForm(EMPTY_FORM);
            }}
            className="btn-primary text-sm flex items-center gap-1.5"
          >
            <FiPlus /> নতুন মতামত
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-5">
            <h3 className="text-white font-bold text-lg">নতুন ক্লায়েন্ট রিভিউ যোগ করুন</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">নাম *</label>
                <input
                  className="input-dark"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="রহিম উদ্দিন"
                  required
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">পদবী</label>
                <input
                  className="input-dark"
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  placeholder="প্রধান শিক্ষক"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">প্রতিষ্ঠান</label>
                <input
                  className="input-dark"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="আদর্শ উচ্চ বিদ্যালয়"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">রেটিং</label>
                <select
                  className="input-dark"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} ⭐
                    </option>
                  ))}
                </select>
              </div>

              {/* Client Avatar Upload via Cloudinary */}
              <div className="md:col-span-2">
                <ImageUpload
                  label="ক্লায়েন্টের ছবি (Cloudinary ও MongoDB)"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                  folder="aulad-it-solution/testimonials"
                  aspectRatio="square"
                  helpText="ক্লায়েন্টের প্রোফাইল ছবি আপলোড করুন — স্বয়ংক্রিয়ভাবে অপটিমাইজ হবে"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm mb-1 block">মতামত (EN) *</label>
                <textarea
                  className="input-dark"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Great service! Highly satisfied."
                  required
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">মতামত (BN)</label>
                <textarea
                  className="input-dark"
                  rows={3}
                  value={form.messageBn}
                  onChange={(e) => setForm({ ...form, messageBn: e.target.value })}
                  placeholder="খুব চমৎকার সার্ভিস! দ্রুত ডেলিভারি পেয়েছি।"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-sm">
                {saving ? (
                  <span className="spinner w-4 h-4 border-2" />
                ) : (
                  <>
                    <FiCheck /> সংরক্ষণ
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-outline text-sm"
              >
                <FiX /> বাতিল
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            [...Array(4)].map((_, i) => <div key={i} className="glass rounded-xl h-36 animate-pulse" />)
          ) : items.length === 0 ? (
            <div className="col-span-2 text-center text-slate-500 py-12">
              কোনো মতামত নেই। প্রথম মতামত যোগ করুন!
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="glass rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-purple-500/40 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-base shrink-0">
                          {item.name?.[0] || <FiUser />}
                        </div>
                      )}
                      <div>
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-slate-400 text-xs">
                          {item.designation} {item.company ? `— ${item.company}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 text-sm">
                        {Array.from({ length: item.rating }, () => '⭐').join('')}
                      </span>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm italic">&ldquo;{item.message}&rdquo;</p>
                  {item.messageBn && (
                    <p className="text-slate-400 text-xs mt-1.5 italic">({item.messageBn})</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
