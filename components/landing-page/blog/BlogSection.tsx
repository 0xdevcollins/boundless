import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';

// Types
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

// Mock blog data
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

// Constants
const CARD_TRANSITION_DURATION = 0.5;
const AUTO_SLIDE_INTERVAL = 5000;
const MOBILE_BREAKPOINT = 640;

// CardStack Component
interface CardStackProps {
  items: CardStackItem[];
  offset?: number;
  scaleFactor?: number;
}

const CardStack: React.FC<CardStackProps> = ({
  items,
  offset = 20,
  scaleFactor = 0.1,
}) => {
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
    <div className='relative w-full max-w-sm mx-auto'>
      {/* Cards Container */}
      <div className='relative h-80 w-full flex justify-center items-center'>
        {items.map((card, index) => {
          const { xPosition, scale, zIndex, opacity } =
            calculateCardPosition(index);

          return (
            <motion.div
              key={card.id}
              className='absolute bg-[#101010] w-full max-w-sm rounded-[8px] p-0 shadow-xl border border-[#1B1B1B] overflow-hidden flex flex-col'
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
            >
              {card.content}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className='absolute -left-4 top-1/2 -translate-y-1/2 z-30 h-[48px] w-[48px] border border-[rgba(255,255,255,0.48)] bg-[#FFFFFF33] hover:bg-[#ffffff88] rounded-full p-3 transition-colors duration-200 shadow-lg backdrop-blur-[7px]'
        aria-label='Previous blog'
        type='button'
      >
        <ChevronLeft className='w-5 h-5 text-white' />
      </button>
      <button
        onClick={nextSlide}
        className='absolute -right-4 top-1/2 -translate-y-1/2 z-30 h-[48px] w-[48px] border border-[rgba(255,255,255,0.48)] bg-[#FFFFFF33] hover:bg-[#ffffff88] rounded-full p-3 transition-colors duration-200 shadow-lg backdrop-blur-[7px]'
        aria-label='Next blog'
        type='button'
      >
        <ChevronRight className='w-5 h-5 text-white' />
      </button>

      {/* Pagination Indicators */}
      <div className='flex justify-center items-center gap-2 mt-10'>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`font-medium leading-[145%] transition-all duration-300 ${
              index === currentIndex
                ? 'text-white'
                : 'text-[#787878] hover:text-[#9A9A9A]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            type='button'
          >
            {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      {/* Read More Link */}
      <div className='text-center'>
        <Link
          className='text-white font-medium flex justify-center items-center text-center gap-2 mt-8'
          href='/blog'
        >
          <span className='underline'>Read More Articles</span>
          <ArrowRight className='w-4 h-4' />
        </Link>
      </div>
    </div>
  );
};

const BlogSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Transform blog data to CardStack format
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
    <section className='w-full h-full md:py-16 py-5 px-6 md:px-12 lg:px-[100px] relative'>
      {/* Header */}
      <header className='flex justify-between items-end mb-16'>
        <div className='max-w-[628px]'>
          <h3 className='gradient-text text-sm text-center md:text-left md:font-medium leading-[120%] md:leading-[160%] tracking-[-0.64px] md:tracking-[-0.48px]'>
            From the Blog
          </h3>
          <h2 className='text-white text-[32px] md:text-[48px] text-center md:text-left leading-[140%] tracking-[0.48px] mt-3'>
            Ideas that shape the future
          </h2>
          <p className='gradient-text-2 text-base leading-[160%] tracking-[-0.48px] text-center md:text-left max-w-[550px] mt-3'>
            Discover stories, tips, and updates on crowdfunding, grants, and
            Web3. Learn from builders and backers driving real impact.
          </p>
        </div>
        <div className='justify-end items-end hidden md:flex'>
          <Link
            className='text-white font-medium flex items-center gap-2'
            href='/blog'
          >
            <span className='underline'>Read More Articles</span>
            <ArrowRight className='w-4 h-4' />
          </Link>
        </div>
      </header>

      {/* Content */}
      {isMobile ? (
        <div className='flex justify-center'>
          <CardStack items={cardStackItems} offset={20} scaleFactor={0.1} />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-none'>
          {mockBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogSection;
