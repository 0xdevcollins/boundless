import React from 'react';

interface DottedUnderlineProps {
  className?: string;
}

export function DottedUnderline({ className = '' }: DottedUnderlineProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className='h-1 w-1 rounded-full bg-white'></div>
      <hr className='h-px flex-1 border-0 bg-gray-500' />
      <div className='h-1 w-1 rounded-full bg-white'></div>
    </div>
  );
}
