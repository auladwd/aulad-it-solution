'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';

export default function TestimonialsSection() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);

  const fallbackItems = t.testimonials?.items || [
    { name:'Rahim Uddin', designation:'Head Teacher', company:'Adarsha High School', rating:5, message:'Amazing work! Our school website was built quickly and beautifully.' }
  ];

  useEffect(() => {
    axios.get('/api/testimonials')
      .then(r => {
        if (r.data.testimonials?.length) {
          setItems(r.data.testimonials);
        } else {
          setItems(fallbackItems);
        }
      })
      .catch(() => setItems(fallbackItems));
  }, [lang]);

  const data = items.length ? items : fallbackItems;
  const prev = () => setActive(a => (a - 1 + data.length) % data.length);
  const next = () => setActive(a => (a + 1) % data.length);
  const cur  = data[active] || data[0] || fallbackItems[0];

  return (
    <section className="section-padding" style={{ background:'rgba(30,41,59,0.2)' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div className="badge" style={{ marginBottom:16, display:'inline-flex' }}>
            {t.testimonials?.badge || '❤️ Client Reviews'}
          </div>
          <h2 style={{ color:'#fff', fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:900 }}>
            {t.testimonials?.title || 'What Our Clients Say'}
          </h2>
        </div>

        <div style={{ maxWidth:720, margin:'0 auto' }}>
          {/* Card */}
          <div className="glass glow-purple testimonial-card-box" style={{ borderRadius:20, padding:'40px 36px', textAlign:'center', marginBottom:28 }}>
            {/* Stars */}
            <div style={{ display:'flex', justifyContent:'center', gap:4, marginBottom:20 }}>
              {Array.from({ length: cur?.rating || 5 }).map((_, i) => (
                <FiStar key={i} style={{ color:'#fbbf24', fontSize:20, fill:'#fbbf24' }} />
              ))}
            </div>
            {/* Quote */}
            <p className="testimonial-quote" style={{ color:'#CBD5E1', fontSize:17, lineHeight:1.8, fontStyle:'italic', marginBottom:28 }}>
              "{cur?.message}"
            </p>
            {/* Author */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14 }}>
              <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,#7C3AED,#22d3ee)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:18 }}>
                {cur?.name?.[0]}
              </div>
              <div style={{ textAlign:'left' }}>
                <p style={{ color:'#fff', fontWeight:700, fontSize:16 }}>{cur?.name}</p>
                <p style={{ color:'#64748B', fontSize:13 }}>{cur?.designation} — {cur?.company}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16 }}>
            <button onClick={prev} style={{ width:40, height:40, borderRadius:'50%', background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.35)', color:'#9F67FF', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, transition:'background .2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(124,58,237,0.3)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(124,58,237,0.15)'}>
              <FiChevronLeft />
            </button>

            {/* Dots */}
            <div style={{ display:'flex', gap:8 }}>
              {data.map((_,i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  height:10, borderRadius:10, border:'none', cursor:'pointer',
                  background: i===active ? '#7C3AED' : '#334155',
                  width: i===active ? 28 : 10,
                  transition:'all .3s'
                }} />
              ))}
            </div>

            <button onClick={next} style={{ width:40, height:40, borderRadius:'50%', background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.35)', color:'#9F67FF', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, transition:'background .2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(124,58,237,0.3)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(124,58,237,0.15)'}>
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .testimonial-card-box {
            padding: 28px 18px !important;
            margin-bottom: 20px !important;
          }
          .testimonial-quote {
            font-size: 15px !important;
            margin-bottom: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
