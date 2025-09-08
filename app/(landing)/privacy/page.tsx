import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('privacy');

const PrivacyPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      Privacy Page
    </div>
  );
};

export default PrivacyPage;
