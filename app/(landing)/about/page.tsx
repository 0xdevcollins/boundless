import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import Missionpage from '@/components/About-Mission/Missionpage';
import AboutUsDifferent from '@/components/landing-page/about/AboutUsDifferent';

import Timeline from '@/components/landing-page/about/timeline/Timeline';

import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import { testimonials } from '@/components/testimonials/data/testimonial';
import AboutUsHero from './AboutUsHero';
import OurTeam from './OurTeam';
import Partners from './Partners';

export const metadata: Metadata = generatePageMetadata('about');

const AboutPage = () => {
  return (
    <section>
      <AboutUsHero />
      <div className='relative z-10 space-y-[23px] md:space-y-[80px] max-w-[1300px] mx-auto'>
        <Missionpage />
        <AboutUsDifferent />
        <Timeline />
        <OurTeam />
        <Partners />
        <TestimonialsSection testimonials={testimonials} />
      </div>
    </section>
  );
};

export default AboutPage;
