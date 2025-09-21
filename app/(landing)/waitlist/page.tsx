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
        className='absolute top-0 left-0 bg-acscent h-screen w-screen'
      />
      <BeamBackground />

      <WaitlistForm />
    </div>
  );
}
