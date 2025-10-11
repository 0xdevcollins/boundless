'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface Organization {
  id: string;
  name: string;
  logo: string;
}

interface OrganizationSelectorProps {
  organizations?: Organization[];
  currentOrganization?: Organization;
  onOrganizationChange?: (organization: Organization) => void;
  onToggle?: (isOpen: boolean) => void;
}

export default function OrganizationSelector({
  organizations = [
    {
      id: '1',
      name: 'Organization 1',
      logo: '/organization-logo.svg',
    },
    {
      id: '2',
      name: 'Organization 2',
      logo: '/organization-logo.svg',
    },
    {
      id: '3',
      name: 'Organization 3',
      logo: '/organization-logo.svg',
    },
  ],
  currentOrganization,
  onOrganizationChange,
  onToggle,
}: OrganizationSelectorProps) {
  const [selectedOrg, setSelectedOrg] = useState<Organization>(
    currentOrganization || organizations[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOrganizationSelect = (org: Organization) => {
    setSelectedOrg(org);
    onOrganizationChange?.(org);
    setIsOpen(false);
    onToggle?.(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onToggle?.(open);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        asChild
        className='focus:ring-0 focus-visible:ring-0'
      >
        <Button className='flex items-center gap-3 bg-transparent px-3 py-2 transition-colors hover:bg-transparent focus:ring-0 focus-visible:ring-0'>
          {/* Organization Logo */}
          <div className='relative h-10 w-10 overflow-hidden rounded-full bg-white'>
            <Image
              src={selectedOrg.logo || '/placeholder.svg'}
              alt={selectedOrg.name}
              fill
              className='object-cover'
            />
          </div>

          {/* Organization Name */}
          <span className='text-sm font-medium text-white'>
            {selectedOrg.name}
          </span>

          {/* Chevron Icons */}
          <div className='flex flex-col gap-0'>
            <ChevronUp className='m-0 h-4 w-4 p-0 text-white' />
            <ChevronDown className='m-0 h-4 w-4 p-0 text-white' />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-[280px] rounded-lg border border-[#2B2B2B] bg-[#1A1A1A] p-2 shadow-lg'
        align='start'
      >
        {organizations.map(org => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => handleOrganizationSelect(org)}
            className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 hover:bg-[#252525] focus:bg-[#252525]'
          >
            {/* Organization Logo */}
            <div className='relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-white'>
              <Image
                src={org.logo || '/placeholder.svg'}
                alt={org.name}
                fill
                className='object-cover'
              />
            </div>

            {/* Organization Name */}
            <span className='flex-1 text-sm font-medium text-white'>
              {org.name}
            </span>

            {/* Check Icon for Selected */}
            {selectedOrg.id === org.id && (
              <Check className='h-4 w-4 text-lime-500' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
