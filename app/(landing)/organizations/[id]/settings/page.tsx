'use client';

import { useParams } from 'next/navigation';
import OrganizationSettings from '@/components/organization/OrganizationSettings';

export default function OrganizationSettingsPage() {
  const params = useParams();
  const organizationId = params.id as string;

  const mockOrgData = {
    name: 'Boundless',
    logo: '/tech-company-logo.jpg',
    tagline: 'Building the future of technology',
    about: 'We are a community of innovators...',
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='flex'>
        <OrganizationSettings
          organizationId={organizationId}
          initialData={mockOrgData}
        />
      </div>
    </div>
  );
}
