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
      <AboutUsHero />
      <Missionpage />
      <AboutUsDifferent />

      <Timeline />
      <OurTeam />
      <Partners />
      <TestimonialsSection testimonials={testimonials} />
    </AboutLayout>
  );
};

export default AboutPage;
