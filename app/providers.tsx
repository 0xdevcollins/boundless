'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
// import { AuthProvider } from '@/components/providers/auth-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {/* Temporarily disabled AuthProvider to bypass authentication issues */}
      {/* <AuthProvider>{children}</AuthProvider> */}
      {children}
    </SessionProvider>
  );
}
