import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface CommentCardProps {
  avatarSrc?: string;
  avatarFallback?: string;
  name: string;
  username: string;
  content: string;
  icon?: ReactNode; // e.g. <Linkedin />
}

const CommentCard: React.FC<CommentCardProps> = ({
  avatarSrc = '/globe.svg',
  avatarFallback = 'G',
  name,
  username,
  content,
  icon,
}) => {
  return (
    <div className='mb-6 flex flex-col gap-6 rounded-[8px] border border-[#1B1B1B] bg-[#101010] p-4 md:p-6'>
      <div className='grid grid-cols-[1fr_auto] items-start gap-2 md:gap-4'>
        <div className='flex gap-3 md:gap-4'>
          <Avatar className='size-12 md:size-14'>
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1'>
            <p className='text-base font-semibold text-white md:text-lg'>
              {name}
            </p>
            <p className='text-sm font-medium text-[#B5B5B5] md:text-base'>
              @{username}
            </p>
          </div>
        </div>
        <div className='flex items-start justify-end'>{icon}</div>
      </div>

      <p className='text-sm leading-relaxed text-[#B5B5B5] md:text-base md:leading-[160%]'>
        {content}
      </p>
    </div>
  );
};

export default CommentCard;
