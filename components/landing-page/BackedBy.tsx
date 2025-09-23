'use client';

import { backedBy, socialLinks } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import CommentCard from './CommentCard';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Skeleton } from '@/components/ui/skeleton';

interface Testimonial {
  id: string;
  name: string;
  username: string;
  content: string;
  avatarSrc: string;
  avatarFallback: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'David Chen',
    username: 'davidchen',
    content:
      'Boundless gave our team the confidence to launch. The milestone-based funding kept us accountable every step of the way.',
    avatarSrc: '/globe.svg',
    avatarFallback: 'D',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    username: 'sarahj',
    content:
      'The milestone-based escrow changed everything. Backers trusted us because they knew funds would only unlock on real progress.',
    avatarSrc: '/globe.svg',
    avatarFallback: 'S',
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    username: 'alexr',
    content: 'It feels like the future of crowdfunding.',
    avatarSrc: '/globe.svg',
    avatarFallback: 'A',
  },
  {
    id: '4',
    name: 'Maria Garcia',
    username: 'mariag',
    content:
      'Raising funds on Boundless was simple, transparent, and faster than I imagined.',
    avatarSrc: '/globe.svg',
    avatarFallback: 'M',
  },
  {
    id: '5',
    name: 'James Wilson',
    username: 'jamesw',
    content: 'Every startup needs this kind of system.',
    avatarSrc: '/globe.svg',
    avatarFallback: 'J',
  },
  {
    id: '6',
    name: 'Lisa Park',
    username: 'lisap',
    content:
      'Community voting gave us early validation before launch. It felt amazing to know backers believed in our vision from day one.',
    avatarSrc: '/globe.svg',
    avatarFallback: 'L',
  },
  {
    id: '7',
    name: 'Michael Brown',
    username: 'michaelb',
    content:
      'Before Boundless, raising funds was overwhelming. Now, I can focus on building while the platform handles trust and transparency.',
    avatarSrc: '/globe.svg',
    avatarFallback: 'M',
  },
];

const BackedBy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  gsap.registerPlugin(useGSAP);

  const handleImageLoad = (itemName: string) => {
    setImageLoading(prev => ({ ...prev, [itemName]: false }));
  };

  const handleImageError = (itemName: string) => {
    setImageLoading(prev => ({ ...prev, [itemName]: false }));
  };

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

      const createSeamlessScrollAnimation = (
        element: HTMLElement,
        direction: 'up' | 'down' = 'up'
      ) => {
        const children = Array.from(element.children);
        const totalHeight = children.reduce((acc, child) => {
          const rect = child.getBoundingClientRect();
          return acc + rect.height + 24;
        }, 0);

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';

        children.forEach(child => {
          wrapper.appendChild(child);
        });

        const clone = wrapper.cloneNode(true) as HTMLElement;
        wrapper.appendChild(clone);

        element.innerHTML = '';
        element.appendChild(wrapper);

        const scrollDistance = direction === 'up' ? -totalHeight : totalHeight;

        gsap.set(wrapper, {
          y: 0,
          force3D: true,
          willChange: 'transform',
        });

        const animation = gsap.to(wrapper, {
          y: scrollDistance,
          duration: 30,
          ease: 'none',
          repeat: -1,
          force3D: true,
          transformOrigin: 'center center',
          immediateRender: false,
          lazy: false,
        });

        return animation;
      };

      const animations = [
        createSeamlessScrollAnimation(column1Ref.current, 'up'),
        createSeamlessScrollAnimation(column2Ref.current, 'down'),
        createSeamlessScrollAnimation(column3Ref.current, 'up'),
      ];

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

      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    {
      scope: containerRef,
      dependencies: [],
      revertOnUpdate: false,
    }
  );

  return (
    <section
      className='relative my-[70px] h-full w-full px-6 py-[59px] md:px-12 md:py-16 lg:px-[100px]'
      id='backed-by'
      aria-labelledby='backed-by-heading'
    >
      <header className='relative mx-auto max-w-[1200px]'>
        <h2
          id='backed-by-heading'
          className='text-center text-3xl leading-[140%] tracking-[0.48px] text-white md:text-4xl lg:text-[48px]'
        >
          Backed By Trusted Partners
        </h2>
        <p className='mt-2 text-center text-sm text-[#B5B5B5] md:mt-4 md:text-base'>
          <Link
            href={socialLinks.x}
            className='text-white underline transition-colors hover:text-gray-300'
            target='_blank'
            rel='noopener noreferrer'
          >
            Follow us on X
          </Link>{' '}
          and{' '}
          <Link
            href={socialLinks.linkedin}
            className='text-white underline transition-colors hover:text-gray-300'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </Link>{' '}
          to join the conversation
        </p>
      </header>

      <div className='mx-auto my-11 grid max-w-[872px] grid-cols-2 items-center justify-center gap-6 md:grid-cols-4'>
        {backedBy.map(item => (
          <Link
            href={item.url}
            key={item.name}
            className='group relative flex items-center justify-center p-4 transition-transform hover:scale-105'
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Visit ${item.name} website`}
          >
            <div className='relative'>
              {imageLoading[item.name] !== false && (
                <Skeleton className='absolute inset-0 h-16 w-24' />
              )}
              <Image
                src={item.image}
                alt={`${item.name} logo`}
                width={100}
                height={100}
                loading='lazy'
                className={`h-auto w-full object-contain transition-opacity duration-300 ${
                  imageLoading[item.name] !== false
                    ? 'opacity-0'
                    : 'opacity-100'
                }`}
                onLoad={() => handleImageLoad(item.name)}
                onError={() => handleImageError(item.name)}
              />
            </div>
          </Link>
        ))}
      </div>

      <div
        ref={containerRef}
        className='relative grid max-h-[600px] grid-cols-1 gap-6 overflow-hidden md:max-h-[550px] md:grid-cols-2 lg:grid-cols-3'
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        }}
      >
        <div
          className='pointer-events-none absolute -top-3 left-0 z-10 h-[150px] w-full'
          style={{
            background:
              'linear-gradient(0deg, rgba(3, 3, 3, 0.00) 32.3%, #030303 84.8%)',
          }}
        />
        <div
          className='pointer-events-none absolute -bottom-3 left-0 z-10 h-[150px] w-full'
          style={{
            background:
              'linear-gradient(180deg, rgba(3, 3, 3, 0.00) 32.3%, #030303 84.8%)',
          }}
        />

        <div
          ref={column1Ref}
          className='flex flex-col gap-6'
          style={{ willChange: 'transform' }}
        >
          {testimonials.slice(0, 2).map(testimonial => (
            <CommentCard
              key={testimonial.id}
              avatarSrc={testimonial.avatarSrc}
              avatarFallback={testimonial.avatarFallback}
              name={testimonial.name}
              username={testimonial.username}
              content={testimonial.content}
              icon={<Linkedin className='h-4 w-4 text-white' />}
            />
          ))}
        </div>

        <div
          ref={column2Ref}
          className='flex -translate-y-1/2 flex-col gap-6'
          style={{ willChange: 'transform' }}
        >
          {testimonials.slice(2, 5).map(testimonial => (
            <CommentCard
              key={testimonial.id}
              avatarSrc={testimonial.avatarSrc}
              avatarFallback={testimonial.avatarFallback}
              name={testimonial.name}
              username={testimonial.username}
              content={testimonial.content}
              icon={<Linkedin className='h-4 w-4 text-white' />}
            />
          ))}
        </div>

        <div
          ref={column3Ref}
          className='flex flex-col gap-6'
          style={{ willChange: 'transform' }}
        >
          {testimonials.slice(5, 7).map(testimonial => (
            <CommentCard
              key={testimonial.id}
              avatarSrc={testimonial.avatarSrc}
              avatarFallback={testimonial.avatarFallback}
              name={testimonial.name}
              username={testimonial.username}
              content={testimonial.content}
              icon={<Linkedin className='h-4 w-4 text-white' />}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BackedBy;
