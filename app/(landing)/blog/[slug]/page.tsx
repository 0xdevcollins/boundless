import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostDetails from '../../../../components/landing-page/blog/BlogPostDetails';
import { getBlogPost, getAllBlogPosts } from '@/lib/data/blog';
import { generateBlogPostMetadata } from '@/lib/metadata';

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return generateBlogPostMetadata(post);
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetails post={post} />;
};

export default BlogPostPage;
