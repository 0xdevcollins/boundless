import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  category: string;
};

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Card
      key={blog.id}
      className='w-full max-w-noneflex h-full flex-col gap-0 overflow-hidden rounded-[8px] border-[#1B1B1B] bg-[#101010] p-0 transition-colors duration-300 hover:border-[#2A2A2A]'
    >
    <CardHeader className='relative p-0 !pb-0'>
        
        <div className='h-[214px] w-full'>
          <Image
            src={blog.image}
            alt={blog.title}
            width={397}
            height={214}
            className='h-full w-full object-cover'
          />
        </div>
      </CardHeader>
      
      <CardContent className="py-3 px-3 pb-8 border-b flex-1 border-[#2B2B2B]">

        <div className="flex items-center justify-between leading-[145%] mb-3 text-xs text-[#b5b5b5] sm:text-sm">
          <span className='inline-block rounded-[8px]  bg-[#A7F95014] px-2.5 py-2 text-sm font-medium text-[#A7F950]'>{blog.category}</span>
          <span className='font-normal'>{blog.date}</span>
        </div>
        <h2 className="line-clamp-2 text-[16px] leading-[145%] font-semibold text-white sm:text-base">
          {blog.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-[145%] font-normal tracking-[-0.48px] text-[#B5B5B5] sm:text-base">
          {blog.excerpt}
        </p>
      </CardContent>

      <CardFooter className="pt-6 px-5 pb-5 mt-auto">
        <Link
          href={`/blog/${blog.slug}`}
          className="w-full text-right text-sm font-medium text-[#A7F950]"
        >
          Continue reading →
        </Link>
      </CardFooter>

    </Card>
  );
};

export default BlogCard;
