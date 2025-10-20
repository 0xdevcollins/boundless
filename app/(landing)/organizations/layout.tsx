'use client';

import type React from 'react';

import OrganizationHeader from '@/components/organization/OrganizationHeader';
import OrganizationSidebar from '@/components/organization/OrganizationSidebar';
import { usePathname } from 'next/navigation';
import { OrganizationProvider } from '@/lib/providers';

export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showSidebar =
    pathname !== '/organizations' && pathname.startsWith('/organizations');

  const getOrgIdFromPath = () => {
    if (pathname.startsWith('/organizations/')) {
      const pathParts = pathname.split('/');
      const orgId = pathParts[2];
      if (orgId && /^[a-f0-9]{24}$/.test(orgId)) {
        return orgId;
      }
    }
    return null;
  };

  const initialOrgId = getOrgIdFromPath();

  return (
    <OrganizationProvider initialOrgId={initialOrgId || undefined}>
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
    </OrganizationProvider>
  );
}
