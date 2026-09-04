import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import FloatingButtons from '@/components/shared/FloatingButtons';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Aulad IT Solution - Professional Web Development Service',
  description:
    'স্কুল, কলেজ, মাদ্রাসা, ক্লিনিক, হাসপাতাল, দোকান ও ব্যবসার জন্য সাশ্রয়ী ও আধুনিক ওয়েবসাইট তৈরি করি। Professional web development service in Bangladesh.',
  keywords:
    'web development bangladesh, website design, school website, college website, hospital website, ecommerce website, portfolio website, MERN stack',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Aulad IT Solution - Professional Web Development',
    description: 'Modern & Affordable Websites for Every Business',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0F172A" />
      </head>
      <body className="animated-bg">
        <AuthProvider>
          <LanguageProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: '#1E293B',
                  color: '#F1F5F9',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                },
                success: { iconTheme: { primary: '#22C55E', secondary: '#1E293B' } },
                error: { iconTheme: { primary: '#EF4444', secondary: '#1E293B' } },
              }}
            />
            {children}
            <FloatingButtons />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
