import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import BeamBackground from '@/components/landing-page/BeamBackground';

export const metadata: Metadata = generatePageMetadata('waitlist');

export default function WaitlistPage() {
  return (
    <div className='bg-[url(/waitlist-bg.svg)] bg-cover bg-center'>
      <BeamBackground />
      <WaitlistForm />
    </div>
  );
}
