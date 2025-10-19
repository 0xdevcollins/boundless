'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BoundlessButton } from '@/components/buttons';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
}

interface TransferOwnershipTabProps {
  currentOwner?: {
    name: string;
    email: string;
    avatar?: string;
  };
  members?: Member[];
  onTransfer?: (newOwnerId: string) => void;
}

export default function TransferOwnershipTab({
  members = [],
  onTransfer,
}: TransferOwnershipTabProps) {
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (triggerRef.current) {
        setPopoverWidth(triggerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  // Dummy data for demonstration
  const dummyMembers: Member[] = [
    {
      id: 'admin-1',
      name: 'Robert Fox',
      email: 'robert.fox@example.com',
      avatar: '/avatar.png',
      role: 'admin',
    },
    {
      id: 'admin-2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: '/avatar.png',
      role: 'admin',
    },
    {
      id: 'admin-3',
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      avatar: '/avatar.png',
      role: 'admin',
    },
  ];

  const eligibleMembers =
    members.length > 0
      ? members.filter(member => member.role === 'admin')
      : dummyMembers;
  const selectedMemberData = eligibleMembers.find(
    member => member.id === selectedMember
  );

  const handleTransfer = async () => {
    if (!selectedMember) return;

    setIsTransferring(true);
    try {
      await onTransfer?.(selectedMember);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <>
      <div className='mb-6 space-y-6 rounded-[12px] border border-gray-900 bg-[#101010] p-4'>
        <div>
          <h3 className='mb-3 text-sm text-white'>
            Transfer the organization ownership
          </h3>
          <p className='text-sm text-gray-500'>
            You can only transfer the ownership to one of the members. After
            ownership being transferred,
            <span className='text-warning-300 italic'>
              {' '}
              you will be demoted to admin.
            </span>
          </p>
        </div>

        <div className='space-y-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                ref={triggerRef}
                variant='outline'
                className='bg-background h-12 w-full justify-between border-gray-900 px-4 text-white hover:bg-gray-800'
              >
                <div className='flex items-center gap-3'>
                  {selectedMemberData ? (
                    <>
                      <Avatar className='h-6 w-6'>
                        <AvatarImage
                          src={selectedMemberData.avatar}
                          alt={selectedMemberData.name}
                        />
                        <AvatarFallback className='text-xs'>
                          {selectedMemberData.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-white'>
                        {selectedMemberData.name}
                      </span>
                    </>
                  ) : (
                    <span className='text-gray-500'>Select new owner</span>
                  )}
                </div>
                <ChevronDown className='h-4 w-4 text-gray-500' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='bg-background w-full border-gray-900'
              style={{ width: popoverWidth > 0 ? `${popoverWidth}px` : '100%' }}
            >
              {eligibleMembers.map(member => (
                <DropdownMenuItem
                  key={member.id}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 px-4 py-3 focus:bg-gray-800',
                    selectedMember === member.id && 'bg-primary/10'
                  )}
                  onClick={() => setSelectedMember(member.id)}
                >
                  <Avatar className='h-6 w-6'>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className='text-xs'>
                      {member.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='text-sm text-white'>{member.name}</div>
                    <div className='text-xs text-gray-500'>{member.email}</div>
                  </div>
                  {selectedMember === member.id && (
                    <Check className='text-primary h-4 w-4' />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <BoundlessButton
        onClick={handleTransfer}
        disabled={!selectedMember || isTransferring}
        className={cn(!selectedMember && 'cursor-not-allowed opacity-50')}
        size='xl'
      >
        {isTransferring ? 'Transferring...' : 'Save Changes'}
      </BoundlessButton>
    </>
  );
}
