'use client';

import React, { useState, useCallback } from 'react';
import { BlogPost } from '@/lib/data/blog';
import BlogCard from './BlogCard';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogGridProps {
  posts: BlogPost[];
  showLoadMore?: boolean;
  maxPosts?: number;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  showLoadMore = true,
  maxPosts,
}) => {
  const [visiblePosts, setVisiblePosts] = useState(maxPosts || 12);
  const [selectedCategory, setSelectedCategory] = useState('Latest');
  const [isLoading, setIsLoading] = useState(false);

  // Get posts to display (no filtering)
  const displayPosts = posts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < posts.length;

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (isLoading || !hasMorePosts) return;

    setIsLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisiblePosts(prev => prev + 12);
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMorePosts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // UI only - no filtering functionality
  };

  return (
    <div className='min-h-screen bg-[#030303]'>
      {/* Header Navigation */}
      <div>
        <div className='mx-auto max-w-6xl px-6 py-8'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            {/* Category Buttons */}
            <div className='flex items-center gap-3'>
              <button
                onClick={() => handleCategoryChange('Latest')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === 'Latest'
                    ? 'border border-white/20 text-white'
                    : 'border border-white/10 text-white hover:bg-[#2A2A2A]'
                }`}
              >
                <svg
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                Latest
              </button>
              <button
                onClick={() => handleCategoryChange('Category')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === 'Category'
                    ? 'border border-white/20 text-white'
                    : 'border border-white/10 text-white hover:bg-[#2A2A2A]'
                }`}
              >
                Category
              </button>
            </div>

            {/* Search Bar */}
            <div className='relative w-full md:w-auto md:min-w-[300px]'>
              <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white' />
              <Input
                type='text'
                placeholder='Search article'
                className='w-full rounded-lg border border-white/10 bg-[#101010] py-2 pr-4 pl-10 text-white placeholder:text-[#B5B5B5] focus:border-white/20 focus:ring-white/20'
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className='mx-auto max-w-6xl px-6 py-12'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
          {displayPosts.map(post => (
            <div key={post.id} className='w-full'>
              <BlogCard
                blog={{
                  id: post.id,
                  title: post.title,
                  excerpt: post.excerpt,
                  image: post.image,
                  date: post.date,
                  slug: post.slug,
                  category: post.category,
                }}
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        {showLoadMore && hasMorePosts && !isLoading && (
          <div className='mt-12 flex justify-center'>
            <button
              onClick={handleLoadMore}
              className='flex items-center gap-2 rounded-lg border border-[#2B2B2B] bg-[#1A1A1A] px-6 py-3 text-white transition-colors hover:bg-[#2A2A2A] hover:text-white focus:ring-2 focus:ring-[#A7F950] focus:outline-none'
            >
              View More
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className='mt-12 flex justify-center'>
            <div className='flex items-center gap-2 text-[#B5B5B5]'>
              <Loader2 className='h-5 w-5 animate-spin' />
              <span>Loading more posts...</span>
            </div>
          </div>
        )}

        {/* No more posts message */}
        {!hasMorePosts && posts.length > 0 && !isLoading && (
          <div className='mt-12 text-center text-[#B5B5B5]'>
            <p>You've reached the end of the blog posts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
