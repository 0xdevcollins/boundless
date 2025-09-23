'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthModeNav } from '@/components/auth/AuthModeNav';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';
  const [currentMode, setCurrentMode] = useState<'signin' | 'signup'>(
    mode as 'signin' | 'signup'
  );

  const handleModeChange = (newMode: 'signin' | 'signup') => {
    setCurrentMode(newMode);
  };

  return (
    <div className='relative z-10 flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-sm'>
          <AuthModeNav
            currentMode={currentMode}
            onModeChange={handleModeChange}
          />

          <div className='mt-8'></div>
        </div>
      </div>
    </div>
  );
}
