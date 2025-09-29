import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useCallback } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { refreshUserData } from '@/lib/api/auth';

// Enhanced auth hook that works with Zustand store
export function useAuth(requireAuth = true) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Get Zustand store state
  const {
    user,
    isAuthenticated,
    isLoading: storeLoading,
    error,
    refreshUser,
    clearAuth,
    syncWithSession,
  } = useAuthStore();

  // Sync with NextAuth session when available
  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      // Convert NextAuth session user to SessionUser format
      const sessionUser = {
        ...session.user,
        name:
          session.user.firstName && session.user.lastName
            ? `${session.user.firstName} ${session.user.lastName}`
            : session.user.firstName || session.user.lastName || undefined, // Convert null to undefined
        image: session.user.image || undefined, // Convert null to undefined
        username: session.user.username || undefined, // Convert null to undefined
      };

      // Only sync if we don't already have user data in Zustand store
      if (!user || !isAuthenticated) {
        syncWithSession(sessionUser).catch(() => {
          // Silently handle sync failure
        });
      }
    }
  }, [session?.user, status, syncWithSession, user, isAuthenticated]);

  // Memoize auth data to prevent unnecessary re-renders
  const shouldUseStore = useMemo(
    () => isAuthenticated || user,
    [isAuthenticated, user]
  );

  const authData = useMemo(() => {
    return shouldUseStore
      ? {
          user,
          isAuthenticated,
          isLoading: storeLoading,
          error,
          refreshUser,
          clearAuth,
        }
      : {
          user: session?.user,
          isAuthenticated: status === 'authenticated',
          isLoading: status === 'loading',
          error: null,
          refreshUser: () => refreshUserData(),
          clearAuth: () => clearAuth(),
        };
  }, [
    shouldUseStore,
    user,
    isAuthenticated,
    storeLoading,
    error,
    refreshUser,
    clearAuth,
    session?.user,
    status,
  ]);

  useEffect(() => {
    if (requireAuth && !authData.isAuthenticated && !authData.isLoading) {
      router.push('/auth/signin');
    }
  }, [requireAuth, authData.isAuthenticated, authData.isLoading, router]);

  // Auto-refresh user data on mount if authenticated
  useEffect(() => {
    if (shouldUseStore && isAuthenticated && !user) {
      refreshUser().catch(() => {});
    }
  }, [shouldUseStore, isAuthenticated, user, refreshUser]);

  return authData;
}

export function useRequireAuth() {
  return useAuth(true);
}

export function useOptionalAuth() {
  return useAuth(false);
}

// New hook for Zustand-only auth (when not using NextAuth)
export function useZustandAuth(requireAuth = true) {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    refreshUser,
    clearAuth,
    login,
    logout,
  } = useAuthStore();

  useEffect(() => {
    if (requireAuth && !isAuthenticated && !isLoading) {
      router.push('/auth/signin');
    }
  }, [requireAuth, isAuthenticated, isLoading, router]);

  // Auto-refresh user data on mount if authenticated
  useEffect(() => {
    if (isAuthenticated && !user) {
      refreshUser().catch(() => {});
    }
  }, [isAuthenticated, user, refreshUser]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshUser,
    clearAuth,
  };
}

// Hook for checking auth status without redirecting
export function useAuthStatus() {
  const { data: session, status } = useSession();
  const { isAuthenticated, isLoading, user, syncWithSession } = useAuthStore();

  // Sync NextAuth session with Zustand store if needed
  useEffect(() => {
    if (
      session?.user &&
      status === 'authenticated' &&
      (!user || !isAuthenticated)
    ) {
      const sessionUser = {
        ...session.user,
        name:
          session.user.firstName && session.user.lastName
            ? `${session.user.firstName} ${session.user.lastName}`
            : session.user.firstName || session.user.lastName || undefined,
        image: session.user.image || undefined,
        username: session.user.username || undefined, // Convert null to undefined
      };
      syncWithSession(sessionUser).catch(() => {
        // Silently handle sync failure
      });
    }
  }, [session?.user, status, user, isAuthenticated, syncWithSession]);

  // Return Zustand store state (which should be synced with NextAuth)
  return {
    isAuthenticated,
    isLoading: isLoading || status === 'loading',
    user,
  };
}

// Hook for auth actions
export function useAuthActions() {
  const { login, logout, refreshUser, clearAuth, setError } = useAuthStore();

  const unifiedLogout = useCallback(async () => {
    try {
      // Clear Zustand store
      await logout();
      // Clear NextAuth session
      await signOut({ redirect: false });
    } catch {
      // Force clear local state even if API calls fail
      clearAuth();
    }
  }, [logout, clearAuth]);

  return {
    login,
    logout: unifiedLogout,
    refreshUser,
    clearAuth,
    setError,
  };
}

// Hook for handling 401 errors
export function useAuthErrorHandler() {
  const { clearAuth } = useAuthStore();
  const router = useRouter();

  const handleAuthError = (error: { status?: number; code?: string }) => {
    if (error?.status === 401 || error?.code === 'UNAUTHORIZED') {
      clearAuth();
      router.push('/auth/signin');
      return true; // Error was handled
    }
    return false; // Error was not handled
  };

  return { handleAuthError };
}
