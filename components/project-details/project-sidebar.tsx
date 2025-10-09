import {
  Calendar,
  Github,
  Globe,
  Youtube,
  X,
  Share2,
  UserPlus,
  ArrowUp,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { CrowdfundingProject } from '@/lib/api/types';

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
  isMobile?: boolean;
}

export function ProjectSidebar({
  project,
  isMobile = false,
}: ProjectSidebarProps) {
  const votePercentage = project.voting
    ? (project.votes / project.voting.totalVotes) * 100
    : 0;

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
    switch (project.status) {
      case 'Funding':
        return 'bg-blue-ish border-blue-ish-darker text-blue-ish-darker';
      case 'Funded':
        return 'bg-transparent border-primary text-primary';
      case 'Completed':
        return 'bg-success-green border-success-green-darker text-success-green-darker';
      case 'Validation':
      case 'idea':
        return 'bg-warning-orange border-warning-orange-darker text-warning-orange-darker';
      default:
        return '';
    }
  };

  return (
    <div className='w-full space-y-6'>
      {/* Project Header Section */}
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

          {/* Category and Validation badges - side by side */}
          <div className='flex flex-wrap items-center gap-3'>
            <div className='bg-office-brown border-office-brown-darker text-office-brown-darker flex w-auto items-center justify-center rounded-[4px] border px-1 py-0.5 text-xs font-semibold'>
              {project.category}
            </div>
            <div
              className={`rounded-[4px] px-1 py-0.5 ${getStatusStyles()} flex items-center justify-center border text-xs font-semibold`}
            >
              {project.status}
            </div>
          </div>

          {/* Date */}
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

      {/* Description */}
      <p className='text-sm leading-relaxed text-white'>{project.vision}</p>

      {/* Voting Progress */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between text-sm'>
          <span className='font-medium text-white'>
            {project.votes}/{project.voting?.totalVotes || 0}{' '}
            <span className='font-normal text-gray-400'>votes</span>
          </span>
          <span className='text-xs font-medium text-[#5FC381]'>
            {project.daysToDeadline || 0} days to deadline
          </span>
        </div>
        <Progress value={votePercentage} className='h-2 bg-[#A7F95014]' />
      </div>

      {/* Action Buttons - Responsive widths */}
      <div className='flex flex-row gap-3'>
        <Button className='flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#A7F950] text-base font-semibold text-black shadow-lg transition-all duration-200 hover:shadow-xl'>
          <ArrowUp className='h-5 w-5' />
          <span className=''>Upvote</span>
        </Button>

        {/* Funding Button */}
        {/* <FundingModal
          projectId={project._id}
          projectTitle={project.title}
          currentRaised={project.funding?.raised || 0}
          fundingGoal={project.funding?.goal || 0}
        >
          <Button className='flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl'>
            <DollarSign className='h-5 w-5' />
            <span className=''>Fund</span>
          </Button>
        </FundingModal> */}

        <Button
          variant='outline'
          className='flex h-12 w-12 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-transparent text-sm font-medium text-gray-300 transition-all duration-200 hover:border-gray-600 hover:bg-transparent hover:text-white sm:flex-1'
        >
          <span className='hidden sm:inline'>Follow</span>
          <UserPlus className='h-5 w-5' />
        </Button>
        <Button
          variant='outline'
          className='flex h-12 w-12 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-transparent text-sm font-medium text-gray-300 transition-all duration-200 hover:border-gray-600 hover:bg-transparent hover:text-white sm:flex-1'
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
              {project.links?.map((link, index) => (
                <a
                  key={index}
                  href={`https://${link.url}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-3 text-sm text-white transition-colors hover:text-white'
                >
                  <span className='text-gray-400 transition-colors group-hover:text-white'>
                    {getIcon(link.icon)}
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
