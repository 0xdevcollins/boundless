'use client';

import { useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Image from 'next/image';
import { BoundlessButton } from '@/components/buttons';
import LooperSVG from './LooperSVG';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface HeroProps {
  className?: string;
}

export default function Hero({ className = '' }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const animationConfig = useMemo(
    () => ({
      ellipse: {
        scale: 1.1,
        ease: 'power2.inOut',
        duration: 3,
        repeat: -1,
        yoyo: true,
      },
      sphere: {
        rotation: 360,
        ease: 'none',
        duration: 50,
        repeat: -1,
      },
    }),
    []
  );

  const setupAnimations = useCallback(() => {
    if (!heroRef.current) return;

    const ellipseImg = heroRef.current.querySelector('.ellipse-image');
    const sphereImg = heroRef.current.querySelector('.sphere-image');

    if (ellipseImg) {
      gsap.to(ellipseImg, {
        ...animationConfig.ellipse,
        willChange: 'transform',
        force3D: true,
        immediateRender: false,
        lazy: true,
      });
    }

    if (sphereImg) {
      gsap.to(sphereImg, {
        ...animationConfig.sphere,
        willChange: 'transform',
        force3D: true,
        immediateRender: false,
        lazy: true,
      });
    }
  }, [animationConfig]);

  useGSAP(
    () => {
      setupAnimations();

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    },
    { scope: heroRef, dependencies: [setupAnimations] }
  );

  return (
    <header
      className={`relative mx-5 flex h-screen min-h-screen items-stretch justify-between pb-9 md:items-end md:pb-[66px] ${className}`}
      id='hero'
      role='banner'
      aria-labelledby='hero-heading'
    >
      <div
        ref={heroRef}
        className='absolute top-1/2 left-1/2 z-10 h-full w-full -translate-x-1/2 -translate-y-1/2'
        aria-hidden='true'
      >
        <LooperSVG />
        {/* <Image
          src='/glow.svg'
          alt=''
          className='glow-element absolute top-1/2 left-1/2 z-10 h-full w-screen max-w-screen -translate-x-1/2 -translate-y-1/2 opacity-80'
          width={1920}
          height={1080}
          priority
          quality={85}
          sizes='100vw'
        /> */}
        {[1, 2, 3].map(elipse => (
          <Image
            key={`elipse${elipse}`}
            src={`/elipse${elipse}.svg`}
            alt=''
            className={`ellipse-image absolute top-1/2 left-1/2 z-10 h-[90%] ${elipse === 1 ? 'w-[50%]' : elipse === 2 ? 'w-[90%]' : 'w-[1200px]'} -translate-x-1/2 -translate-y-1/2`}
            width={1920}
            height={1080}
            priority
            quality={85}
            sizes='90vw'
          />
        ))}

        <div
          className='absolute bottom-0 left-0 z-10 h-[150px] w-screen max-w-screen bg-gradient-to-t from-transparent'
          style={{
            background:
              'linear-gradient(180deg, rgba(3, 3, 3, 0.00) 32.3%, #030303 84.8%)',
          }}
        />
      </div>

      <div
        ref={contentRef}
        className='z-30 mt-[28px] mb-10 flex h-full w-full flex-col justify-between gap-4 md:mt-[120px] md:h-auto md:flex-row md:items-end'
      >
        <h1
          id='hero-heading'
          className='max-w-[350px] text-left text-[30px] leading-[140%] text-white sm:max-w-full md:max-w-[579px] lg:text-[32px] xl:text-[40px]'
        >
          Validate Ideas, <br /> Fund Bold Projects, <br />{' '}
          <span className='gradient-text font-medium'>
            Unlock Boundless Potential
          </span>
        </h1>

        <div className='relative bottom-[50px] md:bottom-0 md:max-w-[466px]'>
          <p
            className='text-[14px] leading-[150%] text-white lg:text-[14px] xl:text-[16px]'
            style={{
              background: 'linear-gradient(93deg, #B5B5B5 15.93%, #FFF 97.61%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Boundless is the milestone-based platform for validating, funding,
            and scaling ideas through community crowdfunding, grants, and
            hackathons built on Stellar.
          </p>

          <nav
            className='mt-7 flex flex-col items-center gap-4 md:flex-row'
            aria-label='Primary actions'
          >
            <BoundlessButton
              variant='default'
              size='xl'
              fullWidth
              aria-label='Explore featured projects and campaigns'
            >
              Explore Projects
            </BoundlessButton>
            <BoundlessButton
              variant='secondary'
              size='xl'
              fullWidth
              aria-label='Submit your project idea for funding'
            >
              Submit Your Idea
            </BoundlessButton>
          </nav>
        </div>
      </div>
    </header>
  );
}
