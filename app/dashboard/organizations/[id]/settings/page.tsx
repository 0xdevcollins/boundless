'use client';

import { useParams } from 'next/navigation';
import OrganizationHeader from '@/components/organization/OrganizationHeader';
import OrganizationSidebar from '@/components/organization/OrganizationSidebar';
import OrganizationSettings from '@/components/organization/OrganizationSettings';

export default function OrganizationSettingsPage() {
  const params = useParams();
  const organizationId = params.id as string;

  // TODO: Fetch organization data based on ID
  const mockOrgData = {
    name: 'Tech Innovators Hub',
    logo: '/tech-company-logo.jpg',
    tagline: 'Building the future of technology',
    about: 'We are a community of innovators...',
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <OrganizationHeader />
      <div className='flex'>
        <OrganizationSidebar organizationId={organizationId} />
        <OrganizationSettings
          organizationId={organizationId}
          initialData={mockOrgData}
        />
      </div>
    </div>
  );
}
