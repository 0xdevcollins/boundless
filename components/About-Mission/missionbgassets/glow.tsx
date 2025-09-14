'use client';

import Image from 'next/image';

export default function GlowBackground() {
  return (
    <>
      <div className='absolute top-0 left-0 w-40 h-36 md:w-120 md:h-140 sm:w-88 sm:h-84'>
        <Image
          src='/Top Glow.svg'
          alt='Top Glow'
          fill
          className='pointer-events-none select-none object-contain'
          priority
        />
      </div>

      <div className='absolute bottom-0 right-0 w-40 h-36 md:w-130 md:h-120 sm:w-58 sm:h-74'>
        <Image
          src='/Bottom Glow.svg'
          alt='Bottom Glow'
          fill
          className='pointer-events-none select-none object-cover'
          priority
        />
      </div>
    </>
  );
}
