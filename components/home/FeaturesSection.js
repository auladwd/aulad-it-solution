'use client';
import { useLanguage } from '@/context/LanguageContext';
import { FiZap, FiDollarSign, FiHeadphones, FiCode, FiSmartphone, FiShield } from 'react-icons/fi';

const ICONS = [
  { icon: FiZap,        color:'#fbbf24' },
  { icon: FiDollarSign, color:'#22c55e' },
  { icon: FiHeadphones, color:'#c084fc' },
  { icon: FiCode,       color:'#22d3ee' },
  { icon: FiSmartphone, color:'#f472b6' },
  { icon: FiShield,     color:'#60a5fa' },
];

export default function FeaturesSection() {
  const { t } = useLanguage();
  const f = t.features || {
    badge: '🚀 Why Choose Us',
    title: 'Reasons to Choose Aulad IT',
    subtitle: 'Every project is handled with the highest quality standards.',
    items: [],
  };

  return (
    <section className="section-padding">
      <div className="container-custom">

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div className="badge" style={{ marginBottom:16, display:'inline-flex' }}>{f.badge}</div>
          <h2 style={{ color:'#fff', fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:900, marginBottom:16 }}>
            {f.title}
          </h2>
          <p style={{ color:'#94A3B8', maxWidth:500, margin:'0 auto', lineHeight:1.7 }}>
            {f.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="features-grid">
          {f.items.map((item, i) => {
            const Icon = ICONS[i]?.icon || FiZap;
            const color = ICONS[i]?.color || '#7C3AED';
            return (
              <div key={i} className="glass feature-box" style={{ padding:26, borderRadius:16, transition:'all .3s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor='rgba(124,58,237,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(124,58,237,0.25)'; }}
              >
                <div style={{ width:48, height:48, borderRadius:12, background:'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18, transition:'transform .3s' }}>
                  <Icon style={{ color, fontSize:24 }} />
                </div>
                <h3 style={{ color:'#fff', fontWeight:700, fontSize:17, marginBottom:8 }}>{item.title}</h3>
                <p style={{ color:'#94A3B8', fontSize:13.5, lineHeight:1.65 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1023px) and (min-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 639px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .feature-box {
            padding: 20px 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
