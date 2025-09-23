import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import BlogHero from '@/components/landing-page/blog/BlogHero';
import BlogGrid from '@/components/landing-page/blog/BlogGrid';
import { getAllBlogPosts } from '@/lib/data/blog';

export const metadata: Metadata = generatePageMetadata('blog');

const BlogPage = async () => {
  const posts = await getAllBlogPosts();
  const otherPosts = posts.slice(1);

  return (
    <div className='min-h-screen bg-[#030303]'>
      <BlogHero />
      <BlogGrid posts={otherPosts} showLoadMore={false} />
    </div>
  );
};

export default BlogPage;
