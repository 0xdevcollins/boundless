'use client';

import { Button } from '@/components/ui/button';

interface AuthModeNavProps {
  currentMode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

export function AuthModeNav({ currentMode, onModeChange }: AuthModeNavProps) {
  return (
    <div className='flex w-full rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur-sm'>
      <Button
        variant={currentMode === 'signin' ? 'default' : 'ghost'}
        onClick={() => onModeChange('signin')}
        className={`flex-1 rounded-md transition-all duration-200 ${
          currentMode === 'signin'
            ? 'bg-white text-black hover:bg-gray-100'
            : 'text-white hover:bg-white/10'
        }`}
      >
        Sign In
      </Button>
      <Button
        variant={currentMode === 'signup' ? 'default' : 'ghost'}
        onClick={() => onModeChange('signup')}
        className={`flex-1 rounded-md transition-all duration-200 ${
          currentMode === 'signup'
            ? 'bg-white text-black hover:bg-gray-100'
            : 'text-white hover:bg-white/10'
        }`}
      >
        Sign Up
      </Button>
    </div>
  );
}
