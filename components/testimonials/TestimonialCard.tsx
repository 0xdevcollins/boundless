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
    <div className='bg-[#101010] rounded-[8px] shadow-xl p-6 flex flex-col gap-4 border border-[#A7F950]/20 hover:border-[#A7F950]/40 hover:shadow-[0_0_30px_rgba(167,249,80,0.3)] transition-all duration-500 hover:scale-105 transform mb-6 max-w-[300px] w-[300px]'>
      <div className='flex flex-row justify-between items-start'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <Image
              src={avatarSrc}
              alt={`${name} profile picture`}
              className='w-12 h-12 rounded-full object-cover ring-2 ring-[#A7F950]/30'
              width={48}
              height={48}
            />
          </div>
          <div className='flex flex-col items-baseline'>
            <p className='text-sm font-bold text-white'>{name}</p>
            <p className='text-xs text-gray-400'>@{username}</p>
          </div>
        </div>
        <div className='p-2 bg-[#A7F950]/10 rounded-full'>{icon}</div>
      </div>
      <p className='text-sm text-gray-200 font-normal leading-relaxed text-left relative'>
        {content}
      </p>
    </div>
  );
};

export default TestimonialCard;
