'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { format } from 'date-fns';
import { FiEye, FiCalendar, FiTag } from 'react-icons/fi';

export default function BlogPage() {
  const { lang } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/blog?published=true').then(res => setBlogs(res.data.blogs)).finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <Navbar />
      <div className="pt-28 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="badge mb-4 mx-auto inline-flex">📝 ব্লগ</div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">আমাদের ব্লগ</h1>
            <p className="text-slate-400 max-w-xl mx-auto">ওয়েব ডেভেলপমেন্ট, টিপস ও অনলাইন ব্যবসার জন্য দরকারী নিবন্ধ।</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass rounded-2xl animate-pulse h-64" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📝</p>
              <h3 className="text-white text-xl font-semibold mb-2">এখনো কোনো পোস্ট নেই</h3>
              <p className="text-slate-500">Admin panel থেকে ব্লগ পোস্ট যুক্ত করুন।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map(blog => {
                const title = lang === 'bn' && blog.titleBn ? blog.titleBn : blog.title;
                const excerpt = lang === 'bn' && blog.excerptBn ? blog.excerptBn : blog.excerpt;
                return (
                  <Link key={blog._id} href={`/blog/${blog.slug}`} className="service-card group block">
                    <div className="relative h-44 overflow-hidden">
                      {blog.thumbnail ? (
                        <Image src={blog.thumbnail} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-slate-800 flex items-center justify-center text-4xl">📰</div>
                      )}
                    </div>
                    <div className="p-5">
                      <h2 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">{title}</h2>
                      {excerpt && <p className="text-slate-400 text-sm line-clamp-2 mb-3">{excerpt}</p>}
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><FiCalendar /> {format(new Date(blog.createdAt), 'dd MMM yyyy')}</span>
                        <span className="flex items-center gap-1"><FiEye /> {blog.views || 0}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
