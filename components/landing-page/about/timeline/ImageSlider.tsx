'use client';
import React, { useState } from 'react';
import { aboutTimelineData } from '@/constants';
import { motion } from 'framer-motion';
import TimelineCard from './TimelineCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProgressiveeBarSvg from './ProgressiveeBarSvg';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = aboutTimelineData.length;

  const next = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % totalItems);
  };

  const prev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + totalItems) % totalItems);
  };

  const getPosition = (
    index: number
  ): 'center' | 'left' | 'right' | 'hidden' => {
    const diff = (index - currentIndex + totalItems) % totalItems;

    if (diff === 0) return 'center';
    if (diff === 1 || diff === totalItems - 1) {
      return diff === 1 ? 'right' : 'left';
    }
    return 'hidden';
  };

  const imageVariants = {
    center: {
      x: '0%',
      scale: 1,
      zIndex: 5,
      opacity: 1,
      rotateY: 0,
    },
    left: {
      x: '-40%',
      scale: 0.8,
      zIndex: 2,
      opacity: 0.7,
      rotateY: 15,
    },
    right: {
      x: '40%',
      scale: 0.8,
      zIndex: 2,
      opacity: 0.7,
      rotateY: -15,
    },
    hidden: {
      x: '0%',
      scale: 0.5,
      zIndex: 1,
      opacity: 0,
    },
  };

  return (
    <div className='flex relative min-h-[500px] max-w-[800px] mx-auto items-center'>
      <div className='relative w-full h-[400px]'>
        {aboutTimelineData.map((item, index) => {
          const position = getPosition(index);
          const { img, year, title, subTitle, backgroundImage } = item;
          return (
            <motion.div
              key={index}
              initial='center'
              animate={position}
              variants={imageVariants}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
              }}
              className='absolute inset-0 flex justify-center items-center'
              style={{
                width: '450px',
                left: '50%',
                marginLeft: '-200px',
              }}
            >
              <TimelineCard
                img={img}
                year={year}
                title={title}
                subTitle={subTitle}
                backgroundImage={backgroundImage}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Left and Right button */}
      <button
        onClick={prev}
        className='absolute backdrop-blur-[7px] bg-[rgba(255,255,255,0.60)] left-32 border border-white/48  top-1/2 -translate-y-1/2  rounded-full p-2 shadow-lg transition-colors z-10'
      >
        <ChevronLeft className='w-6 h-6 text-white' />
      </button>

      <button
        onClick={next}
        className='absolute right-24 border border-white/48 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/30 rounded-full p-2 shadow-lg transition-colors z-10'
      >
        <ChevronRight className='w-6 h-6 text-white' />
      </button>

      {/* Progress Bar and Number */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center'>
        {aboutTimelineData.map((_, index) => (
          <div key={index} className='flex items-center'>
            <button
              onClick={() => setCurrentIndex(index)}
              className={`text-sm font-medium transition-colors ${
                index === currentIndex ? 'text-white' : 'text-gray-700/65'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </button>

            {index < aboutTimelineData.length - 1 && (
              <div className='mx-4'>
                <ProgressiveeBarSvg />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
