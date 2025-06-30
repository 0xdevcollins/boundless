import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login, getMe as getMeBase } from './lib/api/auth';
import Google from 'next-auth/providers/google';
import { authOptions } from '@/lib/auth.config';

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

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
