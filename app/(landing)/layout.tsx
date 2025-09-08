import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Navbar } from '@/components/landing-page';
import { generatePageMetadata } from '@/lib/metadata';

// Generate metadata for the landing layout (home page)
export const metadata: Metadata = generatePageMetadata('home');

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className='min-h-screen flex flex-col bg-background pt-5 md:pt-11 relative'>
      <Navbar />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
