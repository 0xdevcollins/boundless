import NextAuth from 'next-auth';
import { authConfig } from '@/auth';

const handler = NextAuth(authConfig);

export const { GET, POST } = handler;
