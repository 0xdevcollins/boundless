import React, { useState } from 'react';
import Empty from './Empty';
import Image from 'next/image';
import { CrowdfundingProject } from '@/lib/api/types';

interface Backer {
  _id: string;
  user: {
    _id: string;
    email: string;
    profile: {
      firstName: string;
      lastName: string;
      username: string;
      avatar?: string;
    };
  };
  amount: number;
  date: string;
  transactionHash: string;
}

const ProjectBackers = ({ project }: { project: CrowdfundingProject }) => {
  const [backers] = useState<Backer[]>(
    project.funding.contributors as Backer[]
  );

  const handleBackerClick = (backer: Backer) => {
    window.open(`/profile/${backer.user.profile.username}`, '_blank');
  };

  if (backers.length === 0) {
    return <Empty />;
  }
  return (
    <div>
      {backers.map(backer => (
        <div
          key={backer._id}
          className='flex cursor-pointer items-center justify-between rounded px-3 py-2 transition-colors hover:bg-gray-900/30'
          onClick={() => handleBackerClick(backer)}
        >
          <div className='flex items-center space-x-4'>
            {/* Avatar */}
            <div className='relative'>
              <div className='h-12 w-12 overflow-hidden rounded-full border-[0.5px] border-[#2B2B2B]'>
                {backer.user.profile.avatar ? (
                  <Image
                    width={48}
                    height={48}
                    src={backer.user.profile.avatar}
                    alt={backer.user.profile.firstName}
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
            </div>

            {/* Backer Info */}
            <div className='flex flex-col space-y-0.5'>
              <span className='text-base font-normal text-white'>
                {backer.user.profile.firstName} {backer.user.profile.lastName}
              </span>
              <span className={`truncate text-sm text-gray-500`}>
                ${backer.amount}
              </span>
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

export default ProjectBackers;
