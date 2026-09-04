const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://aulad_it_solution:9Ya4RcKo2EHZxS3d@ac-ekxsg0g-shard-00-00.mcy2lk0.mongodb.net:27017,ac-ekxsg0g-shard-00-01.mcy2lk0.mongodb.net:27017,ac-ekxsg0g-shard-00-02.mcy2lk0.mongodb.net:27017/IT_Solution_Database?ssl=true&replicaSet=atlas-aw2bfo-shard-0&authSource=admin&retryWrites=true&w=majority';

const servicesData = [
  {
    title: 'Smart School Management & Portal Website',
    titleBn: 'স্মার্ট স্কুল ম্যানেজমেন্ট ও ইনফরমেশন পোর্টাল',
    slug: 'smart-school-management-website',
    category: 'school',
    description: 'Complete digital website solution for schools with online student admission, digital notice board, exam routine, result publication system, and faculty directory.',
    descriptionBn: 'স্কুলের জন্য পূর্ণাঙ্গ ডিজিটাল ওয়েবসাইট। অনলাইন ভর্তি আবেদন, রেজাল্ট পাবলিশ, নোটিশ বোর্ড, ক্লাস রুটিন ও শিক্ষক ডিরেক্টরি সম্বলিত আধুনিক পোর্টাল।',
    features: [
      'Online Student Admission System',
      'Digital Result & Marks Publication',
      'Notice Board & Events Calendar',
      'Teacher & Staff Directory Profile',
      'Class Routine & Syllabus Download'
    ],
    featuresBn: [
      'অনলাইন ভর্তি আবেদন ব্যবস্থা',
      'ডিজিটাল রেজাল্ট পাবলিশ সিস্টেম',
      'নোটিশ বোর্ড ও ইভেন্ট ক্যালেন্ডার',
      'শিক্ষক ও কর্মকর্তা ডিরেক্টরি',
      'ক্লাস রুটিন ও সিলেবাস ডাউনলোড'
    ],
    price: 3999,
    originalPrice: 6500,
    thumbnail: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
    ],
    techStack: ['Next.js', 'MongoDB Atlas', 'Tailwind CSS', 'Vercel'],
    demoUrl: 'https://aulad-it-solution.vercel.app/services/smart-school-management-website',
    isActive: true,
    isFeatured: true,
    deliveryDays: 7,
    totalOrders: 28,
    rating: 5
  },
  {
    title: 'Modern College Academic Portal & CMS',
    titleBn: 'আধুনিক কলেজ একাডেমিক পোর্টাল ও ওয়েবসাইট',
    slug: 'modern-college-academic-portal',
    category: 'college',
    description: 'High-performance academic portal for colleges and institutes with department-wise showcases, teacher databases, syllabus distribution, and notices.',
    descriptionBn: 'কলেজের জন্য আধুনিক তথ্যবহুল একাডেমিক পোর্টাল। বিভাগভিত্তিক তথ্য, শিক্ষক প্যানেল, ভর্তি বিজ্ঞপ্তি ও একাডেমিক ক্যালেন্ডার যুক্ত।',
    features: [
      'Department & Faculty Directory',
      'Admission Prospectus & Circulars',
      'Academic Routine & Calendar',
      'Exam Schedules & Result Gateway',
      'Easy Admin Control Dashboard'
    ],
    featuresBn: [
      'বিভাগ ও অনুষদভিত্তিক শোকেস',
      'ভর্তি প্রসপেক্টাস ও নোটিশ সার্কুলার',
      'একাডেমিক ক্যালেন্ডার ও ক্লাস রুটিন',
      'পরীক্ষার সময়সূচী ও রেজাল্ট গেটওয়ে',
      'মোবাইল ফ্রেন্ডলি কন্ট্রোল প্যানেল'
    ],
    price: 4999,
    originalPrice: 8000,
    thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
    ],
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    demoUrl: 'https://aulad-it-solution.vercel.app/services/modern-college-academic-portal',
    isActive: true,
    isFeatured: false,
    deliveryDays: 8,
    totalOrders: 19,
    rating: 5
  },
  {
    title: 'Digital Madrasa Management & Islamic Portal',
    titleBn: 'ডিজিটাল মাদ্রাসা ম্যানেজমেন্ট ও ওয়েব পোর্টাল',
    slug: 'digital-madrasa-portal-website',
    category: 'madrasa',
    description: 'Specialized Islamic aesthetic web platform for Qawmi and Alia Madrasas with online donation/zakat, student admissions, and religious event announcements.',
    descriptionBn: 'কওমি ও আলিয়া মাদ্রাসার জন্য বিশেষায়িত ইসলামিক ওয়েবসাইট। অনলাইন অনুদান/যাকাত সংগ্রহ, কিতাব তালিকা, নোটিশ বোর্ড ও মোহতামিম প্রোফাইল।',
    features: [
      'Online Donation & Zakat System',
      'Hifz & Kitab Department Section',
      'Mahfil & Event Announcement Board',
      'Muhtamim & Ustad Directory',
      'Lifetime Free Vercel Hosting & SSL'
    ],
    featuresBn: [
      'অনলাইন অনুদান ও যাকাত সংগ্রহ',
      'হিফজ ও কিতাব বিভাগের পূর্ণ বিবরণ',
      'মাহফিল ও ইসলামিক ইভেন্ট নোটিশ',
      'মুহতামিম ও শিক্ষকবৃন্দ তালিকা',
      'আজীবন ফ্রি হোস্টিং ও SSL সিকিউরিটি'
    ],
    price: 3499,
    originalPrice: 5500,
    thumbnail: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80'
    ],
    techStack: ['Next.js', 'MongoDB', 'Tailwind CSS', 'bKash / Nagad'],
    demoUrl: 'https://aulad-it-solution.vercel.app/services/digital-madrasa-portal-website',
    isActive: true,
    isFeatured: true,
    deliveryDays: 6,
    totalOrders: 34,
    rating: 5
  },
  {
    title: 'Medical Clinic & Diagnostic Center Website',
    titleBn: 'ক্লিনিক ও ডায়াগনস্টিক সেন্টার ওয়েবসাইট',
    slug: 'medical-clinic-diagnostic-website',
    category: 'clinic',
    description: 'Modern healthcare portal featuring doctor chambers & schedules, online serial booking, diagnostic test price catalog, and emergency hotline.',
    descriptionBn: 'ডাক্তারদের শিডিউল, অনলাইন সিরিয়াল বুকিং, ডায়াগনস্টিক টেস্ট মূল্যতালিকা ও জরুরি যোগাযোগ সুবিধা সম্বলিত ক্লিনিক ওয়েবসাইট।',
    features: [
      'Doctor Chamber Schedule & Profiles',
      'Instant Online Appointment Serial',
      'Diagnostic Tests Rate List',
      'WhatsApp One-Click Emergency Help',
      'Patient Reviews & Testimonials'
    ],
    featuresBn: [
      'ডাক্তার চেম্বার ও ভিজিটিং সময়সূচী',
      'অনলাইন অ্যাপয়েন্টমেন্ট সিরিয়াল বুকিং',
      'প্যাথলজি ও টেস্টের রেটচার্ট তালিকা',
      'জরুরি হোয়াটসঅ্যাপ ও কল বাটন',
      'রোগীদের ফিডব্যাক ও মতামত সেকশন'
    ],
    price: 4499,
    originalPrice: 7500,
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    ],
    techStack: ['Next.js', 'Firebase', 'MongoDB', 'Tailwind CSS'],
    demoUrl: 'https://aulad-it-solution.vercel.app/services/medical-clinic-diagnostic-website',
    isActive: true,
    isFeatured: false,
    deliveryDays: 7,
    totalOrders: 22,
    rating: 5
  },
  {
    title: 'Specialized Hospital & Emergency Healthcare Portal',
    titleBn: 'স্পেশালাইজড হাসপাতাল ও হেলথকেয়ার পোর্টাল',
    slug: 'specialized-hospital-healthcare-portal',
    category: 'hospital',
    description: 'Comprehensive medical website for hospitals featuring 24/7 emergency hotline, department-wise specialist directories, ICU/cabin information, and booking.',
    descriptionBn: 'আধুনিক হাসপাতালের পূর্ণাঙ্গ ডিজিটাল প্ল্যাটফর্ম। বিশেষজ্ঞ ডাক্তার তালিকা, আইসিইউ/কেবিন সুবিধা, অ্যাম্বুলেন্স সেবা ও জরুরি হটলাইন।',
    features: [
      '24/7 Emergency & Ambulance Service',
      'Specialist Doctor Directory by Department',
      'Cabin & Bed Admission Guidelines',
      'Online Medical Consultation Form',
      'Ultra-Fast & Mobile-Friendly UX'
    ],
    featuresBn: [
      '২৪/৭ ইমার্জেন্সি ও অ্যাম্বুলেন্স হটলাইন',
      'বিভাগভিত্তিক বিশেষজ্ঞ ডাক্তার প্যানেল',
      'কেবিন ও বেড সুবিধা সংক্রান্ত গাইড',
      'অনলাইন কনসালটেশন ও ইনকোয়ারি',
      'মোবাইল ফ্রেন্ডলি ও দ্রুতগতির ব্রাউজিং'
    ],
    price: 5999,
    originalPrice: 9500,
    thumbnail: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'
    ],
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    demoUrl: 'https://aulad-it-solution.vercel.app/services/specialized-hospital-healthcare-portal',
    isActive: true,
    isFeatured: true,
    deliveryDays: 9,
    totalOrders: 17,
    rating: 5
  },
  {
    title: 'Online Grocery Store & Daily Bazaar Delivery App',
    titleBn: 'অনলাইন মুদির দোকান ও সুপারশপ ডেলিভারি ওয়েবসাইট',
    slug: 'online-grocery-supermarket-shop',
    category: 'grocery',
    description: 'Fast, clean online grocery store with instant add-to-cart, categorized fresh products, Cash on Delivery, bKash checkout, and WhatsApp order.',
    descriptionBn: 'দৈনন্দিন মুদি বাজার ও সুপারশপের জন্য গতিশীল অনলাইন শপ। ঝটপট কার্ট, ক্যাশ অন ডেলিভারি, এবং হোয়াটসঅ্যাপে সরাসরি অর্ডারের চমৎকার সুবিধা।',
    features: [
      'Instant Cart & Quick Checkout Flow',
      'Cash on Delivery & bKash / Nagad',
      'Organized Categories (Rice, Oil, Fresh Items)',
      'Direct WhatsApp Order Button',
      'Simple Admin Stock & Product Manager'
    ],
    featuresBn: [
      'ঝটপট কার্ট ও সহজ চেকআউট প্রক্রিয়া',
      'ক্যাশ অন ডেলিভারি ও বিকাশ পেমেন্ট',
      'ক্যাটাগরিভিত্তিক ফ্রেশ পণ্য ব্রাউজিং',
      'সরাসরি হোয়াটসঅ্যাপে অর্ডার পাঠানোর ব্যবস্থা',
      'সহজ পণ্য ও স্টক ম্যানেজমেন্ট প্যানেল'
    ],
    price: 3499,
    originalPrice: 6000,
    thumbnail: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80'
    ],
    techStack: ['Next.js', 'MongoDB Atlas', 'Tailwind CSS', 'COD / bKash'],
    demoUrl: 'https://aulad-it-solution.vercel.app/services/online-grocery-supermarket-shop',
    isActive: true,
    isFeatured: true,
    deliveryDays: 6,
    totalOrders: 42,
    rating: 5
  },
  {
    title: 'Full-Featured Multi-Product E-Commerce Store',
    titleBn: 'সম্পূর্ণ ই-কমার্স অনলাইন শপিং ওয়েবসাইট',
    slug: 'full-featured-ecommerce-store',
    category: 'ecommerce',
    description: 'Complete high-converting online storefront for fashion, electronics, and retail businesses. Features product variants, coupons, invoice generator, and order tracking.',
    descriptionBn: 'ফ্যাশন, গ্যাজেট বা যেকোনো পণ্যের জন্য আধুনিক অনলাইন স্টোর। ডিসকাউন্ট কুপন, অর্ডার ট্র্যাকিং, ইনভেন্টরি ও স্বয়ংক্রিয় ইনভয়েস জেনারেটর।',
    features: [
      'Product Variants (Size, Color, Pricing)',
      'Discount Coupons & Promo Codes',
      'Customer Order Tracking & Accounts',
      'Automated PDF Invoice Generation',
      'Payment Gateway & COD Support'
    ],
    featuresBn: [
      'সাইজ ও কালার ভ্যারিয়েশন ব্যবস্থাপনা',
      'ডিসকাউন্ট কুপন ও প্রমো কোড ফিচার',
      'কাস্টমার অ্যাকাউন্ট ও অর্ডার ট্র্যাকিং',
      'স্বয়ংক্রিয় ইনভয়েস ও মেমো তৈরি',
      'অনলাইন পেমেন্ট গেটওয়ে ও ক্যাশ অন ডেলিভারি'
    ],
    price: 4999,
    originalPrice: 8500,
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'
    ],
    techStack: ['Next.js 15', 'MongoDB', 'Tailwind CSS', 'SSL / bKash'],
    demoUrl: 'https://aulad-it-solution.vercel.app/services/full-featured-ecommerce-store',
    isActive: true,
    isFeatured: true,
    deliveryDays: 8,
    totalOrders: 39,
    rating: 5
  },
  {
    title: 'Creative Personal & Agency Portfolio Website',
    titleBn: 'ক্রিয়েটিভ পার্সোনাল ও এজেন্সি পোর্টফোলিও',
    slug: 'creative-personal-agency-portfolio',
    category: 'portfolio',
    description: 'Eye-catching dark-mode portfolio for developers, designers, freelancers, and creative agencies. Showcase projects with smooth animations, CV download, and inquiries.',
    descriptionBn: 'ডেভেলপার, ডিজাইনার ও ফ্রিল্যান্সারদের জন্য চমৎকার ডার্ক থিম পোর্টফোলিও। অ্যানিমেটেড প্রজেক্ট শোকেস, সিভি ডাউনলোড ও সরাসরি ক্লায়েন্ট ইনকোয়ারি ফর্ম।',
    features: [
      'Animated Project Gallery & Case Studies',
      'Interactive Skills & Experience Timeline',
      'One-Click Resume / CV Download',
      'Direct Client Contact & Inquiry Form',
      'Perfect 100 SEO & Fast Performance'
    ],
    featuresBn: [
      'অ্যানিমেটেড প্রজেক্ট গ্যালারি ও কেস স্টাডি',
      'দক্ষতা ও অভিজ্ঞতার ইন্টারঅ্যাক্টিভ টাইমলাইন',
      '১-ক্লিক সিভি / জীবনবৃত্তান্ত ডাউনলোড',
      'সরাসরি ক্লায়েন্ট ইনকোয়ারি ও মেসেজ ফর্ম',
      '১০০% এসইও ফ্রেন্ডলি ও সুপারফাস্ট স্পিড'
    ],
    price: 2499,
    originalPrice: 4500,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
    ],
    techStack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
    demoUrl: 'https://aulad-it-solution.vercel.app/services/creative-personal-agency-portfolio',
    isActive: true,
    isFeatured: false,
    deliveryDays: 4,
    totalOrders: 48,
    rating: 5
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully.');

    const ServiceCollection = mongoose.connection.db.collection('services');

    for (const service of servicesData) {
      await ServiceCollection.updateOne(
        { slug: service.slug },
        { $set: { ...service, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
        { upsert: true }
      );
      console.log(`✓ Seeded service [${service.category}]: ${service.title}`);
    }

    const count = await ServiceCollection.countDocuments();
    console.log(`All done! Total services in database: ${count}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding services:', err);
    process.exit(1);
  }
}

seed();
