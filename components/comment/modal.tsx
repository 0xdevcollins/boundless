'use client';

import React, { useState, useRef, useEffect } from 'react';
import BoundlessSheet from '@/components/sheet/boundless-sheet';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, Heart, Trash2 } from 'lucide-react';
import { Stepper } from '@/components/stepper';

interface Reply {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  replies: Reply[];
  likes: number;
  isLiked: boolean;
}

interface CommentModalProps {
  children: React.ReactNode;
  onCommentSubmit?: (comment: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  children,
  onCommentSubmit,
}) => {
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyMode, setReplyMode] = useState<{
    isActive: boolean;
    commentId: string | null;
  }>({ isActive: false, commentId: null });
  const [replyText, setReplyText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);

  const campaignSteps = [
    {
      title: 'Initialize',
      description:
        'Submit your project idea and define milestones to begin your campaign journey.',
      state: 'completed' as const,
    },
    {
      title: 'Validate',
      description:
        'Get admin approval and gather public support through voting.',
      state: 'active' as const,
    },
    {
      title: 'Launch Campaign',
      description:
        'Finalize campaign details and deploy smart escrow to go live and receive funding.',
      state: 'pending' as const,
    },
  ];

  const handleSubmit = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        text: comment.trim(),
        author: 'Collins Odumeje',
        timestamp: '5s',
        replies: [],
        likes: 0,
        isLiked: false,
      };

      setComments(prev => [newComment, ...prev]);
      setComment('');

      // Call the onCommentSubmit callback if provided
      if (onCommentSubmit) {
        onCommentSubmit(comment.trim());
      }

      toast.success('Comment Posted!', {
        action: {
          label: 'Undo',
          onClick: () => {
            setComments(prev => prev.filter(c => c.id !== newComment.id));
          },
        },
        style: {
          background: '#3B82F6',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
        },
        actionButtonStyle: {
          background: 'transparent',
          color: 'white',
          textDecoration: 'underline',
          border: 'none',
        },
      });
    }
  };

  const handleLike = (commentId: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleDelete = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const handleReplyClick = (commentId: string) => {
    setReplyText('');
    setReplyMode({ isActive: true, commentId });
  };

  useEffect(() => {
    if (replyMode.isActive) {
      setReplyText('');
    }
  }, [replyMode.isActive]);

  const handleReplySubmit = () => {
    if (replyText.trim() && replyMode.commentId) {
      const newReply: Reply = {
        id: Date.now().toString(),
        text: replyText.trim(),
        author: 'Davedumto',
        timestamp: 'just now',
        likes: 0,
        isLiked: false,
      };

      setComments(prev =>
        prev.map(comment =>
          comment.id === replyMode.commentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );

      setReplyText('');

      toast.success('Reply Posted!', {
        action: {
          label: 'Undo',
          onClick: () => {
            setComments(prev =>
              prev.map(comment =>
                comment.id === replyMode.commentId
                  ? {
                      ...comment,
                      replies: comment.replies.filter(
                        r => r.id !== newReply.id
                      ),
                    }
                  : comment
              )
            );
          },
        },
        style: {
          background: '#3B82F6',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
        },
        actionButtonStyle: {
          background: 'transparent',
          color: 'white',
          textDecoration: 'underline',
          border: 'none',
        },
      });
    }
  };

  const handleBackToComments = () => {
    setReplyMode({ isActive: false, commentId: null });
    setReplyText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [comment]);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      <BoundlessSheet
        open={isOpen}
        setOpen={setIsOpen}
        side='bottom'
        maxHeight='90vh'
        minHeight='60vh'
        contentClassName='h-[95vh]'
        className='border-[#2A2A2A] bg-black p-0 text-white'
      >
        <div className='flex h-full flex-col overflow-hidden xl:flex-row'>
          <div className='flex-shrink-0 p-4 lg:border-b-0 lg:p-6'>
            <div className='flex flex-row justify-center lg:block'>
              <Stepper steps={campaignSteps} />
            </div>
          </div>

          <div className='flex w-full flex-1 flex-col overflow-y-auto lg:w-[50%]'>
            {!replyMode.isActive && (
              <div className='mx-auto w-[80%] p-6 xl:w-[70%]'>
                <div className='flex items-center gap-3 py-6'>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='rounded-full p-2 transition-colors hover:bg-[#2A2A2A]'
                  >
                    <ArrowLeft className='h-5 w-5 text-white' />
                  </button>
                  <h2 className='text-xl font-semibold text-white'>Comments</h2>
                </div>
                <div className='flex items-center justify-between gap-3 rounded-lg border border-[#2A2A2A] px-3'>
                  <div className='flex-shrink-0'>
                    <Image
                      src='/empty/user.svg'
                      alt='User avatar'
                      width={40}
                      height={40}
                      className='h-12 w-12'
                    />
                  </div>
                  <div className='flex-1 pt-6'>
                    <textarea
                      ref={textareaRef}
                      placeholder='Leave a comment'
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className='text-md min-h-[60px] w-full border-none bg-transparent py-2 leading-none text-white shadow-none outline-none placeholder:text-gray-400 focus:border-none focus:ring-0 focus:outline-none'
                    />
                  </div>
                  <div className='flex-shrink-0'>
                    <Button
                      onClick={handleSubmit}
                      disabled={!comment.trim()}
                      className='border border-[#3A3A3A] bg-[#2A2A2A] px-6 py-2 text-white hover:bg-[#3A3A3A] disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      Post
                    </Button>
                  </div>
                </div>
                <div className='my-6 border-b border-[#2A2A2A]' />
              </div>
            )}

            {replyMode.isActive && (
              <div className='mx-auto w-[80%] p-6 xl:w-[70%]'>
                {/* Reply Header */}
                <div className='flex items-center gap-3 py-6'>
                  <button
                    onClick={handleBackToComments}
                    className='rounded-full p-2 transition-colors hover:bg-[#2A2A2A]'
                  >
                    <ArrowLeft className='h-5 w-5 text-white' />
                  </button>
                  <h2 className='text-xl font-semibold text-white'>Reply</h2>
                </div>

                {(() => {
                  const parentComment = comments.find(
                    c => c.id === replyMode.commentId
                  );
                  if (!parentComment) return null;

                  return (
                    <div className='mb-6'>
                      <div className='flex gap-3 rounded-lg bg-[#1A1A1A]/50 p-4'>
                        <div className='flex-shrink-0'>
                          <Image
                            src='/empty/user.svg'
                            alt='User avatar'
                            width={40}
                            height={40}
                            className='h-12 w-12'
                          />
                        </div>
                        <div className='flex-1'>
                          <div className='mb-2 flex items-center gap-2'>
                            <span className='font-medium text-white'>
                              {parentComment.author}
                            </span>
                            <span className='text-sm text-gray-400'>
                              {parentComment.timestamp}
                            </span>
                          </div>
                          <p className='mb-4 leading-relaxed text-white/90'>
                            {parentComment.text}
                          </p>

                          <div className='flex items-center gap-4 text-sm text-gray-400'>
                            <div className='flex items-center gap-1'>
                              <MessageCircle className='h-4 w-4' />
                              <span>{parentComment.replies.length}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Heart className='h-4 w-4' />
                              <span>{parentComment.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className='flex items-center justify-between gap-3 rounded-lg border border-[#2A2A2A] px-3 py-3'>
                  <div className='flex-shrink-0'>
                    <Image
                      src='/empty/user.svg'
                      alt='User avatar'
                      width={40}
                      height={40}
                      className='h-12 w-12'
                    />
                  </div>
                  <div className='flex-1'>
                    <textarea
                      key={`reply-input-${replyMode.commentId}`}
                      ref={replyTextareaRef}
                      placeholder='Write a reply...'
                      value={replyText}
                      onChange={e => {
                        setReplyText(e.target.value);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleReplySubmit();
                        }
                      }}
                      className='text-md min-h-[60px] w-full resize-none border-none bg-transparent py-2 leading-none text-white shadow-none outline-none placeholder:text-gray-400 focus:border-none focus:ring-0 focus:outline-none'
                      autoFocus
                    />
                  </div>
                  <div className='flex-shrink-0'>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleReplySubmit();
                      }}
                      disabled={!replyText.trim()}
                      className='border border-[#3A3A3A] bg-[#2A2A2A] px-6 py-2 text-white hover:bg-[#3A3A3A] disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      Reply
                    </Button>
                  </div>
                </div>

                {(() => {
                  const parentComment = comments.find(
                    c => c.id === replyMode.commentId
                  );
                  if (!parentComment || parentComment.replies.length === 0)
                    return null;

                  return (
                    <div className='mt-6 space-y-4'>
                      {parentComment.replies.map(reply => (
                        <div key={reply.id} className='flex gap-3'>
                          <div className='flex-shrink-0'>
                            <Image
                              src='/empty/user.svg'
                              alt='User avatar'
                              width={40}
                              height={40}
                              className='h-12 w-12'
                            />
                          </div>
                          <div className='flex-1'>
                            <div className='mb-2 flex items-center gap-2'>
                              <span className='font-medium text-white'>
                                {reply.author}
                              </span>
                              <span className='text-sm text-gray-400'>
                                {reply.timestamp}
                              </span>
                            </div>
                            <p className='leading-relaxed text-white/90'>
                              {reply.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}
            {!replyMode.isActive && (
              <div className='flex-1'>
                {comments.length === 0 ? (
                  <div className='flex items-center justify-center p-12'>
                    <div className='text-center'>
                      <div className='mb-6'>
                        <Image
                          src='/empty/comment.svg'
                          alt='No comments available'
                          width={128}
                          height={128}
                          className='mx-auto mb-4 h-32 w-32'
                        />
                      </div>

                      <h3 className='mb-2 text-xl font-semibold text-white'>
                        No Comments Available
                      </h3>
                      <p className='mx-auto max-w-md text-gray-400'>
                        Share your insights or questions to kick off meaningful
                        discussions.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='mx-auto w-[70%] space-y-6 p-6 pb-8'>
                    {comments.map(comment => (
                      <div
                        key={comment.id}
                        className='group relative flex cursor-pointer gap-3 rounded-lg bg-[#1A1A1A]/50 p-4 transition-all duration-200'
                      >
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className='absolute top-3 right-3 rounded-full p-1.5 opacity-0 transition-colors group-hover:opacity-100 hover:bg-[#2A2A2A]'
                          title='Delete comment'
                        >
                          <Trash2 className='h-4 w-4 text-red-400 transition-colors' />
                        </button>

                        <div className='flex-shrink-0'>
                          <Image
                            src='/empty/user.svg'
                            alt='User avatar'
                            width={40}
                            height={40}
                            className='h-12 w-12'
                          />
                        </div>
                        <div className='flex-1'>
                          <div className='mb-2 flex items-center gap-2'>
                            <span className='font-medium text-white'>
                              {comment.author}
                            </span>
                            <span className='text-sm text-gray-400'>
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className='mb-3 leading-relaxed text-white/90'>
                            {comment.text}
                          </p>
                          <div className='flex items-center gap-4 text-sm text-gray-400'>
                            <button
                              onClick={() => handleReplyClick(comment.id)}
                              className='flex items-center gap-1 transition-colors hover:text-white'
                            >
                              <MessageCircle className='h-4 w-4' />
                              <span>{comment.replies.length}</span>
                            </button>
                            <button
                              onClick={() => handleLike(comment.id)}
                              className='flex items-center gap-1 transition-colors hover:text-white'
                            >
                              <Heart
                                className={`h-4 w-4 transition-colors duration-200 ${
                                  comment.isLiked
                                    ? 'fill-white text-white'
                                    : 'text-gray-400'
                                }`}
                              />
                              <span
                                className={comment.isLiked ? 'text-white' : ''}
                              >
                                {comment.likes}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </BoundlessSheet>
    </>
  );
};

export default CommentModal;
