/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { BlogPost } from '@/lib/data/blog';

interface BlogGridProps {
  posts: BlogPost[];
  showLoadMore?: boolean;
  maxPosts?: number;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  showLoadMore = false,
  maxPosts,
}) => {
  const displayPosts = maxPosts ? posts.slice(0, maxPosts) : posts;

  return <section className=''></section>;
};

export default BlogGrid;
