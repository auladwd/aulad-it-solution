'use client';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { SiMessenger } from 'react-icons/si';
import { FiMessageCircle, FiX } from 'react-icons/fi';

export default function FloatingButtons() {
  const [open, setOpen] = useState(false);
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g,'') || '8801302608955';

  const btnBase = {
    width:52, height:52, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
    textDecoration:'none', transition:'transform .25s, box-shadow .25s', boxShadow:'0 4px 20px rgba(0,0,0,0.35)',
    border:'none', cursor:'pointer', fontSize:26,
  };

  return (
    <div className="floating-container" style={{ position:'fixed', bottom:24, right:24, display:'flex', flexDirection:'column', gap:12, zIndex:999 }}>
      {open && (
        <>
          <a href={`https://wa.me/${wa}?text=Hello! I need a website.`} target="_blank" rel="noreferrer"
            style={{ ...btnBase, background:'#25D366' }} title="WhatsApp"
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.15)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
            <FaWhatsapp style={{ color:'#fff' }} />
          </a>
          <a href="https://m.me/auladwd" target="_blank" rel="noreferrer"
            style={{ ...btnBase, background:'linear-gradient(135deg,#00B2FF,#006AFF,#FF00FF)' }} title="Messenger"
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.15)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
            <SiMessenger style={{ color:'#fff' }} />
          </a>
        </>
      )}
      <button onClick={() => setOpen(!open)} title={open ? 'Close' : 'Contact Us'}
        style={{ ...btnBase, background: open ? '#ef4444' : 'linear-gradient(135deg,#7C3AED,#06B6D4)' }}
        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.12)'}
        onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
        {open ? <FiX style={{ color:'#fff', fontSize:22 }} /> : <FiMessageCircle style={{ color:'#fff', fontSize:22 }} />}
      </button>

      <style>{`
        @media (max-width: 600px) {
          .floating-container {
            bottom: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
