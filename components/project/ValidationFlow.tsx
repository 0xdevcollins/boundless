'use client';

import React, { useState } from 'react';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageCircle, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import TimelineStepper from './TimelineStepper';

interface ValidationFlowProps {
  project: Project;
  onClose?: () => void;
  onVote?: (projectId: string) => void;
  onComment?: (projectId: string, comment: string) => void;
  onReact?: (commentId: string, reaction: string) => void;
}

const ValidationFlow: React.FC<ValidationFlowProps> = ({
  project,
  onClose,
  onVote,
}) => {
  const [voteCount, setVoteCount] = useState(12);
  const [commentCount] = useState(4);
  const [hasVoted, setHasVoted] = useState(false);
  const [daysLeft] = useState(12);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-[#865503] text-[#FEF6E7]';
      case 'approved':
        return 'bg-[#04326B] text-[#E3EFFC]';
      case 'rejected':
        return 'bg-[#F2BCBA] text-[#BA110B]';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const handleVote = () => {
    if (hasVoted) {
      setVoteCount(prev => prev - 1);
      setHasVoted(false);
    } else {
      setVoteCount(prev => prev + 1);
      setHasVoted(true);
    }
    onVote?.(project.id);
  };

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-[#101010] rounded-lg shadow-2xl w-full max-w-6xl h-[85vh] flex relative'>
        {/* Close Button - Outside the main content */}
        <Button
          variant='ghost'
          size='icon'
          onClick={onClose}
          className='absolute -top-12 right-0 z-10'
          style={{
            width: '48px',
            height: '48px',
            gap: '10px',
            opacity: 1,
            borderWidth: '0.5px',
            padding: '10px',
            borderRadius: '999px',
            background: '#FFFFFF',
            border: '0.5px solid #FFFFFF4D',
            backdropFilter: 'blur(98px)',
          }}
        >
          <X className='w-8 h-8 text-black' />
        </Button>

        {/* Left Panel - Project Submission Flow */}
        <div className='w-80 bg-[#0A0A0A] p-6 border-r border-[#2A2A2A] rounded-l-lg'>
          <div className='space-y-6'>
            {/* Step 1: Initialize */}
            <div className='flex items-start space-x-4'>
              <div className='relative'>
                <div className='relative'>
                  <div className='w-12 h-12 bg-[#A7F9503D] rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                    <div className='w-8 h-8 bg-[#A7F950] rounded-full flex items-center justify-center'>
                      <svg
                        className='w-4 h-4 text-black'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Connector line to Step 2 */}
                <div
                  className='absolute left-1/2 top-full w-[1.5px] h-[88px] bg-[#A7F950] opacity-100'
                  style={{ transform: 'translateX(-50%)' }}
                ></div>
              </div>
              <div>
                <h3 className='font-medium text-[#F5F5F5]'>Initialize</h3>
                <p className='text-sm text-[#B5B5B5] mt-1'>
                  Submit your project idea and define milestones to begin your
                  campaign journey.
                </p>
              </div>
            </div>

            {/* Step 2: Validate */}
            <div className='flex items-start space-x-4'>
              <div className='relative'>
                <div className='w-12 h-12 bg-[#A7F950] rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <span className='text-black font-semibold text-sm'>2</span>
                </div>
                {/* Connector line to Step 3 */}
                <div
                  className='absolute left-1/2 top-full w-[1.5px] h-[48px] opacity-30'
                  style={{
                    transform: 'translateX(-50%)',
                    background:
                      'repeating-linear-gradient(to bottom, #A7F950 0px, #A7F950 4px, transparent 4px, transparent 8px)',
                  }}
                ></div>
              </div>
              <div>
                <h3 className='font-medium text-[#F5F5F5]'>Validate</h3>
                <p className='text-sm text-[#B5B5B5] mt-1'>
                  Get admin approval and gather public support through voting.
                </p>
              </div>
            </div>

            {/* Step 3: Launch Campaign */}
            <div className='flex items-start space-x-4'>
              <div className='w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                <span className='text-[#B5B5B5] font-semibold text-sm'>3</span>
              </div>
              <div>
                <h3 className='font-medium text-[#B5B5B5]'>Launch Campaign</h3>
                <p className='text-sm text-[#B5B5B5] mt-1'>
                  Finalize campaign details and deploy smart escrow to go live
                  and receive funding.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Project Details */}
        <div className='flex-1 p-6 overflow-y-auto rounded-r-lg'>
          {/* Header */}
          <div className='flex justify-between items-start mb-6'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-[#B5B5B5]'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-[#F5F5F5] font-medium'>Collins Odumeje</h3>
                <h1 className='text-2xl font-bold text-[#F5F5F5] flex items-center'>
                  {project.name}
                  <div className='w-4'></div>
                  <Badge
                    className={cn(
                      'px-3 py-1 text-sm font-medium',
                      getStatusColor(project.status)
                    )}
                  >
                    {getStatusText(project.status)}
                  </Badge>
                </h1>
              </div>
            </div>
          </div>

          {/* Funding Goal */}
          <div className='mb-6'>
            <h2 className='text-3xl font-bold mb-2'>
              <span className='text-[#F5F5F5]'>
                ${project.amount.toLocaleString()}
              </span>
              <span className='text-[#B5B5B5]'>.00</span>
            </h2>
          </div>

          {/* Project Description */}
          <div className='mb-8'>
            <p className='text-[#F5F5F5] text-base leading-relaxed'>
              {project.description}
            </p>
          </div>

          {/* Boundless Logo */}
          <div className='mb-8'>
            <img
              src='/BOUNDLESS.png'
              alt='Boundless Logo'
              className='mx-auto rounded-xl'
              style={{
                width: '500px',
                height: '242px',
                opacity: 1,
                borderRadius: '12px',
              }}
            />
          </div>

          {/* Vote Display */}
          <div className='mb-8'>
            <div className='flex justify-between items-center mb-3'>
              <h3 className='text-[#F5F5F5] font-medium'>Vote count</h3>
              <span className='text-[#F5F5F5] text-sm'>
                {voteCount} <span className='text-[#B5B5B5]'>of</span> 100 votes
              </span>
            </div>
            <Progress value={(voteCount / 100) * 100} className='h-2 mb-4' />

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <Button
                  variant='outline'
                  onClick={handleVote}
                  className='flex items-center space-x-2 border-[#2B2B2B] bg-[#212121] hover:bg-[#2A2A2A] text-[#F5F5F5]'
                >
                  <ThumbsUp
                    className={cn(
                      'w-4 h-4',
                      hasVoted ? 'fill-white' : 'fill-transparent'
                    )}
                  />
                  <span className='font-semibold'>{voteCount}</span>
                </Button>

                <Button
                  variant='outline'
                  className='flex items-center space-x-2 border-[#2B2B2B] bg-[#212121] hover:bg-[#2A2A2A] text-[#F5F5F5]'
                >
                  <MessageCircle className='w-4 h-4 fill-transparent' />
                  <span className='font-semibold'>{commentCount}</span>
                </Button>
              </div>

              <div className='flex items-center space-x-2 text-[#B5B5B5] text-sm'>
                <Clock className='w-4 h-4' />
                <span>{daysLeft} days left</span>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className='mb-8'>
            <h3 className='text-[#F5F5F5] mb-4 text-base font-semibold'>
              Milestones
            </h3>

            <div className='space-y-3'>
              <div>
                <h4 className='text-[#F5F5F5] mb-2 text-xs font-medium'>
                  Milestone 1
                </h4>
                <button
                  className='w-full flex items-center justify-between bg-[#2A2A2A] border border-[#2B2B2B] rounded-xl text-[#F5F5F5] hover:bg-[#2A2A2A]/80 transition-colors'
                  style={{
                    height: '48px',
                    gap: '12px',
                    opacity: 1,
                    borderWidth: '1px',
                    padding: '16px',
                    borderRadius: '12px',
                  }}
                >
                  <span>Prototype & Smart Contract Setup</span>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>
              </div>

              <div>
                <h4 className='text-[#F5F5F5] mb-2 text-xs font-medium'>
                  Milestone 2
                </h4>
                <button
                  className='w-full flex items-center justify-between bg-[#2A2A2A] border border-[#2B2B2B] rounded-xl text-[#F5F5F5] hover:bg-[#2A2A2A]/80 transition-colors'
                  style={{
                    height: '48px',
                    gap: '12px',
                    opacity: 1,
                    borderWidth: '1px',
                    padding: '16px',
                    borderRadius: '12px',
                  }}
                >
                  <span>Campaign & Grant Builder Integration</span>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>
              </div>

              <div>
                <h4 className='text-[#F5F5F5] mb-2 text-xs font-medium'>
                  Milestone 2
                </h4>
                <button
                  className='w-full flex items-center justify-between bg-[#2A2A2A] border border-[#2B2B2B] rounded-xl text-[#F5F5F5] hover:bg-[#2A2A2A]/80 transition-colors'
                  style={{
                    height: '48px',
                    gap: '12px',
                    opacity: 1,
                    borderWidth: '1px',
                    padding: '16px',
                    borderRadius: '12px',
                  }}
                >
                  <span>Campaign & Grant Builder Integration</span>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className='text-[#F5F5F5] font-medium mb-4'>Timeline</h3>
            <TimelineStepper project={project} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationFlow;
