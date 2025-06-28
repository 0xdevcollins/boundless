'use client';

import { signIn } from 'next-auth/react';
// import type { ClientSafeProvider } from "next-auth/react";
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';

// interface SignInButtonsProps {
// 	providers: Record<string, ClientSafeProvider>;
// }

export default function SignInButtons() {
  const [loading, setLoading] = useState(false);

  // Placeholder for Google Sign-In logic
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const googleToken = '';
      if (!googleToken) {
        alert('Google Sign-In not implemented.');
        return;
      }
      const res = await fetch('/api/auth/callback/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken }),
      });
      const data = await res.json();
      await signIn('credentials', {
        accessToken: data.accessToken,
        callbackUrl: '/dashboard',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 ">
      <Button
        type="submit"
        onClick={handleGoogleSignIn}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        disabled={loading}
      >
        <Image src='/google.svg' alt="Google logo" width={20} height={20} className="" />
        {loading ? 'Signing in with Google...' : 'Sign in with Google'}
      </Button>
    </div>
  );
}
