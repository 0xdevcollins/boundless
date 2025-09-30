import { Skeleton } from '@/components/ui/skeleton';

interface BlogCardSkeletonProps {
  className?: string;
}

const BlogCardSkeleton: React.FC<BlogCardSkeletonProps> = ({
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className='overflow-hidden rounded-lg border border-[#1B1B1B] bg-[#101010] p-0'>
        <Skeleton className='h-[141px] w-full rounded-none' />
        <div className='space-y-4 p-4'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-6 w-20 rounded-full' />
            <Skeleton className='h-4 w-16' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-5 w-full' />
            <Skeleton className='h-5 w-3/4' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>
          <div className='flex items-center justify-end gap-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-4' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
