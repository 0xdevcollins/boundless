'use client';

import { useState } from 'react';
import { useComments, useCommentManagement } from '@/hooks/use-comments';
import { CommentsSortDropdown } from './comments-sort-dropdown';
import { CommentItem } from './comment-item';
import { CommentInput } from './comment-input';
import { CommentsEmptyState } from './comments-empty-state';
// import { ProjectComment } from '@/types/comment';

interface ProjectCommentsProps {
  projectId: string;
}

export function ProjectComments({ projectId }: ProjectCommentsProps) {
  const [sortBy, setSortBy] = useState<
    'createdAt' | 'updatedAt' | 'totalReactions'
  >('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { comments, pagination, loading, error, refetch, loadMore } =
    useComments({
      projectId,
      sortBy,
      sortOrder,
      enabled: true,
    });

  const {
    createComment,
    updateComment,
    deleteComment,
    reportComment,
    error: actionError,
  } = useCommentManagement(projectId);

  const handleAddComment = async (content: string) => {
    try {
      await createComment({ content });
      refetch();
    } catch {
      // Handle error silently or show user-friendly message
    }
  };

  const handleAddReply = async (parentCommentId: string, content: string) => {
    try {
      await createComment({ content, parentCommentId });
      refetch();
    } catch {
      // Handle error silently or show user-friendly message
    }
  };

  const handleUpdateComment = async (commentId: string, content: string) => {
    try {
      await updateComment(commentId, { content });
      refetch();
    } catch {
      // Handle error silently or show user-friendly message
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      refetch();
    } catch {
      // Handle error silently or show user-friendly message
    }
  };

  const handleReportComment = async (
    commentId: string,
    reason: string,
    description?: string
  ) => {
    try {
      await reportComment(commentId, {
        reason: reason as
          | 'spam'
          | 'inappropriate'
          | 'harassment'
          | 'misinformation'
          | 'other',
        description,
      });
      refetch();
    } catch {
      // Handle error silently or show user-friendly message
    }
  };

  if (loading && comments.length === 0) {
    return (
      <div className='w-full'>
        <div className='flex items-center justify-center py-8'>
          <div className='text-gray-500'>Loading comments...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full'>
        <div className='py-4 text-center text-red-600'>
          Error loading comments: {error}
        </div>
        <button
          onClick={refetch}
          className='mx-auto block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          Retry
        </button>
      </div>
    );
  }

  if (comments.length === 0) {
    return <CommentsEmptyState onAddComment={handleAddComment} />;
  }

  return (
    <div className='w-full'>
      <div className='px-4 py-3 md:px-6 md:py-4'>
        <CommentsSortDropdown
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(
            newSortBy: 'createdAt' | 'updatedAt' | 'totalReactions',
            newSortOrder: 'asc' | 'desc'
          ) => {
            setSortBy(newSortBy);
            setSortOrder(newSortOrder);
          }}
        />
      </div>

      <div className='space-y-6 px-4 pb-6 md:px-6'>
        {comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            onAddReply={handleAddReply}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
            onReport={handleReportComment}
          />
        ))}
      </div>

      {pagination.hasNext && (
        <div className='mt-6 px-4 text-center md:px-6'>
          <button
            onClick={loadMore}
            disabled={loading}
            className='rounded-md bg-gray-100 px-6 py-2 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
          >
            {loading ? 'Loading...' : 'Load More Comments'}
          </button>
        </div>
      )}

      <CommentInput onSubmit={handleAddComment} />

      {actionError && (
        <div className='mx-4 mt-4 rounded-md border border-red-200 bg-red-50 p-3 md:mx-6'>
          <p className='text-sm text-red-600'>{actionError}</p>
        </div>
      )}
    </div>
  );
}
