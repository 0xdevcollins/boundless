import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login, getMe as getMeBase } from '@/lib/api/auth';
import Google from 'next-auth/providers/google';
import { User } from '@/lib/api/types';

function safeRole(val: unknown): 'USER' | 'ADMIN' {
  return val === 'ADMIN' ? 'ADMIN' : 'USER';
}

function getId(val1: unknown, val2: unknown): string {
  if (typeof val1 === 'string') return val1;
  if (typeof val2 === 'string') return val2;
  return 'unknown';
}

function extractUserInfo(user: User) {
  let role: 'USER' | 'ADMIN' = 'USER';
  if (
    Array.isArray(user.roles) &&
    user.roles.length > 0 &&
    typeof user.roles[0] === 'string'
  ) {
    role = safeRole(user.roles[0]);
  } else if (typeof user.role === 'string') {
    role = safeRole(user.role);
  }

  let name = null;
  let image = null;

  if (user.profile && typeof user.profile === 'object') {
    if (
      'firstName' in user.profile &&
      typeof user.profile.firstName === 'string'
    ) {
      name = user.profile.firstName;
    }
    if ('avatar' in user.profile && typeof user.profile.avatar === 'string') {
      image = user.profile.avatar;
    }
  }

  if (!name && typeof user.name === 'string') name = user.name;
  if (!image && typeof user.image === 'string') image = user.image;

  return {
    id: getId(user._id, user.id),
    email: typeof user.email === 'string' ? user.email : '',
    name: typeof name === 'string' ? name : null,
    image: typeof image === 'string' ? image : null,
    role,
  };
}

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      image: string | null;
      role: 'USER' | 'ADMIN';
      accessToken?: string;
      refreshToken?: string;
    };
  }
}

const getMe = (token?: string) => getMeBase(token);

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
      authorize: async (credentials: any) => {
        if (
          typeof credentials?.accessToken === 'string' &&
          !credentials?.email &&
          !credentials?.password
        ) {
          try {
            const user = await getMe(credentials.accessToken);
            if (user) {
              const userInfo = extractUserInfo(user);
              return {
                ...userInfo,
                accessToken: credentials.accessToken,
                refreshToken: undefined,
              };
            }
          } catch {
            return null;
          }
          return null;
        }

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const email =
            typeof credentials.email === 'string' ? credentials.email : '';
          const password =
            typeof credentials.password === 'string'
              ? credentials.password
              : '';

          console.log('Attempting login with:', { email, password: '***' });

          const response = await login({ email, password });

          console.log('Login response:', {
            success: !!response,
            hasAccessToken: !!response?.accessToken,
            hasRefreshToken: !!response?.refreshToken,
          });

          if (response && response.accessToken) {
            const user = await getMe(response.accessToken);
            if (user) {
              if (user.isVerified === false) {
                throw new Error('UNVERIFIED_EMAIL');
              }

              const userInfo = extractUserInfo(user);
              console.log('User info extracted:', userInfo);

              return {
                ...userInfo,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
              };
            }
          }
          console.log('Login failed: No valid response or user data');
          return null;
        } catch (err) {
          console.error('Login error in NextAuth:', err);
          if (err instanceof Error && err.message === 'UNVERIFIED_EMAIL') {
            throw err;
          }
          // Return null for any other error to indicate login failure
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const u = user as { accessToken?: string; refreshToken?: string };
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken as string | undefined;
      session.user.refreshToken = token.refreshToken as string | undefined;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
