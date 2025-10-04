import { Skeleton } from '@/components/ui/skeleton';

export default function MeLoading() {
  return (
    <section className='min-h-screen'>
      <article className='flex w-[500px] flex-col gap-11 text-white'>
        {/* Profile Header Skeleton */}
        <main className='flex flex-col gap-6'>
          <header className='flex items-end gap-4'>
            <Skeleton className='aspect-square size-[150px] rounded-full' />
            <div className='flex flex-col gap-3 py-3'>
              <Skeleton className='h-8 w-48' />
              <Skeleton className='h-4 w-32' />
            </div>
          </header>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />

          {/* Social Links Skeleton */}
          <div className='flex items-center space-x-4'>
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className='h-6 w-6 rounded' />
            ))}
          </div>

          {/* Buttons Skeleton */}
          <div className='flex gap-4'>
            <Skeleton className='h-10 w-24' />
            <Skeleton className='h-10 w-20' />
          </div>
        </main>

        {/* Stats Skeleton */}
        <div className='flex items-center gap-8'>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className='flex items-center gap-1'>
              <Skeleton className='h-4 w-8' />
              <Skeleton className='h-3 w-16' />
            </div>
          ))}
        </div>

        {/* Organizations Skeleton */}
        <main className='flex flex-col gap-3'>
          <Skeleton className='h-4 w-32' />
          <div className='flex flex-col gap-3'>
            {[1, 2].map(i => (
              <div key={i} className='flex items-center gap-3 px-3'>
                <Skeleton className='size-[46px] rounded-full' />
                <Skeleton className='h-4 w-32' />
              </div>
            ))}
          </div>
        </main>
      </article>
    </section>
  );
}
