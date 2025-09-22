'use client';

import React, { useState } from 'react';
import BoundlessSheet from '@/components/sheet/boundless-sheet';
import { Button } from '@/components/ui/button';

const Page = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCommentSubmit = (comment: string) => {
    // Handle comment submission here
    // You can add your logic for processing the comment
    // For example: API call, state update, etc.

    // For now, we'll just acknowledge the comment
    // This prevents the linter warning about unused parameters
    if (comment && comment.trim()) {
      // Comment is valid and can be processed
      // Add your comment handling logic here

      // Close the sheet after submission
      setIsSheetOpen(false);
    }
  };

  return (
    <div className='p-8'>
      <Button
        onClick={() => setIsSheetOpen(true)}
        className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
      >
        Open Comment Sheet
      </Button>

      <BoundlessSheet
        open={isSheetOpen}
        setOpen={setIsSheetOpen}
        title='Add Comment'
        side='bottom'
      >
        <div className='space-y-4'>
          <div className='mb-6 text-center text-gray-300'>
            <p>Share your thoughts and feedback</p>
          </div>

          <textarea
            placeholder='Write your comment here...'
            className='w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
            rows={4}
            id='comment-input'
          />

          <div className='flex gap-3'>
            <Button
              onClick={() => setIsSheetOpen(false)}
              variant='outline'
              className='flex-1'
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                const input = document.getElementById(
                  'comment-input'
                ) as HTMLTextAreaElement;
                if (input && input.value.trim()) {
                  handleCommentSubmit(input.value);
                }
              }}
              className='flex-1 bg-blue-600 hover:bg-blue-700'
            >
              Submit Comment
            </Button>
          </div>
        </div>
      </BoundlessSheet>
    </div>
  );
};

export default Page;
