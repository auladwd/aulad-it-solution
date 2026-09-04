'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const { t } = useLanguage();
  const faqData = t.faq || {
    badge: '❓ FAQ',
    title: 'Frequently Asked Questions',
    items: [],
  };

  return (
    <section className="section-padding" style={{ background:'rgba(255,255,255,0.015)' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div className="badge" style={{ marginBottom:16, display:'inline-flex' }}>{faqData.badge}</div>
          <h2 style={{ color:'#fff', fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:900, marginBottom:16 }}>
            {faqData.title}
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:10 }}>
          {faqData.items.map((faq, i) => (
            <div key={i} className="glass" style={{ borderRadius:14, overflow:'hidden', borderColor: openIdx===i ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.2)' }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="faq-toggle-btn"
                style={{
                  width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'18px 22px', background:'none', border:'none', cursor:'pointer',
                  textAlign:'left', color:'#fff', fontFamily:'inherit', fontSize:15, fontWeight:600
                }}
              >
                <span style={{ paddingRight:16 }}>{faq.q}</span>
                <FiChevronDown style={{ color:'#9F67FF', flexShrink:0, fontSize:18, transform: openIdx===i ? 'rotate(180deg)' : 'rotate(0)', transition:'transform .25s' }} />
              </button>
              {openIdx === i && (
                <div className="faq-answer-box" style={{ padding:'0 22px 18px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ color:'#94A3B8', lineHeight:1.75, paddingTop:14, fontSize:14.5 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .faq-toggle-btn {
            padding: 14px 16px !important;
            font-size: 14px !important;
          }
          .faq-answer-box {
            padding: 0 16px 14px !important;
          }
          .faq-answer-box p {
            font-size: 13.5px !important;
            padding-top: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
