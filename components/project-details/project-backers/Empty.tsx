import React from 'react';
import { BoundlessButton } from '@/components/buttons/BoundlessButton';
import { HandHeart } from 'lucide-react';
import LottieAnimation from '@/components/LottieAnimation';

const Empty = () => {
  return (
    <div className='mx-auto w-full max-w-[400px] space-y-5 py-5 text-center'>
      <LottieAnimation width='400px' />

      <div className='space-y-1'>
        <h3 className='text-center text-base font-medium text-white md:text-lg'>
          Be the first to back this project!
        </h3>
        <p className='text-center text-gray-500'>
          Show your support by funding this project and help bring it to life.
        </p>
      </div>
      <BoundlessButton iconPosition='right' size='lg' icon={<HandHeart />}>
        Back Project
      </BoundlessButton>
    </div>
  );
};

export default Empty;
