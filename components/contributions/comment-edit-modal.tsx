'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import type { UserComment } from '@/types/contributions';
import { useState } from 'react';

interface CommentEditModalProps {
  comment: UserComment | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, content: string) => Promise<void>;
}

export function CommentEditModal({ comment, isOpen, onClose, onSave }: CommentEditModalProps) {
  const [content, setContent] = useState(comment?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update content when comment changes
  useState(() => {
    if (comment) {
      setContent(comment.content);
    }
  });

  const handleSave = async () => {
    if (!comment) return;

    setIsSubmitting(true);
    try {
      await onSave(comment.id, content);
      onClose();
    } catch (error) {
      console.error('Failed to save comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogDescription>Edit your comment for {comment?.projectName}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Edit your comment..."
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!content.trim() || isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
