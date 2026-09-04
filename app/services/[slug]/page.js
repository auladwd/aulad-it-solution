'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiClock, FiCheck, FiExternalLink, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { user, dbUser } = useAuth();
  const { lang, t } = useLanguage();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderForm, setOrderForm] = useState({ phone: '', requirements: '' });
  const [ordering, setOrdering] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios.get(`/api/services/${slug}`)
      .then(res => setService(res.data.service))
      .catch((err) => {
        console.error('Error loading service:', err);
        toast.error(lang === 'bn' ? 'সার্ভিস পাওয়া যায়নি' : 'Service not found');
      })
      .finally(() => setLoading(false));
  }, [slug, lang]);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('অর্ডার করতে প্রথমে লগইন করুন!');
      router.push('/login');
      return;
    }
    setOrdering(true);
    try {
      await axios.post('/api/orders', {
        serviceId: service._id,
        userEmail: user.email,
        phone: orderForm.phone,
        requirements: orderForm.requirements,
      });
      toast.success(t.order.success);
      setShowOrderForm(false);
      setOrderForm({ phone: '', requirements: '' });
    } catch (err) {
      toast.error('অর্ডার করতে সমস্যা হয়েছে।');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="spinner" />
        </div>
      </main>
    );
  }

  if (!service) return (
    <main>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="text-white text-2xl font-bold mb-4">সার্ভিস পাওয়া যায়নি</h2>
          <Link href="/services" className="btn-primary">সব সার্ভিস দেখুন</Link>
        </div>
      </div>
      <Footer />
    </main>
  );

  const title = lang === 'bn' && service.titleBn ? service.titleBn : service.title;
  const desc = lang === 'bn' && service.descriptionBn ? service.descriptionBn : service.description;
  const features = lang === 'bn' && service.featuresBn?.length ? service.featuresBn : service.features;

  return (
    <main>
      <Navbar />
      <div className="pt-28 section-padding">
        <div className="container-custom">
          {/* Back */}
          <Link href="/services" className="flex items-center gap-2 text-slate-400 hover:text-purple-400 mb-8 transition-colors">
            <FiArrowLeft /> সব সার্ভিস
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                {service.thumbnail ? (
                  <Image src={service.thumbnail} alt={title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-slate-800 flex items-center justify-center text-6xl">🌐</div>
                )}
              </div>

              {/* Title & Meta */}
              <div>
                <h1 className="text-3xl font-black text-white mb-3">{title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><FiStar className="text-yellow-400" /> {service.rating || 5}.0</span>
                  <span className="flex items-center gap-1"><FiClock className="text-cyan-400" /> {service.deliveryDays} দিনে ডেলিভারি</span>
                  <span>{service.totalOrders || 0} টি অর্ডার</span>
                </div>
              </div>

              {/* Description */}
              <div className="glass rounded-xl p-6">
                <h2 className="text-white font-bold text-lg mb-3">বিবরণ</h2>
                <p className="text-slate-400 leading-relaxed">{desc}</p>
              </div>

              {/* Features */}
              {features?.length > 0 && (
                <div className="glass rounded-xl p-6">
                  <h2 className="text-white font-bold text-lg mb-4">কী কী পাবেন</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <FiCheck className="text-green-400 mt-0.5 shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {service.techStack?.length > 0 && (
                <div className="glass rounded-xl p-6">
                  <h2 className="text-white font-bold text-lg mb-4">প্রযুক্তি</h2>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech, i) => (
                      <span key={i} className="badge text-xs">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right - Order Card */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6 sticky top-28">
                <div className="text-center mb-6">
                  <div className="text-4xl font-black gradient-text mb-1">৳{service.price.toLocaleString()}</div>
                  {service.originalPrice && (
                    <span className="text-slate-500 line-through text-sm">৳{service.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {service.demoUrl && (
                  <a href={service.demoUrl} target="_blank" rel="noreferrer"
                    className="btn-outline w-full justify-center mb-3 text-sm">
                    <FiExternalLink /> লাইভ ডেমো দেখুন
                  </a>
                )}

                <button onClick={() => setShowOrderForm(!showOrderForm)} className="btn-primary w-full justify-center text-base">
                  <FiShoppingCart /> {t.services.orderNow}
                </button>

                {/* Order Form */}
                {showOrderForm && (
                  <form onSubmit={handleOrder} className="mt-6 space-y-4 border-t border-slate-700 pt-6">
                    <h3 className="text-white font-semibold">{t.order.title}</h3>
                    <div>
                      <label className="text-slate-400 text-sm mb-1 block">{t.order.phone}</label>
                      <input type="tel" className="input-dark" placeholder="+880 1XXXXXXXXX"
                        value={orderForm.phone}
                        onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm mb-1 block">{t.order.requirements}</label>
                      <textarea className="input-dark" rows={4}
                        placeholder={t.order.requirementsPlaceholder}
                        value={orderForm.requirements}
                        onChange={e => setOrderForm({ ...orderForm, requirements: e.target.value })} />
                    </div>
                    <button type="submit" disabled={ordering} className="btn-primary w-full justify-center">
                      {ordering ? <span className="spinner w-5 h-5 border-2" /> : t.order.submit}
                    </button>
                  </form>
                )}

                <div className="mt-4 space-y-2 text-xs text-slate-500">
                  <p className="flex items-center gap-2"><FiCheck className="text-green-400" /> ১০০% কাস্টমাইজ করা হবে</p>
                  <p className="flex items-center gap-2"><FiCheck className="text-green-400" /> Vercel-এ ফ্রি হোস্টিং</p>
                  <p className="flex items-center gap-2"><FiCheck className="text-green-400" /> সোর্স কোড প্রদান</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
