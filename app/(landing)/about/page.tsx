import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import Missionpage from '@/components/About-Mission/Missionpage';

export const metadata: Metadata = generatePageMetadata('about');

const AboutPage = () => {
  return (
    <div className='text-white  text-center'>
      <Missionpage />
    </div>
  );
};

export default AboutPage;
