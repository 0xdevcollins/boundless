'use client';
import Projects from '@/components/Projects';
import React from 'react';

const page = () => {
  return (
    <div className='bg-[#1C1C1C] p-4 sm:p-6 mx-6 rounded-[12px] flex flex-col gap-6 sm:gap-8 '>
      <Projects />
    </div>
  );
};

export default page;
