'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef                        = useRef(null);

  const { user, dbUser, logout, isAdmin, loading } = useAuth();
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close user menu on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      toast.success('Logged out successfully!');
    } catch {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { href: '/',        label: t.nav.home },
    { href: '/services',label: t.nav.services },
    { href: '/about',   label: t.nav.about },
    { href: '/blog',    label: t.nav.blog },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      style={{ borderBottom: scrolled ? '1px solid rgba(124,58,237,0.2)' : 'none' }}
    >
      <div className="container-custom" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>

        {/* ── Logo ── */}
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none' }}>
          <div style={{
            width:36, height:36, borderRadius:10,
            background:'linear-gradient(135deg,#7C3AED,#06B6D4)',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
          }}>
            <HiSparkles style={{ color:'#fff', fontSize:20 }} />
          </div>
          <span style={{ fontWeight:800, fontSize:18, color:'#fff', letterSpacing:'-0.3px' }}>
            Aulad IT<span style={{ color:'#22d3ee' }}> Solution</span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <div style={{ display:'flex', alignItems:'center', gap:28 }} className="hidden-mobile">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize:14, fontWeight:500, textDecoration:'none',
                color: pathname === href ? '#9F67FF' : '#CBD5E1',
                transition:'color .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color='#9F67FF'}
              onMouseLeave={e => e.currentTarget.style.color = pathname === href ? '#9F67FF' : '#CBD5E1'}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ── Right Controls ── */}
        <div style={{ display:'flex', alignItems:'center', gap:12 }} className="hidden-mobile">

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            style={{
              background:'rgba(30,41,59,0.7)', border:'1px solid rgba(124,58,237,0.3)',
              color:'#22d3ee', padding:'5px 13px', borderRadius:50,
              fontSize:13, fontWeight:600, cursor:'pointer'
            }}
          >
            {lang === 'en' ? 'বাং' : 'EN'}
          </button>

          {/* Auth */}
          {loading ? (
            <div style={{ width:32, height:32, borderRadius:'50%', background:'#334155' }} />
          ) : user ? (
            <div style={{ position:'relative' }} ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display:'flex', alignItems:'center', gap:8,
                  background:'rgba(30,41,59,0.7)', border:'1px solid rgba(124,58,237,0.25)',
                  borderRadius:50, padding:'5px 12px 5px 5px', cursor:'pointer'
                }}
              >
                {user.photoURL
                  ? <Image src={user.photoURL} alt="" width={26} height={26} style={{ borderRadius:'50%' }} />
                  : <div style={{ width:26, height:26, borderRadius:'50%', background:'#7C3AED', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#fff' }}>{user.displayName?.[0]}</div>
                }
                <span style={{ fontSize:13, color:'#CBD5E1', maxWidth:100, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {user.displayName}
                </span>
                <FiChevronDown style={{ color:'#94A3B8', transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0)', transition:'transform .2s' }} />
              </button>

              {userMenuOpen && (
                <div style={{
                  position:'absolute', right:0, top:'calc(100% + 8px)',
                  background:'rgba(15,23,42,0.98)', border:'1px solid rgba(124,58,237,0.25)',
                  borderRadius:12, padding:'6px', minWidth:180,
                  boxShadow:'0 16px 40px rgba(0,0,0,0.5)', zIndex:1001
                }}>
                  <DropLink href="/dashboard"   icon={<FiUser />}     label={t.nav.dashboard} onClick={() => setUserMenuOpen(false)} />
                  {isAdmin && <DropLink href="/admin" icon={<FiSettings />} label={t.nav.admin} onClick={() => setUserMenuOpen(false)} color="#22d3ee" />}
                  <div style={{ borderTop:'1px solid #1E293B', margin:'4px 0' }} />
                  <button onClick={handleLogout} style={{
                    display:'flex', alignItems:'center', gap:8, width:'100%',
                    padding:'9px 12px', borderRadius:8, background:'none', border:'none',
                    color:'#f87171', fontSize:14, cursor:'pointer', fontFamily:'inherit'
                  }}>
                    <FiLogOut /> {t.nav.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="btn-primary" style={{ padding:'8px 20px', fontSize:14 }}>
              {t.nav.login}
            </Link>
          )}
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="show-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background:'none', border:'none', color:'#CBD5E1', fontSize:24, cursor:'pointer' }}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div style={{
          background:'rgba(15,23,42,0.98)', borderTop:'1px solid rgba(124,58,237,0.2)',
          backdropFilter:'blur(16px)'
        }}>
          <div className="container-custom" style={{ paddingTop:16, paddingBottom:20, display:'flex', flexDirection:'column', gap:4 }}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding:'10px 4px', fontSize:15, fontWeight:500, textDecoration:'none',
                  color: pathname === href ? '#9F67FF' : '#CBD5E1',
                  borderBottom:'1px solid rgba(255,255,255,0.05)'
                }}
              >
                {label}
              </Link>
            ))}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:12, paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={toggleLang} style={{ background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', color:'#22d3ee', padding:'5px 14px', borderRadius:50, fontSize:13, fontWeight:600, cursor:'pointer' }}>
                {lang === 'en' ? 'বাং' : 'EN'}
              </button>
              {!user && (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ padding:'8px 18px', fontSize:13 }}>
                  {t.nav.login}
                </Link>
              )}
              {user && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, alignItems:'center' }}>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{ color:'#22d3ee', fontSize:13, textDecoration:'none', padding:'6px 12px', border:'1px solid rgba(6,182,212,0.3)', borderRadius:8 }}>
                    {t.nav.dashboard}
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)} style={{ color:'#9F67FF', fontSize:13, textDecoration:'none', padding:'6px 12px', border:'1px solid rgba(124,58,237,0.3)', borderRadius:8 }}>
                      {t.nav.admin}
                    </Link>
                  )}
                  <button onClick={handleLogout} style={{ background:'none', border:'1px solid rgba(239,68,68,0.4)', color:'#f87171', padding:'6px 14px', borderRadius:8, fontSize:13, cursor:'pointer' }}>
                    {t.nav.logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Responsive helpers ── */}
      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
      `}</style>
    </nav>
  );
}

function DropLink({ href, icon, label, onClick, color = '#CBD5E1' }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display:'flex', alignItems:'center', gap:8,
        padding:'9px 12px', borderRadius:8, textDecoration:'none',
        color, fontSize:14, transition:'background .15s'
      }}
      onMouseEnter={e => e.currentTarget.style.background='rgba(124,58,237,0.12)'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}
    >
      {icon} {label}
    </Link>
  );
}
