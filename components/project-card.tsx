'use client';
import React, { useState } from 'react';
import { Project } from '@/types/project';
import { BoundlessButton } from '@/components/buttons';
import BoundlessSheet from './sheet/boundless-sheet';
import ValidationFlow from './project/ValidationFlow';
import LaunchCampaignFlow from './campaigns/LaunchCampaignFlow';
import CommentModal from './comment/modal';
import {
  ThumbsUp,
  UserIcon,
  MessageCircleMore,
  MoreHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PriceDisplay } from './PriceDisplay';
import { Progress } from './ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import CircularProgress from './ui/circular-progress';
import { motion } from 'framer-motion';
import { cardHover, fadeInUp } from '@/lib/motion';
import Stepper from './stepper/Stepper';
import { useWalletProtection } from '@/hooks/use-wallet-protection';
import WalletRequiredModal from '@/components/wallet/WalletRequiredModal';

interface ProjectCardProps {
  project: Project;
  onVote?: (projectId: string) => void;
  onComment?: (projectId: string) => void;
  onView?: (projectId: string) => void;
  onShare?: (projectId: string) => void;
  onStartCampaign?: (projectId: string) => void;
  showCreatorName?: boolean;
  showEllipsisMenu?: boolean;
}
type StepState = 'active' | 'pending' | 'completed';

type Step = {
  title: string;
  description: string;
  state: StepState;
};

const steps: Step[] = [
  {
    title: 'Initialize',
    description: 'Submit your project idea to kickstart your campaign journey.',
    state: 'completed',
  },
  {
    title: 'Validate',
    description: 'Get admin approval and gather public support through voting.',
    state: 'active',
  },
  {
    title: 'Launch Campaign',
    description: 'Set milestones, activate escrow, and start receiving funds.',
    state: 'pending',
  },
];

const campaignSteps: Step[] = [
  {
    title: 'Initialize',
    description: 'Submit your project idea to kickstart your campaign journey.',
    state: 'completed',
  },
  {
    title: 'Validate',
    description: 'Get admin approval and gather public support through voting.',
    state: 'completed',
  },
  {
    title: 'Launch Campaign',
    description: 'Set milestones, activate escrow, and start receiving funds.',
    state: 'active',
  },
];

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onVote,
  showCreatorName = false,
  showEllipsisMenu = false,
}) => {
  const [validationSheetOpen, setValidationSheetOpen] = useState(false);
  const [launchCampaignSheetOpen, setLaunchCampaignSheetOpen] = useState(false);

  // Wallet protection hook
  const {
    requireWallet,
    showWalletModal,
    handleWalletConnected,
    closeWalletModal,
  } = useWalletProtection({
    actionName: 'start campaign',
  });
  const [stepperState] = useState<Step[]>(steps);
  const [campaignStepperState] = useState<Step[]>(campaignSteps);
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-[#865503] text-[#FEF6E7]';
      case 'idea':
      case 'under_review':
        return 'bg-[#865503] text-[#FEF6E7]';
      case 'approved':
        return 'bg-[#04326B] text-[#E3EFFC]';
      case 'rejected':
        return 'bg-[#F2BCBA] text-[#BA110B]';
      case 'validated':
        return 'bg-[#036B26] text-[#E7F6EC]';
      case 'failed':
        return 'bg-[#9E0A05] text-[#FBEAE9]';
      case 'funding':
        return 'bg-blue-600 text-white';
      case 'funded':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web3':
        return 'bg-[#E3EFFC] text-[#034592]';
      case 'defi':
        return 'bg-green-500 text-white';
      case 'nft':
        return 'bg-purple-500 text-white';
      case 'dao':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getVoteData = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { current: 0, total: 100, showProgress: false };
      case 'idea':
      case 'under_review':
        return { current: 0, total: 100, showProgress: false };
      case 'approved':
        return { current: 12, total: 100, showProgress: true };
      case 'rejected':
        return { current: 0, total: 100, showProgress: false };
      case 'validated':
        return { current: 100, total: 100, showProgress: false };
      case 'failed':
        return { current: 39, total: 100, showProgress: false };
      default:
        return { current: 0, total: 100, showProgress: false };
    }
  };

  const getActionCounts = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { votes: 0, comments: 0, shares: 0 };
      case 'idea':
      case 'under_review':
        return { votes: 0, comments: 0, shares: 0 };
      case 'approved':
        return { votes: 12, comments: 4, shares: 4 };
      case 'rejected':
        return { votes: 0, comments: 0, shares: 0 };
      case 'validated':
        return { votes: 25, comments: 0, shares: 0 };
      case 'failed':
        return { votes: 39, comments: 0, shares: 4 };
      default:
        return { votes: 0, comments: 0, shares: 0 };
    }
  };

  const voteData = getVoteData(project.status);
  const actionCounts = getActionCounts(project.status);

  return (
    <motion.div
      className='bg-[#101010] min-h-[450px] rounded-[16px] p-3 w-full max-w-sm mx-auto transition-all duration-200 cursor-pointer group hover:bg-[#151515]'
      whileHover='hover'
      variants={cardHover}
      initial='hidden'
      animate='visible'
    >
      {/* Image Container */}
      <motion.div
        className='relative h-40 sm:h-48 rounded-[12px] overflow-hidden mb-4'
        variants={fadeInUp}
      >
        <Image
          src={project.image}
          fill
          alt={`${project.name} banner`}
          className='object-cover pointer-events-none'
          unoptimized
        />

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge
            className={cn(
              'absolute top-3 right-3 px-2 py-1 rounded-[6px] text-xs font-medium',
              getStatusColor(project.status)
            )}
          >
            {project.status.toLowerCase() === 'idea'
              ? 'Under Review'
              : project.status.replace('_', ' ')}
          </Badge>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Badge
            className={cn(
              'absolute top-12 right-3 px-2 py-1 rounded-[6px] text-xs font-medium',
              getCategoryColor(project.category)
            )}
          >
            {project.category}
          </Badge>
        </motion.div>

        {/* Ellipsis Menu - Conditional */}

        {/* Avatar with Tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className='absolute top-3 left-3 w-8 h-8 cursor-pointer'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback className='bg-blue-500'>
                    <UserIcon className='w-4 h-4 text-white' />
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              side='bottom'
              className='bg-[#CDC4C4] border-[#2A2A2A] shadow-[0_2px_2px_0_rgba(0,0,0,0.24)] text-white'
            >
              <p className='text-xs font-medium text-[#514A4A] leading-[145%] tracking-[-0.06px]'>
                Project Creator
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      {/* Content */}
      <motion.div className='space-y-4' variants={fadeInUp}>
        {/* Title and Price */}
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <h2 className='text-[#F5F5F5] text-lg sm:text-xl font-medium line-clamp-1'>
              {showCreatorName
                ? `${project.name} by Collins Odumeje`
                : project.name}
            </h2>
            {showEllipsisMenu && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className=' w-8 h-8 bg-background hover:bg-background/40'
                    >
                      <MoreHorizontal className='w-4 h-4 text-white' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='end'
                    className='bg-[#1C1C1C] border-[#2A2A2A]'
                  >
                    <DropdownMenuItem
                      className='text-white hover:bg-[#2A2A2A]'
                      onClick={() => setValidationSheetOpen(true)}
                    >
                      View Validation Flow
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-white hover:bg-[#2A2A2A]'>
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-white hover:bg-[#2A2A2A]'>
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )}
          </div>
          <PriceDisplay
            price={project.amount}
            className='text-lg sm:text-xl tracking-[-0.4px]'
          />
          <p className='text-[#F5F5F5] text-sm line-clamp-2 leading-relaxed'>
            {project.description}
          </p>
        </div>

        {/* Vote Progress - Conditional */}
        <div className='space-y-3'>
          <div className='flex justify-between items-center text-[#F5F5F5] text-xs font-medium'>
            <span>Vote count</span>
            <span className='flex items-center gap-1'>
              {voteData.current} <span className='text-[#B5B5B5]'>of</span>{' '}
              {voteData.total} votes
            </span>
          </div>
          <Progress
            value={(voteData.current / voteData.total) * 100}
            className='h-2'
          />
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <BoundlessButton
              variant='secondary'
              size='sm'
              className={cn(
                'flex-1 border-[1.4px] border-[#2B2B2B] rounded-[10px] bg-[#212121] hover:bg-[#2A2A2A] disabled:bg-[#212121] disabled:border-[#2B2B2B] disabled:text-[#484848]',
                project.status === 'validated' && 'hidden'
              )}
              onClick={() => requireWallet(() => onVote?.(project.id))}
              disabled={
                project.status === 'idea' ||
                project.status === 'under_review' ||
                project.status === 'rejected' ||
                project.status === 'failed'
              }
            >
              <ThumbsUp className='w-4 h-4' />
              <span className='ml-1 font-semibold'>{actionCounts.votes}</span>
            </BoundlessButton>
            {(project.status === 'approved' || project.status === 'failed') && (
              <CircularProgress
                value={voteData.current}
                size={32}
                strokeWidth={3}
                segments={14}
                className='w-[32px] h-[32px]'
              />
            )}
            <CommentModal
              onCommentSubmit={comment => {
                // eslint-disable-next-line no-console
                console.log(comment);
              }}
            >
              <BoundlessButton
                variant='secondary'
                size='sm'
                className='flex-1 border-[1.4px] border-[#2B2B2B] rounded-[10px] bg-[#212121] hover:bg-[#2A2A2A] disabled:bg-[#212121] disabled:border-[#2B2B2B] disabled:text-[#484848]'
                disabled={
                  project.status === 'idea' ||
                  project.status === 'under_review' ||
                  project.status === 'rejected' ||
                  project.status === 'failed'
                }
              >
                <MessageCircleMore className='w-4 h-4' />
                <span className='ml-1 font-semibold'>
                  {actionCounts.comments}
                </span>
              </BoundlessButton>
            </CommentModal>
          </div>
          {project.status === 'validated' && (
            <div>
              <BoundlessButton
                onClick={() =>
                  requireWallet(() => setLaunchCampaignSheetOpen(true))
                }
              >
                Start Campaign
              </BoundlessButton>
            </div>
          )}
        </div>
      </motion.div>

      {/* Validation Flow Sheet */}
      <BoundlessSheet
        open={validationSheetOpen}
        setOpen={setValidationSheetOpen}
        side='bottom'
        maxHeight='90vh'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 justify-between relative'>
          <div className='sticky top-0'>
            <Stepper steps={stepperState} />
          </div>
          <div className='flex-1'>
            <ValidationFlow
              project={project}
              onVote={onVote}
              onSuccess={() => setValidationSheetOpen(false)}
            />
          </div>
        </div>
      </BoundlessSheet>

      {/* Launch Campaign Flow Sheet */}
      <BoundlessSheet
        open={launchCampaignSheetOpen}
        setOpen={setLaunchCampaignSheetOpen}
        side='bottom'
        maxHeight='90vh'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 justify-between relative'>
          <div className='sticky top-0'>
            <Stepper steps={campaignStepperState} />
          </div>
          <div className='flex-1'>
            <LaunchCampaignFlow
              onComplete={() => setLaunchCampaignSheetOpen(false)}
            />
          </div>
        </div>
      </BoundlessSheet>

      {/* Wallet Required Modal */}
      <WalletRequiredModal
        open={showWalletModal}
        onOpenChange={closeWalletModal}
        actionName='start campaign'
        onWalletConnected={handleWalletConnected}
      />
    </motion.div>
  );
};

export default ProjectCard;
