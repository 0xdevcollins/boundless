import Image from 'next/image';
import { Organization } from '@/types/profile';

interface OrganizationCardProps {
  organization: Organization;
}

export default function OrganizationCard({
  organization,
}: OrganizationCardProps) {
  return (
    <div className='flex items-center gap-3 px-3'>
      <div className='relative size-[46px] overflow-hidden rounded-full'>
        <Image
          src={organization.avatarUrl}
          alt={`${organization.name} avatar`}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <p className='font-base font-normal text-white'>{organization.name}</p>
    </div>
  );
}
