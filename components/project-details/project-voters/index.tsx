import React, { useMemo } from 'react';
import Empty from './Empty';
import Image from 'next/image';
import { CrowdfundingProject } from '@/lib/api/types';

interface Voter {
  _id: string;
  profile: {
    firstName: string;
    lastName: string;
    username: string;
    bio?: string;
    avatar?: string;
  };
  voteType?: 'positive' | 'negative';
  votedAt?: string;
}

interface ProjectVotersProps {
  project?: CrowdfundingProject;
}

const ProjectVoters = ({ project }: ProjectVotersProps) => {
  const voters: Voter[] = useMemo(() => {
    if (!project?.voting?.voters || project.voting.voters.length === 0) {
      return [];
    }

    return project.voting.voters.map(
      (voter: {
        _id?: string;
        userId?: string;
        profile?: {
          firstName?: string;
          lastName?: string;
          username?: string;
          bio?: string;
          avatar?: string;
        };
        firstName?: string;
        lastName?: string;
        username?: string;
        bio?: string;
        avatar?: string;
        voteType?: string;
        vote?: number;
        votedAt?: string;
        createdAt?: string;
      }) => ({
        _id: voter._id || voter.userId || '',
        profile: {
          firstName: voter.profile?.firstName || voter.firstName || 'Unknown',
          lastName: voter.profile?.lastName || voter.lastName || 'User',
          username: voter.profile?.username || voter.username || 'unknown_user',
          bio: voter.profile?.bio || voter.bio || 'Project supporter',
          avatar: voter.profile?.avatar || voter.avatar,
        },
        voteType:
          (voter.voteType as 'positive' | 'negative') ||
          (voter.vote && voter.vote > 0 ? 'positive' : 'negative'),
        votedAt: voter.votedAt || voter.createdAt,
      })
    );
  }, [project?.voting?.voters]);

  const handleVoterClick = () => {
    // TODO: Navigate to voter profile or show voter details
    // Handle voter click action
  };

  if (voters.length === 0) {
    return <Empty />;
  }
  return (
    <div>
      {voters.map(voter => (
        <div
          key={voter._id}
          className='flex cursor-pointer items-center justify-between rounded px-3 py-2 transition-colors hover:bg-gray-900/30'
          onClick={handleVoterClick}
        >
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <div className='h-12 w-12 overflow-hidden rounded-full border-[0.5px] border-[#2B2B2B]'>
                {voter.profile.avatar ? (
                  <Image
                    width={48}
                    height={48}
                    src={voter.profile.avatar}
                    alt={voter.profile.firstName}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <Image
                    width={48}
                    height={48}
                    src='/avatar.png'
                    alt='Default avatar'
                    className='h-full w-full object-cover'
                  />
                )}
              </div>
              {voter.voteType && (
                <div
                  className={`absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-gray-900 ${
                    voter.voteType === 'positive'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                />
              )}
            </div>

            <div className='flex flex-col space-y-0.5'>
              <div className='flex items-center space-x-2'>
                <span className='text-base font-normal text-white'>
                  {voter.profile.firstName} {voter.profile.lastName}
                </span>
                {voter.voteType && (
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      voter.voteType === 'positive'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {voter.voteType === 'positive' ? '↑' : '↓'}
                  </span>
                )}
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-500'>
                  @{voter.profile.username}
                </span>
                {voter.votedAt && (
                  <span className='text-xs text-gray-600'>
                    • {new Date(voter.votedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              {voter.profile.bio && (
                <span className='truncate text-sm text-gray-500'>
                  {voter.profile.bio}
                </span>
              )}
            </div>
          </div>

          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.5 15L12.5 10L7.5 5'
              stroke='white'
              strokeWidth='1.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default ProjectVoters;
