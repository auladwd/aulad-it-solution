'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { FiStar, FiClock, FiCheck, FiShoppingCart, FiEye } from 'react-icons/fi';

const CAT_LABELS = {
  school:'School', college:'College', madrasa:'Madrasa', clinic:'Clinic',
  hospital:'Hospital', grocery:'Grocery', ecommerce:'E-Commerce', portfolio:'Portfolio', other:'Other',
};
const CAT_COLORS = {
  school:'#7C3AED', college:'#0891B2', madrasa:'#15803D', clinic:'#BE185D',
  hospital:'#C2410C', grocery:'#B45309', ecommerce:'#7C3AED', portfolio:'#4338CA', other:'#475569',
};

export default function ServiceCard({ service }) {
  const { lang, t } = useLanguage();
  const title = (lang === 'bn' && service.titleBn) ? service.titleBn : service.title;
  const catLabel = t.categories?.[service.category] || CAT_LABELS[service.category] || service.category;
  const catColor = CAT_COLORS[service.category] || '#7C3AED';
  const discount = service.originalPrice
    ? Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)
    : null;

  return (
    <div className="service-card" style={{ display:'flex', flexDirection:'column' }}>
      {/* Thumbnail */}
      <div style={{ position:'relative', height:196, overflow:'hidden', flexShrink:0 }}>
        {service.thumbnail ? (
          <Image src={service.thumbnail} alt={title} fill style={{ objectFit:'cover', transition:'transform .5s' }}
            className="card-img" />
        ) : (
          <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(15,23,42,0.9))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:56 }}>
            🌐
          </div>
        )}
        {/* Category badge */}
        <span style={{ position:'absolute', top:12, left:12, background:catColor, color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:50 }}>
          {catLabel}
        </span>
        {discount && (
          <span style={{ position:'absolute', top:12, right:12, background:'#22c55e', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:50 }}>
            -{discount}%
          </span>
        )}
        {service.isFeatured && !discount && (
          <span style={{ position:'absolute', top:12, right:12, background:'#ca8a04', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:50 }}>
            {lang === 'bn' ? '⭐ জনপ্রিয়' : '⭐ Featured'}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding:'20px', display:'flex', flexDirection:'column', flex:1 }}>
        <h3 style={{ color:'#fff', fontWeight:700, fontSize:17, marginBottom:10, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
          {title}
        </h3>

        {/* Meta row */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14, color:'#64748B', fontSize:12 }}>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}>
            <FiStar style={{ color:'#fbbf24', fill:'#fbbf24' }} />
            {service.rating || 5}.0
          </span>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}>
            <FiClock style={{ color:'#22d3ee' }} />
            {lang === 'bn' ? `${service.deliveryDays} দিনে ডেলিভারি` : `${service.deliveryDays}d delivery`}
          </span>
          <span>
            {lang === 'bn' ? `${service.totalOrders || 0}টি অর্ডার` : `${service.totalOrders || 0} orders`}
          </span>
        </div>

        {/* Price */}
        <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:14 }}>
          <span className="gradient-text" style={{ fontSize:24, fontWeight:900 }}>৳{service.price?.toLocaleString()}</span>
          {service.originalPrice && <span style={{ color:'#475569', fontSize:13, textDecoration:'line-through' }}>৳{service.originalPrice?.toLocaleString()}</span>}
        </div>

        {/* Features */}
        {((lang === 'bn' && service.featuresBn?.length) ? service.featuresBn : service.features)?.length > 0 && (
          <ul style={{ listStyle:'none', padding:0, margin:'0 0 16px', display:'flex', flexDirection:'column', gap:5 }}>
            {((lang === 'bn' && service.featuresBn?.length) ? service.featuresBn : service.features).slice(0, 3).map((f, i) => (
              <li key={i} style={{ display:'flex', alignItems:'center', gap:7, color:'#94A3B8', fontSize:12.5 }}>
                <FiCheck style={{ color:'#9F67FF', flexShrink:0 }} /> {f}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div style={{ display:'flex', gap:8, marginTop:'auto' }}>
          {service.demoUrl && (
            <a
              href={service.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 6,
                fontSize: 12.5,
                fontWeight: 600,
                padding: '10px 10px',
                borderRadius: 10,
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
              title={lang === 'bn' ? 'লাইভ প্রিভিউ' : 'Live Preview'}
            >
              <FiEye style={{ fontSize: 14, flexShrink: 0 }} />
              <span>{lang === 'bn' ? 'লাইভ প্রিভিউ' : 'Live Preview'}</span>
            </a>
          )}
          <Link
            href={`/services/${service.slug}`}
            className="btn-primary"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
              fontSize: 12.5,
              fontWeight: 600,
              padding: '10px 10px',
              borderRadius: 10,
              textDecoration: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <FiShoppingCart style={{ fontSize: 14, flexShrink: 0 }} />
            <span>{t.services?.orderNow || (lang === 'bn' ? 'অর্ডার করুন' : 'Order Now')}</span>
          </Link>
        </div>
      </div>

      <style>{`.service-card:hover .card-img { transform: scale(1.06); }`}</style>
    </div>
  );
}
