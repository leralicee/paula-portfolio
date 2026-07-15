import type { Metadata, Viewport } from 'next';
import { fraunces, inter } from '@/lib/fonts';
import SmoothScroll from '@/components/SmoothScroll';
import SiteHeader from '@/components/SiteHeader';
import ScrollProgress from '@/components/ScrollProgress';
import Cursor from '@/components/Cursor';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://paula-portfolio.example'),
  title: 'Paula — Web Developer',
  description:
    'Portfolio of Paula, a web developer based in Spain. Immersive, interactive websites built with Next.js, Three.js and a lot of care for detail.',
  keywords: ['Paula', 'web developer', 'portfolio', 'front-end', 'Next.js', 'creative developer'],
  openGraph: {
    title: 'Paula — Web Developer',
    description: 'I build websites that feel like places.',
    type: 'website',
    locale: 'en_GB',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FBF6F4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-porcelain font-body text-ink antialiased">
        <SmoothScroll />
        <ScrollProgress />
        <SiteHeader />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
