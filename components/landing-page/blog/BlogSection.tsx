'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  category: string;
}

interface CardStackItem {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
}

const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: 'Why Validation Before Funding Protects Everyone',
    excerpt:
      'Validation ensures that only strong ideas move forward. By allowing the community and admins to review projects before funding, Boundless protects backers from risky proposals and gives creators the chance to refine their concepts. This process builds trust, reduces wasted resources, and creates a safer, more transparent environment where everyone benefits.',
    image: '/blog1.jpg',
    date: '29, Jul, 2025',
    slug: 'why-validation-before-funding-protects-everyone',
    category: 'Blog',
  },
  {
    id: 2,
    title: 'The Future of Decentralized Crowdfunding',
    excerpt:
      'Explore how blockchain technology is revolutionizing the way projects get funded. From smart contracts to community governance, discover the innovations that are making crowdfunding more transparent and efficient than ever before.',
    image: '/blog2.jpg',
    date: '25, Jul, 2025',
    slug: 'future-decentralized-crowdfunding',
    category: 'Web3',
  },
  {
    id: 3,
    title: 'Building Trust in Web3 Communities',
    excerpt:
      'Trust is the foundation of any successful community. Learn about the mechanisms and best practices that help build and maintain trust in decentralized communities, from reputation systems to transparent governance.',
    image: '/blog3.jpg',
    date: '22, Jul, 2025',
    slug: 'building-trust-web3-communities',
    category: 'Community',
  },
  {
    id: 4,
    title: 'Grant Programs That Actually Work',
    excerpt:
      'Not all grant programs are created equal. Discover what makes grant programs successful and how to design them to maximize impact while ensuring fair distribution of resources to deserving projects.',
    image: '/blog4.jpg',
    date: '18, Jul, 2025',
    slug: 'grant-programs-that-actually-work',
    category: 'Grants',
  },
  {
    id: 5,
    title: 'The Psychology of Backing Projects',
    excerpt:
      'Understanding what motivates people to back projects is crucial for creators. Dive into the psychological factors that influence backing decisions and how to create compelling project proposals.',
    image: '/blog5.jpg',
    date: '15, Jul, 2025',
    slug: 'psychology-of-backing-projects',
    category: 'Psychology',
  },
  {
    id: 6,
    title: 'Smart Contracts for Crowdfunding',
    excerpt:
      'Learn how smart contracts are automating and securing crowdfunding processes. From automatic fund distribution to milestone-based releases, explore the technical innovations driving the future of funding.',
    image: '/blog6.jpg',
    date: '12, Jul, 2025',
    slug: 'smart-contracts-crowdfunding',
    category: 'Technology',
  },
];

const CARD_TRANSITION_DURATION = 0.5;
const AUTO_SLIDE_INTERVAL = 5000;
const MOBILE_BREAKPOINT = 640;

interface CardStackProps {
  items: CardStackItem[];
  offset?: number;
  scaleFactor?: number;
}

const CardStack = ({
  items,
  offset = 20,
  scaleFactor = 0.1,
}: CardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const startAutoSlide = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const id = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    setIntervalId(id);
  }, [nextSlide, intervalId]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startAutoSlide, intervalId]);

  const calculateCardPosition = useCallback(
    (index: number) => {
      const isActive = index === currentIndex;
      const isLeft = index < currentIndex;
      const isRight = index > currentIndex;
      const distanceFromActive = Math.abs(index - currentIndex);

      if (isActive) {
        return {
          xPosition: 0,
          scale: 1,
          zIndex: items.length + 1,
          opacity: 1,
        };
      }

      if (isLeft) {
        return {
          xPosition: -offset * distanceFromActive - 20,
          scale: 1 - scaleFactor * distanceFromActive,
          zIndex: items.length - distanceFromActive,
          opacity: 1,
        };
      }

      if (isRight) {
        return {
          xPosition: offset * distanceFromActive + 20,
          scale: 1 - scaleFactor * distanceFromActive,
          zIndex: items.length - distanceFromActive,
          opacity: 1,
        };
      }

      return {
        xPosition: 0,
        scale: 1,
        zIndex: items.length,
        opacity: 1,
      };
    },
    [currentIndex, items.length, offset, scaleFactor]
  );

  return (
    <div
      className='relative mx-auto w-full max-w-sm'
      role='region'
      aria-label='Blog carousel'
    >
      <div className='relative flex h-80 w-full items-center justify-center'>
        {items.map((card: CardStackItem, index: number) => {
          const { xPosition, scale, zIndex, opacity } =
            calculateCardPosition(index);

          return (
            <motion.div
              key={card.id}
              className='absolute flex w-full max-w-sm flex-col overflow-hidden rounded-[8px] border border-[#1B1B1B] bg-[#101010] p-0 shadow-xl'
              style={{
                transformOrigin: 'center center',
              }}
              animate={{
                x: xPosition,
                scale,
                zIndex,
                opacity,
              }}
              transition={{
                duration: CARD_TRANSITION_DURATION,
                ease: 'easeInOut',
              }}
              role='group'
              aria-label={`Blog post ${index + 1} of ${items.length}`}
            >
              {card.content}
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className='absolute top-1/2 -left-4 z-30 h-[48px] w-[48px] -translate-y-1/2 rounded-full border border-white/48 bg-white/20 p-3 shadow-lg backdrop-blur-[7px] transition-colors duration-200 hover:bg-white/50 focus:ring-2 focus:ring-white/50 focus:outline-none'
        aria-label='Previous blog post'
        type='button'
      >
        <ChevronLeft className='h-5 w-5 text-white' />
      </button>
      <button
        onClick={nextSlide}
        className='absolute top-1/2 -right-4 z-30 h-[48px] w-[48px] -translate-y-1/2 rounded-full border border-white/48 bg-white/20 p-3 shadow-lg backdrop-blur-[7px] transition-colors duration-200 hover:bg-white/50 focus:ring-2 focus:ring-white/50 focus:outline-none'
        aria-label='Next blog post'
        type='button'
      >
        <ChevronRight className='h-5 w-5 text-white' />
      </button>

      <div
        className='mt-10 flex items-center justify-center gap-2'
        role='tablist'
        aria-label='Blog post navigation'
      >
        {items.map((_: CardStackItem, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded leading-[145%] font-medium transition-all duration-300 focus:ring-2 focus:ring-white/50 focus:outline-none ${
              index === currentIndex
                ? 'text-white'
                : 'text-[#787878] hover:text-[#9A9A9A]'
            }`}
            aria-label={`Go to blog post ${index + 1}`}
            role='tab'
            aria-selected={index === currentIndex}
            type='button'
          >
            {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      <div className='text-center'>
        <Link
          className='mt-8 flex items-center justify-center gap-2 text-center font-medium text-white transition-colors hover:text-gray-300'
          href='/blog'
          aria-label='Read more blog articles'
        >
          <span className='underline'>Read More Articles</span>
          <ArrowRight className='h-4 w-4' />
        </Link>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardStackItems: CardStackItem[] = useMemo(
    () =>
      mockBlogs.map(blog => ({
        id: blog.id,
        name: blog.title,
        designation: blog.date,
        content: <BlogCard blog={blog} />,
      })),
    []
  );

  return (
    <section
      className='relative h-full w-full px-6 py-5 md:px-12 md:py-16 lg:px-[100px]'
      aria-labelledby='blog-heading'
    >
      <header className='mb-16 flex items-end justify-between'>
        <div className='max-w-[628px]'>
          <h3 className='gradient-text text-center text-sm leading-[120%] tracking-[-0.64px] md:text-left md:leading-[160%] md:font-medium md:tracking-[-0.48px]'>
            From the Blog
          </h3>
          <h2
            id='blog-heading'
            className='mt-3 text-center text-[32px] leading-[140%] tracking-[0.48px] text-white md:text-left md:text-[48px]'
          >
            Ideas that shape the future
          </h2>
          <p className='gradient-text-2 mt-3 max-w-[550px] text-center text-base leading-[160%] tracking-[-0.48px] md:text-left'>
            Discover stories, tips, and updates on crowdfunding, grants, and
            Web3. Learn from builders and backers driving real impact.
          </p>
        </div>
        <div className='hidden items-end justify-end md:flex'>
          <Link
            className='flex items-center gap-2 font-medium text-white transition-colors hover:text-gray-300'
            href='/blog'
            aria-label='Read more blog articles'
          >
            <span className='underline'>Read More Articles</span>
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </header>

      {isMobile ? (
        <div className='flex justify-center'>
          <CardStack items={cardStackItems} offset={20} scaleFactor={0.1} />
        </div>
      ) : (
        <div
          className='grid w-full max-w-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-3'
          role='list'
          aria-label='Blog posts grid'
        >
          {mockBlogs.map(blog => (
            <div key={blog.id} role='listitem'>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogSection;
