'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { HiArrowRight, HiPlay } from 'react-icons/hi2';
import { FiCode, FiZap, FiShield } from 'react-icons/fi';

export default function HeroSection() {
  const { t, lang } = useLanguage();

  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:80 }}>

      {/* Grid overlay */}
      <div className="grid-pattern" style={{ position:'absolute', inset:0, opacity:0.5, pointerEvents:'none' }} />

      {/* Glow blobs */}
      <div style={{ position:'absolute', top:'10%', left:'5%', width:320, height:320, borderRadius:'50%', background:'rgba(124,58,237,0.12)', filter:'blur(80px)', pointerEvents:'none', animation:'float 6s ease-in-out infinite' }} />
      <div style={{ position:'absolute', top:'20%', right:'5%', width:400, height:400, borderRadius:'50%', background:'rgba(6,182,212,0.08)', filter:'blur(80px)', pointerEvents:'none', animation:'float 6s ease-in-out infinite', animationDelay:'2s' }} />
      <div style={{ position:'absolute', bottom:'20%', left:'30%', width:240, height:240, borderRadius:'50%', background:'rgba(124,58,237,0.1)', filter:'blur(60px)', pointerEvents:'none', animation:'float 6s ease-in-out infinite', animationDelay:'4s' }} />

      <div className="container-custom" style={{ position:'relative', zIndex:1, padding:'80px 20px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>

          {/* ── Left Content ── */}
          <div style={{ animation:'slideUp 0.6s ease-out' }}>

            {/* Badge */}
            <div className="badge" style={{ marginBottom:24, display:'inline-flex' }}>
              <FiZap style={{ color:'#fbbf24' }} />
              {t.hero.badge}
            </div>

            {/* Heading */}
            <h1 style={{ fontSize:'clamp(2.2rem,5vw,3.6rem)', fontWeight:900, lineHeight:1.15, marginBottom:24, color:'#fff' }}>
              {t.hero.title}{' '}
              <span className="gradient-text">{t.hero.titleHighlight}</span>
              <br />
              <span style={{ fontSize:'clamp(1.6rem,3.5vw,2.4rem)', fontWeight:700 }}>
                {lang === 'en' ? 'Built to Impress' : 'তৈরি করুন'}
              </span>
            </h1>

            {/* Sub */}
            <p style={{ color:'#94A3B8', fontSize:17, lineHeight:1.75, marginBottom:36, maxWidth:500 }}>
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="hero-ctas" style={{ display:'flex', flexWrap:'wrap', gap:14, marginBottom:48 }}>
              <Link href="/services" className="btn-primary" style={{ fontSize:16, padding:'13px 30px' }}>
                {t.hero.cta} <HiArrowRight />
              </Link>
              <a href="#services" className="btn-outline" style={{ fontSize:16, padding:'13px 30px' }}>
                <HiPlay /> {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Mini stats */}
            <div className="hero-mini-stats" style={{ display:'flex', gap:36, paddingTop:32, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
              {[
                { vEn:'50+', vBn:'৫০+', lEn:'Projects Done', lBn:'সম্পন্ন প্রজেক্ট' },
                { vEn:'40+', vBn:'৪০+', lEn:'Happy Clients', lBn:'সন্তুষ্ট ক্লায়েন্ট' },
                { vEn:'24/7',vBn:'২৪/৭',  lEn:'Support',       lBn:'সাপোর্ট' },
              ].map((s,i)=>(
                <div key={i} className="hero-stat-item">
                  <div className="gradient-text stat-value" style={{ fontSize:26, fontWeight:900 }}>{lang === 'bn' ? s.vBn : s.vEn}</div>
                  <div className="stat-label" style={{ color:'#64748B', fontSize:12, marginTop:4 }}>{lang === 'bn' ? s.lBn : s.lEn}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right – Code preview ── */}
          <div style={{ position:'relative', height:480, display:'none' }} className="hero-right">
            {/* Main card */}
            <div className="glass glow-purple" style={{ borderRadius:16, padding:24, position:'absolute', top:32, left:0, right:32 }}>
              {/* Window dots */}
              <div style={{ display:'flex', gap:6, marginBottom:16 }}>
                <div style={{ width:12, height:12, borderRadius:'50%', background:'#ef4444' }} />
                <div style={{ width:12, height:12, borderRadius:'50%', background:'#fbbf24' }} />
                <div style={{ width:12, height:12, borderRadius:'50%', background:'#22c55e' }} />
                <span style={{ color:'#475569', fontSize:12, marginLeft:8 }}>aulad-it.vercel.app</span>
              </div>
              {/* Mock code */}
              <div style={{ fontFamily:'monospace', fontSize:14, lineHeight:2, color:'#94A3B8' }}>
                <div><span style={{color:'#c084fc'}}>const </span><span style={{color:'#67e8f9'}}>website</span> = <span style={{color:'#86efac'}}>'Your Dream Site'</span></div>
                <div><span style={{color:'#c084fc'}}>const </span><span style={{color:'#67e8f9'}}>stack</span> = [<span style={{color:'#fde68a'}}>'Next.js'</span>, <span style={{color:'#fde68a'}}>'MongoDB'</span>]</div>
                <div><span style={{color:'#c084fc'}}>const </span><span style={{color:'#67e8f9'}}>price</span> = <span style={{color:'#86efac'}}>1499</span> <span style={{color:'#475569'}}>{'//'} BDT only!</span></div>
                <div style={{marginTop:8,color:'#475569'}}>{'//'} Deploy to Vercel in minutes ✨</div>
              </div>
            </div>

            {/* Floating badge: Firebase */}
            <div className="glass" style={{ borderRadius:12, padding:14, position:'absolute', bottom:90, right:0, width:190, animation:'float 6s ease-in-out infinite', animationDelay:'1s' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <FiShield style={{ color:'#22c55e', fontSize:22 }} />
                <div>
                  <p style={{ color:'#fff', fontSize:12, fontWeight:600 }}>Firebase Auth</p>
                  <p style={{ color:'#22c55e', fontSize:11 }}>{lang === 'bn' ? 'গুগল লগইন ✓' : 'Google Login ✓'}</p>
                </div>
              </div>
            </div>

            {/* Floating badge: Code */}
            <div className="glass" style={{ borderRadius:12, padding:14, position:'absolute', bottom:10, left:24, width:180, animation:'float 6s ease-in-out infinite', animationDelay:'3s' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <FiCode style={{ color:'#c084fc', fontSize:22 }} />
                <div>
                  <p style={{ color:'#fff', fontSize:12, fontWeight:600 }}>MERN Stack</p>
                  <p style={{ color:'#c084fc', fontSize:11 }}>{lang === 'bn' ? 'প্রফেশনাল কোড ✓' : 'Professional Code ✓'}</p>
                </div>
              </div>
            </div>

            {/* Price badge */}
            <div className="glass" style={{ borderRadius:12, padding:14, position:'absolute', top:10, right:0, animation:'float 6s ease-in-out infinite', animationDelay:'2s', textAlign:'center', width:140 }}>
              <p className="gradient-text" style={{ fontSize:28, fontWeight:900, marginBottom:2 }}>
                {lang === 'bn' ? '৳১৪৯৯' : '৳1499'}
              </p>
              <p style={{ color:'#64748B', fontSize:11 }}>
                {lang === 'bn' ? 'শুরুর মূল্য' : 'Starting Price'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Responsive layout controls */}
      <style>{`
        @media (min-width: 900px) {
          .hero-right { display: block !important; }
        }
        @media (max-width: 899px) {
          .container-custom > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-right { display: none !important; }
        }
        @media (max-width: 600px) {
          .hero-mini-stats {
            gap: 12px !important;
            justify-content: space-between !important;
          }
          .hero-stat-item {
            flex: 1 1 0;
            text-align: center;
          }
          .hero-stat-item .stat-value {
            font-size: 20px !important;
          }
          .hero-stat-item .stat-label {
            font-size: 11px !important;
            white-space: nowrap;
          }
          .hero-ctas {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .hero-ctas > * {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
