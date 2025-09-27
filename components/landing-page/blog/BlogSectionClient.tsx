'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import AuthLoadingState from '@/components/auth/AuthLoadingState';
import { BlogPost } from '@/lib/data/blog';
import BlogCard from './BlogCard';

interface BlogSectionClientProps {
  posts: BlogPost[];
}

const BlogSectionClient = ({ posts }: BlogSectionClientProps) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCardClick = useCallback((slug: string) => {
    setIsNavigating(true);
    // The navigation will be handled by Next.js Link, but we show loading state
    // The loading state will be cleared when the page actually navigates
    // eslint-disable-next-line no-console
    console.log(`Navigating to blog post: ${slug}`);
    setTimeout(() => {
      setIsNavigating(false);
    }, 5000);
  }, []);

  return (
    <>
      {isNavigating && <AuthLoadingState message='Loading article...' />}
      <section
        className='relative h-full w-full px-6 py-5 md:px-12 md:py-16 lg:px-[100px]'
        aria-labelledby='blog-heading'
      >
        <header className='mb-16 flex items-end justify-between'>
          <div className='max-w-[628px]'>
            <h3 className='gradient-text text-left text-sm leading-[120%] tracking-[-0.64px] md:leading-[160%] md:font-medium md:tracking-[-0.48px]'>
              From the Blog
            </h3>
            <h2
              id='blog-heading'
              className='mt-3 text-left text-[32px] leading-[140%] tracking-[0.48px] text-white md:text-[48px]'
            >
              Ideas that shape the future
            </h2>
            <p className='gradient-text-2 mt-3 max-w-[550px] text-left text-base leading-[160%] tracking-[-0.48px]'>
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

        <div
          className='grid w-full max-w-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-3'
          role='list'
          aria-label='Blog posts grid'
        >
          {posts.slice(0, 6).map((blog: BlogPost) => (
            <div key={blog.id} role='listitem'>
              <BlogCard post={blog} onCardClick={handleCardClick} />
            </div>
          ))}
          <div className='flex justify-center text-center sm:hidden'>
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
      </section>
    </>
  );
};

export default BlogSectionClient;
