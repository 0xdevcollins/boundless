import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Loading = () => {
  return (
    <div className='absolute -top-8 -right-16 -bottom-8 -left-16 flex h-screen items-center justify-center bg-[rgba(28,28,28,0.64)] backdrop-blur-[7px]'>
      <LoadingSpinner size='xl' className='text-white' />
    </div>
  );
};

export default Loading;
