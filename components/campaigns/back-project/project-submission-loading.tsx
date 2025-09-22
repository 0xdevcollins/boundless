export function ProjectSubmissionLoading() {
  return (
    <div className='flex flex-col items-center justify-center space-y-6 p-8'>
      <div className='relative'>
        {/* Outer spinning ring */}
        <div className='h-16 w-16 rounded-full border-4 border-white/20'></div>
        {/* Inner spinning arc */}
        <div className='absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-white'></div>
      </div>
      <p className='text-lg font-medium text-white'>
        Processing your contribution...
      </p>
    </div>
  );
}
