import type { UserStats as UserStatsType } from '@/types/profile';

interface UserStatsProps {
  stats: UserStatsType;
}

export default function UserStats({ stats }: UserStatsProps) {
  return (
    <div className='flex items-center gap-8'>
      <div className='flex items-center gap-1 text-xs font-medium text-[#B5B5B5]'>
        <span className='text-base font-medium text-white'>
          {stats.organizations}
        </span>
        Organizations
      </div>
      <div className='flex items-center gap-1 text-xs font-medium text-[#B5B5B5]'>
        <span className='text-base font-medium text-white'>
          {stats.projects}
        </span>
        Projects
      </div>
      <div className='flex items-center gap-1 text-xs font-medium text-[#B5B5B5]'>
        <span className='text-base font-medium text-white'>
          {stats.following}
        </span>
        Following
      </div>
      <div className='flex items-center gap-1 text-xs font-medium text-[#B5B5B5]'>
        <span className='text-base font-medium text-white'>
          {stats.followers}
        </span>
        Followers
      </div>
    </div>
  );
}
