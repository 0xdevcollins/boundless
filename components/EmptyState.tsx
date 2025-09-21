'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '@/lib/motion';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  type: 'default' | 'comment';
}

const EmptyState = ({
  title,
  description,
  action,
  type = 'default',
}: EmptyStateProps) => {
  return (
    <motion.div
      className='flex h-full flex-col items-center justify-center'
      initial='hidden'
      animate='visible'
      variants={fadeInUp}
    >
      <div className='flex flex-col items-center justify-center gap-6 text-center'>
        {type === 'default' && (
          <motion.div variants={scaleIn}>
            <Image
              src='/empty/default.svg'
              alt='Empty State'
              width={100}
              height={100}
            />
          </motion.div>
        )}
        {type === 'comment' && (
          <motion.div variants={scaleIn}>
            <Image
              src='/empty/comment.svg'
              alt='Empty State'
              width={100}
              height={100}
            />
          </motion.div>
        )}
        <motion.div className='space-y-1' variants={fadeInUp}>
          <h3 className='text-xl leading-[30px] text-white'>{title}</h3>
          <p className='text-sm leading-[145%] text-white/60'>{description}</p>
        </motion.div>
      </div>
      {action && (
        <motion.div className='mt-4' variants={fadeInUp}>
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
