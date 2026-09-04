'use client';
import { useLanguage } from '@/context/LanguageContext';

const STATS = [
  { valueEn:'50+',   valueBn:'৫০+',   labelEn:'Projects Completed', labelBn:'সম্পন্ন প্রজেক্ট', grad:'linear-gradient(135deg,#7C3AED,#9F67FF)' },
  { valueEn:'40+',   valueBn:'৪০+',   labelEn:'Happy Clients',       labelBn:'সন্তুষ্ট ক্লায়েন্ট',  grad:'linear-gradient(135deg,#0891B2,#22d3ee)' },
  { valueEn:'৳1499', valueBn:'৳১৪৯৯', labelEn:'Starting Price',      labelBn:'শুরুর মূল্য',           grad:'linear-gradient(135deg,#15803D,#22C55E)' },
  { valueEn:'24/7',  valueBn:'২৪/৭',  labelEn:'Support',             labelBn:'২৪/৭ সাপোর্ট',         grad:'linear-gradient(135deg,#BE185D,#EC4899)' },
];

export default function StatsSection() {
  const { lang } = useLanguage();

  return (
    <section style={{ padding:'56px 0', background:'rgba(30,41,59,0.25)', borderTop:'1px solid rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
      <div className="container-custom">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="glass stat-card-box" style={{ textAlign:'center', padding:'28px 16px', transition:'transform .3s', borderRadius:14 }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >
              <div className="stat-num" style={{ fontSize:'clamp(1.7rem,3vw,2.4rem)', fontWeight:900, background:s.grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', marginBottom:8 }}>
                {lang === 'bn' ? s.valueBn : s.valueEn}
              </div>
              <div className="stat-txt" style={{ color:'#fff', fontWeight:600, fontSize:15 }}>
                {lang === 'bn' ? s.labelBn : s.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 991px) and (min-width: 540px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 539px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .stat-card-box {
            padding: 20px 10px !important;
          }
          .stat-num {
            font-size: 22px !important;
            margin-bottom: 4px !important;
          }
          .stat-txt {
            font-size: 13px !important;
          }
        }
      `}</style>
    </section>
  );
}
