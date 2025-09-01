import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Navbar, Footer } from '@/components/landing-page';

export const metadata: Metadata = {
  title: 'Boundless - Ideas Made Boundless',
  description:
    'Validate, fund, and grow your project with milestone-based support on Stellar.',
  openGraph: {
    title: 'Boundless - Ideas Made Boundless',
    description:
      'Validate, fund, and grow your project with milestone-based support on Stellar.',
    type: 'website',
    images: [
      {
        url: '/og-image-placeholder.png',
        width: 1200,
        height: 630,
        alt: 'Boundless',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boundless - Ideas Made Boundless',
    description:
      'Validate, fund, and grow your project with milestone-based support on Stellar.',
    images: ['/og-image-placeholder.png'],
  },
};

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
