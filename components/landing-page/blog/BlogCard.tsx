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
      className='rounded-[8px] border-[#1B1B1B] bg-[#101010] w-full max-w-none p-0 overflow-hidden gap-0 hover:border-[#2A2A2A] transition-colors duration-300'
    >
      <CardHeader className='p-0 !pb-0 relative'>
        <CardTitle
          className='absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.48)] backdrop-blur-[12px] text-white leading-[160%] font-medium text-sm z-10'
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
            className='w-full h-full object-cover'
          />
        </div>
      </CardHeader>
      <CardContent className='p-5 pb-2'>
        <h2 className='text-white leading-[145%] font-semibold text-sm sm:text-base line-clamp-2'>
          {blog.title}
        </h2>
        <p className='text-[#D9D9D9] text-sm sm:text-base leading-[160%] tracking-[-0.48px] mt-3 line-clamp-2'>
          {blog.excerpt}
        </p>
      </CardContent>
      <CardFooter className='pb-5 px-5 mt-3'>
        <div className='flex items-center justify-between gap-2 w-full'>
          <div className='flex items-center justify-start gap-1 text-[#b5b5b5] text-xs sm:text-sm'>
            <Clock className='w-3 h-3 sm:w-4 sm:h-4' />
            {blog.date}
          </div>
          <Link
            href={`/blog/${blog.slug}`}
            className='underline text-white text-xs sm:text-sm hover:text-[#D9D9D9] transition-colors duration-200'
          >
            Continue Reading
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
