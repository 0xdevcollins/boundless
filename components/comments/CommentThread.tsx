'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, Heart, Eye, MessageCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  reactions: {
    thumbsUp: number;
    heart: number;
    eye: number;
  };
  userReactions: string[];
  replies?: Comment[];
}

interface CommentThreadProps {
  projectId: string;
  onComment?: (projectId: string, comment: string) => void;
  onReact?: (commentId: string, reaction: string) => void;
}

const CommentThread: React.FC<CommentThreadProps> = ({
  projectId,
  onComment,
  onReact,
}) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      content:
        'This project looks really promising! I love the decentralized approach and the use of Stellar blockchain.',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://github.com/shadcn.png',
      },
      timestamp: '2 hours ago',
      reactions: {
        thumbsUp: 8,
        heart: 3,
        eye: 2,
      },
      userReactions: [],
    },
    {
      id: '2',
      content:
        'The milestone-based funding is a great idea. It ensures accountability and transparency.',
      author: {
        name: 'Marcus Rodriguez',
        avatar: 'https://github.com/shadcn.png',
      },
      timestamp: '1 hour ago',
      reactions: {
        thumbsUp: 5,
        heart: 2,
        eye: 1,
      },
      userReactions: [],
    },
    {
      id: '3',
      content:
        'I have some questions about the smart contract implementation. Will there be a testnet version available?',
      author: {
        name: 'Alex Thompson',
        avatar: 'https://github.com/shadcn.png',
      },
      timestamp: '30 minutes ago',
      reactions: {
        thumbsUp: 3,
        heart: 1,
        eye: 4,
      },
      userReactions: [],
    },
  ]);

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: {
          name: 'You',
          avatar: 'https://github.com/shadcn.png',
        },
        timestamp: 'Just now',
        reactions: {
          thumbsUp: 0,
          heart: 0,
          eye: 0,
        },
        userReactions: [],
      };

      setComments(prev => [comment, ...prev]);
      setNewComment('');
      onComment?.(projectId, newComment);
    }
  };

  const handleReaction = (commentId: string, reaction: string) => {
    setComments(prev =>
      prev.map(comment => {
        if (comment.id === commentId) {
          const hasReaction = comment.userReactions.includes(reaction);
          const newReactions = hasReaction
            ? comment.userReactions.filter(r => r !== reaction)
            : [...comment.userReactions, reaction];

          return {
            ...comment,
            reactions: {
              ...comment.reactions,
              [reaction]: hasReaction
                ? comment.reactions[
                    reaction as keyof typeof comment.reactions
                  ] - 1
                : comment.reactions[
                    reaction as keyof typeof comment.reactions
                  ] + 1,
            },
            userReactions: newReactions,
          };
        }
        return comment;
      })
    );

    onReact?.(commentId, reaction);
  };

  const ReactionButton: React.FC<{
    icon: React.ReactNode;
    count: number;
    reaction: string;
    isActive: boolean;
    onClick: () => void;
  }> = ({ icon, count, isActive, onClick }) => (
    <Button
      variant='ghost'
      size='sm'
      onClick={onClick}
      className={cn(
        'flex h-auto items-center space-x-1 p-1 text-[#B5B5B5] hover:text-[#F5F5F5]',
        isActive && 'text-blue-400'
      )}
    >
      {icon}
      <span className='text-xs'>{count}</span>
    </Button>
  );

  return (
    <div className='space-y-6'>
      {/* Comment Input */}
      <div className='space-y-3'>
        <h3 className='font-medium text-[#F5F5F5]'>Comments</h3>
        <div className='flex space-x-3'>
          <Avatar className='h-8 w-8 flex-shrink-0'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback className='bg-blue-500 text-xs text-white'>
              U
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 space-y-2'>
            <Textarea
              placeholder='Add a comment...'
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              className='min-h-[80px] resize-none border-[#2B2B2B] bg-[#212121] text-[#F5F5F5] placeholder:text-[#B5B5B5]'
            />
            <div className='flex justify-end'>
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className='bg-[#04326B] px-4 py-2 text-white hover:bg-[#034592]'
              >
                <Send className='mr-2 h-4 w-4' />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className='space-y-4'>
        {comments.map(comment => (
          <div key={comment.id} className='flex space-x-3'>
            <Avatar className='h-8 w-8 flex-shrink-0'>
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback className='bg-blue-500 text-xs text-white'>
                {comment.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 space-y-2'>
              <div className='flex items-center space-x-2'>
                <span className='font-medium text-[#F5F5F5]'>
                  {comment.author.name}
                </span>
                <span className='text-sm text-[#B5B5B5]'>
                  {comment.timestamp}
                </span>
              </div>

              <p className='text-sm leading-relaxed text-[#F5F5F5]'>
                {comment.content}
              </p>

              <div className='flex items-center space-x-1'>
                <ReactionButton
                  icon={<ThumbsUp className='h-3 w-3' />}
                  count={comment.reactions.thumbsUp}
                  reaction='thumbsUp'
                  isActive={comment.userReactions.includes('thumbsUp')}
                  onClick={() => handleReaction(comment.id, 'thumbsUp')}
                />
                <ReactionButton
                  icon={<Heart className='h-3 w-3' />}
                  count={comment.reactions.heart}
                  reaction='heart'
                  isActive={comment.userReactions.includes('heart')}
                  onClick={() => handleReaction(comment.id, 'heart')}
                />
                <ReactionButton
                  icon={<Eye className='h-3 w-3' />}
                  count={comment.reactions.eye}
                  reaction='eye'
                  isActive={comment.userReactions.includes('eye')}
                  onClick={() => handleReaction(comment.id, 'eye')}
                />
                <Button
                  variant='ghost'
                  size='sm'
                  className='flex h-auto items-center space-x-1 p-1 text-[#B5B5B5] hover:text-[#F5F5F5]'
                >
                  <MessageCircle className='h-3 w-3' />
                  <span className='text-xs'>Reply</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentThread;
