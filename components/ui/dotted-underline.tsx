import React from 'react';

interface DottedUnderlineProps {
  className?: string;
}

export function DottedUnderline({ className = '' }: DottedUnderlineProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className='w-1 h-1 bg-white rounded-full'></div>
      <hr className='flex-1 h-px bg-gray-500 border-0' />
      <div className='w-1 h-1 bg-white rounded-full'></div>
    </div>
  );
}
