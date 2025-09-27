import { Organization } from '@/types/profile';
import OrganizationCard from './OrganizationCard';

interface OrganizationsListProps {
  organizations: Organization[];
}

export default function OrganizationsList({
  organizations,
}: OrganizationsListProps) {
  return (
    <main className='flex flex-col gap-3'>
      <h5 className='text-sm font-medium text-gray-500'>ORGANIZATIONS</h5>
      <main className='flex flex-col gap-3'>
        {organizations.map(org => (
          <OrganizationCard key={org.name} organization={org} />
        ))}
      </main>
    </main>
  );
}
