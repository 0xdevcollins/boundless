'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, X, Users2 } from 'lucide-react';

const permissions = [
  {
    permission: 'Create / edit organization profile',
    owner: true,
    admin: { value: true, note: 'edit only' },
    member: false,
  },
  {
    permission: 'Create and manage hackathons and grants',
    owner: true,
    admin: true,
    member: false,
  },
  {
    permission: 'Publish hackathons / grants',
    owner: true,
    admin: false,
    member: false,
  },
  {
    permission: 'View hackathons & analytics',
    owner: true,
    admin: true,
    member: true,
  },
  {
    permission: 'Invite & remove members',
    owner: true,
    admin: true,
    member: false,
  },
  {
    permission: 'Assign roles',
    owner: true,
    admin: false,
    member: false,
  },
  {
    permission: 'Post announcements & messages',
    owner: true,
    admin: false,
    member: false,
  },
  {
    permission: 'Comment / participate in discussions',
    owner: true,
    admin: true,
    member: true,
  },
  {
    permission: 'Access submissions (view/judge if assigned)',
    owner: true,
    admin: true,
    member: { value: true, note: 'view only, unless assigned as judge' },
  },
  {
    permission: 'Delete organization',
    owner: true,
    admin: false,
    member: false,
  },
];

export default function PermissionsTable() {
  return (
    <div className='space-y-4 rounded-[4px] bg-[rgba(219,249,54,0.08)] p-4'>
      <h4 className='text-sm text-white'>
        <Users2 className='inline-block h-4.5 w-4.5 text-gray-500' />{' '}
        Organization Roles
      </h4>
      <Table>
        <TableHeader>
          <TableRow className='border-gray-800 hover:bg-transparent'>
            <TableHead className='px-0 font-medium text-white'>
              Permissions
            </TableHead>
            <TableHead className='px-0 text-center font-medium text-white'>
              Owner
            </TableHead>
            <TableHead className='px-0 text-center font-medium text-white'>
              Admin
            </TableHead>
            <TableHead className='px-0 text-center font-medium text-white'>
              Member
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((perm, index) => (
            <TableRow
              key={index}
              className='border-gray-800/50 hover:bg-gray-800/10'
            >
              <TableCell className='px-0 !text-sm text-white'>
                {perm.permission}
              </TableCell>
              <TableCell className='px-0 text-center'>
                {perm.owner ? (
                  <Check className='text-success-500 mx-auto h-4 w-4' />
                ) : (
                  <X className='mx-auto h-4 w-4 text-red-500' />
                )}
              </TableCell>
              <TableCell className='px-0 text-center'>
                {typeof perm.admin === 'object' ? (
                  <div className='flex items-center justify-center gap-1'>
                    <Check className='text-success-500 h-4 w-4' />
                    <span className='text-xs text-gray-500'>
                      {perm.admin.note}
                    </span>
                  </div>
                ) : perm.admin ? (
                  <Check className='text-success-500 mx-auto h-4 w-4' />
                ) : (
                  <X className='mx-auto h-4 w-4 text-red-500' />
                )}
              </TableCell>
              <TableCell className='px-0 text-center'>
                {typeof perm.member === 'object' ? (
                  <div className='flex items-center justify-center gap-1'>
                    <Check className='text-success-500 h-4 w-4' />
                    <span className='max-w-[120px] text-xs whitespace-pre-wrap text-zinc-400'>
                      {perm.member.note}
                    </span>
                  </div>
                ) : perm.member ? (
                  <Check className='text-success-500 mx-auto h-4 w-4' />
                ) : (
                  <X className='mx-auto h-4 w-4 text-red-500' />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
