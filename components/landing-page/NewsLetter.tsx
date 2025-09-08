import React from 'react';
import { BoundlessButton } from '../buttons';

const NewsLetter = () => {
  return (
    <div className='w-full h-full my-[98px] px-5 md:px-[100px] relative'>
      <div
        className='shadow-[0_1px_4px_0_rgba(167,249,80,0.14)] p-8 rounded-[10px] flex flex-col lg:flex-row gap-4 justify-between items-center'
        style={{
          background:
            'linear-gradient(315deg, rgba(147,229,60,0.14) 3.33%, rgba(117,199,30,0.00) 21.54%, rgba(107,185,20,0.14) 87.82%), #A7F950',
          backgroundBlendMode: 'soft-light,normal',
        }}
      >
        <h5 className='text-2xl font-medium text-[#020502] leading-[120%] tracking-[-0.48px] text-center lg:text-left'>
          Never miss updates on grants, hackathons, and projects...
        </h5>
        <div>
          <BoundlessButton
            variant='secondary'
            className='bg-background hover:text-background'
            size='xl'
          >
            Subscribe to Our Newsletter
          </BoundlessButton>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
