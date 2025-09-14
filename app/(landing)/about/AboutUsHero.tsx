'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { BoundlessButton } from '@/components/buttons';
import { DottedUnderline } from '@/components/ui/dotted-underline';

export default function AboutUsHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          rotation: 5,
          duration: 15,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
        });

        gsap.to(gridRef.current, {
          scale: 1.02,
          duration: 8,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
        });

        gsap.to(gridRef.current, {
          opacity: 0.6,
          duration: 4,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      if (contentRef.current) {
        const tl = gsap.timeline();

        tl.fromTo(
          contentRef.current.querySelector('h1'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        )
          .fromTo(
            contentRef.current.querySelector('p'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.5'
          )
          .fromTo(
            contentRef.current.querySelector('.buttons'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.3'
          );
      }
    },
    { scope: heroRef }
  );

  return (
    <div
      ref={heroRef}
      className='relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303]'
    >
      <div
        ref={gridRef}
        className='absolute inset-0 w-full h-full'
        style={{
          backgroundImage: 'url(/about-us-hero-bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8,
        }}
      />

      <div
        ref={contentRef}
        className='relative z-10 text-center max-w-[579px] mx-auto px-5'
      >
        <h1 className='text-white xl:text-[48px] lg:text-[32px] text-[30px] leading-[140%] font-bold mb-6'>
          Boundless is Where
          <br />
          <span className='gradient-text font-medium'>
            Ideas meet Opportunity
          </span>
        </h1>

        <DottedUnderline className='w-full max-w-md mx-auto mb-7' />

        <p
          className='xl:text-[16px] lg:text-[14px] text-[14px] leading-[150%] mb-7'
          style={{
            background: 'linear-gradient(93deg, #B5B5B5 15.93%, #FFF 97.61%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          We help innovators validate ideas, raise funds, and access grants &
          hackathons through milestone-based support powered by Stellar and
          Trustless Work.
        </p>

        <div className='buttons flex flex-col md:flex-row gap-4 justify-center items-center'>
          <BoundlessButton variant='default' size='lg'>
            Explore Projects
          </BoundlessButton>
          <BoundlessButton variant='secondary' size='lg'>
            Submit Your Idea
          </BoundlessButton>
        </div>
      </div>
    </div>
  );
}
