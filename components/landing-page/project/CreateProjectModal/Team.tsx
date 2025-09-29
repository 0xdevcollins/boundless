'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, X, Search } from 'lucide-react';

interface TeamProps {
  onDataChange?: (data: TeamFormData) => void;
  initialData?: Partial<TeamFormData>;
}

export interface TeamMember {
  id: string;
  username: string;
  role?: string;
}

export interface TeamFormData {
  members: TeamMember[];
}

const Team = React.forwardRef<{ validate: () => boolean }, TeamProps>(
  ({ onDataChange, initialData }, ref) => {
    const [formData, setFormData] = useState<TeamFormData>({
      members: initialData?.members || [],
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [errors, setErrors] = useState<{ members?: string }>({});

    const handleInputChange = (
      field: keyof TeamFormData,
      value: TeamMember[]
    ) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);

      // Clear error when user makes changes
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }

      onDataChange?.(newData);
    };

    const addMember = (username: string) => {
      if (
        username.trim() &&
        !formData.members.some(member => member.username === username.trim())
      ) {
        const newMember: TeamMember = {
          id: Date.now().toString(),
          username: username.trim(),
          role: 'MEMBER',
        };
        handleInputChange('members', [...formData.members, newMember]);
        setSearchQuery('');
      }
    };

    const removeMember = (id: string) => {
      const updatedMembers = formData.members.filter(
        member => member.id !== id
      );
      handleInputChange('members', updatedMembers);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addMember(searchQuery);
      }
    };

    const validateForm = (): boolean => {
      const newErrors: { members?: string } = {};

      // Team step is optional, so no validation required
      // But we can add validation if needed in the future

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    // Expose validation function to parent
    React.useImperativeHandle(ref, () => ({
      validate: validateForm,
    }));

    return (
      <div className='min-h-full space-y-8 text-white'>
        {/* Creator Information */}
        <div className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full border border-[#484848] bg-[#1A1A1A]'>
              <User className='h-6 w-6 text-[#B5B5B5]' />
            </div>
            <div>
              <h3 className='text-lg font-medium text-white'>Creator Name</h3>
              <span className='text-sm font-medium text-[#FFA500]'>OWNER</span>
            </div>
          </div>
        </div>

        {/* Invite Members */}
        <div className='space-y-4'>
          <Label className='text-white'>
            Invite members to your team (optional)
          </Label>

          <div className='space-y-4'>
            {/* Search Input */}
            <div className='relative'>
              <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#919191]' />
              <Input
                placeholder='Search by name, handle, or email'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className='focus:border-primary border-[#484848] bg-[#1A1A1A] pl-10 text-white placeholder:text-[#919191]'
              />
            </div>

            {/* Member Tags */}
            {formData.members.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {formData.members.map(member => (
                  <div
                    key={member.id}
                    className='flex items-center space-x-2 rounded-full border border-[#484848] bg-[#2A2A2A] px-3 py-1'
                  >
                    <span className='text-sm text-white'>
                      {member.username}
                    </span>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeMember(member.id)}
                      className='h-5 w-5 rounded-full p-0 text-[#B5B5B5] hover:bg-[#3A3A3A] hover:text-white'
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Member Button */}
            {searchQuery.trim() && (
              <Button
                type='button'
                variant='outline'
                onClick={() => addMember(searchQuery)}
                className='hover:border-primary border-[#484848] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]'
              >
                Add "{searchQuery}"
              </Button>
            )}
          </div>

          {errors.members && (
            <p className='text-sm text-red-500'>{errors.members}</p>
          )}
        </div>

        {/* Team Information */}
        <div className='rounded-lg border border-[#484848] bg-[#1A1A1A] p-4'>
          <h4 className='mb-2 text-sm font-medium text-white'>
            Team Information
          </h4>
          <p className='text-sm text-[#B5B5B5]'>
            You can invite team members to collaborate on your project. They
            will have access to project details and can help manage milestones
            and updates.
          </p>
        </div>
      </div>
    );
  }
);

Team.displayName = 'Team';

export default Team;
