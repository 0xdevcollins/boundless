import React from 'react';
import CleanBannerBg from './CleanBannerBg';
import Link from 'next/link';

const CleanBanner = () => {
  return (
    <div className='px-10 md:px-30'>
      <section className='relative mx-auto min-h-[18rem] max-w-6xl overflow-hidden rounded-[3.2rem]'>
        <div className='absolute inset-0'>
          <CleanBannerBg />
        </div>
        <div className='min[1119px]:flex-row min[1119px]:items-start relative z-10 flex h-full flex-col items-center justify-between gap-8 px-6 py-12 sm:px-10 sm:py-16 lg:py-24'>
          <div className='min[1119px]:text-left flex flex-col gap-3 text-center'>
            <h2 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl'>
              Stay Boundless!
            </h2>
            <p className='mx-auto max-w-md text-base text-[#B5B5B5] sm:text-lg md:mx-0'>
              Ready to validate, fund, or build your next big idea?
            </p>
          </div>
          <div className='flex justify-center gap-4 md:justify-end'>
            <Link
              href='/projects'
              className='rounded-lg border border-[#2B2B2B] px-6 py-3 text-center text-sm font-medium text-[#030303] shadow-sm sm:text-base'
              style={{
                background:
                  'linear-gradient(314.7deg, rgba(147,229,60,0.14) 3.33%, rgba(117,199,30,0) 21.54%, rgba(107,185,20,0.14) 87.82%), #A7F950',
              }}
            >
              Explore Projects
            </Link>
            <Link
              href='/submit'
              className='rounded-lg border border-[#484848] bg-white/30 px-6 py-3 text-center text-sm font-medium text-white sm:text-base'
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
