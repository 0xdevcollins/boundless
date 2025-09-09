'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/waitlist'); // Replace with actual waitlist route
  }, [router]);

  return (
    <div className='bg-background'>
      <h1 className='text-white text-4xl font-bold text-center mt-10'>
        Redirecting to Waitlist...
      </h1>
    </div>
  );
}
