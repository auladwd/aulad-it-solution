'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FiUploadCloud,
  FiTrash2,
  FiCopy,
  FiCheck,
  FiImage,
  FiLink,
  FiX,
  FiZap,
  FiRefreshCw,
  FiFolder,
} from 'react-icons/fi';

export default function ImageUpload({
  value = '',
  onChange,
  label = 'ছবি আপলোড',
  folder = 'aulad-it-solution',
  helpText = 'PNG, JPG, WebP (সর্বোচ্চ ১০MB) — ক্লাউডিনারিতে স্বয়ংক্রিয়ভাবে অপটিমাইজ ও সাইজ ছোট হবে',
  aspectRatio = 'video', // 'video' (16:9), 'square' (1:1), 'banner'
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState(value || '');

  // Media Library state
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [gallerySearch, setGallerySearch] = useState('');

  const fileInputRef = useRef(null);

  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await axios.get('/api/media?limit=30');
      setGalleryItems(res.data.media || []);
    } catch (err) {
      console.error('Gallery fetch error:', err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleOpenGallery = () => {
    setShowGallery(true);
    fetchGallery();
  };

  const handleFileSelect = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('শুধুমাত্র ইমেজ ফাইল (JPG, PNG, WebP) আপলোড করা যাবে!');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('ফাইলের সাইজ ১০MB এর বেশি হতে পারবে না!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('title', file.name.replace(/\.[^/.]+$/, ''));

    setUploading(true);
    setProgress(15);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 80) / progressEvent.total);
          setProgress(Math.min(percent, 85));
        },
      });

      setProgress(100);
      const optimizedUrl = res.data.optimizedUrl || res.data.secure_url || res.data.url;
      onChange?.(optimizedUrl, res.data.media);
      toast.success('ছবি অপটিমাইজ ও ক্লাউডিনারিতে আপলোড হয়েছে!');
    } catch (err) {
      console.error('Upload failed:', err);
      const errMsg =
        err.response?.data?.error || 'ছবি আপলোড করতে সমস্যা হয়েছে। ক্লাউডিনারি কনফিগারেশন চেক করুন।';
      toast.error(errMsg, { duration: 5000 });
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success('লিংক কপি করা হয়েছে!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onChange?.('', null);
    setManualUrl('');
  };

  const handleManualApply = () => {
    if (manualUrl) {
      onChange?.(manualUrl.trim(), null);
      setShowUrlInput(false);
      toast.success('ইমেজ লিংক সেট করা হয়েছে');
    }
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square max-w-[260px]'
      : aspectRatio === 'banner'
      ? 'aspect-[21/9] w-full'
      : 'aspect-[16/9] w-full max-w-xl';

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-slate-300 text-sm font-semibold flex items-center gap-1.5">
            <FiImage className="text-purple-400" /> {label}
          </label>
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={handleOpenGallery}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-cyan-950/40 border border-cyan-800/40"
            >
              <FiFolder size={12} /> গ্যালারি থেকে বাছুন
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
            >
              <FiLink size={12} /> {showUrlInput ? 'ফাইল আপলোড' : 'সরাসরি URL'}
            </button>
          </div>
        </div>
      )}

      {/* Manual URL Input Bar */}
      {showUrlInput && (
        <div className="flex gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-purple-500/30 mb-2">
          <input
            type="url"
            className="input-dark text-xs flex-1 !py-1.5"
            placeholder="https://res.cloudinary.com/... বা অন্য লিংক দিন"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={handleManualApply}
            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
          >
            প্রয়োগ
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileSelect(e.target.files?.[0])}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
      />

      {/* Preview when image exists */}
      {value ? (
        <div className={`relative ${aspectClass} rounded-2xl overflow-hidden group border border-slate-700/60 bg-slate-900/90 shadow-xl shadow-purple-950/20`}>
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={value.startsWith('blob:')}
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-emerald-500/90 text-white shadow-md flex items-center gap-1 backdrop-blur-md">
              <FiZap className="animate-pulse" size={12} /> Cloudinary WebP
            </span>
          </div>

          {/* Top Actions Overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              title="লিংক কপি করুন"
              className="p-2 rounded-xl bg-slate-950/80 hover:bg-purple-600 text-slate-200 hover:text-white backdrop-blur-md border border-white/10 transition-all shadow-md"
            >
              {copied ? <FiCheck size={14} className="text-emerald-400" /> : <FiCopy size={14} />}
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="নতুন ছবি পরিবর্তন করুন"
              className="p-2 rounded-xl bg-slate-950/80 hover:bg-cyan-600 text-slate-200 hover:text-white backdrop-blur-md border border-white/10 transition-all shadow-md"
            >
              <FiRefreshCw size={14} />
            </button>
            <button
              type="button"
              onClick={handleClear}
              title="মুছে ফেলুন"
              className="p-2 rounded-xl bg-slate-950/80 hover:bg-rose-600 text-slate-200 hover:text-white backdrop-blur-md border border-white/10 transition-all shadow-md"
            >
              <FiTrash2 size={14} />
            </button>
          </div>

          {/* Bottom URL info */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent flex items-center justify-between text-xs text-slate-300">
            <p className="truncate max-w-[80%] font-mono text-[11px] opacity-80">{value}</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-cyan-400 hover:underline text-[11px] font-semibold shrink-0"
            >
              পরিবর্তন
            </button>
          </div>
        </div>
      ) : (
        /* Upload Drag-and-Drop Area */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative ${aspectClass} rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none ${
            dragOver
              ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
              : 'border-slate-700/80 hover:border-purple-500/70 bg-gradient-to-br from-slate-900/60 to-slate-950/80 hover:bg-purple-950/10'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3 w-full max-w-xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center animate-spin">
                <FiRefreshCw className="text-purple-400 text-xl" />
              </div>
              <p className="text-white text-sm font-semibold">অপটিমাইজ এবং ক্লাউডিনারিতে আপলোড হচ্ছে...</p>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-slate-400 text-xs">Cloudinary Auto-Format & WebP Compression</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FiUploadCloud className="text-cyan-400 text-2xl" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  ছবি টানুন অথবা <span className="text-cyan-400 underline">ব্রাউজ করুন</span>
                </p>
                <p className="text-slate-400 text-xs mt-1 max-w-sm">{helpText}</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300">
                  ⚡ Auto-Compress
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
                  🌐 WebP / AVIF
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
                  🍃 MongoDB Synced
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Media Library Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col border border-purple-500/30 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2">
                <FiFolder className="text-cyan-400 text-lg" />
                <h3 className="text-white font-bold text-base">মিডিয়া গ্যালারি (MongoDB Atlas)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGallery(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Search & Upload quick trigger */}
            <div className="p-3 border-b border-slate-800 flex gap-3 bg-slate-950/40">
              <input
                type="text"
                placeholder="ছবি খুঁজুন..."
                className="input-dark text-xs flex-1 !py-2"
                value={gallerySearch}
                onChange={(e) => setGallerySearch(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  setShowGallery(false);
                  fileInputRef.current?.click();
                }}
                className="btn-primary text-xs !py-2 px-3 flex items-center gap-1.5"
              >
                <FiUploadCloud /> নতুন আপলোড
              </button>
            </div>

            {/* Modal Gallery Grid */}
            <div className="p-4 overflow-y-auto flex-1 max-h-[55vh]">
              {loadingGallery ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="spinner w-8 h-8 border-2 border-purple-500 border-t-transparent" />
                  <p className="text-slate-400 text-xs">ছবি লোড হচ্ছে...</p>
                </div>
              ) : galleryItems.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <FiImage className="mx-auto text-4xl mb-2 opacity-50" />
                  <p>কোনো মিডিয়া পাওয়া যায়নি। প্রথমে একটি ছবি আপলোড করুন।</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {galleryItems
                    .filter((item) =>
                      gallerySearch ? item.title?.toLowerCase().includes(gallerySearch.toLowerCase()) : true
                    )
                    .map((item) => (
                      <div
                        key={item._id}
                        onClick={() => {
                          onChange?.(item.optimizedUrl || item.secureUrl || item.url, item);
                          setShowGallery(false);
                          toast.success('ছবি নির্বাচিত হয়েছে!');
                        }}
                        className="group relative aspect-video rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-400 cursor-pointer transition-all bg-slate-900/60"
                      >
                        <Image
                          src={item.thumbnailUrl || item.optimizedUrl || item.secureUrl}
                          alt={item.title || 'media'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                          <p className="text-white text-[11px] font-semibold truncate">{item.title}</p>
                          <span className="text-cyan-400 text-[10px]">বাছাই করতে ক্লিক করুন</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex justify-between items-center text-xs text-slate-400">
              <span>মোট {galleryItems.length} টি ছবি পাওয়া গেছে</span>
              <button
                type="button"
                onClick={() => setShowGallery(false)}
                className="btn-outline text-xs !py-1.5 px-3"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
