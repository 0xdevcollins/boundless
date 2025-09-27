'use client';
import GlowBackground from './missionbgassets/glow';
import BackgroundOval from './missionbgassets/Backgroundline1';
import BackgroundOval2 from './missionbgassets/Backgroundline2';
import BackgroundOval3 from './missionbgassets/Backgroundline3';

export default function AboutUsMission() {
  return (
    <div className='relative mx-auto flex h-full min-h-[60vh] w-full items-center justify-center overflow-hidden rounded-[20px] border border-white/48 bg-black'>
      <GlowBackground />
      <BackgroundOval className='absolute top-[34%] left-0 h-auto w-full overflow-hidden sm:top-[30%] md:top-[30%]' />
      <BackgroundOval2 className='absolute top-[35%] right-0 left-1/2 w-[100%] overflow-hidden sm:top-[25%] md:top-[45%] lg:top-[45%]' />
      <BackgroundOval3 className='absolute top-[50%] right-0 left-1/2 w-[100%] overflow-hidden sm:top-[25%] md:top-[45%]' />
    </div>
  );
}
