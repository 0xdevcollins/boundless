import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

const Loading = () => {
  return (
    <div className='absolute top-0 right-0 bottom-0 left-0 flex h-screen items-center justify-center overflow-hidden bg-[rgba(28,28,28,0.64)]'>
      <LoadingSpinner size='lg' className='text-white' />
    </div>
  );
};

export default Loading;
