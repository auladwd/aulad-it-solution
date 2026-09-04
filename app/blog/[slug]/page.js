'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { format } from 'date-fns';
import { FiCalendar, FiEye, FiArrowLeft, FiTag } from 'react-icons/fi';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/blog/${slug}`).then(res => setBlog(res.data.blog)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <main>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20"><div className="spinner" /></div>
    </main>
  );

  if (!blog) return (
    <main>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20 text-center">
        <div>
          <p className="text-5xl mb-4">📄</p>
          <h2 className="text-white text-2xl font-bold mb-4">পোস্ট পাওয়া যায়নি</h2>
          <Link href="/blog" className="btn-primary">ব্লগে ফিরে যান</Link>
        </div>
      </div>
      <Footer />
    </main>
  );

  const title = lang === 'bn' && blog.titleBn ? blog.titleBn : blog.title;
  const content = lang === 'bn' && blog.contentBn ? blog.contentBn : blog.content;

  return (
    <main>
      <Navbar />
      <div className="pt-28 section-padding">
        <div className="container-custom max-w-3xl">
          <Link href="/blog" className="flex items-center gap-2 text-slate-400 hover:text-purple-400 mb-8 transition-colors">
            <FiArrowLeft /> সব পোস্ট
          </Link>

          {blog.thumbnail && (
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
              <Image src={blog.thumbnail} alt={title} fill className="object-cover" />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-700">
            <span className="flex items-center gap-1"><FiCalendar /> {format(new Date(blog.createdAt), 'dd MMMM yyyy')}</span>
            <span className="flex items-center gap-1"><FiEye /> {blog.views} views</span>
            <span className="text-slate-600">by {blog.author}</span>
            {blog.tags?.map(tag => (
              <span key={tag} className="flex items-center gap-1 badge text-xs"><FiTag /> {tag}</span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
            {content?.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-300">{para}</p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-700 text-center">
            <p className="text-slate-500 mb-4">এই পোস্টটি পড়ে উপকৃত হলে শেয়ার করুন!</p>
            <Link href="/contact" className="btn-primary">আমাদের সাথে যোগাযোগ করুন</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
