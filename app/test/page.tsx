'use client';
import { useState } from 'react';
import AuthLoadingState from '@/components/auth/AuthLoadingState';
import { BoundlessButton } from '@/components/buttons';

export default function TestLoadingPage() {
  const [showLoading, setShowLoading] = useState(false);

  const handleShowLoading = () => {
    setShowLoading(true);
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-900 p-4'>
      <div className='space-y-4 text-center'>
        <h1 className='text-2xl font-bold text-white'>Loading State Test</h1>
        <p className='text-gray-300'>
          Test the animated loading state across different screen sizes
        </p>

        <BoundlessButton onClick={handleShowLoading} className='mt-4'>
          Test Loading State
        </BoundlessButton>

        {showLoading && <AuthLoadingState message='Testing loading...' />}

        <div className='mt-8 text-sm text-gray-400'>
          <p>Test on different screen sizes:</p>
          <ul className='mt-2 list-inside list-disc space-y-1'>
            <li>Mobile (320px - 768px)</li>
            <li>Tablet (768px - 1024px)</li>
            <li>Desktop (1024px+)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
