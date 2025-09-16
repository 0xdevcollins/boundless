'use client';
import GlowBackground from './missionbgassets/glow';
import BackgroundOval from './missionbgassets/Backgroundline1';
import BackgroundOval2 from './missionbgassets/Backgroundline2';
import BackgroundOval3 from './missionbgassets/Backgroundline3';

export default function AboutUsMission() {
  return (
    <div className='relative flex justify-center items-center min-h-[60vh] bg-black overflow-hidden w-full h-full   mx-auto border border-white/48 rounded-[20px]'>
      <GlowBackground />
      <BackgroundOval className='absolute top-[34%] sm:top-[30%] md:top-[30%] left-0 w-full h-auto overflow-hidden' />
      <BackgroundOval2 className='absolute top-[35%] sm:top-[25%] md:top-[45%] lg:top-[45%] right-0 left-1/2 w-[100%] overflow-hidden' />
      <BackgroundOval3 className='absolute top-[50%] sm:top-[25%] md:top-[45%] left-1/2 right-0 w-[100%] overflow-hidden' />
    </div>
  );
}
