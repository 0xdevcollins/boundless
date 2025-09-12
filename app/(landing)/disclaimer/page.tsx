import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('disclaimer');

const DisclaimerPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      Disclaimer Page
    </div>
  );
};

export default DisclaimerPage;
