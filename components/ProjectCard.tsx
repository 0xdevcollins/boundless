'use client';
import React, { useRef } from 'react';
import { Project } from '@/types/project';
import { Clock, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  daysLeft = 23,
  votes = { current: 46, total: 100 },
  onValidationClick,
  onVoteClick,
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
      className={`bg-black rounded-2xl p-3 sm:p-4 w-full max-w-sm mx-auto transition-all duration-300 cursor-pointer group overflow-hidden ${className}`}
    >
      {/* Top Section - Creator Info and Category */}
      <div className='flex items-center justify-between mb-3 sm:mb-4'>
        <div className='flex items-center space-x-2 sm:space-x-3'>
          <Avatar className='w-8 h-8 sm:w-10 sm:h-10'>
            <AvatarImage src={creatorAvatar} alt={creatorName} />
            <AvatarFallback className='bg-gray-700 text-white'>
              <User className='w-4 h-4 sm:w-5 sm:h-5' />
            </AvatarFallback>
          </Avatar>
          <span className='text-gray-300 text-xs sm:text-sm font-medium truncate max-w-24 sm:max-w-none'>
            {creatorName}
          </span>
        </div>
        <Badge className='bg-[#4A5D23] text-[#F7E98E] px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs font-medium flex-shrink-0'>
          {project.category}
        </Badge>
      </div>

      {/* Middle Section - Image and Content Side by Side */}
      <div
        ref={imageRef}
        className='flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4'
      >
        {/* Image on the left */}
        <div className='relative h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex-shrink-0'>
          {/* 3D Ethereum Logo and Architectural Elements */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='relative w-16 h-16 sm:w-20 sm:h-20'>
              {/* Architectural elements */}
              <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-8 sm:w-8 sm:h-10 bg-gray-800 rounded-l-full opacity-60'></div>
              <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-8 sm:w-8 sm:h-10 bg-gray-800 rounded-r-full opacity-60'></div>

              {/* Ethereum Logo */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg transform rotate-45 flex items-center justify-center'>
                  <div className='w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-gray-100 to-gray-300 rounded transform -rotate-45'></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content on the right */}
        <div ref={contentRef} className='flex-1 min-w-0'>
          <h3 className='text-white text-lg sm:text-xl font-bold mb-2 line-clamp-1'>
            {project.name}
          </h3>
          <p className='text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3'>
            {project.description}
          </p>
        </div>
      </div>

      {/* Bottom Section - Actions and Info */}
      <div
        ref={bottomRef}
        className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0'
      >
        <div className='flex items-center space-x-2 sm:space-x-4'>
          <Button
            onClick={onValidationClick}
            className='bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center space-x-1 sm:space-x-2 transition-colors duration-200'
          >
            <Clock className='w-3 h-3 sm:w-4 sm:h-4' />
            <span>Validation</span>
          </Button>
          <span className='text-gray-300 text-xs sm:text-sm whitespace-nowrap'>
            {daysLeft} days left
          </span>
        </div>

        <div className='flex items-center space-x-2'>
          <div className='w-px h-4 sm:h-6 bg-white opacity-30'></div>
          <Button
            onClick={onVoteClick}
            className='bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200'
          >
            {votes.current}/{votes.total} votes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
