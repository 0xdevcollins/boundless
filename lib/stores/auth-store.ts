import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getMe, logout } from '@/lib/api/auth';
import Cookies from 'js-cookie';

// Simple JWT decode function to extract user ID from token
function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: 'USER' | 'ADMIN';
  isVerified?: boolean;
  profile?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

export interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string | null, refreshToken?: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (accessToken: string, refreshToken?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearAuth: () => void;
  updateUser: (updates: Partial<User>) => void;
  syncWithSession: (sessionUser: any) => Promise<void>;
}

// Safe localStorage access for SSR
const getStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: user => {
        set({ user, isAuthenticated: !!user });
      },

      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });

        // Update cookies only on client side
        if (typeof window !== 'undefined') {
          if (accessToken) {
            Cookies.set('accessToken', accessToken);
          } else {
            Cookies.remove('accessToken');
          }

          if (refreshToken) {
            Cookies.set('refreshToken', refreshToken);
          } else {
            Cookies.remove('refreshToken');
          }
        }
      },

      setLoading: isLoading => {
        set({ isLoading });
      },

      setError: error => {
        set({ error });
      },

      login: async (accessToken, refreshToken) => {
        try {
          set({ isLoading: true, error: null });

          get().setTokens(accessToken, refreshToken);

          const user = await getMe(accessToken);

          const transformedUser: User = {
            id: (user._id || user.id) as string,
            email: user.email as string,
            name: (user.profile?.firstName || user.name) as string | null,
            image: (user.profile?.avatar || user.image) as string | null,
            role: (user.roles?.[0] === 'ADMIN' ? 'ADMIN' : 'USER') as
              | 'USER'
              | 'ADMIN',
            isVerified: user.isVerified as boolean | undefined,
            profile: user.profile as User['profile'],
          };

          set({
            user: transformedUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Login failed';
          set({
            error: errorMessage,
            isLoading: false,
          });
          get().setTokens(null, null);
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });

          const { accessToken } = get();

          // Call logout API if we have a token
          if (accessToken) {
            try {
              await logout(accessToken);
            } catch {
              // Don't throw error for logout API failure
              // Silently handle logout API failures
            }
          }

          // Clear all auth data
          get().clearAuth();
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Logout failed',
            isLoading: false,
          });
          throw error;
        }
      },

      refreshUser: async () => {
        try {
          const { accessToken } = get();

          if (!accessToken) {
            throw new Error('No access token available');
          }

          set({ isLoading: true, error: null });

          const user = await getMe(accessToken);

          const transformedUser: User = {
            id: (user._id || user.id) as string,
            email: user.email as string,
            name: (user.profile?.firstName || user.name) as string | null,
            image: (user.profile?.avatar || user.image) as string | null,
            role: (user.roles?.[0] === 'ADMIN' ? 'ADMIN' : 'USER') as
              | 'USER'
              | 'ADMIN',
            isVerified: user.isVerified as boolean | undefined,
            profile: user.profile as User['profile'],
          };

          set({
            user: transformedUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Failed to refresh user',
            isLoading: false,
          });

          // If refresh fails, clear auth data
          if (error instanceof Error && error.message.includes('401')) {
            get().clearAuth();
          }

          throw error;
        }
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });

        // Clear cookies only on client side
        if (typeof window !== 'undefined') {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
        }
      },

      updateUser: updates => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      syncWithSession: async sessionUser => {
        if (sessionUser && sessionUser.accessToken) {
          try {
            // Use the access token to fetch fresh user data
            const user = await getMe(sessionUser.accessToken);

            const transformedUser: User = {
              id: (user._id || user.id) as string,
              email: user.email as string,
              name: (user.profile?.firstName || user.name) as string | null,
              image: (user.profile?.avatar || user.image) as string | null,
              role: (user.roles?.[0] === 'ADMIN' ? 'ADMIN' : 'USER') as
                | 'USER'
                | 'ADMIN',
              isVerified: user.isVerified as boolean | undefined,
              profile: user.profile as User['profile'],
            };

            set({
              user: transformedUser,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch {
            // Fallback: try to extract user ID from JWT token
            const decodedToken = decodeJWT(sessionUser.accessToken);
            const userId =
              decodedToken?.userId ||
              decodedToken?.user_id ||
              decodedToken?.sub;

            if (sessionUser.email) {
              const fallbackUser: User = {
                id: userId || 'unknown',
                email: sessionUser.email,
                name: sessionUser.name,
                image: sessionUser.image,
                role: 'USER',
              };

              set({
                user: fallbackUser,
                isAuthenticated: true,
                isLoading: false,
              });
            }
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => getStorage()),
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => state => {
        // Rehydrate cookies from localStorage on app start (client side only)
        if (typeof window !== 'undefined' && state?.accessToken) {
          Cookies.set('accessToken', state.accessToken);
        }
        if (typeof window !== 'undefined' && state?.refreshToken) {
          Cookies.set('refreshToken', state.refreshToken);
        }

        // Initialize auth state from cookies if we have tokens but no user
        if (
          typeof window !== 'undefined' &&
          state?.accessToken &&
          !state?.user
        ) {
          // This will trigger a refresh of user data
          setTimeout(() => {
            const store = useAuthStore.getState();
            if (store.accessToken && !store.user) {
              store.refreshUser().catch(() => {
                // Silently handle refresh failure
              });
            }
          }, 100);
        }
      },
    }
  )
);
