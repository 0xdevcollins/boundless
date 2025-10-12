'use client';

import { Trophy, HandCoins, Settings, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface OrganizationSidebarProps {
  organizationId?: string;
}

export default function OrganizationSidebar({
  organizationId,
}: OrganizationSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: Trophy,
      label: 'Hackathons',
      href: organizationId
        ? `/organizations/${organizationId}/hackathons`
        : '#',
    },
    {
      icon: HandCoins,
      label: 'Grants',
      href: organizationId ? `/organizations/${organizationId}/grants` : '#',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: organizationId
        ? `/organizations/${organizationId}/settings`
        : '/organizations/new',
    },
  ];

  return (
    <aside className='hidden w-[350px] border-r border-zinc-800 bg-black md:block'>
      <nav className='flex flex-col gap-1 py-4'>
        <h3 className='mb-2 px-11 text-xs font-semibold tracking-wider text-zinc-500 uppercase'>
          Menu
        </h3>
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-11 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border-r-4 border-r-lime-500 bg-lime-500/10 text-lime-500'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              )}
            >
              <Icon className='h-4 w-4' />
              {item.label}
            </Link>
          );
        })}
        <div className='mt-6 space-y-6 px-8'>
          <Link href='' className='flex items-center gap-3'>
            <div className='grid h-6 w-6 place-content-center rounded-full bg-lime-500'>
              <Plus className='h-5 w-5 text-black' />
            </div>
            <span>Host Hackathon</span>
          </Link>
          <Link href='' className='flex items-center gap-3'>
            <div className='flex items-center gap-3'>
              <div className='grid h-6 w-6 place-content-center rounded-full bg-lime-500'>
                <Plus className='h-5 w-5 text-black' />
              </div>
              <span>Create Grants</span>
            </div>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
