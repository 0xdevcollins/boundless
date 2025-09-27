'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Shield } from 'lucide-react';
import Link from 'next/link';

export function AuthNav() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className='flex items-center space-x-2'>
        <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200' />
        <div className='h-4 w-20 animate-pulse rounded bg-gray-200' />
      </div>
    );
  }

  if (!session) {
    return (
      <div className='flex items-center space-x-2'>
        <Button variant='outline' onClick={() => signIn()}>
          Sign In
        </Button>
        <Button asChild>
          <Link href='/auth/signup'>Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={session.user.image || ''}
              alt={
                session.user.firstName && session.user.lastName
                  ? `${session.user.firstName} ${session.user.lastName}`
                  : session.user.firstName || session.user.lastName || ''
              }
            />
            <AvatarFallback>
              {(session.user.firstName || session.user.lastName)?.charAt(0) ||
                session.user.email.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>
              {session.user.firstName && session.user.lastName
                ? `${session.user.firstName} ${session.user.lastName}`
                : session.user.firstName || session.user.lastName || 'User'}
            </p>
            <p className='text-muted-foreground text-xs leading-none'>
              {session.user.email}
            </p>
            <div className='flex items-center space-x-1'>
              <Shield className='h-3 w-3' />
              <span className='text-muted-foreground text-xs capitalize'>
                {session.user.role}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/user' className='flex items-center'>
            <User className='mr-2 h-4 w-4' />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/settings' className='flex items-center'>
            <Settings className='mr-2 h-4 w-4' />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/' })}
          className='flex items-center text-red-600'
        >
          <LogOut className='mr-2 h-4 w-4' />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
