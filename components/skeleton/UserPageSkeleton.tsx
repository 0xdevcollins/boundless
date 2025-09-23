import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const UserPageSkeleton = () => {
  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-7xl p-4 sm:p-6 lg:p-8'>
        {/* Header Section Skeleton */}
        <div className='mb-8'>
          <Skeleton className='h-8 w-64 sm:h-10 sm:w-80' />
        </div>

        <div className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-4 sm:p-6'
            >
              <Skeleton className='mb-2 h-4 w-24' />
              <Skeleton className='mb-3 h-8 w-16' />
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
          ))}
        </div>

        <div className='mb-8'>
          <RecentProjectsSkeleton />
        </div>

        <div className='flex w-full flex-col gap-6 rounded-[12px] bg-[#1C1C1C] p-4 sm:gap-8 sm:p-6'>
          <CampaignTableSkeleton />
        </div>
      </div>
    </div>
  );
};

export const RecentProjectsSkeleton = () => {
  return (
    <>
      <motion.div
        className='flex flex-col items-start justify-between gap-3 sm:gap-4 xl:flex-row xl:items-center xl:gap-0'
        variants={fadeInUp}
      >
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <Skeleton className='h-6 w-32 sm:h-7 sm:w-40' />
          <Skeleton className='h-8 w-20' />
        </div>
        <div className='flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 xl:w-auto'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-24' />
        </div>
      </motion.div>

      <motion.div
        className='grid grid-cols-1 gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'
        variants={staggerContainer}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            className='rounded-[12px] border border-[#484848] bg-[#2B2B2B] p-4'
            variants={fadeInUp}
            custom={index}
          >
            <div className='mb-3 flex items-start gap-3'>
              <Skeleton className='h-16 w-16 flex-shrink-0 rounded-lg' />
              <div className='min-w-0 flex-1'>
                <Skeleton className='mb-2 h-5 w-3/4' />
                <Skeleton className='mb-1 h-4 w-full' />
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

export const CampaignTableSkeleton = () => {
  return (
    <>
      <div className='flex flex-col items-start justify-between gap-3 sm:gap-4 xl:flex-row xl:items-center xl:gap-0'>
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <Skeleton className='h-6 w-32 sm:h-7 sm:w-40' />
        </div>
        <div className='flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 xl:w-auto'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-24' />
        </div>
      </div>

      <div className='hidden gap-6 border-b border-[#2B2B2B] px-4 py-3 text-sm font-medium text-[#B5B5B5] xl:flex'>
        <div className='w-[200px] flex-shrink-0'>
          <Skeleton className='h-4 w-24' />
        </div>
        <div className='w-[164px] flex-shrink-0'>
          <Skeleton className='h-4 w-16' />
        </div>
        <div className='w-[160px] flex-shrink-0'>
          <Skeleton className='h-4 w-28' />
        </div>
        <div className='w-[100px] flex-shrink-0'>
          <Skeleton className='h-4 w-20' />
        </div>
        <div className='w-[73px] flex-shrink-0'>
          <Skeleton className='h-4 w-18' />
        </div>
        <div className='w-[75px] flex-shrink-0'>
          <Skeleton className='h-4 w-12' />
        </div>
        <div className='ml-auto w-[64px] flex-shrink-0 text-right'>
          <Skeleton className='ml-auto h-4 w-16' />
        </div>
      </div>

      <div className='space-y-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='hidden items-center gap-6 rounded-[12px] border border-[#2B2B2B] bg-[#2B2B2B] p-3 xl:flex'
          >
            <div className='flex w-[200px] flex-shrink-0 items-center gap-3'>
              <Skeleton className='h-11 w-11 rounded-[4px]' />
              <div className='min-w-0 flex-1'>
                <Skeleton className='mb-1 h-4 w-24' />
                <Skeleton className='h-3 w-16' />
              </div>
            </div>

            <div className='flex w-[164px] flex-shrink-0 items-center gap-3'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <Skeleton className='h-4 w-20' />
            </div>

            <div className='w-[160px] flex-shrink-0 space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-2 w-full rounded-full' />
            </div>

            <div className='w-[100px] flex-shrink-0'>
              <Skeleton className='h-4 w-16' />
            </div>

            <div className='w-[73px] flex-shrink-0'>
              <Skeleton className='h-4 w-8' />
            </div>

            <div className='w-[75px] flex-shrink-0'>
              <Skeleton className='h-6 w-16 rounded-none' />
            </div>

            <div className='ml-auto flex w-[64px] flex-shrink-0 justify-end'>
              <Skeleton className='h-8 w-8 rounded' />
            </div>
          </div>
        ))}

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`mobile-${index}`}
            className='rounded-[12px] border border-[#2B2B2B] bg-[#2B2B2B] p-3 sm:p-4 xl:hidden'
          >
            <div className='mb-3 flex items-start justify-between'>
              <div className='flex min-w-0 flex-1 items-center gap-2 sm:gap-3'>
                <Skeleton className='h-10 w-10 rounded-[4px] sm:h-12 sm:w-12' />
                <div className='min-w-0 flex-1'>
                  <Skeleton className='mb-1 h-4 w-24' />
                  <Skeleton className='h-3 w-16' />
                </div>
              </div>
              <div className='flex items-center gap-1 sm:gap-2'>
                <Skeleton className='h-6 w-16 rounded-none' />
                <Skeleton className='h-7 w-7 rounded sm:h-8 sm:w-8' />
              </div>
            </div>

            <div className='space-y-2 sm:space-y-3'>
              <div className='flex items-center gap-2 sm:gap-3'>
                <Skeleton className='h-7 w-7 rounded-full sm:h-8 sm:w-8' />
                <Skeleton className='h-4 w-20' />
              </div>

              <div className='space-y-1.5 sm:space-y-2'>
                <Skeleton className='h-4 w-28' />
                <Skeleton className='h-1.5 w-full rounded-full sm:h-2' />
              </div>

              <div className='flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
