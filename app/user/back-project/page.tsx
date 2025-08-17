import { BoundlessButton } from '@/components/buttons';
import React from 'react';

const page = () => {
  return (
    <div className='min-h-screen space-x-2 w-full flex justify-center items-center text-white'>
      <BoundlessButton>Back Project</BoundlessButton>
      <BoundlessButton>View History</BoundlessButton>
    </div>
  );
};

export default page;
