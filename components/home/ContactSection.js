'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactSection() {
  const { t, lang } = useLanguage();
  const [form, setForm]       = useState({ name:'', email:'', phone:'', message:'' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      toast.success(t.contact.success || 'Message sent! We will contact you soon. 🎉');
      setForm({ name:'', email:'', phone:'', message:'' });
    } catch {
      toast.error(t.contact.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { icon:<FiPhone style={{color:'#9F67FF',fontSize:20}}/>, label: t.contact.phoneLabel || (lang==='bn'?'ফোন':'Phone'), value:'+880 1302-608955' },
    { icon:<FiMail  style={{color:'#22d3ee',fontSize:20}}/>, label: t.contact.emailLabel || (lang==='bn'?'ইমেইল':'Email'), value:'auladdevops@gmail.com' },
    { icon:<FiMapPin style={{color:'#f87171',fontSize:20}}/>,label: t.contact.locationLabel || (lang==='bn'?'ঠিকানা':'Location'), value: t.contact.locationVal || (lang==='bn'?'বাংলাদেশ':'Bangladesh') },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div className="badge" style={{ marginBottom:16, display:'inline-flex' }}>
            {lang === 'bn' ? '📞 যোগাযোগ' : '📞 Get In Touch'}
          </div>
          <h2 style={{ color:'#fff', fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:900, marginBottom:16 }}>
            {t.contact.title}
          </h2>
          <p style={{ color:'#94A3B8', maxWidth:480, margin:'0 auto' }}>
            {t.contact.subtitle}
          </p>
        </div>

        <div className="contact-main-grid">

          {/* ── Contact Info ── */}
          <div>
            <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:28 }}>
              {contactItems.map((item,i)=>(
                <div key={i} className="glass" style={{ display:'flex', alignItems:'center', gap:18, padding:'18px 22px', borderRadius:14 }}>
                  <div style={{ width:46, height:46, borderRadius:12, background:'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{item.icon}</div>
                  <div>
                    <p style={{ color:'#64748B', fontSize:12, marginBottom:3 }}>{item.label}</p>
                    <p style={{ color:'#fff', fontWeight:600, fontSize:15 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/8801302608955?text=Hello! I need a website."
              target="_blank" rel="noreferrer"
              style={{
                display:'flex', alignItems:'center', gap:12,
                background:'rgba(37,211,102,0.1)', border:'1.5px solid rgba(37,211,102,0.35)',
                color:'#22c55e', padding:'16px 22px', borderRadius:14,
                fontWeight:600, fontSize:15, textDecoration:'none',
                transition:'background .2s'
              }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(37,211,102,0.18)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(37,211,102,0.1)'}
            >
              <FaWhatsapp style={{ fontSize:26 }} />
              {t.contact.whatsapp}
            </a>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="glass contact-form-card">
            <div className="contact-inputs-row">
              <div>
                <label style={{ color:'#94A3B8', fontSize:13, display:'block', marginBottom:7 }}>{t.contact.name} *</label>
                <input className="input-dark" placeholder={lang==='bn'?'নাম লিখুন':'John Doe'} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
              </div>
              <div>
                <label style={{ color:'#94A3B8', fontSize:13, display:'block', marginBottom:7 }}>{t.contact.phone}</label>
                <input className="input-dark" placeholder="+880 1XXXXXXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
              </div>
            </div>
            <div>
              <label style={{ color:'#94A3B8', fontSize:13, display:'block', marginBottom:7 }}>{t.contact.email} *</label>
              <input type="email" className="input-dark" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
            </div>
            <div>
              <label style={{ color:'#94A3B8', fontSize:13, display:'block', marginBottom:7 }}>{t.contact.message} *</label>
              <textarea className="input-dark" rows={5} placeholder={t.contact.msgPlaceholder || 'Tell us about your project...'} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required style={{ resize:'vertical' }} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent:'center', padding:'13px 24px', fontSize:15, opacity: loading ? 0.7 : 1 }}>
              {loading ? <span style={{ width:20, height:20, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', animation:'spin .7s linear infinite', display:'inline-block' }} /> : <><FiSend /> {t.contact.send}</>}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 48px;
          align-items: start;
        }
        .contact-form-card {
          padding: 34px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-inputs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 600px) {
          .contact-form-card {
            padding: 22px 18px !important;
            border-radius: 16px !important;
          }
          .contact-inputs-row {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
