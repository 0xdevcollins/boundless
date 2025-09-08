'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef } from 'react';
import { BoundlessButton } from '@/components/buttons';
import Image from 'next/image';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  useGSAP(
    () => {
      if (heroRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: '100 80%',
            end: 'bottom 20%',
            scrub: 1,
            // markers: true,
          },
        });

        const ellipseImg = heroRef.current.querySelector('.ellipse-image');
        if (ellipseImg) {
          heroTl.set(ellipseImg, {
            rotation: 0,
            scale: 1,
          });
          heroTl.to(
            ellipseImg,
            {
              rotation: 30,
              scale: 1.2,
              ease: 'none',
            },
            0
          );
        }

        const sphereImg = heroRef.current.querySelector('.sphere-image');
        if (sphereImg) {
          heroTl.to(
            sphereImg,
            {
              rotation: -30,
              scale: 1.2,
              ease: 'none',
            },
            0
          );
        }

        gsap.to(heroRef.current, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(heroRef.current.querySelector('.ellipse-container'), {
          y: -15,
          ease: 'power2.inOut',
          duration: 4,
          repeat: -1,
          yoyo: true,
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    },
    { scope: heroRef }
  );

  return (
    <div
      className='min-h-screen h-screen flex items-stretch md:items-end justify-between pb-[66px] md:mx-[116px] mx-5 relative'
      id='hero'
    >
      <div
        ref={heroRef}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full mt-[-80px] z-10'
      >
        <Image
          src='/sphere.svg'
          alt='glow'
          unoptimized
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[508px] h-[369px] z-10 sphere-image'
          width={1920}
          height={1080}
          quality={100}
        />
        <Image
          src='/glow.svg'
          alt='glow'
          unoptimized
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-10 glow-element'
          width={1920}
          height={1080}
        />
        <Image
          src='/elipse.svg'
          alt='glow'
          unoptimized
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] z-10 ellipse-image'
          width={1920}
          height={1080}
        />
        <div
          className='absolute bottom-0 left-0 w-full h-[150px] z-10 bg-gradient-to-t from-transparent to-background'
          style={{
            background:
              'linear-gradient(180deg, rgba(3, 3, 3, 0.00) 32.3%, #030303 84.8%)',
          }}
        />
      </div>
      <div className='flex flex-col md:flex-row justify-between items-end gap-4 h-full w-full md:h-auto mt-[120px] z-10'>
        <h2 className='text-left text-white xl:text-[48px] lg:text-[32px] text-[30px] leading-[140%] md:max-w-[579px] max-w-[350px]'>
          Validate Ideas, <br /> Fund Bold Projects, <br />{' '}
          <span className='gradient-text font-medium'>
            Unlock Boundless Potential
          </span>
        </h2>
        <div className='md:max-w-[466px] relative bottom-[150px] md:bottom-0'>
          <p
            className='text-white xl:text-[16px] lg:text-[14px] text-[14px] leading-[150%]'
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
          <div className='flex flex-col md:flex-row items-center gap-4 mt-7'>
            <BoundlessButton variant='default' size='xl' fullWidth>
              Explore Projects
            </BoundlessButton>
            <BoundlessButton variant='secondary' size='xl' fullWidth>
              Submit Your Idea
            </BoundlessButton>
          </div>
        </div>
      </div>
    </div>
  );
}
