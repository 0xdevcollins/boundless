'use client';
import React, { useRef } from 'react';
import { Project } from '@/types/project';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  creatorName?: string;
  creatorAvatar?: string;
  daysLeft?: number;
  votes?: {
    current: number;
    total: number;
  };
  onValidationClick?: () => void;
  onVoteClick?: () => void;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  creatorName = 'Creator Name',
  creatorAvatar,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      // Initial state - elements start slightly hidden
      gsap.set([imageRef.current, contentRef.current, bottomRef.current], {
        opacity: 0,
        y: 20,
      });

      // Staggered entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          bottomRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        );

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });

        gsap.to(imageRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });

        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      cardRef.current.addEventListener('mouseenter', handleMouseEnter);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        cardRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        cardRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className={`bg-[#030303] rounded-[8px] border border-[#2B2B2B] p-3 sm:p-5 w-full max-w-[397px] mx-auto transition-all duration-300 cursor-pointer group overflow-hidden ${className}`}
    >
      <div className='flex items-center justify-between mb-3 sm:mb-4'>
        <div className='flex items-center space-x-2 sm:space-x-3'>
          <Avatar className='w-8 h-8 sm:w-6 sm:h-6'>
            <AvatarImage src={creatorAvatar} alt={creatorName} />
            <AvatarFallback className='bg-gray-700 text-white'>
              <Image
                src='/globe.svg'
                alt={creatorName}
                width={24}
                height={24}
              />
            </AvatarFallback>
          </Avatar>
          <span className='text-gray-300 text-xs sm:text-sm font-medium truncate max-w-24 sm:max-w-none'>
            {creatorName}
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <Badge className='bg-[#E4DBDB] border border-[#645D5D] text-[#645D5D] px-1 py-0.5 rounded-[4px] text-xs font-medium flex-shrink-0'>
            {project.category}
          </Badge>
          <Badge className='bg-[rgba(167,249,80,0.08)] border border-[#A7F950] text-[#A7F950] px-1 py-0.5 rounded-[4px] text-xs font-medium flex-shrink-0'>
            {project.category}
          </Badge>
        </div>
      </div>

      <div
        ref={imageRef}
        className='flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4'
      >
        <div className='relative h-24 w-24 sm:h-[90px] sm:w-[80px] border rounded-xl overflow-hidden flex-shrink-0'>
          <Image
            src='/auth/bg.png'
            alt={project.name}
            fill
            className='object-cover'
          />
        </div>

        <div ref={contentRef} className='flex-1 min-w-0 text-left'>
          <h3 className='text-white text-lg sm:text-base font-bold mb-2 line-clamp-1'>
            {project.name}
          </h3>
          <p className='text-gray-300 text-xs sm:text-sm text-left leading-relaxed line-clamp-2 sm:line-clamp-3'>
            {project.description}
          </p>
        </div>
      </div>

      <div ref={bottomRef} className='flex flex-col gap-2'>
        <div className='flex items-center justify-between space-x-2'>
          <div className='flex items-center space-x-2'>
            <span className='text-white text-xs sm:text-sm'>120/300 USDC</span>
            <span className='text-[#B5B5B5] text-xs sm:text-xs'>Raised</span>
          </div>
          <span className='text-[#F5B546] text-xs sm:text-xs'>
            15 days to deadline
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
