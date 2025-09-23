'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag, Share2, BookOpen } from 'lucide-react';
import { BlogPost } from '@/lib/data/blog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMarkdown } from '@/hooks/use-markdown';

interface BlogPostDetailsProps {
  post: BlogPost;
}

const BlogPostDetails: React.FC<BlogPostDetailsProps> = ({ post }) => {
  const { loading, error, styledContent } = useMarkdown(post.content, {
    breaks: true,
    gfm: true,
    pedantic: true,
    loadingDelay: 100,
  });
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch {
        // Silent error handling
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className='min-h-screen bg-[#030303] text-white'>
      {/* Header */}
      <div className='border-b border-[#2B2B2B] bg-[#101010]'>
        <div className='mx-auto max-w-4xl px-6 py-8'>
          <Link
            href='/blog'
            className='mb-6 inline-flex items-center gap-2 text-sm text-[#B5B5B5] transition-colors hover:text-white'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Blog
          </Link>

          <div className='mb-4 flex items-center gap-2'>
            <Badge
              variant='outline'
              className='border-[#A7F950] bg-[#A7F95014] text-[#A7F950]'
            >
              {post.category}
            </Badge>
            <span className='text-sm text-[#B5B5B5]'>•</span>
            <span className='text-sm text-[#B5B5B5]'>
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h1 className='mb-4 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl'>
            {post.title}
          </h1>

          <p className='mb-6 text-lg leading-relaxed text-[#B5B5B5]'>
            {post.excerpt}
          </p>

          <div className='flex flex-wrap items-center gap-6 text-sm text-[#B5B5B5]'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
            </div>

            <div className='flex items-center gap-1'>
              <Clock className='h-4 w-4' />
              <span>{post.readTime} min read</span>
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={handleShare}
              className='border-[#2B2B2B] text-[#B5B5B5] hover:bg-[#2B2B2B] hover:text-white'
            >
              <Share2 className='mr-2 h-4 w-4' />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className='relative h-[400px] w-full md:h-[500px]'>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Content */}
      <div className='mx-auto max-w-4xl px-6 py-12'>
        <div className='prose prose-invert max-w-none'>
          {loading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='text-[#B5B5B5]'>Loading content...</div>
            </div>
          ) : error ? (
            <div className='mb-6 rounded-lg border border-red-500/30 bg-red-900/20 p-4 text-red-400'>
              <p className='font-medium'>Error loading content:</p>
              <p className='mt-1 text-sm'>{error}</p>
            </div>
          ) : (
            styledContent
          )}
        </div>

        {/* Tags */}
        <div className='mt-12 border-t border-[#2B2B2B] pt-8'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-sm font-medium text-white'>Tags:</span>
            {post.tags.map(tag => (
              <Badge
                key={tag}
                variant='secondary'
                className='bg-[#2B2B2B] text-[#B5B5B5] hover:bg-[#3B3B3B]'
              >
                <Tag className='mr-1 h-3 w-3' />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className='mt-12 rounded-lg border border-[#2B2B2B] bg-[#101010] p-6'>
          <div className='flex items-start gap-4'>
            <Avatar className='h-16 w-16'>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className='text-lg'>
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-white'>
                {post.author.name}
              </h3>
              <p className='mt-1 text-sm text-[#B5B5B5]'>{post.author.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className='border-t border-[#2B2B2B] bg-[#101010] py-16'>
        <div className='mx-auto max-w-6xl px-6'>
          <h2 className='mb-8 text-2xl font-bold text-white'>
            Related Articles
          </h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {/* This would be populated with related posts */}
            <div className='text-center text-[#B5B5B5]'>
              <BookOpen className='mx-auto mb-4 h-12 w-12' />
              <p>Related posts will be loaded here</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-gradient-to-r from-[#A7F950] to-[#7ED321] py-16'>
        <div className='mx-auto max-w-4xl px-6 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-black'>
            Ready to Launch Your Project?
          </h2>
          <p className='mb-8 text-lg text-black/80'>
            Join thousands of creators who are building the future with
            Boundless.
          </p>
          <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Button
              asChild
              size='lg'
              className='bg-black text-white hover:bg-black/80'
            >
              <Link href='/auth/signup'>Get Started</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='border-black text-black hover:bg-black/10'
            >
              <Link href='/projects'>Explore Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;
