'use client';
import { Search, ArrowUpDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OrganizationCard from './cards/OrganzationCards';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const mockOrganizations = [
  {
    id: '1',
    name: 'Tech Innovators Hub',
    logo: '/organization-logo.svg',
    createdAt: '2 days ago',
    hackathons: { count: 3, submissions: 1 },
    grants: { count: 7, applications: 3 },
  },
  {
    id: '2',
    name: 'Green Energy Initiative',
    logo: '/organization-logo.svg',
    createdAt: '1 week ago',
    hackathons: { count: 5, submissions: 2 },
    grants: { count: 12, applications: 8 },
  },
  {
    id: '3',
    name: 'AI Research Collective',
    logo: '/organization-logo.svg',
    createdAt: '3 weeks ago',
    hackathons: { count: 8, submissions: 5 },
    grants: { count: 15, applications: 10 },
  },
  {
    id: '4',
    name: 'Community Builders Network',
    logo: '/organization-logo.svg',
    createdAt: '1 month ago',
    hackathons: { count: 2, submissions: 0 },
    grants: { count: 4, applications: 2 },
  },
];

export default function OrganizationContent() {
  const hasorganizations = mockOrganizations.length > 0;
  const router = useRouter();
  return (
    <main className=''>
      {/* Search and Sort Bar */}
      {hasorganizations && (
        <section className='mb-8 hidden border-y border-y-zinc-800 px-8 md:block'>
          <div className='mx-auto flex max-w-5xl items-center gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500' />
              <Input
                type='text'
                placeholder='Search organization, hackathon, or grants'
                className='w-full rounded-lg border-zinc-800 bg-zinc-900 py-6 pr-4 pl-12 text-white placeholder:text-zinc-500 focus-visible:border-lime-500 focus-visible:ring-[1px] focus-visible:ring-lime-500'
              />
            </div>
            <Button
              variant='outline'
              className='text- rounded-lg border-zinc-800 bg-black px-6 py-6 hover:bg-zinc-800'
            >
              <ArrowUpDown className='h-4 w-4' />
              Sort
            </Button>
            {hasorganizations && (
              <div className='flex h-23 items-center border-l border-l-zinc-800 pl-4'>
                <Button
                  onClick={() => router.push('/dashboard/organizations/new')}
                  className='rounded-lg bg-[#a6f948] px-6 py-6 text-black hover:bg-lime-600'
                >
                  Add Organization
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      <section className='mx-auto max-w-5xl px-8 py-8 md:px-0'>
        {/* Add Organization Section */}
        {hasorganizations && (
          <div className='grid grid-cols-1 gap-6'>
            {mockOrganizations.map(org => (
              <Link href={`/organization/${org.id}`} key={org.id}>
                <OrganizationCard {...org} />
              </Link>
            ))}
          </div>
        )}

        {!hasorganizations && (
          <div className='mx-8 flex items-center justify-center rounded-lg border-1 border-dashed border-green-600 p-32'>
            <button className='flex items-center gap-2 font-medium text-lime-500 transition-colors hover:text-lime-400'>
              <span>Add Organization</span>
              <Plus className='h-5 w-5' size={100} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
