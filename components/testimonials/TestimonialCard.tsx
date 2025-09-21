import { ReactNode } from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  avatarSrc?: string;
  avatarFallback?: string;
  name: string;
  username: string;
  content: string;
  icon?: ReactNode;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  avatarSrc = '/avatar-placeholder.png',
  // avatarFallback = 'U',
  name,
  username,
  content,
  icon,
}) => {
  return (
    <div className='mb-6 flex w-[300px] max-w-[300px] transform flex-col gap-4 rounded-[8px] border border-[#A7F950]/20 bg-[#101010] p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:border-[#A7F950]/40 hover:shadow-[0_0_30px_rgba(167,249,80,0.3)]'>
      <div className='flex flex-row items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <Image
              src={avatarSrc}
              alt={`${name} profile picture`}
              className='h-12 w-12 rounded-full object-cover ring-2 ring-[#A7F950]/30'
              width={48}
              height={48}
            />
          </div>
          <div className='flex flex-col items-baseline'>
            <p className='text-sm font-bold text-white'>{name}</p>
            <p className='text-xs text-gray-400'>@{username}</p>
          </div>
        </div>
        <div className='rounded-full bg-[#A7F950]/10 p-2'>{icon}</div>
      </div>
      <p className='relative text-left text-sm leading-relaxed font-normal text-gray-200'>
        {content}
      </p>
    </div>
  );
};

export default TestimonialCard;
