'use client';
import TimelineLayout from './TimelineLayout';
import { aboutTimelineData } from '@/constants';
import React, { useEffect, useRef } from 'react';
import TimelineCard from './TimelineCard';
import ImageSlider from './ImageSlider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TopRightSvg from './backgroundSvgs/TopRightSvg';
import MiddleLeftSvg from './backgroundSvgs/MiddleLeftSvg';
import MiddleRightSvg from './backgroundSvgs/MiddleRightSvg';
import BottomLeftSvg from './backgroundSvgs/BottomLeftSvg';

const Timeline = () => {
  const svgRefs = useRef<(SVGPathElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeCard, setActiveCard] = React.useState(0);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // SVG animations
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

    // Accordion-style timeline animations

    // Set initial state
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          scale: index === 0 ? 1 : 0.9,
          opacity: index === 0 ? 1 : 0.6,
          y: index === 0 ? 0 : index > 0 ? 20 : -20,
          height: index === 0 ? 'auto' : '80px',
        });
      }
    });

    // Create scroll triggers for each card
    cardRefs.current.forEach((card, index) => {
      if (card) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveCard(index),
          onEnterBack: () => setActiveCard(index),
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Update card states when activeCard changes
  useEffect(() => {
    const updateCardStates = (activeIndex: number) => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const isActive = index === activeIndex;
          const isAbove = index < activeIndex;

          if (isActive) {
            // Active card - fully expanded
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              y: 0,
              height: 'auto',
              duration: 0.8,
              ease: 'power2.out',
            });
          } else if (isAbove) {
            // Cards above active - collapsed at top
            gsap.to(card, {
              scale: 0.9,
              opacity: 0.6,
              y: -20,
              height: '80px',
              duration: 0.8,
              ease: 'power2.out',
            });
          } else {
            // Cards below active - collapsed at bottom
            gsap.to(card, {
              scale: 0.9,
              opacity: 0.6,
              y: 20,
              height: '80px',
              duration: 0.8,
              ease: 'power2.out',
            });
          }
        }
      });
    };

    updateCardStates(activeCard);
  }, [activeCard]);

  return (
    <TimelineLayout>
      {/* Heading with Top Right SVG */}
      <div className='relative w-full'>
        <div className='flex flex-col gap-1 text-center relative z-10'>
          <p
            className='text-sm leading-[140%] tracking-[-0.64px] text-transparent bg-clip-text font-medium'
            style={{
              backgroundImage:
                'linear-gradient(273deg, rgba(167, 249, 80, 0.50) 13.84%, #3AE6B2 73.28%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Timeline
          </p>
          <h1
            ref={titleRef}
            className='font-normal text-white text-[48px] leading-[120%] tracking-[-2%]'
          >
            Our Journey
          </h1>
        </div>

        {/* Top Right SVG */}
        <TopRightSvg svgRefs={svgRefs} />
      </div>

      {/* Cards mobile */}
      <div
        ref={timelineRef}
        className='flex flex-col md:flex-row gap-8 md:hidden px-4'
      >
        {aboutTimelineData.map((item, index) => {
          const { img, year, title, subTitle, backgroundImage } = item;
          return (
            <div
              key={index}
              ref={el => {
                cardRefs.current[index] = el;
              }}
              className='w-full'
            >
              <TimelineCard
                img={img}
                year={year}
                title={title}
                subTitle={subTitle}
                backgroundImage={backgroundImage}
                isActive={index === activeCard}
              />
            </div>
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
