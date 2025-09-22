'use client';

import React, { useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAddClick?: () => void;
  className?: string;
  type?: 'default' | 'compact' | 'custom';
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Projects',
  description = 'There are currently no projects here. Go ahead and create the first one!',
  buttonText = 'Add Project',
  onAddClick = () => {},
  className = '',
  type = 'default',
  action,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const elements = [
      containerRef.current,
      titleRef.current,
      descriptionRef.current,
      buttonRef.current,
    ];

    elements.forEach((el, index) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
          el.style.transition = 'all 0.6s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, []);

  const buttonStyle =
    type === 'compact'
      ? 'px-4 py-2 text-sm'
      : type === 'custom'
        ? 'px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white'
        : 'px-6 py-3';

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center min-h-[400px] p-8 ${className}`}
    >
      {/* Illustration */}
      <div className='relative mb-8'>
        <Image
          src='/empty-state.png'
          alt='Empty state illustration'
          width={240}
          height={260}
          className='rounded-lg'
        />
      </div>

      {/* Title */}
      <h2
        ref={titleRef}
        className='text-white text-2xl md:text-3xl font-semibold mb-3 text-center'
      >
        {title}
      </h2>

      {/* Description */}
      <p
        ref={descriptionRef}
        className='text-gray-400 text-center max-w-md mb-8 leading-relaxed px-4'
      >
        {description}
      </p>

      {/* Button or custom action */}
      {action ? (
        action
      ) : (
        <button
          ref={buttonRef}
          onClick={onAddClick}
          className={`flex items-center justify-center gap-2 w-auto bg-[#00D2A4] hover:bg-[#00B894] text-black font-medium rounded-[8px] transition-all duration-200 ease-out transform focus:outline-none focus:ring-2 focus:ring-[#00D2A4] focus:ring-opacity-50 shadow-[0_2px_8px_rgba(0,210,164,0.2)] ${buttonStyle}`}
        >
          <Plus size={18} />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
