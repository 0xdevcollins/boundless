import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProjectSubmissionSuccessProps {
  title?: string;
  description?: string;
  linkSection?: string;
  linkName?: string;
  url?: string;
  continueAction?: () => void;
}

function ProjectSubmissionSuccess({
  title = 'Project Submitted!',
  description = 'Your project has been submitted and is now under admin review. You’ll receive an update within 72 hours. Once approved, your project will proceed to public validation.',
  linkSection = 'You can track the status of your submission anytime on the',
  linkName = 'Projects page.',
  url = '/projects',
  continueAction,
}: ProjectSubmissionSuccessProps) {
  return (
    <main className='w-[600px] flex flex-col gap-6 items-center justify-center'>
      <h5 className='font-medium text-xl text-card'>{title}</h5>
      <div>
        <Image width={150} height={150} src='/done-check.svg' alt='done' />
      </div>
      <article className='space-y-3'>
        <p className='text-base font-normal text-card/60 text-center'>
          {description}
        </p>
        <p className='text-base font-normal text-card/60 text-center'>
          {linkSection}{' '}
          <Link href={url} className='text-primary underline cursor-pointer'>
            {linkName}
          </Link>
        </p>
      </article>

      <button
        onClick={continueAction}
        className='w-[198px] mt-4 text-base font-medium text-background bg-primary px-16 py-2 rounded-[10px]'
      >
        Continue
      </button>
    </main>
  );
}

export default ProjectSubmissionSuccess;
