import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('codeOfConduct');

const CodeOfConductPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      Code of Conduct Page
    </div>
  );
};

export default CodeOfConductPage;
