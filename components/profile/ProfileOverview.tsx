'use client';

import ProfileHeader from './ProfileHeader';
import UserStats from './UserStats';
import OrganizationsList from './OrganizationsList';
import {
  UserProfile,
  UserStats as UserStatsType,
  Organization,
} from '@/types/profile';

interface ProfileOverviewProps {
  username: string;
}

export default function ProfileOverview({ username }: ProfileOverviewProps) {
  const mockProfile: UserProfile = {
    username: username,
    displayName: 'Collins Odumeje',
    bio: 'To build a secure, transparent, and trusted digital health ecosystem powered by Sonic blockchain for 280M lives in Indonesia.',
    avatarUrl: '/team/45d9f6d1-7e6d-41c7-8b16-a045d36e835f.png',
    socialLinks: {
      twitter: 'https://twitter.com/boundless',
      linkedin: 'https://linkedin.com/in/boundless',
      github: 'https://github.com/boundless',
    },
  };

  const mockStats: UserStatsType = {
    organizations: 3,
    projects: 3,
    following: 10,
    followers: 5,
  };

  const mockOrganizations: Organization[] = [
    { name: 'Organization 1', avatarUrl: '/blog1.jpg' },
    { name: 'Organization 2', avatarUrl: '/blog2.jpg' },
  ];

  return (
    <article className='flex w-[500px] flex-col gap-11 text-white'>
      <ProfileHeader profile={mockProfile} />
      <UserStats stats={mockStats} />
      <OrganizationsList organizations={mockOrganizations} />
    </article>
  );
}
