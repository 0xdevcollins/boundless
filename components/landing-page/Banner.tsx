import React from 'react';
import CleanBannerBg from './CleanBannerBg';
import Link from 'next/link';

const CleanBanner = () => {
  return (
    <div className='mb-20'>
      <section className='relative mx-auto min-h-[18rem] overflow-hidden rounded-[3.2rem]'>
        <div className='absolute inset-0'>
          <CleanBannerBg />
        </div>
        <div className='relative z-10 flex h-full flex-col items-center justify-between gap-8 px-6 py-12 min-[1119px]:flex-row min-[1119px]:items-start sm:px-10 sm:py-16 lg:py-24'>
          <div className='flex flex-col gap-3 text-center min-[1119px]:text-left'>
            <h2 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl'>
              Stay Boundless!
            </h2>
            <p className='mx-auto max-w-md text-base text-[#B5B5B5] min-[1119px]:mx-0 sm:text-lg'>
              Ready to validate, fund, or build your next big idea?
            </p>
          </div>

          <div className='flex flex-col justify-center gap-4 sm:flex-row md:justify-end'>
            <Link
              href='/projects'
              className='rounded-lg border border-[#2B2B2B] bg-[#a5f84f] px-20 py-3 text-center text-sm font-medium text-[#030303] shadow-sm sm:px-6 sm:text-base'
            >
              Explore Projects
            </Link>
            <Link
              href='/submit'
              className='rounded-lg border border-[#484848] bg-[#4f4f4f] px-20 py-3 text-center text-sm font-medium text-white sm:px-6 sm:text-base'
            >
              Submit Your Idea
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CleanBanner;
