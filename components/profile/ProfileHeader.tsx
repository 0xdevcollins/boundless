import Image from 'next/image';
import Link from 'next/link';
import { UserProfile } from '@/types/profile';
import { BoundlessButton } from '@/components/buttons';
import { BellPlus } from 'lucide-react';
import { ProfileSocialLinks } from '@/lib/config';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <main className='flex flex-col gap-6'>
      <header className='flex items-end gap-4'>
        <div className='relative size-[150px] overflow-hidden rounded-full bg-red-500'>
          <Image
            src={profile.avatarUrl}
            alt={`${profile.displayName} avatar`}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='flex flex-col gap-3 py-3'>
          <h3 className='text-2xl font-medium'>{profile.displayName}</h3>
          <p className='text-base font-normal'>@{profile.username}</p>
        </div>
      </header>
      <p className='text-base font-normal'>{profile.bio}</p>
      <div className='flex items-center space-x-4'>
        {Object.entries(ProfileSocialLinks).map(([name, href], index) => (
          <div key={name} className='flex items-center'>
            <Link
              href={href}
              className='rounded transition-opacity hover:opacity-80 focus:ring-2 focus:ring-white/50 focus:outline-none'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Follow us on ${name}`}
            >
              <Image
                src={`/footer/${name}.svg`}
                alt={`${name} icon`}
                width={24}
                height={24}
                className='h-6 w-6'
              />
            </Link>
            {index < Object.keys(ProfileSocialLinks).length - 1 && (
              <div className='ml-4 h-6 w-0.5 bg-[#2B2B2B]' aria-hidden='true' />
            )}
          </div>
        ))}
      </div>
      <div className='flex gap-4'>
        <BoundlessButton>
          Follow <BellPlus />
        </BoundlessButton>
        <BoundlessButton variant='outline'>
          share{' '}
          <Image src='/share.svg' alt='Share icon' width={16} height={16} />
        </BoundlessButton>
      </div>
    </main>
  );
}
