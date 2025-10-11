'use client';

import { useState } from 'react';
import {
  Calendar,
  Github,
  Globe,
  Youtube,
  X,
  Share2,
  UserPlus,
  ArrowUp,
  DollarSign,
  CheckCircle,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import type { CrowdfundingProject } from '@/lib/api/types';
import { voteProject } from '@/lib/api/project';

interface ProjectSidebarProps {
  project: CrowdfundingProject & {
    // Additional fields that might be added during transformation
    daysToDeadline?: number;
    additionalCreator?: {
      name: string;
      role: string;
      avatar: string;
    };
    links?: Array<{
      type: string;
      url: string;
      icon: string;
    }>;
    // Legacy fields for backward compatibility
    name?: string;
    description?: string;
    logo?: string;
    validation?: string;
    date?: string;
    votes?: number;
    totalVotes?: number;
  };
  crowdfund?: {
    _id: string;
    projectId: string;
    thresholdVotes: number;
    voteDeadline: string;
    totalVotes: number;
    status: string;
    isVotingActive: boolean;
    voteProgress: number;
    createdAt: string;
    updatedAt: string;
  };
  isMobile?: boolean;
}

export function ProjectSidebar({
  project,
  crowdfund,
  isMobile = false,
}: ProjectSidebarProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(project.votes || 0);
  const [userVote, setUserVote] = useState<1 | -1 | null>(null);

  // Calculate vote percentage based on crowdfund data
  const votePercentage = crowdfund
    ? (crowdfund.totalVotes / crowdfund.thresholdVotes) * 100
    : project.voting
      ? (currentVotes / project.voting.totalVotes) * 100
      : 0;

  // Calculate funding percentage
  const fundingPercentage = project.funding
    ? (project.funding.raised / project.funding.goal) * 100
    : 0;

  // Calculate milestone percentage
  const milestonePercentage = project.milestones
    ? (project.milestones.filter(m => m.status === 'completed').length /
        project.milestones.length) *
      100
    : 0;

  // Determine project status based on data
  const getProjectStatus = () => {
    if (project.status === 'idea' && crowdfund?.isVotingActive) {
      return 'Validation';
    }
    if (project.funding?.raised >= project.funding?.goal) {
      return 'Funded';
    }
    if (project.status === 'idea' && !crowdfund?.isVotingActive) {
      return 'Funding';
    }
    return project.status;
  };

  const projectStatus = getProjectStatus();

  const handleVote = async (value: 1 | -1) => {
    if (isVoting) return;

    setIsVoting(true);
    try {
      const response = await voteProject(project._id, value);
      setCurrentVotes(response.data.projectVotes.netVotes);
      setUserVote(value);
    } catch {
      // Handle error silently or show user-friendly message
      // You can add toast notifications here if needed
    } finally {
      setIsVoting(false);
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'github':
        return <Github className='h-4 w-4' />;
      case 'twitter':
        return <X className='h-4 w-4' />;
      case 'globe':
        return <Globe className='h-4 w-4' />;
      case 'youtube':
        return <Youtube className='h-4 w-4' />;
      default:
        return <Globe className='h-4 w-4' />;
    }
  };

  const getStatusStyles = () => {
    switch (projectStatus) {
      case 'Funding':
        return 'bg-blue-600 border-blue-600 text-white';
      case 'Funded':
        return 'bg-transparent border-primary text-primary';
      case 'Completed':
        return 'bg-green-600 border-green-600 text-white';
      case 'Validation':
        return 'bg-orange-500 border-orange-500 text-white';
      case 'idea':
        return 'bg-orange-500 border-orange-500 text-white';
      default:
        return '';
    }
  };

  const renderProgressSection = () => {
    switch (projectStatus) {
      case 'Funding':
        return (
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium text-white'>
                ${project.funding?.raised || 0}/${project.funding?.goal || 0}{' '}
                USD <span className='font-normal text-gray-400'>Raised</span>
              </span>
              <span className='text-xs font-medium text-orange-400'>
                {project.daysToDeadline || 0} days to deadline
              </span>
            </div>
            <Progress
              value={fundingPercentage}
              className='h-2 bg-[#A7F95014]'
            />
          </div>
        );

      case 'Validation':
        return (
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium text-white'>
                {crowdfund?.totalVotes || 0}/{crowdfund?.thresholdVotes || 0}{' '}
                <span className='font-normal text-gray-400'>Votes</span>
              </span>
              <span className='text-xs font-medium text-[#5FC381]'>
                {project.daysToDeadline || 0} days to deadline
              </span>
            </div>
            <Progress value={votePercentage} className='h-2 bg-[#A7F95014]' />
          </div>
        );

      case 'Completed':
        return (
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium text-white'>
                {project.milestones?.filter(m => m.status === 'completed')
                  .length || 0}
                /{project.milestones?.length || 0}{' '}
                <span className='font-normal text-gray-400'>
                  Milestones Submitted
                </span>
              </span>
              {project.milestones?.filter(m => m.status === 'rejected').length >
                0 && (
                <span className='text-xs font-medium text-red-400'>
                  {
                    project.milestones.filter(m => m.status === 'rejected')
                      .length
                  }{' '}
                  milestone rejected
                </span>
              )}
            </div>
            <Progress
              value={milestonePercentage}
              className='h-2 bg-[#A7F95014]'
            />
          </div>
        );

      default:
        return (
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium text-white'>
                {crowdfund?.totalVotes || 0}/{crowdfund?.thresholdVotes || 0}{' '}
                <span className='font-normal text-gray-400'>votes</span>
              </span>
              <span className='text-xs font-medium text-[#5FC381]'>
                {project.daysToDeadline || 0} days to deadline
              </span>
            </div>
            <Progress value={votePercentage} className='h-2 bg-[#A7F95014]' />
          </div>
        );
    }
  };

  return (
    <div className='w-full space-y-6'>
      <div className='flex gap-5 space-y-4'>
        <div className='relative'>
          <Image
            src={project.logo || project.media?.logo || '/icon.png'}
            alt={project.title}
            width={64}
            height={64}
            className='h-24 w-24 rounded-[8px] object-cover'
          />
        </div>

        <div className='space-y-3'>
          <h1 className='text-2xl leading-tight font-medium text-white'>
            {project.title}
          </h1>

          <div className='flex flex-wrap items-center gap-3'>
            <div className='bg-office-brown border-office-brown-darker text-office-brown-darker flex w-auto items-center justify-center rounded-[4px] border px-1 py-0.5 text-xs font-semibold'>
              {project.category}
            </div>
            <div
              className={`rounded-[4px] px-1 py-0.5 ${getStatusStyles()} flex items-center justify-center border text-xs font-semibold`}
            >
              {projectStatus}
            </div>
          </div>

          <div className='flex items-center gap-2 text-sm text-white'>
            <Calendar className='h-4 w-4' />
            <span>
              {new Date(project.createdAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      <p className='text-sm leading-relaxed text-white'>{project.vision}</p>

      {renderProgressSection()}

      <div className='flex flex-row gap-3'>
        {projectStatus === 'Validation' && (
          <Button
            onClick={() => handleVote(1)}
            disabled={isVoting}
            className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-lg text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl ${
              userVote === 1
                ? 'bg-green-600 text-white'
                : 'bg-[#A7F950] text-black hover:bg-[#A7F950]'
            }`}
          >
            <ArrowUp className='h-5 w-5' />
            <span className=''>
              {isVoting ? 'Voting...' : userVote === 1 ? 'Upvoted' : 'Upvote'}
            </span>
          </Button>
        )}

        {projectStatus === 'Funding' && (
          <Button className='flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#A7F950] text-base font-semibold text-black shadow-lg transition-all duration-200 hover:shadow-xl'>
            <Users className='h-5 w-5' />
            <span className=''>Back Project</span>
          </Button>
        )}

        {projectStatus === 'Completed' && (
          <Button
            disabled
            className='flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 text-base font-semibold text-white shadow-lg transition-all duration-200'
          >
            <CheckCircle className='h-5 w-5' />
            <span className=''>Completed</span>
          </Button>
        )}

        {projectStatus === 'Funded' && (
          <Button
            disabled
            className='flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 text-base font-semibold text-white shadow-lg transition-all duration-200'
          >
            <DollarSign className='h-5 w-5' />
            <span className=''>Funded</span>
          </Button>
        )}

        <Button
          variant='outline'
          className='flex h-12 w-12 items-center justify-center gap-2 rounded-lg border border-white/24 bg-transparent text-sm font-medium text-gray-300 transition-all duration-200 hover:border-gray-600 hover:bg-transparent hover:text-white sm:flex-1'
        >
          <span className='hidden sm:inline'>Follow</span>
          <UserPlus className='h-5 w-5' />
        </Button>
        <Button
          variant='outline'
          className='flex h-12 w-12 items-center justify-center gap-2 rounded-lg border border-white/24 bg-transparent text-sm font-medium text-gray-300 transition-all duration-200 hover:border-gray-600 hover:bg-transparent hover:text-white sm:flex-1'
        >
          <span className='hidden sm:inline'>Share</span>
          <Share2 className='h-5 w-5' />
        </Button>
      </div>

      {/* Creator Info and Links - Only show on desktop */}
      {!isMobile && (
        <>
          {/* Creator Info */}
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <Avatar className='h-10 w-10'>
                <AvatarImage
                  src={project.additionalCreator?.avatar || '/placeholder.svg'}
                  alt={
                    project.additionalCreator?.name ||
                    project.creator.profile.firstName +
                      ' ' +
                      project.creator.profile.lastName
                  }
                />
                <AvatarFallback className='bg-blue-600 text-sm font-medium text-white'>
                  {(
                    project.additionalCreator?.name ||
                    project.creator.profile.firstName +
                      ' ' +
                      project.creator.profile.lastName
                  )
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <p className='text-sm leading-tight font-medium text-white'>
                  {project.additionalCreator?.name ||
                    project.creator.profile.firstName +
                      ' ' +
                      project.creator.profile.lastName}
                </p>
                <p className='text-xs font-medium tracking-wide text-[#DBF936] uppercase'>
                  {project.additionalCreator?.role || 'CREATOR'}
                </p>
              </div>
            </div>
          </div>

          {/* Project Links */}
          <div className='space-y-4'>
            <h3 className='text-sm font-medium tracking-wide text-gray-300 uppercase'>
              PROJECT LINKS
            </h3>
            <div className='space-y-3'>
              {/* GitHub Link */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-3 text-sm text-white transition-colors hover:text-white'
                >
                  <span className='text-gray-400 transition-colors group-hover:text-white'>
                    <Github className='h-4 w-4' />
                  </span>
                  <span className='truncate'>{project.githubUrl}</span>
                </a>
              )}

              {/* Project Website */}
              {project.projectWebsite && (
                <a
                  href={project.projectWebsite}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-3 text-sm text-white transition-colors hover:text-white'
                >
                  <span className='text-gray-400 transition-colors group-hover:text-white'>
                    <Globe className='h-4 w-4' />
                  </span>
                  <span className='truncate'>{project.projectWebsite}</span>
                </a>
              )}

              {/* Demo Video */}
              {project.demoVideo && (
                <a
                  href={project.demoVideo}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-3 text-sm text-white transition-colors hover:text-white'
                >
                  <span className='text-gray-400 transition-colors group-hover:text-white'>
                    <Youtube className='h-4 w-4' />
                  </span>
                  <span className='truncate'>{project.demoVideo}</span>
                </a>
              )}

              {/* Social Links */}
              {project.socialLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-3 text-sm text-white transition-colors hover:text-white'
                >
                  <span className='text-gray-400 transition-colors group-hover:text-white'>
                    {getIcon(link.platform.toLowerCase())}
                  </span>
                  <span className='truncate'>{link.url}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
