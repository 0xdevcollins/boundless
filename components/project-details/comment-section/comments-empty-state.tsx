'use client';

import { CommentInput } from './comment-input';
import LottieAnimation from '@/components/LottieAnimation';

interface CommentsEmptyStateProps {
  onAddComment: (content: string) => void;
}

export function CommentsEmptyState({ onAddComment }: CommentsEmptyStateProps) {
  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-col items-center justify-center px-4 py-16 md:py-20'>
        <div className='relative mb-8'>
          <LottieAnimation width={400} height={400} />
        </div>
        <h3 className='mb-8 text-center text-base font-medium text-white md:text-lg'>
          Be the first to Leave a Comment
        </h3>
      </div>
      <CommentInput onSubmit={onAddComment} />
    </div>
  );
}
