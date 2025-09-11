'use client';

import { Testimonial } from '@/components/testimonials/data/testimonial';
import { useRef, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import { BoundlessButton } from '../buttons';
import { gsap } from 'gsap';
import TestimonialCard from './TestimonialCard';

type TestimonialsWallProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSection({
  testimonials,
}: TestimonialsWallProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<HTMLDivElement[]>([]);
  const animations = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    // Kill previous animations
    animations.current.forEach(anim => anim.kill());
    animations.current = [];

    columnRefs.current.forEach((column, index) => {
      if (!column) return;

      const wrapper = column.querySelector<HTMLDivElement>('.scroll-wrapper');
      if (!wrapper) return;

      const children = Array.from(wrapper.children) as HTMLElement[];
      const totalHeight = children.reduce(
        (acc, child) => acc + child.offsetHeight + 32,
        0
      );

      // Clone and append to create the continuous loop
      const clone = wrapper.cloneNode(true) as HTMLElement;
      wrapper.appendChild(clone);

      gsap.set(wrapper, { y: 0, force3D: true, willChange: 'transform' });

      const anim = gsap.to(wrapper, {
        y: -totalHeight,
        duration: 30, // Slower for better readability
        ease: 'none', // Linear for consistent speed
        repeat: -1, // Infinite repeat
        // Advanced performance optimizations
        force3D: true, // Enable hardware acceleration
        transformOrigin: 'center center',
        // Use GSAP's built-in performance features
        immediateRender: false, // Don't render immediately
        lazy: false, // Don't use lazy rendering for smooth animation
        delay: index * 0.5,
      });

      animations.current.push(anim);
    });

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleMouseEnter = () =>
      animations.current.forEach(anim => anim.pause());
    const handleMouseLeave = () =>
      animations.current.forEach(anim => anim.resume());

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      animations.current.forEach(anim => anim.kill());
    };
  }, [testimonials]);

  return (
    <section
      className='relative py-20 text-white overflow-hidden bg-[#030303]'
      aria-labelledby='testimonials-heading'
    >
      <div className='w-full'>
        <h2 id='testimonials-heading' className='sr-only'>
          What our users say
        </h2>

        <div className='relative overflow-hidden shadow-2xl backdrop-blur-sm max-h-[600px]'>
          <div className='absolute inset-0 bg-[#CCFF95] opacity-95'></div>
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            <div className='absolute top-10 left-10 w-2 h-2 bg-[#CCFF95] rounded-full opacity-60 animate-pulse'></div>
            <div className='absolute top-20 right-20 w-1 h-1 bg-primary rounded-full opacity-40 animate-ping'></div>
            <div className='absolute bottom-16 left-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-pulse'></div>
            <div className='absolute bottom-32 right-1/4 w-1 h-1 bg-[#CCFF95] rounded-full opacity-50 animate-ping'></div>
          </div>

          <div
            className='absolute top-0 left-0 w-full h-[150px] z-10 pointer-events-none'
            style={{
              background:
                'linear-gradient(0deg, rgba(3, 3, 3, 0.00) 0%, #030303 100%)',
            }}
          />
          <div
            className='absolute bottom-0 left-0 w-full h-[150px] z-10 pointer-events-none'
            style={{
              background:
                'linear-gradient(180deg, rgba(3, 3, 3, 0.00) 0%, #030303 100%)',
            }}
          />

          <div
            ref={scrollContainerRef}
            className='relative grid grid-cols-1 md:grid-cols-4 gap-8 p-6 z-10'
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
            }}
          >
            {[0, 1, 2, 3].map(colIdx => (
              <div
                key={colIdx}
                ref={el => {
                  if (el) columnRefs.current[colIdx] = el;
                }}
                className='flex flex-col gap-8 overflow-hidden'
              >
                <div className='scroll-wrapper flex flex-col gap-8'>
                  {testimonials.slice(colIdx * 5, colIdx * 5 + 5).map(t => (
                    <TestimonialCard
                      key={t.id}
                      avatarSrc={t.avatarUrl || '/avatar-placeholder.png'}
                      avatarFallback={t.name.charAt(0)}
                      name={t.name}
                      username={t.username || 'username'}
                      content={t.message}
                      icon={
                        <Linkedin
                          size={16}
                          className={
                            colIdx % 2 === 0 ? 'text-[#CCFF95]' : 'text-primary'
                          }
                        />
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='absolute lg:top-[70%] top-24 lg:mt-0 mt-20 left-1/2 -translate-x-1/2 w-[90%] md:w-full max-w-6xl bg-primary rounded-xl shadow-lg p-8 md:p-12 text-black z-40'>
          <div className='flex flex-col md:flex-row items-center md:justify-between gap-6'>
            <div>
              <h2 className='text-3xl md:text-4xl font-bold leading-tight md:text-left text-center mb-2'>
                Shape the Future <br /> With Us
              </h2>
            </div>
            <div className='flex flex-col gap-4'>
              <p className='text-base md:text-left text-center font-normal text-gray-800 max-w-md'>
                We're building a future where ideas are truly boundless,
                unlocking opportunities for innovators. Be part of it!
              </p>
              <div className='flex md:flex-row flex-col gap-2'>
                <BoundlessButton
                  variant='secondary'
                  className='bg-background hover:text-background'
                  size='xl'
                  fullWidth
                  aria-label='Explore projects'
                >
                  Explore Projects
                </BoundlessButton>
                <BoundlessButton
                  variant='ghost'
                  size='xl'
                  fullWidth
                  className='bg-transparent border-2 border-black'
                  aria-label='Subscribe for updates'
                >
                  Subscribe for Updates
                </BoundlessButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
