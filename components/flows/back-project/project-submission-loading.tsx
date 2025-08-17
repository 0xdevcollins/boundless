export function ProjectSubmissionLoading() {
  return (
    <div className='flex flex-col items-center justify-center p-8 space-y-6'>
      <div className='relative'>
        {/* Outer spinning ring */}
        <div className='w-16 h-16 border-4 border-white/20 rounded-full'></div>
        {/* Inner spinning arc */}
        <div className='absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-white rounded-full animate-spin'></div>
      </div>
      <p className='text-white text-lg font-medium'>
        Processing your contribution...
      </p>
    </div>
  );
}
