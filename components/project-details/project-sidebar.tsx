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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

interface ProjectSidebarProps {
  project: {
    name: string;
    description: string;
    logo: string;
    category: string;
    validation: string;
    date: string;
    votes: number;
    totalVotes: number;
    daysToDeadline: number;
    creator: {
      name: string;
      role: string;
      avatar: string;
    };
    links: Array<{
      type: string;
      url: string;
      icon: string;
    }>;
  };
  isMobile?: boolean;
}

export function ProjectSidebar({
  project,
  isMobile = false,
}: ProjectSidebarProps) {
  const votePercentage = (project.votes / project.totalVotes) * 100;

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

  return (
    <div className='w-full space-y-6'>
      {/* Project Header Section */}
      <div className='flex gap-5 space-y-4'>
        <div className='relative'>
          <Image
            src={project.logo}
            alt={project.name}
            width={64}
            height={64}
            className='h-24 w-24'
          />
        </div>

        <div className='space-y-3'>
          <h1 className='text-2xl leading-tight font-bold text-white'>
            {project.name}
          </h1>

          {/* Category and Validation badges - side by side */}
          <div className='flex flex-wrap items-center gap-2'>
            <Badge
              variant='secondary'
              className='border- rounded-md bg-[#E4DBDB] px-3 py-1.5 text-xs font-medium text-[#645D5D]'
            >
              {project.category}
            </Badge>
            <Badge
              variant='secondary'
              className='rounded-md border-[#AD6F07] bg-[#FBE2B7] px-3 py-1.5 text-xs font-medium text-[#AD6F07]'
            >
              {project.validation}
            </Badge>
          </div>

          {/* Date */}
          <div className='flex items-center gap-2 text-sm text-white'>
            <Calendar className='h-4 w-4' />
            <span>{project.date}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className='text-sm leading-relaxed text-white'>
        {project.description}
      </p>

      {/* Voting Progress */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between text-sm'>
          <span className='font-medium text-white'>
            {project.votes}/{project.totalVotes}{' '}
            <span className='font-normal text-gray-400'>votes</span>
          </span>
          <span className='text-xs font-medium text-[#5FC381]'>
            {project.daysToDeadline} days to deadline
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
                  src={project.creator.avatar}
                  alt={project.creator.name}
                />
                <AvatarFallback className='bg-blue-600 text-sm font-medium text-white'>
                  {project.creator.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <p className='text-sm leading-tight font-medium text-white'>
                  {project.creator.name}
                </p>
                <p className='text-xs font-medium tracking-wide text-[#DBF936] uppercase'>
                  {project.creator.role}
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
              {project.links.map((link, index) => (
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
