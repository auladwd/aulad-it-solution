'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ServiceCard from '@/components/shared/ServiceCard';
import { HiArrowRight } from 'react-icons/hi2';
import axios from 'axios';

const CATEGORIES = ['all','school','college','madrasa','clinic','hospital','grocery','ecommerce','portfolio'];

export default function ServicesSection({ limit = 6 }) {
  const { t, lang } = useLanguage();
  const [services, setServices]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeCategory, setActive]   = useState('all');

  const sec = t.servicesSection || {
    badge: '✦ Our Services',
    title: 'Ready-Made Websites for Every Need',
    subtitle: 'Order a package, we customize it fully and deliver fast — hosted on Vercel for free!',
    emptyTitle: 'No Services Yet',
    emptyDesc: 'Add services via the Admin Panel.',
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const q = activeCategory !== 'all' ? `?category=${activeCategory}` : '';
        const res = await axios.get(`/api/services${q}`);
        setServices(res.data.services.slice(0, limit));
      } catch { setServices([]); }
      finally { setLoading(false); }
    };
    fetch();
  }, [activeCategory, limit]);

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div className="badge" style={{ marginBottom:16, display:'inline-flex' }}>{sec.badge}</div>
          <h2 style={{ color:'#fff', fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:900, marginBottom:14 }}>
            {sec.title}
          </h2>
          <p style={{ color:'#94A3B8', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
            {sec.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="filter-pills-wrap" style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8, marginBottom:40 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`filter-pill${activeCategory === cat ? ' active' : ''}`}>
              {t.categories?.[cat] || cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="services-cards-grid">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="glass" style={{ borderRadius:16, height:320, animation:'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div style={{ textAlign:'center', padding:'56px 0' }}>
            <p style={{ fontSize:48, marginBottom:14 }}>🌐</p>
            <h3 style={{ color:'#fff', fontSize:20, fontWeight:600, marginBottom:8 }}>
              {sec.emptyTitle}
            </h3>
            <p style={{ color:'#64748B', maxWidth:400, margin:'0 auto' }}>
              {sec.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="services-cards-grid">
            {services.map(s => <ServiceCard key={s._id} service={s} />)}
          </div>
        )}

        {/* View All */}
        <div style={{ textAlign:'center', marginTop:48 }}>
          <Link href="/services" className="btn-outline" style={{ fontSize:15 }}>
            {t.services.viewAll} <HiArrowRight />
          </Link>
        </div>
      </div>

      <style>{`
        .services-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1023px) and (min-width: 640px) {
          .services-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 639px) {
          .services-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .filter-pills-wrap {
            gap: 6px !important;
            margin-bottom: 24px !important;
          }
          .filter-pill {
            padding: 5px 12px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
