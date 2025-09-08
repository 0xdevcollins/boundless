import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('terms');

const TermsPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      Terms Page
    </div>
  );
};

export default TermsPage;
