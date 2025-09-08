'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Image from 'next/image';
import { useRef } from 'react';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  useGSAP(
    () => {
      // Create ScrollSmoother with proper wrapper/content structure
      const smoother = ScrollSmoother.create({
        wrapper: containerRef.current,
        content: contentRef.current,
        smooth: 2,
        smoothTouch: 0.1,
      });

      // Creative scroll animations for ellipse and glow effects
      if (heroRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            markers: false,
          },
        });

        // Animate the ellipse image with rotation and scale
        const ellipseImg = heroRef.current.querySelector('.ellipse-image');
        if (ellipseImg) {
          tl.to(
            ellipseImg,
            {
              rotation: 360,
              scale: 1.5,
              ease: 'none',
            },
            0
          );
        }

        // Animate the glow effects with dynamic scaling and opacity
        const glowElements = heroRef.current.querySelectorAll('.glow-element');
        if (glowElements && glowElements.length > 0) {
          tl.to(
            glowElements,
            {
              scale: 1.8,
              opacity: 0.8,
              ease: 'power2.out',
            },
            0
          );

          // Add staggered rotation to individual glow elements
          gsap.utils.toArray(glowElements).forEach((element, index) => {
            gsap.to(element as Element, {
              rotation: index % 2 === 0 ? 180 : -180,
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
              },
            });
          });
        }

        // Add parallax effect to the hero section background
        gsap.to(heroRef.current, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      return () => {
        // Cleanup ScrollTriggers and ScrollSmoother
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        if (smoother) smoother.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className='relative overflow-hidden'>
      <div ref={contentRef}>
        <div
          ref={heroRef}
          className="bg-[url('/stars.svg')] bg-cover bg-center relative flex justify-center min-h-screen border-t-10 top-0"
        >
          <div className='max-w-[560px] max-h-[560px] w-[560px] h-[560px] mx-auto flex-shrink-0 relative'>
            <Image
              unoptimized
              src='/elipse.svg'
              alt='stars'
              width={726}
              height={726}
              className='ellipse-image absolute object-cover max-w-[726px] max-h-[726px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            />
            <div className='glow-element absolute max-w-[383px] max-h-[383px] w-[383px] h-[383px] flex-shrink-0 border-[20px] rounded-full border-[#DBFFB7] opacity-[0.3] mix-blend-overlay blur-[25px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
            <div className='glow-element absolute max-w-[397px] max-h-[397px] w-[397px] h-[397px] flex-shrink-0 border-[100px] rounded-full border-[#6DC01A] opacity-[0.15] mix-blend-hard-light blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
            <div className='glow-element absolute max-w-[560px] max-h-[560px] w-[560px] h-[560px] flex-shrink-0 rounded-full bg-[rgba(167,249,80,0.24)] blur-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
          </div>
          {/* Add some content to test scrolling */}
          <div className='h-[200vh]'></div>
        </div>
      </div>
    </div>
  );
}
