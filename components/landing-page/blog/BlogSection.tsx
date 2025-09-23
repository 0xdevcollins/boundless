'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import BlogCard from './BlogCard';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  category: string;
}

const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: 'Why Validation Before Funding Protects Everyone',
    excerpt:
      'Validation ensures that only strong ideas move forward. By allowing the community and admins to review projects before funding, Boundless protects backers from risky proposals and gives creators the chance to refine their concepts. This process builds trust, reduces wasted resources, and creates a safer, more transparent environment where everyone benefits.',
    image: '/blog1.jpg',
    date: '29, Jul, 2025',
    slug: 'why-validation-before-funding-protects-everyone',
    category: 'Blog',
  },
  {
    id: 2,
    title: 'The Future of Decentralized Crowdfunding',
    excerpt:
      'Explore how blockchain technology is revolutionizing the way projects get funded. From smart contracts to community governance, discover the innovations that are making crowdfunding more transparent and efficient than ever before.',
    image: '/blog2.jpg',
    date: '25, Jul, 2025',
    slug: 'future-decentralized-crowdfunding',
    category: 'Web3',
  },
  {
    id: 3,
    title: 'Building Trust in Web3 Communities',
    excerpt:
      'Trust is the foundation of any successful community. Learn about the mechanisms and best practices that help build and maintain trust in decentralized communities, from reputation systems to transparent governance.',
    image: '/blog3.jpg',
    date: '22, Jul, 2025',
    slug: 'building-trust-web3-communities',
    category: 'Community',
  },
  {
    id: 4,
    title: 'Grant Programs That Actually Work',
    excerpt:
      'Not all grant programs are created equal. Discover what makes grant programs successful and how to design them to maximize impact while ensuring fair distribution of resources to deserving projects.',
    image: '/blog4.jpg',
    date: '18, Jul, 2025',
    slug: 'grant-programs-that-actually-work',
    category: 'Grants',
  },
  {
    id: 5,
    title: 'The Psychology of Backing Projects',
    excerpt:
      'Understanding what motivates people to back projects is crucial for creators. Dive into the psychological factors that influence backing decisions and how to create compelling project proposals.',
    image: '/blog5.jpg',
    date: '15, Jul, 2025',
    slug: 'psychology-of-backing-projects',
    category: 'Psychology',
  },
  {
    id: 6,
    title: 'Smart Contracts for Crowdfunding',
    excerpt:
      'Learn how smart contracts are automating and securing crowdfunding processes. From automatic fund distribution to milestone-based releases, explore the technical innovations driving the future of funding.',
    image: '/blog6.jpg',
    date: '12, Jul, 2025',
    slug: 'smart-contracts-crowdfunding',
    category: 'Technology',
  },
];

const BlogSection = () => {
  return (
    <section
      className='relative h-full w-full px-6 py-5 md:px-12 md:py-16 lg:px-[100px]'
      aria-labelledby='blog-heading'
    >
      <header className='mb-16 flex items-end justify-between'>
        <div className='max-w-[628px]'>
          <h3 className='gradient-text text-left text-sm leading-[120%] tracking-[-0.64px] md:leading-[160%] md:font-medium md:tracking-[-0.48px]'>
            From the Blog
          </h3>
          <h2
            id='blog-heading'
            className='mt-3 text-left text-[32px] leading-[140%] tracking-[0.48px] text-white md:text-[48px]'
          >
            Ideas that shape the future
          </h2>
          <p className='gradient-text-2 mt-3 max-w-[550px] text-left text-base leading-[160%] tracking-[-0.48px]'>
            Discover stories, tips, and updates on crowdfunding, grants, and
            Web3. Learn from builders and backers driving real impact.
          </p>
        </div>
        <div className='hidden items-end justify-end md:flex'>
          <Link
            className='flex items-center gap-2 font-medium text-white transition-colors hover:text-gray-300'
            href='/blog'
            aria-label='Read more blog articles'
          >
            <span className='underline'>Read More Articles</span>
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </header>

      <div
        className='grid w-full max-w-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-3'
        role='list'
        aria-label='Blog posts grid'
      >
        {mockBlogs.map(blog => (
          <div key={blog.id} role='listitem'>
            <BlogCard blog={blog} />
          </div>
        ))}
        <div className='flex justify-center text-center sm:hidden'>
          <Link
            className='mt-8 flex items-center justify-center gap-2 text-center font-medium text-white transition-colors hover:text-gray-300'
            href='/blog'
            aria-label='Read more blog articles'
          >
            <span className='underline'>Read More Articles</span>
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
