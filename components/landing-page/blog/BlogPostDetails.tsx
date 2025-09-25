'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Tag,
  BookOpen,
  Twitter,
  MessageCircle,
  Send,
  Link as LinkIcon,
} from 'lucide-react';
import { BlogPost, getRelatedPosts } from '@/lib/data/blog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useMarkdown } from '@/hooks/use-markdown';
import BlogCard from './BlogCard';

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

  const [relatedPosts, setRelatedPosts] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    const fetchRelatedPosts = async () => {
      const related = await getRelatedPosts(post.slug, 3);
      setRelatedPosts(related);
    };
    fetchRelatedPosts();
  }, [post.slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'discord':
        // Copy to clipboard for Discord
        navigator.clipboard.writeText(`${title} ${url}`);
        break;
      case 'link':
        navigator.clipboard.writeText(url);
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({ title, text, url });
          } catch {
            // Silent error handling
          }
        } else {
          navigator.clipboard.writeText(url);
        }
    }
  };

  return (
    <div className='min-h-screen bg-[#030303] text-white'>
      {/* Header */}
      <div>
        <div className='mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8'>
          <Link
            href='/blog'
            className='mb-4 inline-flex items-center gap-2 text-sm text-[#B5B5B5] transition-colors hover:text-white sm:mb-6'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Blog
          </Link>

          <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
            <div className='flex-1'>
              <div className='mb-3 flex items-center gap-2 sm:mb-4'>
                <span className='text-sm text-[#B5B5B5]'>Admin</span>
                <span className='text-sm text-[#B5B5B5]'>•</span>
                <span className='text-sm text-[#B5B5B5]'>
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h1 className='mb-3 text-2xl leading-tight font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl'>
                {post.title}
              </h1>

              <p className='mb-4 text-base leading-relaxed text-[#B5B5B5] sm:mb-6 sm:text-lg'>
                {post.excerpt}
              </p>
            </div>

            {/* Share Section */}
            <div className='flex flex-col items-start lg:ml-8 lg:items-end'>
              <h3 className='mb-3 text-sm font-medium text-white sm:mb-4'>
                SHARE
              </h3>
              <div className='flex gap-3 lg:flex-col'>
                <button
                  onClick={() => handleShare('twitter')}
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-[#A7F950] text-black transition-colors hover:bg-[#A7F950]/80'
                >
                  <Twitter className='h-5 w-5' />
                </button>
                <button
                  onClick={() => handleShare('discord')}
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-[#A7F950] text-black transition-colors hover:bg-[#A7F950]/80'
                >
                  <MessageCircle className='h-5 w-5' />
                </button>
                <button
                  onClick={() => handleShare('send')}
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-[#A7F950] text-black transition-colors hover:bg-[#A7F950]/80'
                >
                  <Send className='h-5 w-5' />
                </button>
                <button
                  onClick={() => handleShare('link')}
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-[#A7F950] text-black transition-colors hover:bg-[#A7F950]/80'
                >
                  <LinkIcon className='h-5 w-5' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className='relative mx-auto h-[250px] w-full max-w-4xl px-4 sm:h-[300px] sm:px-6 md:h-[400px] lg:h-[500px]'>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Content */}
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12'>
        <div className='prose prose-invert prose-sm sm:prose-base max-w-none'>
          {loading ? (
            <div className='flex items-center justify-center py-8 sm:py-12'>
              <div className='text-[#B5B5B5]'>Loading content...</div>
            </div>
          ) : error ? (
            <div className='mb-4 rounded-lg border border-red-500/30 bg-red-900/20 p-3 text-red-400 sm:mb-6 sm:p-4'>
              <p className='font-medium'>Error loading content:</p>
              <p className='mt-1 text-sm'>{error}</p>
            </div>
          ) : (
            styledContent
          )}
        </div>

        {/* Tags */}
        <div className='mt-8 border-t border-[#2B2B2B] pt-6 sm:mt-12 sm:pt-8'>
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
        <div className='mt-8 rounded-lg border border-[#2B2B2B] bg-[#101010] p-4 sm:mt-12 sm:p-6'>
          <div className='flex flex-col items-start gap-4 sm:flex-row'>
            <Avatar className='h-12 w-12 sm:h-16 sm:w-16'>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className='text-base sm:text-lg'>
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <h3 className='text-base font-semibold text-white sm:text-lg'>
                {post.author.name}
              </h3>
              <p className='mt-1 text-sm text-[#B5B5B5]'>{post.author.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className='py-8 sm:py-12 lg:py-16'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6'>
          <h2 className='mb-6 text-xl font-bold text-white sm:mb-8 sm:text-2xl'>
            Related Articles
          </h2>
          <div className='grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
            {relatedPosts.length > 0 ? (
              relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))
            ) : (
              <div className='col-span-full text-center text-[#B5B5B5]'>
                <BookOpen className='mx-auto mb-4 h-8 w-8 sm:h-12 sm:w-12' />
                <p className='text-sm sm:text-base'>No related posts found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;
