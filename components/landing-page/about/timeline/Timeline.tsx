'use client';
import TimelineLayout from './TimelineLayout';
import { aboutTimelineData } from '@/constants';
import React, { useEffect, useRef } from 'react';
import TimelineCard from './TimelineCard';
import ImageSlider from './ImageSlider';
import { gsap } from 'gsap';
import TopRightSvg from './backgroundSvgs/TopRightSvg';
import MiddleLeftSvg from './backgroundSvgs/MiddleLeftSvg';
import MiddleRightSvg from './backgroundSvgs/MiddleRightSvg';
import BottomLeftSvg from './backgroundSvgs/BottomLeftSvg';

const Timeline = () => {
  const svgRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    svgRefs.current.forEach((path, i) => {
      if (path) {
        const length = path.getTotalLength();

        // set initial hidden state
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });

        // continuous animation
        gsap.to(path, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2,
          ease: 'power2.inOut',
          delay: 0.3 * i, // stagger by index
          repeat: -1, // infinite loop
          yoyo: true, // reverse back
        });
      }
    });
  }, []);

  return (
    <TimelineLayout>
      {/* Heading with Top Right SVG */}
      <div className='relative w-full'>
        <div className='flex flex-col gap-1 text-center relative z-10'>
          <p className='text-white text-[14px] leading-[160%] gradient-text font-medium'>
            Timeline
          </p>
          <h1 className='font-normal text-white text-[32px] leading-[120%] tracking-[-2%]'>
            Our Journey
          </h1>
        </div>

        {/* Top Right SVG */}
        <TopRightSvg svgRefs={svgRefs} />
      </div>

      {/* Cards mobile */}
      <div className='flex flex-col md:flex-row gap-4 md:hidden'>
        {aboutTimelineData.map((item, index) => {
          const { img, year, title, subTitle, backgroundImage } = item;
          return (
            <TimelineCard
              key={index}
              img={img}
              year={year}
              title={title}
              subTitle={subTitle}
              backgroundImage={backgroundImage}
            />
          );
        })}
      </div>

      {/* Carousel with Middle SVGs */}
      <div className='relative w-full'>
        <div className='hidden md:block'>
          <ImageSlider />
        </div>

        {/* Left Middle SVG */}
        <MiddleLeftSvg svgRefs={svgRefs} />

        {/* Right Middle SVG */}
        <MiddleRightSvg svgRefs={svgRefs} />
      </div>

      {/* Bottom SVG */}
      <div className='relative w-full flex justify-center'>
        <BottomLeftSvg svgRefs={svgRefs} />
      </div>
    </TimelineLayout>
  );
};

export default Timeline;
