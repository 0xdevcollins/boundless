import { ReactNode } from 'react';

interface ProfileLayoutProps {
  children: ReactNode;
  params: Promise<{
    username: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <div className='min-h-screen bg-[#0F0F0F]'>{children}</div>;
}
