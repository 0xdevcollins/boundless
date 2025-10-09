import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('hackathons');

const HackathonsPage = () => {
  return (
    <div className='mx-auto mt-10 max-w-[1440px] px-5 py-5 text-center text-4xl font-bold text-white md:px-[50px] lg:px-[100px]'>
      Hackathons Page
    </div>
  );
};

export default HackathonsPage;
