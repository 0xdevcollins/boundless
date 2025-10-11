'use client';

import { HomeIcon, Trophy, HandCoins, Settings } from 'lucide-react';
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
      icon: HomeIcon,
      label: 'Home',
      href: '/dashboard/organizations',
    },
    {
      icon: Trophy,
      label: 'Hackathons',
      href: organizationId
        ? `/dashboard/organizations/${organizationId}/hackathons`
        : '#',
    },
    {
      icon: HandCoins,
      label: 'Grants',
      href: organizationId
        ? `/dashboard/organizations/${organizationId}/grants`
        : '#',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: organizationId
        ? `/dashboard/organizations/${organizationId}/settings`
        : '/dashboard/organizations/new',
    },
  ];

  return (
    <aside className='w-[175px] border-r border-zinc-800 bg-black'>
      <nav className='flex flex-col gap-1 p-4'>
        <h3 className='mb-2 px-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase'>
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
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-lime-500/10 text-lime-500'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              )}
            >
              <Icon className='h-4 w-4' />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
