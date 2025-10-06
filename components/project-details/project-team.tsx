'use client';

import { CrowdfundingProject } from '@/lib/api/types';
import Image from 'next/image';

interface ProjectTeamProps {
  project: CrowdfundingProject;
}

interface TeamMember {
  id: string;
  name: string;
  role: 'OWNER' | 'MEMBER';
  avatar?: string;
}

// Mock data
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Member Name',
    role: 'OWNER',
    avatar: '/avatar.png',
  },
  {
    id: '2',
    name: 'Member Name',
    role: 'MEMBER',
    avatar: '/avatar.png',
  },
  {
    id: '3',
    name: 'Member Name',
    role: 'MEMBER',
    avatar: '/avatar.png',
  },
  {
    id: '4',
    name: 'Member Name',
    role: 'MEMBER',
    avatar: '/avatar.png',
  },
];

export function ProjectTeam({ project }: ProjectTeamProps) {
  const teamMembers =
    project.team && project.team.length > 0
      ? project.team.map(member => ({
          id: member?._id || '',
          name: member?.profile
            ? `${member.profile.firstName} ${member.profile.lastName}`
            : 'Unknown Member',
          role:
            member.role === 'OWNER' ? ('OWNER' as const) : ('MEMBER' as const),
          avatar: (member?.profile as { avatar?: string })?.avatar,
        }))
      : mockTeamMembers;

  const getRoleColor = (role: 'OWNER' | 'MEMBER') => {
    return role === 'OWNER' ? 'text-[#DBF936]' : 'text-[#B5B5B5]';
  };

  const handleMemberClick = () => {
    // TODO: Implement navigation to member profile
  };

  return (
    <div>
      <div className='space-y-2'>
        {teamMembers.map(member => (
          <div
            key={member.id}
            className='flex cursor-pointer items-center justify-between rounded px-3 py-2 transition-colors hover:bg-gray-900/30'
            onClick={() => handleMemberClick()}
          >
            <div className='flex items-center space-x-4'>
              {/* Avatar */}
              <div className='relative'>
                <div className='h-12 w-12 overflow-hidden rounded-full border-[0.5px] border-[#2B2B2B]'>
                  {member.avatar ? (
                    <Image
                      width={48}
                      height={48}
                      src={member.avatar}
                      alt={member.name}
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

              {/* Member Info */}
              <div className='flex flex-col space-y-0.5'>
                <span className='text-base font-normal text-white'>
                  {member.name}
                </span>
                <span className={`text-sm ${getRoleColor(member.role)}`}>
                  {member.role}
                </span>
              </div>
            </div>

            {/* Chevron */}
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
    </div>
  );
}
