'use client';
import {
  ChevronDown,
  User,
  Building2,
  Settings,
  LogOut,
  HomeIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useAuthActions, useAuthStatus } from '@/hooks/use-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OrganizationSelector from './cards/OrganizationSelector';

export default function OrganizationHeader() {
  const { isLoading, user } = useAuthStatus();
  const { logout } = useAuthActions();
  const pathname = usePathname();
  const isOnOrganizationsPage = pathname === '/dashboard/organizations';

  const showOrgSelector =
    pathname.includes('/new') ||
    (pathname.split('/').length > 4 && pathname !== '/dashboard/organizations');

  return (
    <header className='flex items-center justify-between border-0 border-zinc-800 px-10 py-4'>
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <Image
            src='/footer/logo.svg'
            width={50}
            height={50}
            alt='Boundless Logo'
          />
        </div>

        {/* Home Link */}
        <button className='flex items-center gap-2 text-lime-500 transition-colors hover:text-lime-400'>
          <HomeIcon className='h-5 w-5' />
          <span className='text-sm font-medium'>Home</span>
        </button>

        {showOrgSelector && <OrganizationSelector />}
      </div>

      {/* User Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='flex items-center space-x-2 rounded-full p-1 transition-colors hover:bg-white/10'>
            <Avatar className='h-12 w-12'>
              <AvatarImage
                src={user?.image || user?.profile?.avatar || ''}
                alt={user?.name || user?.profile?.firstName || ''}
              />
              <AvatarFallback>
                {/* {user?.name?.charAt(0) ||
                             user?.profile?.firstName?.charAt(0) ||
                             user?.email?.charAt(0) ||
                             'U'} */}
                <Image
                  src={
                    user?.image ||
                    user?.profile?.avatar ||
                    'https://i.pravatar.cc/150?img=10'
                  }
                  alt='logo'
                  width={116}
                  height={22}
                  className='h-full w-full object-cover'
                />
              </AvatarFallback>
            </Avatar>
            <ChevronDown className='h-5 w-5 text-white' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='bg-background w-[350px] rounded-[8px] border border-[#2B2B2B] p-0 !text-white shadow-[0_4px_4px_0_rgba(26,26,26,0.25)]'
          align='end'
          forceMount
        >
          <DropdownMenuLabel className='p-6 !pb-3 font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm leading-[160%]'>
                Signed in as{' '}
                <span className='leading-[145%] font-semibold'>
                  {user?.name || user?.profile?.firstName || 'User'}
                </span>
              </p>
              <p className='text-sm leading-[145%] text-[#B5B5B5]'>
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className='h-[0.5px] bg-[#2B2B2B]' />
          <DropdownMenuItem
            className='group hover:!text-primary cursor-pointer px-6 py-3.5 pt-3 hover:!bg-transparent'
            asChild
          >
            <Link
              href='/me'
              className='group-hover:!text-primary flex items-center'
            >
              <User className='teext-white group-hover:!text-primary mr-2 h-4 w-4 text-white' />
              Profile
            </Link>
          </DropdownMenuItem>
          {!isOnOrganizationsPage && (
            <DropdownMenuItem
              className='group hover:!text-primary cursor-pointer px-6 py-3.5 hover:!bg-transparent'
              asChild
            >
              <Link
                href='/dashboard/organizations'
                className='group-hover:text-primary flex items-center'
              >
                <Building2 className='group-hover:!text-primary mr-2 h-4 w-4 text-white' />
                Organizations
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className='group hover:!text-primary cursor-pointer px-6 py-3.5 pb-6 hover:!bg-transparent'
            asChild
          >
            <Link href='/settings' className='flex items-center'>
              <Settings className='group-hover:!text-primary mr-2 h-4 w-4 text-white' />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className='h-[0.5px] bg-[#2B2B2B]' />
          <DropdownMenuItem
            onClick={() => !isLoading && logout()}
            disabled={isLoading}
            className='group flex cursor-pointer items-center px-6 pt-3 pb-6 text-red-600 hover:!bg-transparent hover:!text-red-700 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <LogOut className='mr-2 h-4 w-4 text-red-600 group-hover:!text-red-700' />
            {isLoading ? 'Signing Out...' : 'Sign Out'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
