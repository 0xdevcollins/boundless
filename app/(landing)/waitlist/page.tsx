import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import BeamBackground from '@/components/landing-page/BeamBackground';
import Image from 'next/image';

export const metadata: Metadata = generatePageMetadata('waitlist');

export default function WaitlistPage() {
  return (
    <div className=''>
      <Image
        src='/waitlist-bg.svg'
        alt='waitlist-bg'
        fill
        className='bg-acscent absolute top-0 left-0 mx-auto h-screen w-screen max-w-[1440px] px-5 py-5 md:px-[50px] lg:px-[100px]'
      />
      <BeamBackground />

      <WaitlistForm />
    </div>
  );
}
