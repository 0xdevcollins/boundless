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
    <div className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
      <div className='text-center space-y-4'>
        <h1 className='text-white text-2xl font-bold'>Loading State Test</h1>
        <p className='text-gray-300'>
          Test the animated loading state across different screen sizes
        </p>

        <BoundlessButton onClick={handleShowLoading} className='mt-4'>
          Test Loading State
        </BoundlessButton>

        {showLoading && <AuthLoadingState message='Testing loading...' />}

        <div className='mt-8 text-sm text-gray-400'>
          <p>Test on different screen sizes:</p>
          <ul className='list-disc list-inside mt-2 space-y-1'>
            <li>Mobile (320px - 768px)</li>
            <li>Tablet (768px - 1024px)</li>
            <li>Desktop (1024px+)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
