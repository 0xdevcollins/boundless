import Link from 'next/link';
import React from 'react';

const BlogSection = () => {
  return (
    <div className='w-full h-full md:py-16 py-5 px-6 md:px-12 lg:px-[100px] relative'>
      <div className='flex justify-between items-end'>
        <div></div>
        <div className='flex justify-end items-end'>
          <Link href='/blog'>Read More Articles</Link>
        </div>
      </div>
      <h2 className='text-white text-[48px] leading-[140%] tracking-[0.48px] text-center'>
        Blog
      </h2>
    </div>
  );
};

export default BlogSection;
