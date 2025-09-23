import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('codeOfConduct');

const CodeOfConductPage = () => {
  return (
    <div className='mt-10 text-center text-4xl font-bold text-white'>
      Code of Conduct Page
    </div>
  );
};

export default CodeOfConductPage;
