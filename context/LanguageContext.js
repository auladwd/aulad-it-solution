'use client';
import { createContext, useContext, useState, useEffect } from 'react';

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
      description: 'We build modern, fast and affordable websites for businesses across Bangladesh.',
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      contact: 'Get In Touch',
      rights: 'All rights reserved.',
      location: 'Dhaka, Bangladesh',
      builtWith: 'Built with Next.js, MongoDB & Tailwind CSS',
      available: 'Available for new projects',
      backToTop: 'Back to Top',
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
    features: {
      badge: '🚀 Why Choose Us',
      title: 'Reasons to Choose Aulad IT',
      subtitle: 'Every project is handled with the highest quality standards.',
      items: [
        { title: 'Fast Delivery', desc: 'Your website goes live in 7-14 business days. Speed matters.' },
        { title: 'Affordable Price', desc: 'Premium-quality websites at the lowest prices in Bangladesh.' },
        { title: '24/7 Support', desc: 'We are always here for you — any time, any question.' },
        { title: 'Clean Code', desc: 'Built with MERN Stack — professional, scalable and maintainable.' },
        { title: 'Mobile First', desc: 'Flawlessly responsive across mobile, tablet and desktop.' },
        { title: 'Secure & Reliable', desc: 'Firebase Auth + MongoDB Atlas for a completely secure system.' },
      ],
    },
    faq: {
      badge: '❓ FAQ',
      title: 'Frequently Asked Questions',
      items: [
        { q: 'How long does it take to build a website?', a: 'Usually 7–14 business days. The timeline may vary depending on project complexity and your content readiness.' },
        { q: 'Which hosting platform is used?', a: 'All sites are hosted on Vercel for free, so no separate hosting cost. Custom domains are also supported.' },
        { q: 'What technology stack is used?', a: 'Next.js (React), MongoDB Atlas, Firebase Authentication, and Tailwind CSS — the latest, most reliable stack.' },
        { q: 'Can I update the content later?', a: 'Yes! Each site comes with an Admin Dashboard where you can add, edit, or delete content anytime.' },
        { q: 'How do I make payment?', a: 'Payment via bKash, Nagad, Rocket, or bank transfer. 50% advance, 50% after delivery.' },
        { q: 'Who owns the website after delivery?', a: 'You own 100% of the website. Full source code is handed over to you.' },
      ],
    },
    testimonials: {
      badge: '❤️ Client Reviews',
      title: 'What Our Clients Say',
      items: [
        { name: 'Rahim Uddin', designation: 'Head Teacher', company: 'Adarsha High School', rating: 5, message: 'Amazing work! Our school website was built quickly and beautifully. Very affordable price with top-notch quality.' },
        { name: 'Dr. Karim Hossain', designation: 'Director', company: 'Al-Shefa Clinic', rating: 5, message: 'Excellent clinic website with online appointment and doctor profiles. Everything works perfectly.' },
        { name: 'Sumaiya Begum', designation: 'Entrepreneur', company: 'Sumaiya Fashion', rating: 5, message: 'My e-commerce site is now live! Order management and payment system work brilliantly.' },
      ],
    },
    servicesSection: {
      badge: '✦ Our Services',
      title: 'Ready-Made Websites for Every Need',
      subtitle: 'Order a package, we customize it fully and deliver fast — hosted on Vercel for free!',
      emptyTitle: 'No Services Found',
      emptyDesc: 'No services available in this category yet.',
      daysDelivery: 'days delivery',
      ordersCount: 'orders',
      startingPrice: 'Starting Price',
      featured: 'Featured',
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
      phoneLabel: 'ফোন',
      emailLabel: 'ইমেইল',
      locationLabel: 'ঠিকানা',
      locationVal: 'বাংলাদেশ',
      msgPlaceholder: 'আপনার প্রজেক্টের বিস্তারিত লিখুন...',
      success: 'বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব। 🎉',
      error: 'কোনো সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
    },
    footer: {
      description: 'বাংলাদেশ জুড়ে ব্যবসার জন্য আধুনিক, দ্রুত ও সাশ্রয়ী ওয়েবসাইট তৈরি করি।',
      quickLinks: 'দ্রুত লিঙ্ক',
      ourServices: 'আমাদের সার্ভিস',
      contact: 'যোগাযোগ করুন',
      rights: 'সর্বস্বত্ব সংরক্ষিত।',
      location: 'ঢাকা, বাংলাদেশ',
      builtWith: 'Next.js, MongoDB ও Tailwind CSS দিয়ে তৈরি',
      available: 'নতুন প্রজেক্টের জন্য প্রস্তুত',
      backToTop: 'উপরে যান',
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
    features: {
      badge: '🚀 কেন আমাদের বেছে নেবেন',
      title: 'আওলাদ আইটি বেছে নেওয়ার কারণসমূহ',
      subtitle: 'প্রতিটি প্রজেক্ট সর্বোচ্চ মান ও নিখুঁত দক্ষতার সাথে তৈরি করা হয়।',
      items: [
        { title: 'দ্রুত ডেলিভারি', desc: '৭–১৪ কার্যদিবসের মধ্যে আপনার ওয়েবসাইট লাইভ। দ্রুত ডেলিভারি আমাদের প্রতিশ্রুতি।' },
        { title: 'সাশ্রয়ী মূল্য', desc: 'বাংলাদেশের সবচেয়ে সাশ্রয়ী মূল্যে প্রিমিয়াম কোয়ালিটির ওয়েবসাইট।' },
        { title: '২৪/৭ সাপোর্ট', desc: 'যেকোনো সময়, যেকোনো প্রয়োজনে সার্বক্ষণিক সহায়তা পাবেন।' },
        { title: 'পরিষ্কার কোড', desc: 'MERN Stack দিয়ে তৈরি — প্রফেশনাল, গতিশীল ও সহজে পরিচালনাযোগ্য।' },
        { title: 'মোবাইল ফ্রেন্ডলি', desc: 'মোবাইল, ট্যাবলেট ও কম্পিউটার — সব ডিভাইসেই নিখুঁতভাবে প্রদর্শিত।' },
        { title: 'নিরাপদ ও নির্ভরযোগ্য', desc: 'Firebase Auth এবং MongoDB Atlas দিয়ে সর্বোচ্চ নিরাপত্তা নিশ্চিত।' },
      ],
    },
    faq: {
      badge: '❓ সাধারণ জিজ্ঞাসা',
      title: 'সাধারণ প্রশ্ন ও উত্তর',
      items: [
        { q: 'একটি ওয়েবসাইট তৈরি করতে কত দিন সময় লাগে?', a: 'সাধারণত ৭ থেকে ১৪ কার্যদিবস সময় লাগে। প্রজেক্টের জটিলতা এবং কন্টেন্টের ওপর নির্ভর করে সময় পরিবর্তিত হতে পারে।' },
        { q: 'হোস্টিং কোথায় করা হয় এবং অতিরিক্ত খরচ আছে কি?', a: 'সমস্ত ওয়েবসাইট বিনামূল্যে Vercel-এ হোস্ট করা হয়, ফলে কোনো আলাদা হোস্টিং ফি নেই। কাস্টম ডোমেইনও সহজে যুক্ত করা যায়।' },
        { q: 'কী প্রযুক্তি বা টেকনোলজি ব্যবহার করা হয়?', a: 'Next.js (React), MongoDB Atlas, Firebase Authentication এবং Tailwind CSS — সর্বাধুনিক ও নির্ভরযোগ্য টেকনোলজি।' },
        { q: 'পরবর্তীতে আমি নিজে কি তথ্য বা ছবি পরিবর্তন করতে পারব?', a: 'হ্যাঁ! প্রতিটি সাইটের সাথে একটি শক্তিশালী অ্যাডমিন প্যানেল দেওয়া হয়, যার মাধ্যমে আপনি নিজেই কন্টেন্ট যুক্ত, এডিট বা মুছতে পারবেন।' },
        { q: 'পেমেন্ট কীভাবে করতে হবে?', a: 'বিকাশ, নগদ, রকেট বা ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট করা যাবে। কাজের শুরুতে ৫০% অগ্রিম এবং ডেলিভারির পর বাকি ৫০%।' },
        { q: 'ডেলিভারির পর সাইটের মালিকানা কার থাকবে?', a: 'সাইটের ১০০% মালিকানা আপনার থাকবে। সম্পূর্ণ সোর্স কোড ও অ্যাক্সেস আপনাকে হস্তান্তর করা হবে।' },
      ],
    },
    testimonials: {
      badge: '❤️ ক্লায়েন্টদের মতামত',
      title: 'আমাদের ক্লায়েন্টরা কী বলছেন',
      items: [
        { name: 'রহিম উদ্দিন', designation: 'প্রধান শিক্ষক', company: 'আদর্শ উচ্চ বিদ্যালয়', rating: 5, message: 'চমৎকার কাজ! আমাদের স্কুলের ওয়েবসাইটটি অত্যন্ত দ্রুত ও সুন্দরভাবে তৈরি করে দিয়েছে। কম খরচে অসাধারণ কোয়ালিটি।' },
        { name: 'ডা. করিম হোসেন', designation: 'পরিচালক', company: 'আল-শেফা ক্লিনিক', rating: 5, message: 'অনলাইন অ্যাপয়েন্টমেন্ট ও ডাক্তারদের প্রোফাইলসহ দুর্দান্ত ক্লিনিক ওয়েবসাইট। সবকিছু নিখুঁতভাবে কাজ করছে।' },
        { name: 'সুমাইয়া বেগম', designation: 'উদ্যোক্তা', company: 'সুমাইয়া ফ্যাশন', rating: 5, message: 'আমার ই-কমার্স সাইটটি এখন লাইভ! অর্ডার ম্যানেজমেন্ট ও পেমেন্ট সিস্টেম খুব সুন্দরভাবে কাজ করছে।' },
      ],
    },
    servicesSection: {
      badge: '✦ আমাদের সার্ভিস',
      title: 'প্রতিটি প্রয়োজনে রেডিমেড ওয়েবসাইট',
      subtitle: 'প্যাকেজ অর্ডার করুন, সম্পূর্ণ কাস্টমাইজ করে দ্রুত ডেলিভারি দেওয়া হয় — Vercel-এ ফ্রি হোস্টিং!',
      emptyTitle: 'কোনো সার্ভিস পাওয়া যায়নি',
      emptyDesc: 'এই ক্যাটাগরিতে এখনো কোনো সার্ভিস যুক্ত হয়নি।',
      daysDelivery: 'দিনে ডেলিভারি',
      ordersCount: 'টি অর্ডার',
      startingPrice: 'শুরুর মূল্য',
      featured: 'জনপ্রিয়',
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app_language');
      if (saved === 'en' || saved === 'bn') {
        setLang(saved);
      }
    } catch (e) {
      // Ignore localStorage errors in SSR/private browsing
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang);
      if (lang === 'bn') {
        document.documentElement.classList.add('lang-bn');
        document.body.classList.add('lang-bn');
        document.documentElement.style.fontFamily = "'Hind Siliguri', 'Inter', sans-serif";
        document.body.style.fontFamily = "'Hind Siliguri', 'Inter', sans-serif";
      } else {
        document.documentElement.classList.remove('lang-bn');
        document.body.classList.remove('lang-bn');
        document.documentElement.style.fontFamily = "'Inter', sans-serif";
        document.body.style.fontFamily = "'Inter', sans-serif";
      }
    }
    try {
      localStorage.setItem('app_language', lang);
    } catch (e) {}
  }, [lang]);

  const toggleLang = () => setLang(prev => (prev === 'bn' ? 'en' : 'bn'));

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
