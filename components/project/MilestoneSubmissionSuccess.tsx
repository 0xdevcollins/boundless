'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { BoundlessButton } from '../buttons/BoundlessButton';

interface MilestoneSubmissionSuccessProps {
  onContinue?: () => void;
}

const MilestoneSubmissionSuccess: React.FC<MilestoneSubmissionSuccessProps> = ({
  onContinue,
}) => {
  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-4'>
      <div className='max-w-md w-full text-center space-y-8'>
      
        <h1 className='text-3xl font-bold text-white'>Proof Submitted!</h1>

        <div className='flex justify-center'>
          <div className='w-20 h-20 rounded-full bg-[#A7F950] flex items-center justify-center'>
            <Check className='w-10 h-10 text-white' />
          </div>
        </div>

        <div className='space-y-4'>
          <p className='text-white text-base leading-relaxed'>
            Your project has been submitted and is now under admin review.
            You'll receive an update within 72 hours. Once approved, your
            project will proceed to public validation.
          </p>

          <p className='text-white text-base'>
            You can track the status of your submission anytime on the{' '}
            <Link
              href='/user/projects'
              className='text-[#A7F950] hover:text-[#8BE03A] transition-colors font-medium underline'
            >
              Projects page.
            </Link>
          </p>
        </div>

        <div className='pt-4'>
          <BoundlessButton
            onClick={onContinue}
            className='bg-[#A7F950] text-black hover:bg-[#8BE03A] transition-colors px-8 py-3 rounded-lg text-base font-medium min-w-[200px]'
          >
            Continue
          </BoundlessButton>
        </div>
      </div>
    </div>
  );
};

export default MilestoneSubmissionSuccess;
