'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

interface CommentInputProps {
  projectId: string;
  parentId?: string;
  onCommentAdded: () => void;
  onCancel?: () => void;
  initialValue?: string;
  commentId?: string;
  isEditing?: boolean;
}

interface CommentRequestBody {
  content: string;
  projectId?: string;
  parentId?: string;
  commentId?: string;
  id?: string;
}

export function CommentInput({
  projectId,
  parentId,
  onCommentAdded,
  onCancel,
  initialValue = '',
  commentId,
  isEditing = false,
}: CommentInputProps) {
  const [content, setContent] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setContent('');
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    setIsSubmitting(true);

    try {
      let endpoint = '';
      let method = 'POST';
      let body: CommentRequestBody = {
        content: content.trim(),
        projectId,
      };

      if (isEditing && commentId) {
        // Edit existing comment
        endpoint = '/api/projects/comments/edit';
        method = 'PATCH';
        body = { id: commentId, content };
      } else if (parentId) {
        // Reply to a comment
        endpoint = '/api/projects/comments/reply';
        body = { projectId, parentId, content };
      } else {
        // Create a new top-level comment
        endpoint = '/api/projects/comments/create';
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'post'} comment`);
      }

      toast.success(
        isEditing
          ? 'Comment updated successfully'
          : parentId
            ? 'Reply posted successfully'
            : 'Comment posted successfully',
      );

      resetForm();
      onCommentAdded();
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'post'} comment`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        placeholder={isEditing ? 'Edit your comment...' : parentId ? 'Write a reply...' : 'Leave a comment...'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="resize-none"
      />
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" size="sm" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button size="sm" onClick={handleSubmit} disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? 'Submitting...' : isEditing ? 'Update' : parentId ? 'Reply' : 'Comment'}
        </Button>
      </div>
    </div>
  );
}
