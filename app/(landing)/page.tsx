'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef } from 'react';
import BeamBackground from '@/components/landing-page/BeamBackground';
import { Hero } from '@/components/landing-page';
import HowBoundlessWork from '@/components/landing-page/HowBoundlessWork';
import WhyBoundless from '@/components/landing-page/WhyBoundless';
import BackedBy from '@/components/landing-page/BackedBy';
import NewsLetter from '@/components/landing-page/NewsLetter';
import BlogSection from '@/components/landing-page/blog/BlogSection';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: containerRef.current,
        content: contentRef.current,
        smooth: 2,
        smoothTouch: 0.1,
        effects: true,
      });

      // Snap scroll between #hero and #how-boundless-work
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        endTrigger: '#how-boundless-work',
        end: 'top top',
        pin: true,
        scrub: 1,
        snap: {
          snapTo: value => {
            // value is a normalized progress (0-1) between start and end
            // Snap to 0 (top of #hero) or 1 (top of #how-boundless-work)
            return value < 0.5 ? 0 : 1;
          },
          duration: { min: 0.2, max: 1 },
          delay: 0.1,
          ease: 'power1.inOut',
        },
      });
      // Scroll to #how-boundless-work on scroll down from #hero
      const handleWheel = (e: WheelEvent) => {
        const hero = document.getElementById('hero');
        const how = document.getElementById('how-boundless-work');
        if (!hero || !how) return;

        const heroRect = hero.getBoundingClientRect();
        // Only trigger if the user is at the bottom of #hero and scrolling down
        if (
          heroRect.bottom - 10 <= window.innerHeight && // allow for small offset
          e.deltaY > 0
        ) {
          e.preventDefault();
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: how, offsetY: 0 },
            ease: 'power2.inOut',
          });
        }
      };

      // Attach wheel event to #hero
      setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) {
          hero.addEventListener('wheel', handleWheel, { passive: false });
        }
      }, 0);

      // Clean up event listener
      ScrollTrigger.addEventListener('refreshInit', () => {
        const hero = document.getElementById('hero');
        if (hero) {
          hero.removeEventListener('wheel', handleWheel);
          hero.addEventListener('wheel', handleWheel, { passive: false });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className='relative overflow-hidden'>
      <BeamBackground />
      <div
        ref={contentRef}
        className='relative z-10 space-y-[23px] md:space-y-[80px] max-w-[1200px] mx-auto'
      >
        <Hero />
        <WhyBoundless />
        <BackedBy />
        <NewsLetter />
        <BlogSection />
        <HowBoundlessWork />
      </div>
    </div>
  );
}
