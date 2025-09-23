import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('disclaimer');

const DisclaimerPage = () => {
  return (
    <div className='mt-10 text-center text-4xl font-bold text-white'>
      Disclaimer Page
    </div>
  );
};

export default DisclaimerPage;
