'use client';
import { useState, useEffect, useRef } from 'react';
import { AdminLayout } from '@/app/admin/page';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FiImage,
  FiUploadCloud,
  FiTrash2,
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiSearch,
  FiEye,
  FiX,
  FiMaximize2,
  FiZap,
  FiHardDrive,
  FiRefreshCw,
  FiAlertCircle,
} from 'react-icons/fi';
import { format } from 'date-fns';

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/media?limit=100');
      setMediaList(res.data.media || []);
    } catch (err) {
      console.error('Error fetching media:', err);
      toast.error('মিডিয়া লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    axios
      .get('/api/media?limit=100')
      .then((res) => {
        if (!ignore) setMediaList(res.data.media || []);
      })
      .catch((err) => {
        console.error('Error fetching media:', err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    let successCount = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} কোনো ইমেজ ফাইল নয়!`);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'aulad-it-solution');
      formData.append('title', file.name.replace(/\.[^/.]+$/, ''));

      try {
        await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        successCount++;
      } catch (err) {
        console.error('Upload error for', file.name, err);
        const errMsg = err.response?.data?.error || `${file.name} আপলোড ব্যর্থ হয়েছে!`;
        toast.error(errMsg);
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} টি ছবি সফলভাবে অপটিমাইজ ও ক্লাউডিনারিতে আপলোড হয়েছে!`);
      fetchMedia();
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`"${title || 'এই ছবিটি'}" মুছে ফেলতে চান? এটি ক্লাউডিনারি ও ডাটাবেজ দুটো থেকেই মুছে যাবে।`)) return;

    setDeletingId(id);
    try {
      await axios.delete(`/api/media/${id}`);
      toast.success('ছবি মুছে ফেলা হয়েছে!');
      setMediaList((prev) => prev.filter((m) => m._id !== id));
      if (selectedImage?._id === id) setSelectedImage(null);
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('ছবি মুছতে সমস্যা হয়েছে');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('ছবির লিংক কপি করা হয়েছে!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const filteredMedia = mediaList.filter((m) =>
    search ? m.title?.toLowerCase().includes(search.toLowerCase()) || m.format?.includes(search.toLowerCase()) : true
  );

  return (
    <AdminLayout active="/admin/media">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
              <FiImage className="text-cyan-400" /> মিডিয়া গ্যালারি ও ক্লাউডিনারি
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              স্বয়ংক্রিয় অপটিমাইজেশন, WebP রূপান্তর ও MongoDB Atlas এ সিঙ্ক
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchMedia}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="রিফ্রেশ"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="btn-primary text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30"
            >
              {uploading ? (
                <>
                  <span className="spinner w-4 h-4 border-2" /> আপলোড হচ্ছে...
                </>
              ) : (
                <>
                  <FiUploadCloud size={16} /> ছবি আপলোড করুন
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hidden Multi-file input */}
        <input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
          accept="image/*"
          className="hidden"
        />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl font-bold">
              <FiImage />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">মোট সংরক্ষিত ছবি</p>
              <p className="text-white text-xl font-bold">{mediaList.length} টি</p>
            </div>
          </div>

          <div className="glass rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-bold">
              <FiZap />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">ক্লাউডিনারি CDN অপটিমাইজেশন</p>
              <p className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                <FiCheck /> Auto WebP / AVIF
              </p>
            </div>
          </div>

          <div className="glass rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
              <FiHardDrive />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">ডাটাবেজ স্ট্যাটাস</p>
              <p className="text-white text-sm font-bold">MongoDB Atlas এ লিঙ্কযুক্ত</p>
            </div>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files) handleFileUpload(e.dataTransfer.files);
          }}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700/80 hover:border-purple-500/80 bg-slate-900/40 hover:bg-purple-950/10 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center">
              <FiUploadCloud className="text-cyan-400 text-2xl" />
            </div>
            <div>
              <p className="text-white font-semibold text-base">
                এক বা একাধিক ছবি এখানে টানুন অথবা <span className="text-cyan-400 underline">ব্রাউজ করুন</span>
              </p>
              <p className="text-slate-400 text-xs mt-1">
                সর্বোচ্চ ১০MB সাইজ • সরাসরি ক্লাউডিনারিতে আপলোড হবে এবং স্বয়ংক্রিয়ভাবে কম্প্রেসড ও অপটিমাইজ হবে
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ফাইলের নাম দিয়ে খুঁজুন..."
              className="input-dark !pl-10 !py-2 text-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="text-xs text-slate-500 self-end sm:self-center">
            প্রদর্শন: {filteredMedia.length} / {mediaList.length} টি ছবি
          </span>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="glass rounded-xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center text-slate-500">
            <FiImage className="mx-auto text-5xl mb-3 opacity-40 text-purple-400" />
            <h3 className="text-white font-semibold text-lg mb-1">কোনো ছবি পাওয়া যায়নি</h3>
            <p className="text-sm">নতুন ছবি আপলোড করতে উপরের বাটনে ক্লিক করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item._id}
                className="group relative glass rounded-xl overflow-hidden border border-slate-800/80 hover:border-purple-500/50 transition-all flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <Image
                    src={item.thumbnailUrl || item.optimizedUrl || item.secureUrl}
                    alt={item.title || 'media'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Format & Size Badge */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-black/70 text-cyan-300 backdrop-blur-sm">
                      {item.format || 'img'}
                    </span>
                    {item.bytes && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-black/70 text-slate-300 backdrop-blur-sm">
                        {formatBytes(item.bytes)}
                      </span>
                    )}
                  </div>

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedImage(item)}
                      title="বড় করে দেখুন"
                      className="p-2 rounded-lg bg-slate-900/90 text-white hover:bg-cyan-500 transition-colors"
                    >
                      <FiEye size={15} />
                    </button>
                    <button
                      onClick={() => handleCopyUrl(item.optimizedUrl || item.secureUrl, item._id)}
                      title="লিংক কপি করুন"
                      className="p-2 rounded-lg bg-slate-900/90 text-white hover:bg-purple-500 transition-colors"
                    >
                      {copiedId === item._id ? (
                        <FiCheck size={15} className="text-emerald-400" />
                      ) : (
                        <FiCopy size={15} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item.title)}
                      disabled={deletingId === item._id}
                      title="মুছে ফেলুন"
                      className="p-2 rounded-lg bg-slate-900/90 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-2.5 flex-1 flex flex-col justify-between bg-slate-900/40">
                  <p className="text-white text-xs font-semibold truncate" title={item.title}>
                    {item.title || 'Untitled'}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span>
                      {item.width && item.height ? `${item.width}×${item.height}` : 'Optimized'}
                    </span>
                    <span>
                      {item.createdAt ? format(new Date(item.createdAt), 'dd MMM') : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Detail Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-purple-500/30 shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/70">
                <div className="flex items-center gap-2">
                  <FiImage className="text-purple-400" />
                  <h3 className="text-white font-bold text-sm truncate max-w-md">
                    {selectedImage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Preview Area */}
              <div className="relative flex-1 min-h-[300px] max-h-[55vh] bg-slate-950 flex items-center justify-center p-4">
                <Image
                  src={selectedImage.optimizedUrl || selectedImage.secureUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Info & Action Bar */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/90 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block">রেজোলিউশন</span>
                    <span className="text-white font-mono font-bold">
                      {selectedImage.width} × {selectedImage.height} px
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block">সাইজ</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {formatBytes(selectedImage.bytes)}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block">ফরম্যাট</span>
                    <span className="text-cyan-400 font-mono font-bold uppercase">
                      {selectedImage.format} (WebP Auto)
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block">ক্লাউডিনারি ফোল্ডার</span>
                    <span className="text-purple-400 font-mono font-bold">
                      {selectedImage.folder || 'aulad-it-solution'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedImage.optimizedUrl || selectedImage.secureUrl}
                    className="input-dark font-mono text-xs flex-1 !py-2 bg-slate-950"
                  />
                  <button
                    onClick={() =>
                      handleCopyUrl(
                        selectedImage.optimizedUrl || selectedImage.secureUrl,
                        selectedImage._id
                      )
                    }
                    className="btn-primary text-xs !py-2 px-4 flex items-center gap-1.5 shrink-0"
                  >
                    {copiedId === selectedImage._id ? <FiCheck /> : <FiCopy />}
                    <span>{copiedId === selectedImage._id ? 'কপি হয়েছে' : 'কপি লিংক'}</span>
                  </button>
                  <a
                    href={selectedImage.optimizedUrl || selectedImage.secureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline text-xs !py-2 px-3 flex items-center gap-1 shrink-0"
                  >
                    <FiExternalLink /> দেখুন
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
