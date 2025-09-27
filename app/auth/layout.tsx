import AnimatedAuthLayout from '@/components/auth/AnimatedAuthLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Boundless',
  description: 'Sign in or create an account to access Boundless platform',
  robots: 'noindex, nofollow',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayoutWrapper({ children }: AuthLayoutProps) {
  return <AnimatedAuthLayout>{children}</AnimatedAuthLayout>;
}
