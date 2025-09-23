import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('terms');

const TermsPage = () => {
  return (
    <div className='mt-10 text-center text-4xl font-bold text-white'>
      Terms Page
    </div>
  );
};

export default TermsPage;
