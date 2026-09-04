'use client';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiSparkles } from 'react-icons/hi2';
import { FiShield, FiZap, FiCode } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
  const { user, loginWithGoogle, loading } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();

  useEffect(() => { if (user) router.push('/dashboard'); }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success(lang === 'bn' ? 'সফলভাবে লগইন হয়েছে! 🎉' : 'Successfully logged in! 🎉');
      router.push('/dashboard');
    } catch {
      toast.error(lang === 'bn' ? 'লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।' : 'Login failed. Please try again.');
    }
  };

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="spinner" />
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', position:'relative', overflow:'hidden' }}>
      {/* Glows */}
      <div style={{ position:'absolute', top:'15%', left:'10%', width:360, height:360, borderRadius:'50%', background:'rgba(124,58,237,0.1)', filter:'blur(80px)', pointerEvents:'none', animation:'float 6s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:'10%', right:'10%', width:280, height:280, borderRadius:'50%', background:'rgba(6,182,212,0.08)', filter:'blur(60px)', pointerEvents:'none', animation:'float 6s ease-in-out infinite', animationDelay:'2s' }} />
      <div className="grid-pattern" style={{ position:'absolute', inset:0, opacity:0.3, pointerEvents:'none' }} />

      <div className="glass login-card-box" style={{ maxWidth:440, width:'100%', padding:'44px 40px', textAlign:'center', position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:32 }}>
          <div style={{ width:46, height:46, borderRadius:12, background:'linear-gradient(135deg,#7C3AED,#06B6D4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <HiSparkles style={{ color:'#fff', fontSize:24 }} />
          </div>
          <span style={{ fontWeight:800, fontSize:20, color:'#fff' }}>Aulad IT<span style={{ color:'#22d3ee' }}> Solution</span></span>
        </div>

        <h1 style={{ color:'#fff', fontWeight:900, fontSize:26, marginBottom:8 }}>
          {lang === 'bn' ? 'স্বাগতম!' : 'Welcome Back!'}
        </h1>
        <p style={{ color:'#94A3B8', marginBottom:36, fontSize:15 }}>
          {lang === 'bn' ? 'অর্ডার ট্র্যাক করতে এবং অ্যাকাউন্ট পরিচালনা করতে লগইন করুন' : 'Login to track orders and manage your account'}
        </p>

        {/* Google Button */}
        <button onClick={handleGoogleLogin} style={{
          width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:14,
          background:'#fff', color:'#1a1a1a', fontWeight:700, fontSize:16,
          padding:'15px 24px', borderRadius:12, border:'none', cursor:'pointer',
          boxShadow:'0 4px 20px rgba(0,0,0,0.2)', transition:'transform .2s, box-shadow .2s',
          fontFamily:'inherit'
        }}
          onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(0,0,0,0.3)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.2)'; }}
        >
          <FcGoogle style={{ fontSize:24 }} />
          {lang === 'bn' ? 'গুগল দিয়ে এগিয়ে যান' : 'Continue with Google'}
        </button>

        {/* Features */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, margin:'28px 0', padding:'22px 0', borderTop:'1px solid rgba(255,255,255,0.07)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          {[
            { icon:<FiShield style={{color:'#22c55e'}}/>, text: lang === 'bn' ? 'নিরাপদ গুগল অথেন্টিকেশন' : 'Secure Google Authentication' },
            { icon:<FiZap style={{color:'#fbbf24'}}/>,    text: lang === 'bn' ? 'রিয়েল-টাইমে অর্ডার ট্র্যাক করুন' : 'Track your orders in real-time' },
            { icon:<FiCode style={{color:'#9F67FF'}}/>,   text: lang === 'bn' ? 'ক্লায়েন্ট ড্যাশবোর্ড সুবিধা' : 'Access exclusive client features' },
          ].map((item,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, color:'#94A3B8', fontSize:14 }}>
              <span style={{ flexShrink:0 }}>{item.icon}</span> {item.text}
            </div>
          ))}
        </div>

        <div style={{ marginTop:8 }}>
          <Link href="/" style={{ color:'#94A3B8', fontSize:14, textDecoration:'none', transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='#fff'}
            onMouseLeave={e=>e.currentTarget.style.color='#94A3B8'}>
            {lang === 'bn' ? '← হোমে ফিরে যান' : '← Back to Home'}
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .login-card-box {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
