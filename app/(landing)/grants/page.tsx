import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('grants');

const GrantPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      Grant Page
    </div>
  );
};

export default GrantPage;
