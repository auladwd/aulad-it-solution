'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/app/admin/page';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiEye } from 'react-icons/fi';
import { format } from 'date-fns';

const EMPTY_FORM = {
  title: '', titleBn: '', slug: '', excerpt: '', excerptBn: '',
  content: '', contentBn: '', thumbnail: '', category: 'general',
  tags: '', author: 'Aulad IT Solution', isPublished: false,
  metaTitle: '', metaDescription: '',
};

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editSlug, setEditSlug] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchBlogs = () => {
    setLoading(true);
    axios.get('/api/blog').then(res => setBlogs(res.data.blogs)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [] };
      if (editSlug) {
        await axios.put(`/api/blog/${editSlug}`, payload);
        toast.success('ব্লগ আপডেট হয়েছে!');
      } else {
        await axios.post('/api/blog', payload);
        toast.success('ব্লগ প্রকাশিত হয়েছে!');
      }
      setShowForm(false);
      setForm(EMPTY_FORM);
      setEditSlug(null);
      fetchBlogs();
    } catch (err) {
      toast.error('সমস্যা হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title, titleBn: blog.titleBn || '',
      slug: blog.slug, excerpt: blog.excerpt || '', excerptBn: blog.excerptBn || '',
      content: blog.content || '', contentBn: blog.contentBn || '',
      thumbnail: blog.thumbnail || '', category: blog.category || 'general',
      tags: blog.tags?.join(', ') || '', author: blog.author,
      isPublished: blog.isPublished, metaTitle: blog.metaTitle || '', metaDescription: blog.metaDescription || '',
    });
    setEditSlug(blog.slug);
    setShowForm(true);
  };

  const handleDelete = async (slug) => {
    if (!confirm('মুছে ফেলবেন?')) return;
    await axios.delete(`/api/blog/${slug}`);
    toast.success('মুছে ফেলা হয়েছে!');
    fetchBlogs();
  };

  return (
    <AdminLayout active="/admin/blog">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">📝 ব্লগ ম্যানেজমেন্ট</h2>
          <button onClick={() => { setShowForm(!showForm); setEditSlug(null); setForm(EMPTY_FORM); }} className="btn-primary text-sm">
            <FiPlus /> নতুন পোস্ট
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-bold text-lg">{editSlug ? 'পোস্ট সম্পাদনা' : 'নতুন পোস্ট'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Title (EN) *</label>
                <input className="input-dark" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">শিরোনাম (BN)</label>
                <input className="input-dark" value={form.titleBn} onChange={e => setForm({...form, titleBn: e.target.value})} />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Slug *</label>
                <input className="input-dark" value={form.slug} onChange={e => setForm({...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} required />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Thumbnail URL</label>
                <input className="input-dark" value={form.thumbnail} onChange={e => setForm({...form, thumbnail: e.target.value})} placeholder="https://..." />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">ক্যাটাগরি</label>
                <input className="input-dark" value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="web-tips" />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Tags (comma separated)</label>
                <input className="input-dark" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="nextjs, mongodb, tips" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Excerpt (EN)</label>
                <textarea className="input-dark" rows={2} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Excerpt (BN)</label>
                <textarea className="input-dark" rows={2} value={form.excerptBn} onChange={e => setForm({...form, excerptBn: e.target.value})} />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Content (EN) *</label>
                <textarea className="input-dark" rows={6} value={form.content} onChange={e => setForm({...form, content: e.target.value})} required />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Content (BN)</label>
                <textarea className="input-dark" rows={6} value={form.contentBn} onChange={e => setForm({...form, contentBn: e.target.value})} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" checked={form.isPublished} onChange={e => setForm({...form, isPublished: e.target.checked})} className="accent-purple-500" />
                প্রকাশ করুন
              </label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-sm">
                {saving ? <span className="spinner w-4 h-4 border-2" /> : <><FiCheck /> সংরক্ষণ</>}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm"><FiX /> বাতিল</button>
            </div>
          </form>
        )}

        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left text-slate-500 text-xs px-5 py-3">শিরোনাম</th>
                  <th className="text-left text-slate-500 text-xs px-5 py-3">স্ট্যাটাস</th>
                  <th className="text-left text-slate-500 text-xs px-5 py-3">ভিউ</th>
                  <th className="text-left text-slate-500 text-xs px-5 py-3">তারিখ</th>
                  <th className="text-left text-slate-500 text-xs px-5 py-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-8"><div className="spinner mx-auto" /></td></tr>
                ) : blogs.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-slate-500 py-12">কোনো পোস্ট নেই</td></tr>
                ) : blogs.map(blog => (
                  <tr key={blog._id} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="px-5 py-3">
                      <p className="text-white text-sm font-medium line-clamp-1">{blog.title}</p>
                      <p className="text-slate-600 text-xs">{blog.slug}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${blog.isPublished ? 'status-completed' : 'status-pending'}`}>
                        {blog.isPublished ? 'প্রকাশিত' : 'খসড়া'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-sm">{blog.views || 0}</td>
                    <td className="px-5 py-3 text-slate-500 text-xs">{format(new Date(blog.createdAt), 'dd/MM/yy')}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(blog)} className="p-1.5 rounded-lg hover:bg-purple-500/20 text-purple-400 transition-colors"><FiEdit size={14} /></button>
                        <button onClick={() => handleDelete(blog.slug)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
