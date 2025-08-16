'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ArrowLeft, X, MessageCircle, Heart, Trash2 } from 'lucide-react';
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

      if (onCommentSubmit) {
        onCommentSubmit(comment.trim());
      }
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
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className='fixed top-[2em] right-[6em] z-50 p-2  rounded-full transition-colors bg-white border border-[#2A2A2A] lg:block hidden'
        >
          <X className='w-5 h-5 text-black' />
        </button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className='w-[95%] lg:w-[80vw] !max-w-[90%] lg:!max-w-[90vw] bg-black border-[#2A2A2A] text-white p-0 h-[80vh] sm:h-[85vh] md:h-[90vh] lg:h-[95vh] overflow-y-auto custom-scrollbar'
          showCloseButton={false}
        >
          <button
            onClick={() => setIsOpen(false)}
            className='absolute top-4 right-4 z-50 p-2 hover:bg-[#2A2A2A] rounded-full transition-colors bg-[#1C1C1C] border border-[#2A2A2A] lg:hidden'
          >
            <X className='w-5 h-5 text-white' />
          </button>

          <div className='flex flex-col xl:flex-row h-full'>
            <div className='lg:p-6 p-4 lg:border-b-0 flex-shrink-0'>
              <div className='lg:block flex flex-row justify-center'>
                <Stepper steps={campaignSteps} />
              </div>
            </div>

            <div className='flex-1 flex flex-col lg:w-[50%] w-full'>
              {!replyMode.isActive && (
                <div className='p-6 w-[80%] xl:w-[70%] mx-auto'>
                  <div className='flex items-center gap-3 py-6'>
                    <button
                      onClick={() => setIsOpen(false)}
                      className='p-2 hover:bg-[#2A2A2A] rounded-full transition-colors'
                    >
                      <ArrowLeft className='w-5 h-5 text-white' />
                    </button>
                    <h2 className='text-xl font-semibold text-white'>
                      Comments
                    </h2>
                  </div>
                  <div className='flex items-center justify-between gap-3  border px-3  rounded-lg border-[#2A2A2A]'>
                    <div className='flex-shrink-0'>
                      <Image
                        src='/empty/user.svg'
                        alt='User avatar'
                        width={40}
                        height={40}
                        className='w-12 h-12'
                      />
                    </div>
                    <div className='flex-1 pt-6'>
                      <textarea
                        ref={textareaRef}
                        placeholder='Leave a comment'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='py-2 text-white placeholder:text-gray-400 w-full bg-transparent text-md leading-none min-h-[60px] border-none outline-none shadow-none focus:border-none focus:outline-none focus:ring-0'
                      />
                    </div>
                    <div className='flex-shrink-0'>
                      <Button
                        onClick={handleSubmit}
                        disabled={!comment.trim()}
                        className='px-6 py-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white border border-[#3A3A3A] disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                  <div className='border-b border-[#2A2A2A] my-6 ' />
                </div>
              )}

              {replyMode.isActive && (
                <div className='p-6 w-[80%] xl:w-[70%] mx-auto'>
                  {/* Reply Header */}
                  <div className='flex items-center gap-3 py-6'>
                    <button
                      onClick={handleBackToComments}
                      className='p-2 hover:bg-[#2A2A2A] rounded-full transition-colors'
                    >
                      <ArrowLeft className='w-5 h-5 text-white' />
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
                        <div className='flex gap-3 p-4 rounded-lg bg-[#1A1A1A]/50'>
                          <div className='flex-shrink-0'>
                            <Image
                              src='/empty/user.svg'
                              alt='User avatar'
                              width={40}
                              height={40}
                              className='w-12 h-12'
                            />
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                              <span className='font-medium text-white'>
                                {parentComment.author}
                              </span>
                              <span className='text-gray-400 text-sm'>
                                {parentComment.timestamp}
                              </span>
                            </div>
                            <p className='text-white/90 mb-4 leading-relaxed'>
                              {parentComment.text}
                            </p>

                            <div className='flex items-center gap-4 text-gray-400 text-sm'>
                              <div className='flex items-center gap-1'>
                                <MessageCircle className='w-4 h-4' />
                                <span>{parentComment.replies.length}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Heart className='w-4 h-4' />
                                <span>{parentComment.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className='flex items-center justify-between gap-3 border px-3 py-3 rounded-lg border-[#2A2A2A]'>
                    <div className='flex-shrink-0'>
                      <Image
                        src='/empty/user.svg'
                        alt='User avatar'
                        width={40}
                        height={40}
                        className='w-12 h-12'
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
                        className='py-2 text-white placeholder:text-gray-400 w-full bg-transparent text-md leading-none min-h-[60px] resize-none border-none outline-none shadow-none focus:border-none focus:outline-none focus:ring-0'
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
                        className='px-6 py-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white border border-[#3A3A3A] disabled:opacity-50 disabled:cursor-not-allowed'
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
                                className='w-12 h-12'
                              />
                            </div>
                            <div className='flex-1'>
                              <div className='flex items-center gap-2 mb-2'>
                                <span className='font-medium text-white'>
                                  {reply.author}
                                </span>
                                <span className='text-gray-400 text-sm'>
                                  {reply.timestamp}
                                </span>
                              </div>
                              <p className='text-white/90 leading-relaxed'>
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
                            className='w-32 h-32 mx-auto mb-4'
                          />
                        </div>

                        <h3 className='text-xl font-semibold text-white mb-2'>
                          No Comments Available
                        </h3>
                        <p className='text-gray-400 max-w-md mx-auto'>
                          Share your insights or questions to kick off
                          meaningful discussions.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className='p-6 space-y-6 mx-auto w-[70%] pb-8'>
                      {comments.map(comment => (
                        <div
                          key={comment.id}
                          className='flex gap-3 p-4 rounded-lg bg-[#1A1A1A]/50 transition-all duration-200 cursor-pointer group relative'
                        >
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className='absolute top-3 right-3 p-1.5 hover:bg-[#2A2A2A] rounded-full transition-colors opacity-0 group-hover:opacity-100'
                            title='Delete comment'
                          >
                            <Trash2 className='w-4 h-4 text-red-400 transition-colors' />
                          </button>

                          <div className='flex-shrink-0'>
                            <Image
                              src='/empty/user.svg'
                              alt='User avatar'
                              width={40}
                              height={40}
                              className='w-12 h-12'
                            />
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                              <span className='font-medium text-white'>
                                {comment.author}
                              </span>
                              <span className='text-gray-400 text-sm'>
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className='text-white/90 mb-3 leading-relaxed'>
                              {comment.text}
                            </p>
                            <div className='flex items-center gap-4 text-gray-400 text-sm'>
                              <button
                                onClick={() => handleReplyClick(comment.id)}
                                className='flex items-center gap-1 hover:text-white transition-colors'
                              >
                                <MessageCircle className='w-4 h-4' />
                                <span>{comment.replies.length}</span>
                              </button>
                              <button
                                onClick={() => handleLike(comment.id)}
                                className='flex items-center gap-1 hover:text-white transition-colors'
                              >
                                <Heart
                                  className={`w-4 h-4 transition-colors duration-200 ${
                                    comment.isLiked
                                      ? 'text-white fill-white'
                                      : 'text-gray-400'
                                  }`}
                                />
                                <span
                                  className={
                                    comment.isLiked ? 'text-white' : ''
                                  }
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentModal;
