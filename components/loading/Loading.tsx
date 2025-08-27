import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen absolute top-0 left-0 right-0 bottom-0 bg-[rgba(28,28,28,0.64)] overflow-hidden'>
      <LoadingSpinner size='lg' className='text-white' />
    </div>
  );
};

export default Loading;
