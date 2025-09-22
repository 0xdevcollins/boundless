'use client';

import BeamBackground from '@/components/landing-page/BeamBackground';
import { Hero } from '@/components/landing-page';
import HowBoundlessWork from '@/components/landing-page/HowBoundlessWork';
import WhyBoundless from '@/components/landing-page/WhyBoundless';
import BackedBy from '@/components/landing-page/BackedBy';
import NewsLetter from '@/components/landing-page/NewsLetter';
import BlogSection from '@/components/landing-page/blog/BlogSection';
import { Footer } from '@/components/landing-page/footer';

export default function LandingPage() {
  return (
    <div className='relative overflow-hidden'>
      <BeamBackground />
      <div className='relative z-10 mx-auto max-w-[1300px] space-y-[60px] md:space-y-[80px]'>
        <Hero />
        <WhyBoundless />
        <BackedBy />
        <NewsLetter />
        <BlogSection />
        <HowBoundlessWork />
        <Footer />
      </div>
    </div>
  );
}
