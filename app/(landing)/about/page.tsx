import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import Timeline from '@/components/landing-page/about/timeline/Timeline';
import AboutLayout from './layout';

export const metadata: Metadata = generatePageMetadata('about');

const AboutPage = () => {
  return (
    <AboutLayout>
      {/*Hero Section */}
      {/*Boundless Difference */}
      <Timeline />
    </AboutLayout>
  );
};

export default AboutPage;
