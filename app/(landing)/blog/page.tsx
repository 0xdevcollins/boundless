import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import BlogGrid from '@/components/landing-page/blog/BlogGrid';
import { getAllBlogPosts } from '@/lib/data/blog';
import TestimonialSection from '@/components/testimonials/TestimonialsSection';
import { testimonials } from '@/components/testimonials/data/testimonial';

export const metadata: Metadata = generatePageMetadata('blog');

const BlogPage = async () => {
  const posts = await getAllBlogPosts();

  return (
    <div className='min-h-screen bg-[#030303]'>
      <BlogGrid posts={posts} showLoadMore={true} />
      <TestimonialSection testimonials={testimonials} />
    </div>
  );
};

export default BlogPage;
