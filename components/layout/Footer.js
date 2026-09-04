'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { HiSparkles } from 'react-icons/hi2';
import { FiPhone, FiMail, FiMapPin, FiChevronRight, FiArrowUp } from 'react-icons/fi';
import { FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: '/',         label: t.nav?.home || (lang === 'en' ? 'Home' : 'হোম') },
    { href: '/services', label: t.nav?.services || (lang === 'en' ? 'Services' : 'সার্ভিস') },
    { href: '/about',    label: t.nav?.about || (lang === 'en' ? 'About' : 'আমাদের সম্পর্কে') },
    { href: '/blog',     label: t.nav?.blog || (lang === 'en' ? 'Blog' : 'ব্লগ') },
    { href: '/contact',  label: t.nav?.contact || (lang === 'en' ? 'Contact' : 'যোগাযোগ') },
  ];

  const serviceLinks = [
    { href: '/services?category=school',    label: lang === 'en' ? 'School Website'   : 'স্কুল ওয়েবসাইট' },
    { href: '/services?category=college',   label: lang === 'en' ? 'College Website'  : 'কলেজ ওয়েবসাইট' },
    { href: '/services?category=clinic',    label: lang === 'en' ? 'Clinic Website'   : 'ক্লিনিক ওয়েবসাইট' },
    { href: '/services?category=ecommerce', label: lang === 'en' ? 'E-Commerce Site'  : 'ই-কমার্স সাইট' },
    { href: '/services?category=portfolio', label: lang === 'en' ? 'Portfolio Site'   : 'পোর্টফোলিও সাইট' },
  ];

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-root">
      {/* Top glowing ambient gradient line */}
      <div className="footer-top-glow" />

      <div className="container-custom footer-main-wrap">
        <div className="footer-layout">

          {/* 1. Brand Section */}
          <div className="footer-brand-col">
            <Link
              href="/"
              className="footer-logo-wrap"
              style={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                textDecoration: 'none',
                width: 'fit-content',
              }}
            >
              <div
                className="footer-logo-icon"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)',
                }}
              >
                <HiSparkles style={{ color: '#fff', fontSize: '20px' }} />
              </div>
              <span
                className="footer-logo-title"
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                Aulad IT <span className="text-cyan" style={{ color: '#22d3ee' }}>Solution</span>
              </span>
            </Link>

            <p className="footer-brand-desc">
              {t.footer?.description || (lang === 'en'
                ? 'We build modern, fast and affordable websites for businesses across Bangladesh.'
                : 'বাংলাদেশ জুড়ে ব্যবসার জন্য আধুনিক, দ্রুত ও সাশ্রয়ী ওয়েবসাইট তৈরি করি।')}
            </p>

            {/* Active Status Badge */}
            <div className="footer-status-badge">
              <span className="pulse-dot">
                <span className="pulse-ring" />
                <span className="pulse-core" />
              </span>
              <span className="status-text">
                {t.footer?.available || (lang === 'en' ? 'Available for new projects' : 'নতুন প্রজেক্টের জন্য প্রস্তুত')}
              </span>
            </div>

            {/* Social Icons */}
            <div className="footer-social-row">
              <a
                href="https://www.facebook.com/auladwd/"
                target="_blank"
                rel="noreferrer"
                className="social-btn fb-hover"
                aria-label="Facebook"
                title="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.youtube.com/@auladinfo"
                target="_blank"
                rel="noreferrer"
                className="social-btn yt-hover"
                aria-label="YouTube"
                title="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://wa.me/8801302608955"
                target="_blank"
                rel="noreferrer"
                className="social-btn wa-hover"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* 2. Quick Links Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">
              {t.footer?.quickLinks || (lang === 'en' ? 'Quick Links' : 'দ্রুত লিঙ্ক')}
              <span className="title-accent-line" />
            </h4>
            <ul className="footer-link-list">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="footer-nav-link"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      padding: '3px 0',
                    }}
                  >
                    <FiChevronRight
                      className="link-arrow"
                      style={{ fontSize: '13px', minWidth: '13px', flexShrink: 0 }}
                    />
                    <span className="link-text">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Our Services Column */}
          <div className="footer-services-col">
            <h4 className="footer-col-title">
              {t.footer?.ourServices || (lang === 'en' ? 'Our Services' : 'সার্ভিস')}
              <span className="title-accent-line" />
            </h4>
            <ul className="footer-link-list">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="footer-nav-link"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      padding: '3px 0',
                    }}
                  >
                    <FiChevronRight
                      className="link-arrow"
                      style={{ fontSize: '13px', minWidth: '13px', flexShrink: 0 }}
                    />
                    <span className="link-text">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Column */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">
              {t.footer?.contact || (lang === 'en' ? 'Get In Touch' : 'যোগাযোগ')}
              <span className="title-accent-line" />
            </h4>

            <div className="footer-contact-cards">
              <a href="tel:+8801302608955" className="contact-card-item">
                <div className="contact-icon-box purple-box">
                  <FiPhone />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">{lang === 'en' ? 'Phone' : 'ফোন'}</span>
                  <span className="contact-card-val">+880 1302-608955</span>
                </div>
              </a>

              <a href="mailto:auladdevops@gmail.com" className="contact-card-item">
                <div className="contact-icon-box cyan-box">
                  <FiMail />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">{lang === 'en' ? 'Email' : 'ইমেইল'}</span>
                  <span className="contact-card-val">auladdevops@gmail.com</span>
                </div>
              </a>

              <div className="contact-card-item">
                <div className="contact-icon-box rose-box">
                  <FiMapPin />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">{lang === 'en' ? 'Location' : 'ঠিকানা'}</span>
                  <span className="contact-card-val">
                    {t.footer?.location || (lang === 'en' ? 'Dhaka, Bangladesh' : 'ঢাকা, বাংলাদেশ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Back-to-top Bar */}
      <div className="footer-bottom-bar">
        <div className="container-custom footer-bottom-inner">
          <div className="copyright-wrap flex justify-center">
            <p className="copyright-text">
              © {year} <span className="text-white font-medium">Aulad IT Solution</span>. {t.footer?.rights || (lang === 'en' ? 'All rights reserved.' : 'সর্বস্বত্ব সংরক্ষিত।')}
            </p>
            <p className="tech-stack-text">
              {t.footer?.builtWith || (lang === 'en' ? 'Built with Next.js, MongoDB & Tailwind CSS' : 'Next.js, MongoDB ও Tailwind CSS দিয়ে তৈরি')}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
            title={t.footer?.backToTop || (lang === 'en' ? 'Back to Top' : 'উপরে যান')}
            aria-label="Back to Top"
          >
            <span>{t.footer?.backToTop || (lang === 'en' ? 'Back to Top' : 'উপরে যান')}</span>
            <div className="btn-arrow-circle">
              <FiArrowUp />
            </div>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .footer-logo-wrap {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 12px !important;
          margin-bottom: 16px !important;
          text-decoration: none !important;
          width: fit-content !important;
        }

        .footer-logo-icon {
          width: 40px !important;
          height: 40px !important;
          border-radius: 12px !important;
          background: linear-gradient(135deg, #7c3aed, #06b6d4) !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
          box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35) !important;
          transition: transform 0.25s ease !important;
        }

        .footer-logo-wrap:hover .footer-logo-icon {
          transform: scale(1.08) rotate(5deg) !important;
        }

        .footer-logo-title {
          font-size: 20px !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          letter-spacing: -0.01em !important;
          white-space: nowrap !important;
        }

        .footer-nav-link {
          color: #94a3b8 !important;
          font-size: 13.5px !important;
          transition: all 0.2s ease !important;
        }

        .footer-nav-link .link-arrow {
          color: #64748b !important;
          transition: transform 0.2s ease, color 0.2s ease !important;
        }

        .footer-nav-link:hover {
          color: #22d3ee !important;
          transform: translateX(3px) !important;
        }

        .footer-nav-link:hover .link-arrow {
          color: #22d3ee !important;
        }
      `}</style>

      <style jsx>{`
        .footer-root {
          position: relative;
          background: linear-gradient(180deg, #0c1322 0%, #070a13 100%);
          border-top: 1px solid rgba(124, 58, 237, 0.2);
          margin-top: 80px;
          color: #94a3b8;
          overflow: hidden;
        }

        .footer-top-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.7), rgba(34, 211, 238, 0.7), transparent);
          box-shadow: 0 0 16px rgba(124, 58, 237, 0.4);
        }

        .footer-main-wrap {
          padding-top: 60px;
          padding-bottom: 44px;
          position: relative;
          z-index: 1;
        }

        /* ── Grid Layout (Desktop 4 Columns) ── */
        .footer-layout {
          display: grid;
          grid-template-columns: 3.5fr 1.8fr 2.1fr 3.2fr;
          gap: 40px;
          align-items: start;
        }

        /* ── 1. Brand Column ── */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
        }

        .sparkle-icon {
          color: #ffffff;
          font-size: 20px;
        }

        .text-cyan {
          color: #22d3ee;
        }

        .footer-brand-desc {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 18px;
          max-width: 340px;
        }

        .footer-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          width: fit-content;
          margin-bottom: 22px;
        }

        .pulse-dot {
          position: relative;
          display: flex;
          width: 8px;
          height: 8px;
        }

        .pulse-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          background-color: #22c55e;
          opacity: 0.75;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .pulse-core {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #22c55e;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        .status-text {
          font-size: 12.5px;
          font-weight: 500;
          color: #4ade80;
        }

        .footer-social-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .social-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        .fb-hover:hover {
          color: #3b82f6;
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.12);
        }

        .yt-hover:hover {
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.5);
          background: rgba(239, 68, 68, 0.12);
        }

        .wa-hover:hover {
          color: #22c55e;
          border-color: rgba(34, 197, 94, 0.5);
          background: rgba(34, 197, 94, 0.12);
        }

        /* ── 2 & 3. Link Columns ── */
        .footer-links-col,
        .footer-services-col {
          display: flex;
          flex-direction: column;
        }

        .footer-col-title {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 18px;
          letter-spacing: 0.01em;
          width: fit-content;
        }

        .title-accent-line {
          margin-top: 6px;
          width: 24px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #7c3aed, #06b6d4);
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ── 4. Contact Column ── */
        .footer-contact-col {
          display: flex;
          flex-direction: column;
        }

        .footer-contact-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-card-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        a.contact-card-item:hover {
          background: rgba(124, 58, 237, 0.08);
          border-color: rgba(124, 58, 237, 0.28);
          transform: translateY(-2px);
        }

        .contact-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .contact-card-item:hover .contact-icon-box {
          transform: scale(1.08);
        }

        .purple-box {
          background: rgba(124, 58, 237, 0.15);
          color: #a78bfa;
          border: 1px solid rgba(124, 58, 237, 0.3);
        }

        .cyan-box {
          background: rgba(6, 182, 212, 0.15);
          color: #22d3ee;
          border: 1px solid rgba(6, 182, 212, 0.3);
        }

        .rose-box {
          background: rgba(244, 63, 94, 0.15);
          color: #fb7185;
          border: 1px solid rgba(244, 63, 94, 0.3);
        }

        .contact-card-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .contact-card-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .contact-card-val {
          font-size: 13.5px;
          color: #cbd5e1;
          font-weight: 500;
        }

        .contact-card-item:hover .contact-card-val {
          color: #ffffff;
        }

        /* ── Bottom Bar ── */
        .footer-bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(8, 12, 20, 0.6);
          padding: 22px 0;
        }

        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .copyright-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .copyright-text {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .text-white {
          color: #e2e8f0;
        }

        .tech-stack-text {
          font-size: 12px;
          color: #475569;
          margin: 0;
        }

        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .back-to-top-btn:hover {
          background: rgba(124, 58, 237, 0.15);
          border-color: rgba(124, 58, 237, 0.35);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .btn-arrow-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .back-to-top-btn:hover .btn-arrow-circle {
          transform: translateY(-2px);
          background: #7c3aed;
          color: #ffffff;
        }

        /* ── Tablet Responsive (640px - 1023px) ── */
        @media (max-width: 1023px) and (min-width: 640px) {
          .footer-layout {
            grid-template-columns: 1fr 1fr;
            gap: 36px 28px;
          }

          .footer-brand-col {
            grid-column: span 2;
          }

          .footer-brand-desc {
            max-width: 100%;
          }

          .footer-links-col {
            grid-column: span 1;
          }

          .footer-services-col {
            grid-column: span 1;
          }

          .footer-contact-col {
            grid-column: span 2;
          }

          .footer-contact-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
        }

        /* ── Mobile Responsive (< 640px) ── */
        @media (max-width: 639px) {
          .footer-root {
            margin-top: 48px;
          }

          .footer-main-wrap {
            padding-top: 40px;
            padding-bottom: 32px;
          }

          /* Two-column layout for Links on mobile! */
          .footer-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px 14px;
          }

          .footer-brand-col {
            grid-column: span 2;
          }

          .footer-brand-desc {
            max-width: 100%;
            font-size: 13.5px;
          }

          .footer-links-col {
            grid-column: span 1;
            padding: 16px 14px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 14px;
          }

          .footer-services-col {
            grid-column: span 1;
            padding: 16px 14px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 14px;
          }

          .footer-col-title {
            font-size: 14.5px;
            margin-bottom: 14px;
          }

          .footer-link-list {
            gap: 10px;
          }

          .footer-contact-col {
            grid-column: span 2;
          }

          .contact-card-item {
            padding: 10px 14px;
          }

          /* Bottom Bar with Safe-area for floating chat button */
          .footer-bottom-bar {
            padding-top: 20px;
            padding-bottom: 96px; /* Prevents floating WhatsApp/chat button from overlapping text */
          }

          .footer-bottom-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
          }

          .copyright-wrap {
            align-items: center;
            text-align: center;
          }

          .back-to-top-btn {
            margin-top: 4px;
          }
        }

        /* ── Extra Small Mobile (< 380px) ── */
        @media (max-width: 379px) {
          .footer-layout {
            gap: 24px 10px;
          }

          .footer-links-col,
          .footer-services-col {
            padding: 12px 10px;
          }

          .contact-card-val {
            font-size: 12.5px;
          }
        }
      `}</style>
    </footer>
  );
}
