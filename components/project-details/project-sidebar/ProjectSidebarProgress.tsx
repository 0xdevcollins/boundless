'use client';

import { Progress } from '@/components/ui/progress';
import { ProjectSidebarProgressProps } from './types';

export function ProjectSidebarProgress({
  project,
  crowdfund,
  projectStatus,
}: ProjectSidebarProgressProps) {
  const votePercentage = crowdfund
    ? (crowdfund.totalVotes / crowdfund.thresholdVotes) * 100
    : project.voting
      ? (project.votes || 0 / project.voting.totalVotes) * 100
      : 0;

  const fundingPercentage = project.funding
    ? (project.funding.raised / project.funding.goal) * 100
    : 0;

  const milestonePercentage = project.milestones
    ? (project.milestones.filter(m => m.status === 'completed').length /
        project.milestones.length) *
      100
    : 0;

  const renderProgressSection = () => {
    switch (projectStatus) {
      case 'Funding':
      case 'campaigning':
        return (
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium text-white'>
                ${project.funding?.raised || 0}/${project.funding?.goal || 0}{' '}
                USD <span className='font-normal text-gray-400'>Raised</span>
              </span>
              <span className='text-warning-600 text-xs font-medium'>
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

  return <>{renderProgressSection()}</>;
}
