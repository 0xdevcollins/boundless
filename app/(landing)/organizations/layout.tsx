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
    <div className='relative min-h-screen bg-black text-white'>
      <OrganizationHeader />
      {showSidebar ? (
        <div className='relative border-t border-t-zinc-800'>
          <OrganizationSidebar />
          <main className='md:ml-[350px]'>{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
