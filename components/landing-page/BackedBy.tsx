import { backedBy, socialLinks } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { Linkedin } from 'lucide-react';
import CommentCard from './CommentCard';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const BackedBy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  // Register useGSAP as a GSAP plugin (best practice)
  gsap.registerPlugin(useGSAP);

  useGSAP(
    (context, contextSafe) => {
      if (
        !containerRef.current ||
        !column1Ref.current ||
        !column2Ref.current ||
        !column3Ref.current
      )
        return;

      const container = containerRef.current;

      // Create seamless infinite scroll animation using GSAP best practices
      const createSeamlessScrollAnimation = (
        element: HTMLElement,
        direction: 'up' | 'down' = 'up'
      ) => {
        const children = Array.from(element.children);

        // Calculate total height more accurately
        const totalHeight = children.reduce((acc, child) => {
          const rect = child.getBoundingClientRect();
          return acc + rect.height + 24; // 24px gap
        }, 0);

        // Clone children for seamless loop (GSAP best practice)
        // Create a wrapper for better performance
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';

        // Move original children to wrapper
        children.forEach(child => {
          wrapper.appendChild(child);
        });

        // Clone the wrapper for seamless loop
        const clone = wrapper.cloneNode(true) as HTMLElement;
        wrapper.appendChild(clone);

        // Clear element and add wrapper
        element.innerHTML = '';
        element.appendChild(wrapper);

        const scrollDistance = direction === 'up' ? -totalHeight : totalHeight;

        // Use GSAP set for initial positioning with performance optimizations
        gsap.set(wrapper, {
          y: 0,
          force3D: true, // Enable hardware acceleration
          willChange: 'transform', // Hint to browser for optimization
        });

        // Create animation with advanced performance optimizations
        const animation = gsap.to(wrapper, {
          y: scrollDistance,
          duration: 30, // Slower for better readability
          ease: 'none', // Linear for consistent speed
          repeat: -1, // Infinite repeat
          // Advanced performance optimizations
          force3D: true, // Enable hardware acceleration
          transformOrigin: 'center center',
          // Use GSAP's built-in performance features
          immediateRender: false, // Don't render immediately
          lazy: false, // Don't use lazy rendering for smooth animation
        });

        return animation;
      };

      // Create animations with staggered timing for visual variety
      const animations = [
        createSeamlessScrollAnimation(column1Ref.current, 'up'),
        createSeamlessScrollAnimation(column2Ref.current, 'down'),
        createSeamlessScrollAnimation(column3Ref.current, 'up'),
      ];

      // Context-safe event handlers (GSAP best practice)
      const handleMouseEnter =
        contextSafe?.(() => {
          animations.forEach(anim => anim.pause());
        }) ||
        (() => {
          animations.forEach(anim => anim.pause());
        });

      const handleMouseLeave =
        contextSafe?.(() => {
          animations.forEach(anim => anim.resume());
        }) ||
        (() => {
          animations.forEach(anim => anim.resume());
        });

      // Add event listeners with proper cleanup
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function (automatically handled by useGSAP)
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    {
      scope: containerRef, // Scope GSAP selectors to this container
      dependencies: [], // Empty array means run once on mount
      revertOnUpdate: false, // Don't revert on updates since we have no dependencies
    }
  );

  return (
    <div
      className='w-full h-full md:py-16 py-5 px-6 md:px-12 lg:px-[100px] relative'
      id='backed-by'
    >
      <div className='mx-auto relative max-w-[1200px]'>
        <h2 className='text-white text-3xl md:text-4xl lg:text-[48px] leading-[140%] tracking-[0.48px] text-center'>
          Backed By trusted partners
        </h2>
        <p className='text-[#B5B5B5] text-center text-sm md:text-base mt-2 md:mt-4'>
          <Link href={socialLinks.x} className='text-white underline'>
            Follow us on X
          </Link>{' '}
          and{' '}
          <Link href={socialLinks.linkedin} className='text-white underline'>
            LinkedIn
          </Link>{' '}
          to join the conversation
        </p>
      </div>

      {/* Logos */}
      <div className='grid grid-cols-2 md:grid-cols-4 justify-center items-center gap-6 mx-auto max-w-[872px] my-11'>
        {backedBy.map(item => (
          <Link href={item.url} key={item.name}>
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className='h-auto w-full  object-contain'
            />
          </Link>
        ))}
      </div>

      {/* Scrolling Testimonials */}
      <div
        ref={containerRef}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden max-h-[600px] md:max-h-[550px] relative'
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        }}
      >
        {/* Gradient overlays */}
        <div
          className='absolute -top-3 left-0 w-full h-[150px] z-10 pointer-events-none'
          style={{
            background:
              'linear-gradient(0deg, rgba(3, 3, 3, 0.00) 32.3%, #030303 84.8%)',
          }}
        />
        <div
          className='absolute -bottom-3 left-0 w-full h-[150px] z-10 pointer-events-none'
          style={{
            background:
              'linear-gradient(180deg, rgba(3, 3, 3, 0.00) 32.3%, #030303 84.8%)',
          }}
        />

        {/* Column 1 */}
        <div
          ref={column1Ref}
          className='flex flex-col gap-6'
          style={{ willChange: 'transform' }}
        >
          <CommentCard
            avatarSrc='/globe.svg'
            avatarFallback='D'
            name='David'
            username='david'
            content='Boundless gave our team the confidence to launch. The milestone-based funding kept us accountable every step of the way.'
            icon={<Linkedin className='w-4 h-4 text-white' />}
          />
          <CommentCard
            avatarSrc='/globe.svg'
            avatarFallback='D'
            name='David'
            username='david'
            content='The milestone-based escrow changed everything. Backers trusted us because they knew funds would only unlock on real progress. That accountability made our campaign stronger.'
            icon={<Linkedin className='w-4 h-4 text-white' />}
          />
        </div>

        {/* Column 2 */}
        <div
          ref={column2Ref}
          className='flex flex-col gap-6 -translate-y-1/2'
          style={{ willChange: 'transform' }}
        >
          <CommentCard
            avatarSrc='/globe.svg'
            avatarFallback='D'
            name='David'
            username='david'
            content='It feels like the future of crowdfunding.'
            icon={<Linkedin className='w-4 h-4 text-white' />}
          />
          <CommentCard
            avatarSrc='/globe.svg'
            avatarFallback='D'
            name='David'
            username='david'
            content='Raising funds on Boundless was simple, transparent, and faster than I imagined.'
            icon={<Linkedin className='w-4 h-4 text-white' />}
          />
          <CommentCard
            avatarSrc='/globe.svg'
            avatarFallback='D'
            name='David'
            username='david'
            content='Every startup needs this kind of system.'
            icon={<Linkedin className='w-4 h-4 text-white' />}
          />
        </div>

        {/* Column 3 */}
        <div
          ref={column3Ref}
          className='flex flex-col gap-6'
          style={{ willChange: 'transform' }}
        >
          <CommentCard
            avatarSrc='/globe.svg'
            avatarFallback='D'
            name='David'
            username='david'
            content='Community voting gave us early validation before launch. It felt amazing to know backers believed in our vision from day one.'
            icon={<Linkedin className='w-4 h-4 text-white' />}
          />
          <CommentCard
            avatarSrc='/globe.svg'
            avatarFallback='D'
            name='David'
            username='david'
            content='Before Boundless, raising funds was overwhelming. Now, I can focus on building while the platform handles trust and transparency.'
            icon={<Linkedin className='w-4 h-4 text-white' />}
          />
        </div>
      </div>
    </div>
  );
};

export default BackedBy;
