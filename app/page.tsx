'use client';
import { BoundlessButton } from '@/components/buttons';
import { AuthNav } from '@/components/auth/AuthNav';
import { motion } from 'framer-motion';
import {
  staggerContainer,
  slideInFromLeft,
  slideInFromRight,
} from '@/lib/motion';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';

export default function Home() {
  return (
    <PageTransition>
      <motion.div
        className='font-sans grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'
        initial='hidden'
        animate='visible'
        variants={staggerContainer}
      >
        <motion.header
          className='w-full max-w-6xl flex justify-between items-center'
          variants={slideInFromLeft}
        >
          <h1 className='text-2xl font-bold text-white'>Boundless Project</h1>
          <AuthNav />
        </motion.header>
        <motion.main
          className='w-full max-w-6xl flex flex-col items-center justify-center'
          variants={slideInFromRight}
        >
          <Link href='/user'>
            <BoundlessButton>Go to Dashboard</BoundlessButton>
          </Link>
        </motion.main>
      </motion.div>
    </PageTransition>
  );
}
