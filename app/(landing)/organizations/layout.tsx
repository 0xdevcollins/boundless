'use client';

import type React from 'react';

import OrganizationHeader from '@/components/organization/OrganizationHeader';
import OrganizationSidebar from '@/components/organization/OrganizationSidebar';
import { usePathname } from 'next/navigation';

export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showSidebar =
    pathname.includes('/new') ||
    (pathname.split('/').length > 4 && pathname !== '/dashboard/organizations');

  return (
    <div className='min-h-screen bg-black text-white'>
      <OrganizationHeader />
      {showSidebar ? (
        <div className='flex border-t border-t-zinc-800'>
          <OrganizationSidebar />
          <main className='flex-1'>{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
