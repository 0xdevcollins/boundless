import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Clock } from 'lucide-react';
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
      className='w-full max-w-none gap-0 overflow-hidden rounded-[8px] border-[#1B1B1B] bg-[#101010] p-0 transition-colors duration-300 hover:border-[#2A2A2A]'
    >
      <CardHeader className='relative p-0 !pb-0'>
        <CardTitle
          className='absolute top-3.5 left-3.5 z-10 rounded-full border border-[rgba(255,255,255,0.48)] px-2.5 py-1 text-sm leading-[160%] font-medium text-white backdrop-blur-[12px]'
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, rgba(3, 3, 3, 0.12) 18.88653337955475deg, rgba(3, 3, 3, 0.12) 73.51145267486572deg, rgba(3, 3, 3, 0.12) 128.6191964149475deg, rgba(16, 16, 16, 0.12) 223.4290623664856deg, rgba(3, 3, 3, 0.12) 317.18567848205566deg)',
          }}
        >
          {blog.category}
        </CardTitle>
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
      <CardContent className='p-5 pb-2'>
        <h2 className='line-clamp-2 text-sm leading-[145%] font-semibold text-white sm:text-base'>
          {blog.title}
        </h2>
        <p className='mt-3 line-clamp-2 text-sm leading-[160%] tracking-[-0.48px] text-[#D9D9D9] sm:text-base'>
          {blog.excerpt}
        </p>
      </CardContent>
      <CardFooter className='mt-3 px-5 pb-5'>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1 text-xs text-[#b5b5b5] sm:text-sm'>
            <Clock className='h-3 w-3 sm:h-4 sm:w-4' />
            {blog.date}
          </div>
          <Link
            href={`/blog/${blog.slug}`}
            className='text-xs text-white underline transition-colors duration-200 hover:text-[#D9D9D9] sm:text-sm'
          >
            Continue Reading
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
