import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  onCardClick?: (slug: string) => void;
}

const BlogCard = ({ post, onCardClick }: BlogCardProps) => {
  return (
    <Card
      key={post.id}
      className='flex h-full w-full max-w-none flex-col gap-0 overflow-hidden rounded-[8px] border-[#1B1B1B] bg-[#101010] p-0 transition-colors duration-300 hover:border-[#2A2A2A]'
    >
      <CardHeader className='relative p-0 !pb-0'>
        <div className='h-[141px] w-full'>
          <Image
            src={post.image}
            alt={post.title}
            width={500}
            height={250}
            className='h-full w-full object-cover'
          />
        </div>
      </CardHeader>

      <CardContent className='flex-1 border-b border-[#2B2B2B] px-4 pt-4 pb-5'>
        <div className='mb-4 flex items-center justify-between text-sm leading-[145%] text-[#b5b5b5]'>
          <span className='inline-block rounded-[8px] bg-[#A7F95014] px-3 py-1.5 text-sm font-medium text-[#A7F950]'>
            {post.category}
          </span>
          <span className='font-normal'>{post.date}</span>
        </div>
        <h2 className='line-clamp-2 text-lg leading-[145%] font-semibold text-white'>
          {post.title}
        </h2>
        <p className='mt-4 line-clamp-3 text-base leading-[145%] font-normal tracking-[-0.48px] text-[#B5B5B5]'>
          {post.excerpt}
        </p>
      </CardContent>

      <CardFooter className='mt-auto px-4 pt-5 pb-4'>
        <Link
          href={`/blog/${post.slug}`}
          className='flex w-full items-center justify-end gap-2 text-right text-base font-medium text-[#A7F950]'
          onClick={() => onCardClick?.(post.slug)}
        >
          Continue reading
          <Image
            src='/right.svg'
            alt='right icon'
            width={40}
            height={40}
            className='inline-block w-4 pt-1'
          />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
