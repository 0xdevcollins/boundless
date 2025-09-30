import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostDetails from '../../../../components/landing-page/blog/BlogPostDetails';
import { getBlogPost, getBlogPosts } from '@/lib/api/blog';
import { generateBlogPostMetadata } from '@/lib/metadata';

export async function generateStaticParams() {
  try {
    // For static generation, we'll need to fetch all posts
    // This might need to be adjusted based on your backend implementation
    const { posts } = await getBlogPosts({ page: 1, limit: 50 });

    return posts.map(post => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getBlogPost(slug);

    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    return generateBlogPostMetadata(post);
  } catch {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  try {
    const post = await getBlogPost(slug);

    if (!post) {
      notFound();
    }

    return <BlogPostDetails post={post} />;
  } catch {
    notFound();
  }
};

export default BlogPostPage;
