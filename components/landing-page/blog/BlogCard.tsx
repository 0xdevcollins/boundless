import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
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
      className='rounded-xl p-0 border border-[#1B1B1B] bg-[#101010] overflow-hidden hover:border-[#2A2A2A] transition-colors duration-300 flex flex-col'
    >
      {/* Image Section */}
      <div className='relative h-[200px] w-full'>
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className='object-cover'
        />
      </div>

      {/* Content */}
      <CardContent className='flex flex-col flex-1'>
        <div className='flex items-center justify-between text-xs sm:text-sm mb-3'>
          <span className='px-2 py-0.5 rounded-md bg-[#a7f94d]/10  text-[#a7f94d] font-medium'>
            {blog.category}
          </span>
          <span className='text-[#B5B5B5]'>{blog.date}</span>
        </div>

        <h2 className='text-white font-semibold text-base sm:text-lg leading-snug line-clamp-2 mb-2'>
          {blog.title}
        </h2>
        <p className='text-[#B5B5B5] text-sm sm:text-base leading-[160%] line-clamp-2'>
          {blog.excerpt}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className='px-5 pb-5 border-t border-t-[#1B1B1B] justify-end'>
        <Link
          href={`/blog/${blog.slug}`}
          className='text-[#a7f94d] flex items-center gap-1 text-xs font-medium hover:text-[rgb(133,249,8)] transition-colors duration-200'
        >
          Continue reading <ArrowRight className='w-4 h-4' />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
