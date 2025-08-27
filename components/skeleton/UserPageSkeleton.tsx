import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const UserPageSkeleton = () => {
  return (
    <div className='min-h-screen'>
      <div className='p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'>
        {/* Header Section Skeleton */}
        <div className='mb-8'>
          <Skeleton className='h-8 w-64 sm:h-10 sm:w-80' />
        </div>

        {/* Stats Cards Grid Skeleton */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='bg-[#1C1C1C] p-4 sm:p-6 rounded-[12px] border border-[#2B2B2B]'
            >
              <Skeleton className='h-4 w-24 mb-2' />
              <Skeleton className='h-8 w-16 mb-3' />
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Projects Skeleton */}
        <div className='mb-8'>
          <RecentProjectsSkeleton />
        </div>

        {/* Campaign Table Skeleton */}
        <div className='bg-[#1C1C1C] p-4 sm:p-6 rounded-[12px] flex flex-col gap-6 sm:gap-8 w-full'>
          <CampaignTableSkeleton />
        </div>
      </div>
    </div>
  );
};

export const RecentProjectsSkeleton = () => {
  return (
    <>
      {/* Header */}
      <motion.div
        className='flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 sm:gap-4 xl:gap-0'
        variants={fadeInUp}
      >
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <Skeleton className='h-6 w-32 sm:h-7 sm:w-40' />
          <Skeleton className='h-8 w-20' />
        </div>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full xl:w-auto'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-24' />
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
        variants={staggerContainer}
      >
        {Array.from({ length: 3 }).map((_, index) => (
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

export const CampaignTableSkeleton = () => {
  return (
    <>
      {/* Header */}
      <div className='flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 sm:gap-4 xl:gap-0'>
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <Skeleton className='h-6 w-32 sm:h-7 sm:w-40' />
        </div>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full xl:w-auto'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-24' />
        </div>
      </div>

      {/* Table Header */}
      <div className='hidden xl:flex px-4 py-3 text-[#B5B5B5] text-sm font-medium border-b border-[#2B2B2B] gap-6'>
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
        <div className='w-[64px] flex-shrink-0 text-right ml-auto'>
          <Skeleton className='h-4 w-16 ml-auto' />
        </div>
      </div>

      {/* Table Rows */}
      <div className='space-y-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='hidden xl:flex items-center p-3 border border-[#2B2B2B] bg-[#2B2B2B] rounded-[12px] gap-6'
          >
            <div className='flex items-center gap-3 w-[200px] flex-shrink-0'>
              <Skeleton className='w-11 h-11 rounded-[4px]' />
              <div className='min-w-0 flex-1'>
                <Skeleton className='h-4 w-24 mb-1' />
                <Skeleton className='h-3 w-16' />
              </div>
            </div>

            <div className='flex items-center gap-3 w-[164px] flex-shrink-0'>
              <Skeleton className='w-8 h-8 rounded-full' />
              <Skeleton className='h-4 w-20' />
            </div>

            <div className='space-y-2 w-[160px] flex-shrink-0'>
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

            <div className='flex justify-end w-[64px] flex-shrink-0 ml-auto'>
              <Skeleton className='h-8 w-8 rounded' />
            </div>
          </div>
        ))}

        {/* Mobile Rows */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`mobile-${index}`}
            className='xl:hidden p-3 sm:p-4 border border-[#2B2B2B] bg-[#2B2B2B] rounded-[12px]'
          >
            <div className='flex items-start justify-between mb-3'>
              <div className='flex items-center gap-2 sm:gap-3 flex-1 min-w-0'>
                <Skeleton className='w-10 h-10 sm:w-12 sm:h-12 rounded-[4px]' />
                <div className='min-w-0 flex-1'>
                  <Skeleton className='h-4 w-24 mb-1' />
                  <Skeleton className='h-3 w-16' />
                </div>
              </div>
              <div className='flex items-center gap-1 sm:gap-2'>
                <Skeleton className='h-6 w-16 rounded-none' />
                <Skeleton className='h-7 w-7 sm:h-8 sm:w-8 rounded' />
              </div>
            </div>

            <div className='space-y-2 sm:space-y-3'>
              <div className='flex items-center gap-2 sm:gap-3'>
                <Skeleton className='w-7 h-7 sm:w-8 sm:h-8 rounded-full' />
                <Skeleton className='h-4 w-20' />
              </div>

              <div className='space-y-1.5 sm:space-y-2'>
                <Skeleton className='h-4 w-28' />
                <Skeleton className='h-1.5 sm:h-2 w-full rounded-full' />
              </div>

              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-1 sm:gap-4'>
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
