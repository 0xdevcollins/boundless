'use client';
import PageTransition from '@/components/PageTransition';
import Projects from '@/components/Projects';
import React from 'react';

const page = () => {
  return (
    <PageTransition>
      <div className='min-h-screen'>
        <div className='p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'>
          {/* <div className='bg-[#1C1C1C] p-4 sm:p-6 mx-6 rounded-[12px] flex flex-col gap-6 sm:gap-8 '> */}
            <Projects />
          {/* </div> */}
        </div>
      </div>
    </PageTransition >
  );
};

export default page;
