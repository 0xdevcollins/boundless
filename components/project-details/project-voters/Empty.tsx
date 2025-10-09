import React from 'react';
import Image from 'next/image';
import { BoundlessButton } from '@/components/buttons/BoundlessButton';
import { ArrowUpIcon } from 'lucide-react';

const Empty = () => {
  return (
    <div className='mx-auto w-full max-w-[400px] space-y-5 py-5 text-center'>
      <Image
        src='/Humanoid.svg'
        alt='Empty state illustration'
        width={400}
        height={400}
        className='h-[400px] w-[400px] rounded-lg'
      />
      <div className='space-y-1'>
        <h3 className='text-center text-base font-medium text-white md:text-lg'>
          Cast the First Vote!
        </h3>
        <p className='text-center text-gray-500'>
          Support this Project with your vote.
        </p>
      </div>
      <BoundlessButton iconPosition='left' size='lg' icon={<ArrowUpIcon />}>
        Upvote
      </BoundlessButton>
    </div>
  );
};

export default Empty;
