import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';
import StatsSection from '@/components/home/StatsSection';

export const metadata = {
  title: 'Aulad IT Solution - স্কুল, কলেজ, ক্লিনিক, হাসপাতালের ওয়েবসাইট',
  description:
    'স্কুল, কলেজ, মাদ্রাসা, ক্লিনিক, হাসপাতাল, মুদির দোকান, ই-কমার্স ও পোর্টফোলিও ওয়েবসাইট সাশ্রয়ী মূল্যে তৈরি করি। Next.js + MongoDB + Firebase।',
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection limit={8} />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
