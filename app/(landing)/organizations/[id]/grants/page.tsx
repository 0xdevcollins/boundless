'use client';

import { useParams } from 'next/navigation';
import OrganizationHeader from '@/components/organization/OrganizationHeader';
import OrganizationSidebar from '@/components/organization/OrganizationSidebar';

export default function GrantsPage() {
  const params = useParams();
  const organizationId = params.id as string;

  return (
    <div className='min-h-screen bg-black text-white'>
      <OrganizationHeader />
      <div className='flex'>
        <OrganizationSidebar organizationId={organizationId} />
        <main className='flex-1 p-8'>
          <h1 className='text-2xl font-bold'>Grants</h1>
          <p className='mt-2 text-zinc-400'>Manage your grants here</p>
        </main>
      </div>
    </div>
  );
}
