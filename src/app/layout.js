import './globals.css';
import { Inter, Manrope } from 'next/font/google';
import { SugarProvider } from '@/context/SugarContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'SugarCare - Reduce Blood Sugar Naturally',
    template: '%s | SugarCare',
  },
  description: 'Track, plan, and improve your blood sugar with science-backed habits. Doctor-guided meal plans, glucose tracking, and habit coaching for diabetes management.',
  keywords: ['blood sugar', 'diabetes', 'glucose tracker', 'low GI foods', 'meal plan', 'diabetes management', 'natural blood sugar control'],
  openGraph: {
    title: 'SugarCare - Reduce Blood Sugar Naturally',
    description: 'Track, plan, and improve your blood sugar with science-backed habits.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'SugarCare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SugarCare - Reduce Blood Sugar Naturally',
    description: 'Track, plan, and improve your blood sugar with science-backed habits.',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#006e2f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container pb-24 md:pb-0">
        <SugarProvider>
          {children}
        </SugarProvider>
      </body>
    </html>
  );
}
