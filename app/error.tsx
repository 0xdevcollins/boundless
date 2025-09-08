'use client';
import React from 'react';
import { BoundlessButton } from '@/components/buttons';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  const handleReset = () => {
    reset();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='max-w-lg w-full'>
        {/* Error Card */}
        <div className='bg-[#1C1C1C] rounded-[12px] border border-[#21413F3D] shadow-[0_1.5px_4px_-1px_rgba(16,25,40,0.07)] p-8 text-center'>
          {/* Error Icon */}
          <div className='mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6'>
            <AlertTriangle className='w-8 h-8 text-red-500' />
          </div>

          {/* Error Title */}
          <h1 className='text-white text-2xl font-bold mb-4'>
            Something went wrong
          </h1>

          {/* Error Message */}
          <p className='text-gray-400 text-sm mb-6 leading-relaxed'>
            We encountered an unexpected error. Don&apos;t worry, our team has
            been notified and is working to fix it.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className='bg-[#2A2A2A] rounded-lg p-4 mb-6 text-left'>
              <h3 className='text-white text-sm font-semibold mb-2'>
                Error Details:
              </h3>
              <p className='text-red-400 text-xs font-mono break-all'>
                {error.message}
              </p>
              {error.digest && (
                <p className='text-gray-500 text-xs mt-2'>
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className='space-y-3'>
            <BoundlessButton
              onClick={handleReset}
              className='w-full'
              icon={<RefreshCw className='w-4 h-4' />}
            >
              Try Again
            </BoundlessButton>

            <div className='flex gap-3'>
              <BoundlessButton
                variant='secondary'
                onClick={handleGoBack}
                className='flex-1'
                icon={<ArrowLeft className='w-4 h-4' />}
              >
                Go Back
              </BoundlessButton>

              <BoundlessButton
                variant='secondary'
                onClick={handleGoHome}
                className='flex-1'
                icon={<Home className='w-4 h-4' />}
              >
                Go Home
              </BoundlessButton>
            </div>
          </div>

          {/* Support Info */}
          <div className='mt-6 pt-6 border-t border-[#2A2A2A]'>
            <p className='text-gray-500 text-xs'>
              Still having issues?{' '}
              <a
                href='mailto:support@boundlessfi.xyz'
                className='text-blue-400 hover:text-blue-300 underline'
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-6'>
          <p className='text-gray-600 text-xs'>
            Boundless Platform • Error Page
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
