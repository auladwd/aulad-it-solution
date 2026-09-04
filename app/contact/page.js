import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/home/ContactSection';

export const metadata = {
  title: 'যোগাযোগ করুন - Aulad IT Solution',
  description: 'ওয়েবসাইট তৈরির জন্য আজই যোগাযোগ করুন।',
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
