import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
        name: session.user.name || undefined, // Convert null to undefined
        image: session.user.image || undefined, // Convert null to undefined
      };
      syncWithSession(sessionUser).catch(() => {
        // Silently handle sync failure
      });
    }
  }, [session, status, syncWithSession]);

  // Determine if we should use Zustand store or NextAuth session
  const shouldUseStore = isAuthenticated || user;

  const authData = shouldUseStore
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
  const { isAuthenticated, isLoading, user } = useAuthStore();

  return {
    isAuthenticated,
    isLoading,
    user,
  };
}

// Hook for auth actions
export function useAuthActions() {
  const { login, logout, refreshUser, clearAuth, setError } = useAuthStore();

  return {
    login,
    logout,
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
