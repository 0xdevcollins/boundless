import { Skeleton } from '@/components/ui/skeleton';

export function ProjectLoading() {
  return (
    <div className='min-h-screen bg-[#030303]'>
      <div className='mx-auto max-w-[1400px] px-6 py-8'>
        <div className='grid grid-cols-[400px_1fr] gap-12'>
          {/* Left Column - Project Sidebar Skeleton */}
          <div className='w-full space-y-6'>
            {/* Project Header Skeleton */}
            <div className='flex gap-5 space-y-4'>
              <Skeleton className='h-24 w-24 rounded-lg' />
              <div className='flex-1 space-y-3'>
                <Skeleton className='h-8 w-3/4' />
                <div className='flex gap-2'>
                  <Skeleton className='h-6 w-20' />
                  <Skeleton className='h-6 w-24' />
                </div>
                <Skeleton className='h-4 w-32' />
              </div>
            </div>

            {/* Description Skeleton */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
              <Skeleton className='h-4 w-4/6' />
            </div>

            {/* Voting Progress Skeleton */}
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-20' />
              </div>
              <Skeleton className='h-2 w-full' />
            </div>

            {/* Action Buttons Skeleton */}
            <div className='flex gap-3'>
              <Skeleton className='h-12 flex-1' />
              <Skeleton className='h-12 w-12' />
              <Skeleton className='h-12 w-12' />
            </div>

            {/* Creator Info Skeleton */}
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-3 w-16' />
                </div>
              </div>
            </div>

            {/* Project Links Skeleton */}
            <div className='space-y-4'>
              <Skeleton className='h-4 w-24' />
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-40' />
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-36' />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content Skeleton */}
          <div className='min-h-0 w-full'>
            {/* Tabs Skeleton */}
            <div className='mb-8 flex gap-6 border-b border-gray-800'>
              <Skeleton className='h-12 w-20' />
              <Skeleton className='h-12 w-16' />
              <Skeleton className='h-12 w-24' />
              <Skeleton className='h-12 w-28' />
              <Skeleton className='h-12 w-20' />
            </div>

            {/* Content Skeleton */}
            <div className='space-y-6'>
              <Skeleton className='h-8 w-48' />
              <div className='space-y-4'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/6' />
                <Skeleton className='h-4 w-3/4' />
              </div>
              <Skeleton className='h-6 w-32' />
              <div className='space-y-4'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/6' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
