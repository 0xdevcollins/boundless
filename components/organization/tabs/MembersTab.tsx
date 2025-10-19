'use client';

import { useState } from 'react';
import { BoundlessButton } from '@/components/buttons';
import EmailInviteSection from './MembersTab/EmailInviteSection';
import PermissionsTable from './MembersTab/PermissionsTable';
import TeamManagementSection from './MembersTab/TeamManagementSection';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  status: 'active' | 'pending' | 'suspended';
}

interface MembersTabProps {
  initialMembers?: Member[];
  onSave?: (members: Member[]) => void;
}

export default function MembersTab({
  initialMembers = [],
  onSave,
}: MembersTabProps) {
  const dummyMembers: Member[] = [
    {
      id: 'member-1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: '/avatar.png',
      role: 'admin',
      joinedAt: new Date().toISOString(),
      status: 'active',
    },
    {
      id: 'member-2',
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      avatar: '/avatar.png',
      role: 'member',
      joinedAt: new Date().toISOString(),
      status: 'active',
    },
    {
      id: 'member-3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      avatar: '/avatar.png',
      role: 'admin',
      joinedAt: new Date().toISOString(),
      status: 'active',
    },
    {
      id: 'pending-1',
      name: 'Alex Thompson',
      email: 'alex.thompson@example.com',
      avatar: '/avatar.png',
      role: 'member',
      joinedAt: new Date().toISOString(),
      status: 'pending',
    },
    {
      id: 'pending-2',
      name: 'Lisa Wang',
      email: 'lisa.wang@example.com',
      avatar: '/avatar.png',
      role: 'admin',
      joinedAt: new Date().toISOString(),
      status: 'pending',
    },
  ];

  const [members, setMembers] = useState<Member[]>(
    initialMembers.length > 0 ? initialMembers : dummyMembers
  );
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  const handleInvite = () => {
    if (inviteEmails.length > 0) {
      const newMembers: Member[] = inviteEmails.map(email => ({
        id: Date.now().toString() + Math.random(),
        name: email.split('@')[0],
        email: email,
        role: 'member', // Default role
        joinedAt: new Date().toISOString(),
        status: 'pending',
      }));
      setMembers([...members, ...newMembers]);
      setInviteEmails([]);
      setEmailInput('');
    }
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === memberId
          ? { ...member, role: newRole as 'admin' | 'member' }
          : member
      )
    );
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
  };

  return (
    <div className='space-y-8'>
      <EmailInviteSection
        inviteEmails={inviteEmails}
        setInviteEmails={setInviteEmails}
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        onInvite={handleInvite}
      />

      <PermissionsTable />

      <TeamManagementSection
        members={members}
        onRoleChange={handleRoleChange}
        onRemoveMember={handleRemoveMember}
      />

      <BoundlessButton onClick={() => onSave?.(members)} className=''>
        Save Changes
      </BoundlessButton>
    </div>
  );
}
