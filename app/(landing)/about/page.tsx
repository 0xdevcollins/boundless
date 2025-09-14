import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import { testimonials } from '@/components/testimonials/data/testimonial';
import AboutUsHero from './AboutUsHero';
import OurTeam from './OurTeam';
import Partners from './Partners';

export const metadata: Metadata = generatePageMetadata('about');

const AboutPage = () => {
  return (
    <div className='relative'>
      <AboutUsHero />
      <div className='relative z-10 space-y-[23px] md:space-y-[80px] max-w-[1300px] mx-auto'>
        <OurTeam />
        <Partners />
        <div className='text-white text-4xl font-bold text-center mt-10'>
          <TestimonialsSection testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
