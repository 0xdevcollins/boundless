import NextAuth from 'next-auth';
import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { User as NextAuthUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { login, getMe as getMeBase } from '@/lib/api/auth';
import { extractUserInfo, validateAuthEnv } from '@/lib/auth/utils';
import { AuthLogger } from '@/lib/auth/logger';
import {
  UnverifiedEmailError,
  InvalidCredentialsError,
  TokenValidationError,
} from '@/lib/auth/errors';
import type { ExtendedUser, AuthCredentials } from '@/lib/auth/types';

/**
 * NextAuth configuration for authentication
 * Supports Google OAuth and credentials-based authentication
 */

/**
 * Wrapper for getMe API call with error handling
 */
const getMe = async (token?: string) => {
  try {
    return await getMeBase(token);
  } catch (error) {
    AuthLogger.error('Failed to get user info', error as Error, {
      token: token ? 'present' : 'missing',
    });
    throw new TokenValidationError();
  }
};

/**
 * Validates and sanitizes credentials input
 */
const validateCredentials = (
  credentials:
    | Partial<Record<'email' | 'password' | 'accessToken', unknown>>
    | undefined
): AuthCredentials | null => {
  if (!credentials) return null;

  const { email, password, accessToken } = credentials;

  // Token-based authentication
  if (accessToken && !email && !password) {
    return {
      accessToken: typeof accessToken === 'string' ? accessToken : undefined,
    };
  }

  // Email/password authentication
  if (email && password && !accessToken) {
    return {
      email: typeof email === 'string' ? email : undefined,
      password: typeof password === 'string' ? password : undefined,
    };
  }

  return null;
};

/**
 * Handles token-based authentication
 */
const handleTokenAuth = async (
  accessToken: string
): Promise<ExtendedUser | null> => {
  try {
    AuthLogger.log('Attempting token-based authentication');

    const user = await getMe(accessToken);
    if (!user) {
      AuthLogger.warn('Token authentication failed - no user returned');
      return null;
    }

    const userInfo = extractUserInfo(user);
    AuthLogger.log('Token authentication successful', { userId: userInfo.id });

    return {
      ...userInfo,
      accessToken,
      refreshToken: undefined,
    };
  } catch (error) {
    AuthLogger.error('Token authentication failed', error as Error);
    return null;
  }
};

/**
 * Handles email/password authentication
 */
const handleCredentialsAuth = async (
  email: string,
  password: string
): Promise<ExtendedUser | null> => {
  try {
    AuthLogger.log('Attempting credentials authentication', { email });

    const response = await login({ email, password });
    if (!response?.accessToken) {
      AuthLogger.warn('Credentials authentication failed - no access token');
      throw new InvalidCredentialsError();
    }

    const user = await getMe(response.accessToken);
    if (!user) {
      AuthLogger.warn('Credentials authentication failed - no user returned');
      throw new InvalidCredentialsError();
    }

    if (user.isVerified === false) {
      AuthLogger.warn('User email not verified', { email });
      throw new UnverifiedEmailError();
    }

    const userInfo = extractUserInfo(user);
    AuthLogger.log('Credentials authentication successful', {
      userId: userInfo.id,
    });

    return {
      ...userInfo,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
  } catch (error) {
    if (error instanceof UnverifiedEmailError) {
      throw error;
    }
    AuthLogger.error('Credentials authentication failed', error as Error, {
      email,
    });
    throw new InvalidCredentialsError();
  }
};

// Validate environment variables on startup
try {
  validateAuthEnv();
} catch (error) {
  AuthLogger.error('Environment validation failed', error as Error);
  throw error;
}

export const authConfig = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        accessToken: { label: 'Access Token', type: 'text' },
      },
      authorize: async (
        credentials:
          | Partial<Record<'email' | 'password' | 'accessToken', unknown>>
          | undefined
      ) => {
        try {
          const validatedCredentials = validateCredentials(credentials);
          if (!validatedCredentials) {
            AuthLogger.warn('Invalid credentials provided');
            return null;
          }

          const { email, password, accessToken } = validatedCredentials;

          // Handle token-based authentication
          if (accessToken) {
            return await handleTokenAuth(accessToken);
          }

          // Handle email/password authentication
          if (email && password) {
            return await handleCredentialsAuth(email, password);
          }

          return null;
        } catch (error) {
          AuthLogger.error('Authorization failed', error as Error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    /**
     * Authorization callback - determines if user is authenticated
     */
    authorized: async ({ auth }: { auth: Session | null }) => {
      const isAuthenticated = !!auth;
      AuthLogger.log('Authorization check', { isAuthenticated });
      return isAuthenticated;
    },

    /**
     * JWT callback - handles token creation and updates
     */
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser | null }) {
      if (user) {
        const extendedUser = user as ExtendedUser;
        AuthLogger.log('JWT token created/updated', {
          userId: extendedUser.id,
        });

        // Store all user data in the token
        token.accessToken = extendedUser.accessToken;
        token.refreshToken = extendedUser.refreshToken;
        token.id = extendedUser.id;
        token.email = extendedUser.email;
        token.firstName = extendedUser.firstName;
        token.lastName = extendedUser.lastName;
        token.image = extendedUser.image;
        token.role = extendedUser.role;
        token.username = extendedUser.username;
        token.profile = extendedUser.profile;
      }

      // Check if access token is expired and try to refresh
      if (token.accessToken && typeof token.accessToken === 'string') {
        try {
          const base64Url = token.accessToken.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join('')
          );
          const payload = JSON.parse(jsonPayload);
          const currentTime = Math.floor(Date.now() / 1000);

          // If token is expired and we have a refresh token, try to refresh
          if (payload.exp < currentTime && token.refreshToken) {
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ refreshToken: token.refreshToken }),
                }
              );

              if (response.ok) {
                const data = await response.json();
                token.accessToken = data.data.accessToken;
                token.refreshToken = data.data.refreshToken;
                AuthLogger.log('Token refreshed successfully');
              } else {
                // Refresh failed, clear tokens
                token.accessToken = null;
                token.refreshToken = null;
                AuthLogger.warn('Token refresh failed');
              }
            } catch (error) {
              // Refresh failed, clear tokens
              token.accessToken = null;
              token.refreshToken = null;
              AuthLogger.error('Token refresh error', error as Error);
            }
          }
        } catch (error) {
          // Token parsing failed, clear tokens
          token.accessToken = null;
          token.refreshToken = null;
          AuthLogger.error('Token parsing error', error as Error);
        }
      }

      return token;
    },

    /**
     * Session callback - populates session with user data
     */
    async session({ session, token }: { session: Session; token: JWT }) {
      const extendedToken = token as JWT & {
        accessToken?: string;
        refreshToken?: string;
        id?: string;
        email?: string;
        firstName?: string | null;
        lastName?: string | null;
        image?: string | null;
        role?: 'USER' | 'ADMIN';
        username?: string | null;
        profile?: {
          firstName: string | null;
          lastName: string | null;
          avatar: string | null;
          username: string | null;
        };
      };

      // If no valid tokens, return empty session
      if (!extendedToken.accessToken) {
        return session;
      }

      // Populate session with extended user data
      session.user = {
        ...session.user,
        id: extendedToken.id || session.user.id,
        email: extendedToken.email || session.user.email,
        firstName: extendedToken.firstName || null,
        lastName: extendedToken.lastName || null,
        image: extendedToken.image || session.user.image,
        role: extendedToken.role || 'USER',
        username: extendedToken.username || null,
        profile: extendedToken.profile || {
          firstName: extendedToken.firstName || null,
          lastName: extendedToken.lastName || null,
          avatar: extendedToken.image || null,
          username: extendedToken.username || null,
        },
        accessToken: extendedToken.accessToken,
        refreshToken: extendedToken.refreshToken,
      };

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// NextAuth module declarations
declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
      image: string | null;
      role: 'USER' | 'ADMIN';
      username: string | null;
      profile: {
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        username: string | null;
      };
      accessToken?: string;
      refreshToken?: string;
    };
  }
}
