'use client';

import OrganizationSettings from '@/components/organization/OrganizationSettings';

export default function NewOrganizationPage() {
  return (
    <OrganizationSettings
      initialData={{
        name: 'Organization 1',
        logo: '',
        tagline: '',
        about: '',
      }}
    />
  );
}
