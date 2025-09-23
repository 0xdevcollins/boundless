'use client';
import LoadingSpinner from './LoadingSpinner';

const LoadingSpinnerDemo = () => {
  return (
    <div className='space-y-8 p-8'>
      <h2 className='mb-6 text-2xl font-bold text-white'>
        LoadingSpinner Variants
      </h2>

      {/* Spinner Variants */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-white'>Spinner Variants</h3>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='md' color='default' />
            <span className='text-sm text-white/60'>Default</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='md' color='primary' />
            <span className='text-sm text-white/60'>Primary</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='md' color='white' />
            <span className='text-sm text-white/60'>White</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='md' color='muted' />
            <span className='text-sm text-white/60'>Muted</span>
          </div>
        </div>
      </div>

      {/* Size Variants */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-white'>Size Variants</h3>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-5'>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='xs' color='primary' />
            <span className='text-sm text-white/60'>XS</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='sm' color='primary' />
            <span className='text-sm text-white/60'>SM</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='md' color='primary' />
            <span className='text-sm text-white/60'>MD</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='lg' color='primary' />
            <span className='text-sm text-white/60'>LG</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='xl' color='primary' />
            <span className='text-sm text-white/60'>XL</span>
          </div>
        </div>
      </div>

      {/* Speed Variants */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-white'>Speed Variants</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner
              variant='spinner'
              size='md'
              color='primary'
              speed='slow'
            />
            <span className='text-sm text-white/60'>Slow</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner
              variant='spinner'
              size='md'
              color='primary'
              speed='normal'
            />
            <span className='text-sm text-white/60'>Normal</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner
              variant='spinner'
              size='md'
              color='primary'
              speed='fast'
            />
            <span className='text-sm text-white/60'>Fast</span>
          </div>
        </div>
      </div>

      {/* Animation Variants */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-white'>Animation Variants</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='spinner' size='md' color='primary' />
            <span className='text-sm text-white/60'>Spinner</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='dots' size='md' color='primary' />
            <span className='text-sm text-white/60'>Dots</span>
          </div>
          <div className='flex flex-col items-center space-y-2 rounded-lg bg-[#1C1C1C] p-4'>
            <LoadingSpinner variant='pulse' size='md' color='primary' />
            <span className='text-sm text-white/60'>Pulse</span>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-white'>Usage Examples</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='rounded-lg bg-[#1C1C1C] p-4'>
            <h4 className='mb-3 text-sm font-medium text-white'>
              Button Loading State
            </h4>
            <div className='flex items-center space-x-2'>
              <LoadingSpinner variant='spinner' size='sm' color='white' />
              <span className='text-sm text-white/60'>Loading...</span>
            </div>
          </div>
          <div className='rounded-lg bg-[#1C1C1C] p-4'>
            <h4 className='mb-3 text-sm font-medium text-white'>
              Page Loading
            </h4>
            <div className='flex items-center justify-center py-8'>
              <LoadingSpinner variant='dots' size='lg' color='primary' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinnerDemo;
