'use client';

import { Testimonial } from '@/components/testimonials/data/testimonial';
import { useRef, useEffect, useState } from 'react';
import { Linkedin } from 'lucide-react';
import { BoundlessButton } from '../buttons';
import { gsap } from 'gsap';
import TestimonialCard from './TestimonialCard';
import Image from 'next/image';

type TestimonialsWallProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSection({
  testimonials,
}: TestimonialsWallProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<HTMLDivElement[]>([]);
  const animations = useRef<gsap.core.Tween[]>([]);
  const [numColumns, setNumColumns] = useState<number>(4);

  useEffect(() => {
    animations.current.forEach(anim => anim.kill());
    animations.current = [];

    columnRefs.current.forEach((column, index) => {
      if (!column) return;

      const wrapper = column;

      Array.from(wrapper.querySelectorAll<HTMLElement>('.is-clone')).forEach(
        cloneEl => cloneEl.remove()
      );

      const children = Array.from(wrapper.children).filter(
        el => !(el as HTMLElement).classList.contains('is-clone')
      ) as HTMLElement[];
      const totalHeight = children.reduce(
        (acc, child) => acc + child.offsetHeight + 32,
        0
      );

      const cloneContainer = document.createElement('div');
      cloneContainer.className = 'is-clone';
      children.forEach(child => {
        cloneContainer.appendChild(child.cloneNode(true));
      });
      wrapper.appendChild(cloneContainer);

      gsap.set(wrapper, { y: 0, force3D: true, willChange: 'transform' });

      const anim = gsap.to(wrapper, {
        y: -totalHeight,
        duration: 60,
        ease: 'none',
        repeat: -1,
        force3D: true,
        transformOrigin: 'center center',
        immediateRender: false,
        lazy: false,
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
  }, [testimonials, numColumns]);

  useEffect(() => {
    const computeColumns = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const containerWidth = container.getBoundingClientRect().width;
      const columnWidth = 300;
      const gap = 32;
      const columns = Math.max(
        2,
        Math.ceil(containerWidth / (columnWidth + gap)) + 1
      );
      setNumColumns(columns);
    };

    computeColumns();

    let resizeTimer: number | undefined;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        computeColumns();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      className='relative py-20 text-white overflow-hidden bg-[#030303]'
      aria-labelledby='testimonials-heading'
    >
      <div className='w-full'>
        <h2 id='testimonials-heading' className='sr-only'>
          What our users say
        </h2>

        <div className='relative overflow-hidden shadow-2xl backdrop-blur-sm md:max-h-[600px] max-h-[470px]'>
          <div className='absolute inset-0 bg-[#CCFF95] opacity-95'></div>
          {/* <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            <div className='absolute top-10 left-10 w-2 h-2 bg-[#CCFF95] rounded-full opacity-60 animate-pulse'></div>
            <div className='absolute top-20 right-20 w-1 h-1 bg-primary rounded-full opacity-40 animate-ping'></div>
            <div className='absolute bottom-16 left-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-pulse'></div>
            <div className='absolute bottom-32 right-1/4 w-1 h-1 bg-[#CCFF95] rounded-full opacity-50 animate-ping'></div>
          </div> */}
          <Image
            src='/fade.png'
            alt='Gradient top'
            width={1000}
            height={100}
            className='absolute top-[-10px] left-0 w-full h-[150px] z-20 pointer-events-none'
          />
          <Image
            src='/fade.png'
            alt='Gradient bottom'
            width={1000}
            height={100}
            className='absolute bottom-[-10px] transform rotate-180 left-0 w-full h-[150px] z-20 pointer-events-none'
          />
          <div
            className='absolute top-[-10px] left-0 w-full h-[150px] z-10 pointer-events-none'
            style={{
              background:
                'linear-gradient(180deg, #030303 0%, rgba(3, 3, 3, 0.00) 100%)',
            }}
          />
          <div
            className='absolute bottom-0 left-0 w-full h-[150px] z-10 pointer-events-none'
            style={{
              background:
                'linear-gradient(0deg, #030303 0%, rgba(3, 3, 3, 0.00) 100%)',
            }}
          />

          <div
            className='-mx-6 overflow-x-auto relative z-[10]'
            ref={el => {
              if (el) el.scrollLeft = 100;
            }}
          >
            <div
              ref={scrollContainerRef}
              className='flex px-6 space-x-8'
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                perspective: '1000px',
              }}
            >
              {/* Columns */}
              {Array.from({ length: numColumns }, (_, colIdx) => colIdx).map(
                colIdx => (
                  <div
                    key={colIdx}
                    ref={el => {
                      if (el) columnRefs.current[colIdx] = el;
                    }}
                    className='flex flex-col space-y-8 flex-shrink-0 w-[300px] scroll-wrapper'
                  >
                    {testimonials
                      .filter((_, i) => i % numColumns === colIdx)
                      .map(t => (
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
                                colIdx % 2 === 0
                                  ? 'text-[#CCFF95]'
                                  : 'text-primary'
                              }
                            />
                          }
                        />
                      ))}
                  </div>
                )
              )}
            </div>
          </div>
          <div className='absolute lg:bottom-[60px] bottom-14  lg:mt-0 mt-20 left-1/2 -translate-x-1/2 md:max-h-[212px] w-[90%] max-w-6xl bg-primary rounded-xl shadow-lg p-8 md:p-12 text-black z-40'>
            <div className='flex flex-col md:flex-row items-center md:justify-between gap-6'>
              <div>
                <h2 className='text-3xl lg:text-5xl font-medium tracking-[-1.92px] leading-[100%] md:text-left text-center mb-2'>
                  Shape the Future <br /> With Us
                </h2>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-base md:text-left text-center font-normal text-[#2B2B2B] max-w-md'>
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
                    className='bg-transparent border border-black'
                    aria-label='Subscribe for updates'
                  >
                    Subscribe for Updates
                  </BoundlessButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
