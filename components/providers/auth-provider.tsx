'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import Loading from '../loading/Loading';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { isAuthenticated, accessToken, refreshUser, clearAuth } =
    useAuthStore();

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
      return;
    }

    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }, 2000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const initializeAuth = async () => {
      try {
        if (accessToken && isAuthenticated) {
          await refreshUser();
        } else if (accessToken) {
          try {
            await refreshUser();
          } catch {
            clearAuth();
          }
        }
      } catch {
        clearAuth();
      }
    };

    initializeAuth();
  }, [isHydrated, accessToken, isAuthenticated, refreshUser, clearAuth]);

  if (!isHydrated) {
    return <Loading />;
  }

  return <>{children}</>;
}

export function useAuthHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    return unsubscribe;
  }, []);

  return isHydrated;
}

export function AuthLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHydrated = useAuthHydration();
  const { isLoading } = useAuthStore();

  if (!isHydrated || isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
