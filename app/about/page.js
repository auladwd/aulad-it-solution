'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { FiTarget, FiHeart, FiAward, FiUsers } from 'react-icons/fi';

export default function AboutPage() {
  const { lang } = useLanguage();

  const teamValues = [
    {
      icon: <FiTarget style={{ color:'#c084fc' }} />,
      title: lang === 'bn' ? 'আমাদের লক্ষ্য' : 'Our Mission',
      desc: lang === 'bn'
        ? 'বাংলাদেশের প্রতিটি ব্যবসাকে ডিজিটাল করা। সাশ্রয়ী মূল্যে সর্বোচ্চ মানের ওয়েবসাইট প্রদান।'
        : 'Empowering every business in Bangladesh digitally by providing highest quality websites at affordable prices.',
    },
    {
      icon: <FiHeart style={{ color:'#f87171' }} />,
      title: lang === 'bn' ? 'আমাদের মূল্যবোধ' : 'Our Values',
      desc: lang === 'bn'
        ? 'সততা, মানসম্পন্ন কাজ এবং ক্লায়েন্ট সন্তুষ্টি আমাদের প্রধান অঙ্গীকার।'
        : 'Integrity, excellence in work, and client satisfaction are our primary commitments.',
    },
    {
      icon: <FiAward style={{ color:'#fbbf24' }} />,
      title: lang === 'bn' ? 'আমাদের দক্ষতা' : 'Our Expertise',
      desc: lang === 'bn'
        ? 'MERN Stack, Next.js, Firebase, MongoDB Atlas সহ সর্বাধুনিক প্রযুক্তি ব্যবহার।'
        : 'Expertise in modern technologies including MERN Stack, Next.js, Firebase, and MongoDB Atlas.',
    },
    {
      icon: <FiUsers style={{ color:'#22d3ee' }} />,
      title: lang === 'bn' ? 'আমাদের দল' : 'Our Team',
      desc: lang === 'bn'
        ? 'অভিজ্ঞ ডেভেলপার, ডিজাইনার এবং প্রজেক্ট ম্যানেজারদের নিয়ে গঠিত প্রফেশনাল টিম।'
        : 'A professional team comprised of experienced developers, designers, and project managers.',
    },
  ];

  return (
    <main>
      <Navbar />
      <div className="section-padding" style={{ paddingTop:120 }}>
        <div className="container-custom">
          {/* Hero */}
          <div style={{ textAlign:'center', marginBottom:64 }}>
            <div className="badge" style={{ marginBottom:16, display:'inline-flex' }}>
              {lang === 'bn' ? 'ℹ️ আমাদের সম্পর্কে' : 'ℹ️ About Us'}
            </div>
            <h1 style={{ fontSize:'clamp(2.2rem,5vw,3.2rem)', fontWeight:900, color:'#fff', marginBottom:20 }}>
              {lang === 'bn' ? 'আমরা কারা?' : 'Who We Are'}
            </h1>
            <p style={{ color:'#94A3B8', fontSize:17, maxWidth:680, margin:'0 auto', lineHeight:1.8 }}>
              {lang === 'bn' ? (
                <>
                  <strong style={{ color:'#fff' }}>Aulad IT Solution</strong> বাংলাদেশের একটি পেশাদার ওয়েব ডেভেলপমেন্ট সার্ভিস প্রদানকারী প্রতিষ্ঠান। আমরা স্কুল, কলেজ, মাদ্রাসা, ক্লিনিক, হাসপাতাল, মুদির দোকান, ই-কমার্স ও পোর্টফোলিও ওয়েবসাইট সহ সব ধরনের ওয়েবসাইট তৈরি করি।
                </>
              ) : (
                <>
                  <strong style={{ color:'#fff' }}>Aulad IT Solution</strong> is a professional web development service in Bangladesh. We build high-performance websites for schools, colleges, madrasas, clinics, hospitals, grocery shops, e-commerce, and portfolios.
                </>
              )}
            </p>
          </div>

          {/* Values */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24, marginBottom:64 }}>
            {teamValues.map((val, i) => (
              <div key={i} className="glass" style={{ padding:28, borderRadius:16, display:'flex', gap:20 }}>
                <div style={{ width:48, height:48, borderRadius:12, background:'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                  {val.icon}
                </div>
                <div>
                  <h3 style={{ color:'#fff', fontWeight:700, fontSize:18, marginBottom:8 }}>{val.title}</h3>
                  <p style={{ color:'#94A3B8', lineHeight:1.65, fontSize:14 }}>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="glass about-story-card" style={{ padding:40, borderRadius:20, marginBottom:64 }}>
            <h2 style={{ color:'#fff', fontSize:24, fontWeight:900, marginBottom:20 }}>
              {lang === 'bn' ? 'আমাদের যাত্রা' : 'Our Journey'}
            </h2>
            <div style={{ color:'#94A3B8', lineHeight:1.8, display:'flex', flexDirection:'column', gap:16, fontSize:15 }}>
              {lang === 'bn' ? (
                <>
                  <p>আমরা MERN Stack Web Development কোর্স সম্পন্ন করে বাংলাদেশের ডিজিটাল রূপান্তরে অবদান রাখার সিদ্ধান্ত নিয়েছি। দেশের বহু ব্যবসা প্রতিষ্ঠান, শিক্ষা প্রতিষ্ঠান এবং স্বাস্থ্যসেবা কেন্দ্র এখনও অনলাইনে নেই — এই শূন্যস্থান পূরণ করাই আমাদের লক্ষ্য।</p>
                  <p>আমাদের সার্ভিসগুলো Vercel-এ হোস্ট করা হয়, তাই আলাদা হোস্টিং খরচ নেই। MongoDB Atlas, Firebase Authentication ও Next.js ব্যবহার করে আমরা দ্রুত, নিরাপদ ও আধুনিক ওয়েবসাইট তৈরি করি।</p>
                </>
              ) : (
                <>
                  <p>After completing advanced MERN Stack Web Development, we embarked on a mission to accelerate digital transformation in Bangladesh. Countless educational institutions, healthcare centers, and local businesses are yet to go online — bridging this gap at an affordable cost is our mission.</p>
                  <p>Our solutions are deployed on Vercel with zero separate hosting expenses. Powered by Next.js, MongoDB Atlas, and Firebase Authentication, we guarantee blazing speed, robust security, and reliable performance.</p>
                </>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ textAlign:'center' }}>
            <h2 style={{ color:'#fff', fontSize:24, fontWeight:900, marginBottom:28 }}>
              {lang === 'bn' ? 'আমরা যে প্রযুক্তি ব্যবহার করি' : 'Technologies We Use'}
            </h2>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12 }}>
              {['Next.js', 'React.js', 'Node.js', 'MongoDB Atlas', 'Firebase', 'Tailwind CSS', 'Vercel', 'REST API'].map(tech => (
                <span key={tech} className="badge" style={{ padding:'8px 18px', fontSize:14 }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .about-story-card {
            padding: 24px 18px !important;
          }
        }
      `}</style>
      <Footer />
    </main>
  );
}
