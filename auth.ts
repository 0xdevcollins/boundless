import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login, getMe as getMeBase } from './lib/api/auth';
import Google from 'next-auth/providers/google';

function safeRole(val: unknown): 'USER' | 'ADMIN' {
  return val === 'ADMIN' ? 'ADMIN' : 'USER';
}

function getId(val1: unknown, val2: unknown): string {
  if (typeof val1 === 'string') return val1;
  if (typeof val2 === 'string') return val2;
  return 'unknown';
}

// Extend NextAuth User type
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        accessToken: { label: 'Access Token', type: 'text' },
      },
      authorize: async (credentials) => {
        // Google login via accessToken
        if (typeof credentials?.accessToken === 'string' && !credentials?.email && !credentials?.password) {
          const user = await getMe(credentials.accessToken);
          if (user) {
            let role: 'USER' | 'ADMIN' = 'USER';
            if (Array.isArray(user.roles) && user.roles.length > 0 && typeof user.roles[0] === 'string') {
              role = safeRole(user.roles[0]);
            } else if (typeof user.role === 'string') {
              role = safeRole(user.role);
            }
            let name = null;
            let image = null;
            if (user.profile && typeof user.profile === 'object') {
              if ('firstName' in user.profile && typeof user.profile.firstName === 'string') {
                name = user.profile.firstName;
              }
              if ('avatar' in user.profile && typeof user.profile.avatar === 'string') {
                image = user.profile.avatar;
              }
            }
            if (!name && typeof user.name === 'string') name = user.name;
            if (!image && typeof user.image === 'string') image = user.image;
            if (typeof name !== 'string') name = null;
            if (typeof image !== 'string') image = null;
            return {
              id: getId(user._id, user.id),
              email: typeof user.email === 'string' ? user.email : '',
              name: typeof name === 'string' ? name : null,
              image: typeof image === 'string' ? image : null,
              role,
              accessToken: credentials.accessToken,
              refreshToken: undefined,
            };
          }
          return null;
        }
        // Email/password login
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const email = typeof credentials.email === 'string' ? credentials.email : '';
          const password = typeof credentials.password === 'string' ? credentials.password : '';
          const tokens = await login({ email, password });
          if (tokens && tokens.accessToken) {
            const user = await getMe(tokens.accessToken);
            if (user) {
              if (user.isVerified === false) {
                throw new Error('UNVERIFIED_EMAIL');
              }
              let role: 'USER' | 'ADMIN' = 'USER';
              if (Array.isArray(user.roles) && user.roles.length > 0 && typeof user.roles[0] === 'string') {
                role = safeRole(user.roles[0]);
              } else if (typeof user.role === 'string') {
                role = safeRole(user.role);
              }
              let name = null;
              let image = null;
              if (user.profile && typeof user.profile === 'object') {
                if ('firstName' in user.profile && typeof user.profile.firstName === 'string') {
                  name = user.profile.firstName;
                }
                if ('avatar' in user.profile && typeof user.profile.avatar === 'string') {
                  image = user.profile.avatar;
                }
              }
              if (!name && typeof user.name === 'string') name = user.name;
              if (!image && typeof user.image === 'string') image = user.image;
              if (typeof name !== 'string') name = null;
              if (typeof image !== 'string') image = null;
              return {
                id: getId(user._id, user.id),
                email: typeof user.email === 'string' ? user.email : '',
                name: typeof name === 'string' ? name : null,
                image: typeof image === 'string' ? image : null,
                role,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
              };
            }
          }
          return null;
        } catch (err) {
          if (err instanceof Error && err.message === 'UNVERIFIED_EMAIL') {
            throw err;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { accessToken?: string; refreshToken?: string };
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string | undefined;
      session.user.refreshToken = token.refreshToken as string | undefined;
      return session;
    },
  },
});
