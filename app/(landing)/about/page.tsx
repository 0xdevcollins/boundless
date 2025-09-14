import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import Missionpage from '@/components/About-Mission/Missionpage';
import AboutUsDifferent from '@/components/landing-page/about/AboutUsDifferent';

import Timeline from '@/components/landing-page/about/timeline/Timeline';
import AboutLayout from './layout';

import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import { testimonials } from '@/components/testimonials/data/testimonial';
import AboutUsHero from './AboutUsHero';
import OurTeam from './OurTeam';
import Partners from './Partners';

export const metadata: Metadata = generatePageMetadata('about');

const AboutPage = () => {
  return (
    <AboutLayout>
      <div className='text-white  text-center'>
        <Missionpage />
      </div>
      {/* Hero Section */}
      {/* Boundless Difference */}
      <Timeline />

      <div className='relative'>
        <AboutUsHero />
        <div className='relative z-10 space-y-[23px] md:space-y-[80px] max-w-[1300px] mx-auto'>
          <OurTeam />
          <Partners />
          <div className='text-white text-4xl font-bold text-center mt-10'>
            <TestimonialsSection testimonials={testimonials} />
          </div>
        </div>
        <AboutUsDifferent />
      </div>
    </AboutLayout>
  );
};

export default AboutPage;
