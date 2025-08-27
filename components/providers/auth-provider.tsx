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

  // Handle store hydration
  useEffect(() => {
    // Check if already hydrated
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
      return;
    }

    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }, 2000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    if (!isHydrated) return;

    const initializeAuth = async () => {
      try {
        // If we have a token but no user data, try to refresh
        if (accessToken && isAuthenticated) {
          await refreshUser();
        } else if (accessToken) {
          // Try to refresh user data to validate token
          try {
            await refreshUser();
          } catch {
            // If refresh fails, clear auth data
            clearAuth();
          }
        }
      } catch {
        clearAuth();
      }
    };

    initializeAuth();
  }, [isHydrated, accessToken, isAuthenticated, refreshUser, clearAuth]);

  // Show loading state while hydrating
  if (!isHydrated) {
    return <Loading />;
  }

  return <>{children}</>;
}

// Hook to check if auth is hydrated
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

// Component to show loading while auth is initializing
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
