import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('blog');

const BlogPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      Blog Page
    </div>
  );
};

export default BlogPage;
