'use client';

import { useState } from 'react';
import { CommentsSortDropdown } from './comments-sort-dropdown';
import { CommentItem } from './comment-item';
import { CommentInput } from './comment-input';
import { CommentsEmptyState } from './comments-empty-state';
import { mockComments, type Comment } from '@/lib/data/comments-mock';

export function ProjectComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const isEmpty = comments.length === 0;

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'User',
        avatar: '/diverse-user-avatars.png',
      },
      content,
      timestamp: 'Just now',
      likes: 0,
      replies: [],
    };
    setComments([newComment, ...comments]);
  };

  const handleAddReply = (commentId: string, content: string) => {
    const newReply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: {
        name: 'User',
        avatar: '/user-icon.png',
      },
      content,
      timestamp: 'Just now',
      likes: 0,
    };

    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments(addReplyToComment(comments));
  };

  if (isEmpty) {
    return <CommentsEmptyState onAddComment={handleAddComment} />;
  }

  return (
    <div className='w-full'>
      <div className='px-4 py-3 md:px-6 md:py-4'>
        <CommentsSortDropdown />
      </div>

      <div className='space-y-6 px-4 pb-6 md:px-6'>
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onAddReply={handleAddReply}
          />
        ))}
      </div>

      <CommentInput onSubmit={handleAddComment} />
    </div>
  );
}
