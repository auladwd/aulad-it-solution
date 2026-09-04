'use client';
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      login: 'Login',
      dashboard: 'Dashboard',
      admin: 'Admin Panel',
      logout: 'Logout',
    },
    hero: {
      badge: 'Professional Web Development',
      title: 'Build Your Dream',
      titleHighlight: 'Website',
      subtitle: 'We create modern, fast and affordable websites for schools, colleges, clinics, hospitals, shops and businesses. Deployed on Vercel — live in days!',
      cta: 'Explore Services',
      ctaSecondary: 'View Demo',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Ready-made websites for every need',
      viewAll: 'View All Services',
      orderNow: 'Order Now',
      viewDemo: 'Live Demo',
      from: 'Starting from',
      delivery: 'Delivery in',
      days: 'days',
    },
    categories: {
      all: 'All',
      school: 'School',
      college: 'College',
      madrasa: 'Madrasa',
      clinic: 'Clinic',
      hospital: 'Hospital',
      grocery: 'Grocery Shop',
      ecommerce: 'E-Commerce',
      portfolio: 'Portfolio',
      other: 'Other',
    },
    stats: {
      projects: 'Projects Completed',
      clients: 'Happy Clients',
      years: 'Years Experience',
      support: 'Support',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Ready to start your project? Contact us today!',
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone Number',
      message: 'Your Message',
      send: 'Send Message',
      whatsapp: 'Chat on WhatsApp',
    },
    footer: {
      description: 'We build modern, affordable websites for businesses across Bangladesh.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
    order: {
      title: 'Place Your Order',
      requirements: 'Project Requirements',
      requirementsPlaceholder: 'Describe your needs, color preferences, content...',
      phone: 'Your Phone Number',
      submit: 'Submit Order',
      success: 'Order placed successfully! We will contact you soon.',
    },
    dashboard: {
      title: 'My Dashboard',
      orders: 'My Orders',
      profile: 'Profile',
      noOrders: 'No orders yet',
    },
    status: {
      pending: 'Pending',
      processing: 'Processing',
      completed: 'Completed',
      cancelled: 'Cancelled',
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      services: 'সার্ভিস',
      about: 'আমাদের সম্পর্কে',
      blog: 'ব্লগ',
      contact: 'যোগাযোগ',
      login: 'লগইন',
      dashboard: 'ড্যাশবোর্ড',
      admin: 'অ্যাডমিন প্যানেল',
      logout: 'লগআউট',
    },
    hero: {
      badge: 'পেশাদার ওয়েব ডেভেলপমেন্ট',
      title: 'আপনার স্বপ্নের',
      titleHighlight: 'ওয়েবসাইট',
      subtitle: 'স্কুল, কলেজ, ক্লিনিক, হাসপাতাল, দোকান ও ব্যবসার জন্য আধুনিক, দ্রুত এবং সাশ্রয়ী ওয়েবসাইট তৈরি করি। Vercel-এ ডেপ্লয় — মাত্র কয়েকদিনে লাইভ!',
      cta: 'সার্ভিস দেখুন',
      ctaSecondary: 'ডেমো দেখুন',
    },
    services: {
      title: 'আমাদের সার্ভিস',
      subtitle: 'প্রতিটি প্রয়োজনে রেডিমেড ওয়েবসাইট',
      viewAll: 'সব সার্ভিস দেখুন',
      orderNow: 'অর্ডার করুন',
      viewDemo: 'লাইভ ডেমো',
      from: 'মাত্র',
      delivery: 'ডেলিভারি',
      days: 'দিনে',
    },
    categories: {
      all: 'সকল',
      school: 'স্কুল',
      college: 'কলেজ',
      madrasa: 'মাদ্রাসা',
      clinic: 'ক্লিনিক',
      hospital: 'হাসপাতাল',
      grocery: 'মুদির দোকান',
      ecommerce: 'ই-কমার্স',
      portfolio: 'পোর্টফোলিও',
      other: 'অন্যান্য',
    },
    stats: {
      projects: 'সম্পন্ন প্রজেক্ট',
      clients: 'সন্তুষ্ট ক্লায়েন্ট',
      years: 'বছরের অভিজ্ঞতা',
      support: 'সাপোর্ট',
    },
    contact: {
      title: 'যোগাযোগ করুন',
      subtitle: 'প্রজেক্ট শুরু করতে চান? আজই যোগাযোগ করুন!',
      name: 'আপনার নাম',
      email: 'ইমেইল ঠিকানা',
      phone: 'ফোন নম্বর',
      message: 'আপনার বার্তা',
      send: 'বার্তা পাঠান',
      whatsapp: 'WhatsApp-এ চ্যাট করুন',
    },
    footer: {
      description: 'বাংলাদেশ জুড়ে ব্যবসার জন্য আধুনিক ও সাশ্রয়ী ওয়েবসাইট তৈরি করি।',
      quickLinks: 'দ্রুত লিঙ্ক',
      contact: 'যোগাযোগ',
      rights: 'সর্বস্বত্ব সংরক্ষিত।',
    },
    order: {
      title: 'অর্ডার করুন',
      requirements: 'প্রজেক্টের বিবরণ',
      requirementsPlaceholder: 'আপনার প্রয়োজন, রং পছন্দ, কন্টেন্ট সম্পর্কে লিখুন...',
      phone: 'আপনার ফোন নম্বর',
      submit: 'অর্ডার জমা দিন',
      success: 'অর্ডার সফলভাবে জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।',
    },
    dashboard: {
      title: 'আমার ড্যাশবোর্ড',
      orders: 'আমার অর্ডার',
      profile: 'প্রোফাইল',
      noOrders: 'এখনো কোনো অর্ডার নেই',
    },
    status: {
      pending: 'অপেক্ষমান',
      processing: 'প্রক্রিয়াধীন',
      completed: 'সম্পন্ন',
      cancelled: 'বাতিল',
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('bn');
  const t = translations[lang];

  const toggleLang = () => setLang(lang === 'bn' ? 'en' : 'bn');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
