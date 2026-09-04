'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/shared/ServiceCard';
import { useLanguage } from '@/context/LanguageContext';
import axios from 'axios';

const CATEGORIES = [
  'all', 'school', 'college', 'madrasa', 'clinic', 'hospital', 'grocery', 'ecommerce', 'portfolio', 'other'
];

function ServicesContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const params = activeCategory !== 'all' ? `?category=${activeCategory}` : '';
        const res = await axios.get(`/api/services${params}`);
        setServices(res.data.services);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [activeCategory]);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
          >
            {t.categories[cat]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="service-card h-72 animate-pulse">
              <div className="h-40 bg-slate-700/50 rounded-t-2xl" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-700/50 rounded w-3/4" />
                <div className="h-3 bg-slate-700/50 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🌐</p>
          <h3 className="text-white text-xl font-semibold mb-2">
            {t.servicesSection?.emptyTitle || (lang === 'bn' ? 'কোনো সার্ভিস পাওয়া যায়নি' : 'No Services Found')}
          </h3>
          <p className="text-slate-500">
            {t.servicesSection?.emptyDesc || (lang === 'bn' ? 'এই ক্যাটাগরিতে এখনো কোনো সার্ভিস যুক্ত হয়নি।' : 'No services available in this category yet.')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </>
  );
}

export default function ServicesPage() {
  const { t, lang } = useLanguage();
  return (
    <main>
      <Navbar />
      <div className="pt-28 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="badge mb-4 mx-auto inline-flex">
              {lang === 'bn' ? '🌐 সব সার্ভিস' : '🌐 All Services'}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{t.services.title}</h1>
            <p className="text-slate-400 max-w-xl mx-auto">{t.services.subtitle}</p>
          </div>
          <Suspense fallback={<div className="text-center text-slate-500">{lang === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}</div>}>
            <ServicesContent />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
}
