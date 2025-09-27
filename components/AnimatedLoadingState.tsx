'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Waitlist() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.set('.fade-in', { opacity: 0, y: 50 });
        gsap.set('.card', { scale: 0.9, opacity: 0 });
        gsap.set('.store-btn', { scale: 0.8, opacity: 0 });
        gsap.set('.logo-dots', { scale: 0, opacity: 0 });

        // Create main timeline
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Card entrance with bounce
        tl.to('.card', {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        })

          // Logo dots animation
          .to(
            '.logo-dots',
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: 'back.out(2)',
            },
            '-=0.5'
          )

          // Content elements with stagger
          .to(
            '.fade-in',
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power2.out',
            },
            '-=0.3'
          )

          // Store buttons with bounce effect
          .to(
            '.store-btn',
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.15,
              ease: 'back.out(1.7)',
            },
            '-=0.2'
          );

        if (containerRef.current) {
          const interactiveElements =
            containerRef.current.querySelectorAll('.hover-element');
          interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
              gsap.to(element, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              });
            });

            element.addEventListener('mouseleave', () => {
              gsap.to(element, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              });
            });
          });
        }

        // Add subtle floating animation to the card
        gsap.to('.card', {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className='flex min-h-screen items-center justify-center px-4'
    >
      <div className='card w-full max-w-2xl rounded-lg bg-white/95 p-8 shadow-xl backdrop-blur-sm'>
        {/* Logo */}
        <div className='fade-in mb-6 flex items-center gap-2'>
          <div className='flex space-x-1'>
            <div className='logo-dots h-5 w-5 rounded-full bg-yellow-400'></div>
            <div className='logo-dots h-5 w-5 rounded-full bg-green-500'></div>
            <div className='logo-dots h-5 w-5 rounded-full bg-red-500'></div>
          </div>
          <span className='text-lg font-semibold text-gray-900'>Company</span>
        </div>

        {/* Title */}
        <h1 className='fade-in mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl'>
          You're on the Waitlist! 🎉
        </h1>
        <p className='fade-in mb-6 text-base leading-relaxed text-gray-700 md:text-lg'>
          Congratulations! You've secured a spot on the exclusive Waitlist for{' '}
          <span className='font-medium text-purple-600'>[Product Name]</span>.
          To deliver a seamless experience that meets our customers'
          expectations, we will send out invitations in stages.
        </p>

        {/* Button */}
        <button className='fade-in hover-element mb-8 rounded-md bg-black px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-gray-800'>
          See announcement
        </button>

        {/* Sub text */}
        <p className='fade-in mb-10 text-sm text-gray-500'>
          You're receiving this email because you signed up for the{' '}
          <span className='font-medium'>[Product Name]</span> waitlist. If this
          doesn't seem right, please feel free to disregard this message.
        </p>

        {/* Footer */}
        <div className='fade-in text-sm text-gray-700'>
          <div className='mb-3 flex items-center gap-2'>
            <div className='flex space-x-1'>
              <div className='h-4 w-4 rounded-full bg-gray-600'></div>
              <div className='h-4 w-4 rounded-full bg-gray-400'></div>
            </div>
            <span className='font-semibold'>Company</span>
          </div>

          <p className='mb-4 text-sm'>
            [Product Name] at the touch of a button! Download our app for:
          </p>

          {/* Store buttons */}
          <div className='mb-10 flex flex-col gap-3 sm:flex-row'>
            <div className='store-btn hover-element flex cursor-pointer items-center gap-3 rounded-lg bg-black px-4 py-3 text-white shadow-lg transition-colors hover:bg-gray-800'>
              <svg className='h-8 w-8' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
              </svg>
              <div>
                <div className='text-xs'>Download on the</div>
                <div className='text-sm font-semibold'>Mac App Store</div>
              </div>
            </div>

            <div className='store-btn hover-element flex cursor-pointer items-center gap-3 rounded-lg bg-black px-4 py-3 text-white shadow-lg transition-colors hover:bg-gray-800'>
              <svg className='h-8 w-8' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z' />
              </svg>
              <div>
                <div className='text-xs'>GET IT ON</div>
                <div className='text-sm font-semibold'>Google Play</div>
              </div>
            </div>
          </div>

          <p className='fade-in text-xs text-gray-500'>
            Don't want any more emails from [Company Name]?{' '}
            <span className='hover-element cursor-pointer font-medium text-purple-600 underline hover:text-purple-800'>
              Unsubscribe
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
