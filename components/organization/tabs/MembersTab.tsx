'use client';

import { useState, useMemo } from 'react';
import { BoundlessButton } from '@/components/buttons';
import { useOrganization } from '@/lib/providers/OrganizationProvider';
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
  onSave?: (members: Member[]) => void;
}

export default function MembersTab({ onSave }: MembersTabProps) {
  const {
    activeOrg,
    activeOrgId,
    updateOrganizationMembers,
    inviteMember,
    removeMember,
    isLoading,
  } = useOrganization();

  const members: Member[] = useMemo(() => {
    const emails = activeOrg?.members ?? [];
    return emails.map((email, idx) => ({
      id: `${idx}-${email}`,
      name: email.split('@')[0] || email,
      email,
      role: 'member',
      joinedAt: new Date().toISOString(),
      status: 'active',
    }));
  }, [activeOrg?.members]);
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [hasUserChanges, setHasUserChanges] = useState(false);

  const handleInvite = () => {
    if (inviteEmails.length > 0 && activeOrgId) {
      inviteMember(activeOrgId, inviteEmails);
      setInviteEmails([]);
      setEmailInput('');
    }
  };

  const handleRoleChange = (memberId: string) => {
    if (!activeOrgId) return;
    const m = members.find(x => x.id === memberId);
    if (!m) return;
    updateOrganizationMembers(activeOrgId, [m.email]);
    setHasUserChanges(true);
  };

  const handleRemoveMember = (memberId: string) => {
    if (!activeOrgId) return;
    const m = members.find(x => x.id === memberId);
    if (!m) return;
    removeMember(activeOrgId, m.email);
  };

  const handleSave = async () => {
    if (!activeOrgId) return;
    const emails = members.map(m => m.email);
    try {
      await updateOrganizationMembers(activeOrgId, emails);
      onSave?.(members);
      setHasUserChanges(false);
    } catch {}
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

      <div className='space-y-2'>
        {hasUserChanges && (
          <div className='flex items-center gap-2 text-sm text-amber-400'>
            <div className='h-2 w-2 rounded-full bg-amber-400' />
            You have unsaved changes
          </div>
        )}
        <BoundlessButton
          onClick={handleSave}
          className='w-full'
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </BoundlessButton>
      </div>
    </div>
  );
}
