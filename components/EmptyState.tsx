'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  type?: 'default' | 'comment' | 'campaign' | 'user';
}

const EmptyState = ({
  title,
  description,
  action,
  type = 'default',
}: EmptyStateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create timeline for coordinated animations
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Set initial states
      gsap.set([imageRef.current, textRef.current, actionRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(imageRef.current, {
        scale: 0.8,
        rotation: -5,
      });

      // Animate container fade in
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      // Animate image with scale and rotation
      tl.to(
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        0.2
      );

      // Animate text content
      tl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        0.4
      );

      // Animate action button if present
      if (actionRef.current && action) {
        tl.to(
          actionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          0.6
        );
      }

      // Add subtle floating animation to image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [action]);

  const getImageSrc = () => {
    switch (type) {
      case 'comment':
        return '/empty/comment.svg';
      case 'campaign':
        return '/empty/campaignempty.svg';
      case 'user':
        return '/empty/user.svg';
      default:
        return '/empty/default.svg';
    }
  };

  const getImageAlt = () => {
    switch (type) {
      case 'comment':
        return 'No comments yet';
      case 'campaign':
        return 'No campaigns found';
      case 'user':
        return 'No users found';
      default:
        return 'Empty State';
    }
  };

  return (
    <div
      ref={containerRef}
      className='flex flex-col items-center justify-center h-full min-h-[400px] px-4 py-8'
      role='status'
      aria-live='polite'
    >
      <div className='flex flex-col items-center justify-center gap-4 text-center max-w-md mx-auto'>
        {/* Image Container */}
        <div ref={imageRef} className='flex items-center justify-center mb-2'>
          <div className='relative'>
            <Image
              src={getImageSrc()}
              alt={getImageAlt()}
              width={120}
              height={120}
              className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32'
              priority
            />
          </div>
        </div>

        {/* Text Content */}
        <div ref={textRef} className='space-y-2'>
          <h3 className='text-lg sm:text-xl md:text-2xl text-white leading-tight font-medium'>
            {title}
          </h3>
          <p className='text-sm sm:text-base text-white/60 leading-relaxed max-w-sm'>
            {description}
          </p>
        </div>

        {/* Action Button */}
        {action && (
          <div ref={actionRef} className='mt-4 w-full flex justify-center'>
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
