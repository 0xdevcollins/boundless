import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import WaitlistForm from '@/components/waitlist/WaitlistForm';

export const metadata: Metadata = generatePageMetadata('waitlist');

export default function WaitlistPage() {
  return <WaitlistForm />;
}
