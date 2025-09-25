'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { BlogPost, getAllBlogPosts } from '@/lib/data/blog';

interface CardStackItem {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
}

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
  offset = 10,
  scaleFactor = 0.06,
}: CardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  }, [items.length]);

  const prevCard = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const interval = setInterval(nextCard, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [nextCard]);

  if (items.length === 0) return null;

  return (
    <div className='relative h-[400px] w-full'>
      {items.map((item, index) => {
        const isActive = index === currentIndex;
        const isPrev =
          index === (currentIndex - 1 + items.length) % items.length;
        const isNext = index === (currentIndex + 1) % items.length;

        let zIndex = 0;
        let translateY = 0;
        let scale = 1;
        let opacity = 0.3;

        if (isActive) {
          zIndex = 3;
          translateY = 0;
          scale = 1;
          opacity = 1;
        } else if (isPrev) {
          zIndex = 2;
          translateY = offset;
          scale = 1 - scaleFactor;
          opacity = 0.7;
        } else if (isNext) {
          zIndex = 1;
          translateY = -offset;
          scale = 1 - scaleFactor * 2;
          opacity = 0.4;
        } else {
          zIndex = 0;
          translateY = offset * 2;
          scale = 1 - scaleFactor * 3;
          opacity = 0.1;
        }

        return (
          <motion.div
            key={item.id}
            className='absolute inset-0 cursor-pointer'
            style={{ zIndex }}
            initial={false}
            animate={{
              y: translateY,
              scale,
              opacity,
            }}
            transition={{
              duration: CARD_TRANSITION_DURATION,
              ease: 'easeInOut',
            }}
            onClick={nextCard}
          >
            {item.content}
          </motion.div>
        );
      })}

      {/* Navigation Buttons */}
      <button
        onClick={prevCard}
        className='absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20'
        aria-label='Previous card'
      >
        <ChevronLeft className='h-5 w-5 text-white' />
      </button>
      <button
        onClick={nextCard}
        className='absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20'
        aria-label='Next card'
      >
        <ChevronRight className='h-5 w-5 text-white' />
      </button>

      {/* Dots Indicator */}
      <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2'>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const BlogSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        setBlogPosts(posts.slice(0, 6)); // Take first 6 posts for the section
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

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
      blogPosts.map(post => ({
        id: post.id,
        name: post.title,
        designation: post.date,
        content: <BlogCard post={post} />,
      })),
    [blogPosts]
  );

  if (loading) {
    return (
      <section
        className='relative h-full w-full px-6 py-5 md:px-12 md:py-16 lg:px-[100px]'
        aria-labelledby='blog-heading'
      >
        <div className='flex items-center justify-center py-20'>
          <div className='text-white'>Loading blog posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className='relative h-full w-full px-6 py-5 md:px-12 md:py-16 lg:px-[100px]'
      aria-labelledby='blog-heading'
    >
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h2
            id='blog-heading'
            className='mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl'
          >
            Latest from Our Blog
          </h2>
          <p className='mx-auto max-w-2xl text-lg text-[#B5B5B5]'>
            Stay updated with the latest insights, trends, and stories from the
            world of decentralized crowdfunding and Web3 innovation.
          </p>
        </div>

        {/* Blog Cards */}
        {isMobile ? (
          <div
            className='grid w-full max-w-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-3'
            role='list'
            aria-label='Blog posts grid'
          >
            {blogPosts.map(post => (
              <div key={post.id} role='listitem'>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <CardStack items={cardStackItems} />
        )}

        {/* View All Button */}
        <div className='mt-12 text-center'>
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 rounded-lg bg-[#A7F950] px-6 py-3 font-semibold text-black transition-colors hover:bg-[#A7F950]/80'
          >
            View All Posts
            <ArrowRight className='h-5 w-5' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;