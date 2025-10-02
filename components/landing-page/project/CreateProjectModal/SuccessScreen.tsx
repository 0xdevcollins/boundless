'use client';

import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SuccessScreenProps {
  onClose: () => void;
}

const SuccessScreen = ({ onClose }: SuccessScreenProps) => {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center space-y-8 text-center'>
      {/* Success Icon */}
      <div className='relative'>
        <div className='flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20'>
          <CheckCircle className='h-12 w-12 text-green-400' />
        </div>
        <div className='absolute inset-0 animate-ping rounded-full bg-green-500/10' />
      </div>

      {/* Success Message */}
      <div className='space-y-4'>
        <h2 className='text-3xl font-bold text-white'>
          Submission Successful!
        </h2>
        <div className='max-w-md space-y-2 text-[#B5B5B5]'>
          <p>
            Your project has been sent for admin review and will be processed
            within 72 hours.
          </p>
          <p>
            You can track its status anytime on the{' '}
            <Link
              href='/projects'
              className='inline-flex items-center gap-1 text-green-400 underline hover:text-green-300'
            >
              Projects Page
              <ExternalLink className='h-3 w-3' />
            </Link>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col gap-4 sm:flex-row'>
        <Button
          onClick={onClose}
          className='bg-green-500 px-8 py-3 text-white hover:bg-green-600'
        >
          Continue
        </Button>
        <Button
          variant='outline'
          asChild
          className='border-[#484848] px-8 py-3 text-white hover:bg-[#2B2B2B]'
        >
          <Link href='/projects'>View All Projects</Link>
        </Button>
      </div>

      {/* Additional Info */}
      <div className='bg-background/20 max-w-md rounded-lg border border-[#484848] p-4'>
        <p className='text-sm text-[#B5B5B5]'>
          <strong className='text-white'>What's next?</strong> Our team will
          review your project and get back to you via email within 72 hours with
          next steps.
        </p>

      </div>
    </div>
  );
};

export default SuccessScreen;
