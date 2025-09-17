import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const ProjectsPageSkeleton = () => {
  return (
    <div className='min-h-screen'>
      <div className='p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'>
        <ProjectsSkeleton />
      </div>
    </div>
  );
};

export const ProjectsSkeleton = () => {
  return (
    <>
      <motion.div
        className='flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 sm:gap-4 xl:gap-0'
        variants={fadeInUp}
      >
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <Skeleton className='h-6 w-32 sm:h-7 sm:w-40' />
        </div>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full xl:w-auto'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-24' />
        </div>
      </motion.div>

      <motion.div
        className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
        variants={staggerContainer}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            className='bg-[#2B2B2B] p-4 rounded-[12px] border border-[#484848]'
            variants={fadeInUp}
            custom={index}
          >
            <div className='flex items-start gap-3 mb-3'>
              <Skeleton className='w-16 h-16 rounded-lg flex-shrink-0' />
              <div className='flex-1 min-w-0'>
                <Skeleton className='h-5 w-3/4 mb-2' />
                <Skeleton className='h-4 w-full mb-1' />
                <Skeleton className='h-4 w-2/3' />
              </div>
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-1/2' />
              <div className='flex gap-2'>
                <Skeleton className='h-6 w-16 rounded-full' />
                <Skeleton className='h-6 w-20 rounded-full' />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};
