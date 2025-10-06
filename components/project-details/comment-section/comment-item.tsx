'use client';

import { useState } from 'react';
import { Heart, ChevronUp, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommentInput } from './comment-input';
import { Comment } from '@/lib/data/comments-mock';

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  onAddReply: (commentId: string, content: string) => void;
}

export function CommentItem({
  comment,
  isReply = false,
  onAddReply,
}: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReplySubmit = (content: string) => {
    onAddReply(comment.id, content);
    setShowReplyInput(false);
    setShowReplies(true);
  };

  return (
    <div className={cn('flex gap-3', isReply && 'ml-12 md:ml-14')}>
      <Avatar className='size-8 shrink-0 md:size-10'>
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>

      <div className='min-w-0 flex-1'>
        <div className='flex items-start justify-between gap-2'>
          <div className='min-w-0 flex-1'>
            <button className='text-sm font-medium text-white underline-offset-2 hover:underline'>
              {comment.author.name}
            </button>
            <p className='mt-1 text-sm break-words text-white md:text-base'>
              {comment.content}
            </p>
          </div>
        </div>

        <div className='mt-2 flex items-center gap-4'>
          <span className='text-xs text-zinc-400 md:text-sm'>
            {comment.timestamp}
          </span>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setShowReplyInput(!showReplyInput)}
            className='h-auto p-0 text-xs text-zinc-400 hover:bg-transparent hover:text-white md:text-sm'
          >
            Reply
          </Button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className='group flex items-center gap-1.5'
          >
            <Heart
              className={cn(
                'size-4 transition-colors',
                isLiked
                  ? 'fill-red-500 text-red-500'
                  : 'text-zinc-400 group-hover:text-white'
              )}
            />
            <span className='text-xs text-zinc-400 group-hover:text-white md:text-sm'>
              {comment.likes}
            </span>
          </button>
        </div>

        {showReplyInput && (
          <div className='mt-3 -ml-12 md:-ml-14'>
            <CommentInput
              onSubmit={handleReplySubmit}
              placeholder='Write a reply...'
              autoFocus
              onCancel={() => setShowReplyInput(false)}
              showCancel
            />
          </div>
        )}

        {hasReplies && (
          <>
            <button
              onClick={() => setShowReplies(!showReplies)}
              className='mt-3 flex items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white md:text-sm'
            >
              <div className='h-px w-8 bg-zinc-700 md:w-12' />
              <span>
                {showReplies ? 'Hide' : 'Show'} replies (
                {comment.replies?.length})
              </span>
              {showReplies ? (
                <ChevronUp className='size-3.5' />
              ) : (
                <ChevronDown className='size-3.5' />
              )}
            </button>

            {showReplies && (
              <div className='mt-4 space-y-4'>
                {comment.replies?.map(reply => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    isReply
                    onAddReply={onAddReply}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
