'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import CommentModal from '../comment/modal';
import {
  ThumbsUp,
  MessageCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Calendar,
  Coins,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import TimelineStepper from './TimelineStepper';

interface ValidationFlowProps {
  project: Project;
  onVote?: (projectId: string) => void;
  onComment?: (projectId: string, comment: string) => void;
  onReact?: (commentId: string, reaction: string) => void;
  onSuccess?: () => void;
}

const ValidationFlow: React.FC<ValidationFlowProps> = ({ project, onVote }) => {
  const [voteCount, setVoteCount] = useState(12);
  const [commentCount] = useState(4);
  const [hasVoted, setHasVoted] = useState(false);
  const [daysLeft] = useState(12);
  const [expandedMilestones, setExpandedMilestones] = useState<number[]>([]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
      case 'under_review':
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
      case 'under_review':
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

  const toggleMilestone = (milestoneIndex: number) => {
    setExpandedMilestones(prev =>
      prev.includes(milestoneIndex)
        ? prev.filter(i => i !== milestoneIndex)
        : [...prev, milestoneIndex]
    );
  };

  const milestones = [
    {
      title: 'Milestone 1',
      name: 'Prototype & Smart Contract Setup',
      description:
        'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
      date: 'October 10, 2025',
      amount: '$29,000.00',
    },
    {
      title: 'Milestone 2',
      name: 'Campaign & Grant Builder Integration',
      description:
        'Integrate campaign creation tools and grant builder functionality into the platform with advanced features and user management.',
      date: 'November 15, 2025',
      amount: '$45,000.00',
    },
    {
      title: 'Milestone 3',
      name: 'Platform Launch & Community Building',
      description:
        'Launch the platform to the public and build a strong community of users and contributors with marketing and partnership initiatives.',
      date: 'December 20, 2025',
      amount: '$49,000.00',
    },
  ];

  return (
    <div>
      <div className='w-[500px] flex flex-col gap-3 pt-3 pb-6 space-y-6'>
        <div className='flex justify-between items-start'>
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
                <div className='w-4' />
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

        <div>
          <h2 className='text-3xl font-bold mb-2'>
            <span className='text-[#F5F5F5]'>
              ${project.amount.toLocaleString()}
            </span>
            <span className='text-[#B5B5B5]'>.00</span>
          </h2>
        </div>

        <div>
          <p className='text-[#F5F5F5] text-base leading-relaxed'>
            {project.description}
          </p>
        </div>

        <div className='flex justify-center'>
          <Image
            src='/BOUNDLESS.png'
            alt='Boundless Logo'
            width={500}
            height={280}
            className='rounded-xl'
          />
        </div>

        <div>
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

              <CommentModal
                onCommentSubmit={comment => {
                  // eslint-disable-next-line no-console
                  console.log('Comment submitted:', comment);
                }}
              >
                <Button
                  variant='outline'
                  className='flex items-center space-x-2 border-[#2B2B2B] bg-[#212121] hover:bg-[#2A2A2A] text-[#F5F5F5]'
                >
                  <MessageCircle className='w-4 h-4 fill-transparent' />
                  <span className='font-semibold'>{commentCount}</span>
                </Button>
              </CommentModal>
            </div>

            <div className='flex items-center space-x-2 text-[#B5B5B5] text-sm'>
              <Clock className='w-4 h-4' />
              <span>{daysLeft} days left</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-[#F5F5F5] mb-4 text-base font-semibold'>
            Milestones
          </h3>

          <div className='space-y-3'>
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className='border border-[#2B2B2B] rounded-xl overflow-hidden'
              >
                <button
                  onClick={() => toggleMilestone(index)}
                  className='w-full flex items-center justify-between bg-[#2A2A2A] text-[#F5F5F5] hover:bg-[#2A2A2A]/80 transition-colors p-4'
                >
                  <div className='text-left'>
                    <h4 className='text-xs font-medium text-[#B5B5B5] mb-1'>
                      {milestone.title}
                    </h4>
                    <span className='text-sm font-medium'>
                      {milestone.name}
                    </span>
                  </div>
                  {expandedMilestones.includes(index) ? (
                    <ChevronUp className='w-4 h-4' />
                  ) : (
                    <ChevronDown className='w-4 h-4' />
                  )}
                </button>

                {expandedMilestones.includes(index) && (
                  <div className='bg-[#1A1A1A] p-4 border-t border-[#2B2B2B]'>
                    <p className='text-[#B5B5B5] text-sm mb-4'>
                      {milestone.description}
                    </p>
                    <div className='flex items-center justify-between text-[#B5B5B5] text-sm'>
                      <div className='flex items-center space-x-2'>
                        <Calendar className='w-4 h-4' />
                        <span>{milestone.date}</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Coins className='w-4 h-4' />
                        <span>{milestone.amount}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className='text-[#F5F5F5] font-medium mb-4'>Timeline</h3>
          <TimelineStepper project={project} />
        </div>
      </div>
    </div>
  );
};

export default ValidationFlow;
