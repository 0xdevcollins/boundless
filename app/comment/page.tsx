'use client';

import React from 'react';
import CommentModal from '@/components/comment/modal';

const page = () => {
  const handleCommentSubmit = (comment: string) => {
    // Handle comment submission here
    // You can add your logic for processing the comment
    // For example: API call, state update, etc.

    // For now, we'll just acknowledge the comment
    // This prevents the linter warning about unused parameters
    if (comment && comment.trim()) {
      // Comment is valid and can be processed
      // Add your comment handling logic here
    }
  };

  return (
    <div className='p-8'>
      <CommentModal onCommentSubmit={handleCommentSubmit}>
        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
          Open Comment Modal
        </button>
      </CommentModal>
    </div>
  );
};

export default page;
