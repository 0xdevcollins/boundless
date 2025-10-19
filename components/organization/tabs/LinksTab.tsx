'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BoundlessButton } from '@/components/buttons';

export interface OrganizationLinks {
  website: string;
  twitter: string;
  github: string;
  other: string;
}

interface LinksTabProps {
  initialLinks?: OrganizationLinks;
  onSave?: (links: OrganizationLinks) => void;
}

export default function LinksTab({
  initialLinks = { website: '', twitter: '', github: '', other: '' },
  onSave,
}: LinksTabProps) {
  const [links, setLinks] = useState<OrganizationLinks>(initialLinks);

  const updateLink = (field: keyof OrganizationLinks, value: string) => {
    setLinks(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(links);
  };

  return (
    <div className='space-y-6'>
      {/* Website */}
      <div className='space-y-2'>
        <Label className='text-sm font-normal text-white'>Website</Label>
        <Input
          value={links.website}
          onChange={e => updateLink('website', e.target.value)}
          placeholder='Enter link to organization website'
          className='bg-background rounded-[12px] border-gray-900 !p-4 !py-5 text-white placeholder:text-gray-700 focus-visible:ring-0'
        />
      </div>

      {/* X (Twitter) */}
      <div className='space-y-2'>
        <Label className='text-sm font-normal text-white'>X (Twitter)</Label>
        <div className='relative'>
          <span className='absolute top-1/2 left-4 -translate-y-1/2 font-normal text-white'>
            @
          </span>
          <Input
            value={links.twitter}
            onChange={e => updateLink('twitter', e.target.value)}
            placeholder='Organization X handle'
            className='bg-background rounded-[12px] border-gray-900 !p-4 !py-5 !pl-8 text-white placeholder:text-gray-700 focus-visible:ring-0'
          />
        </div>
      </div>

      {/* GitHub */}
      <div className='space-y-2'>
        <Label className='text-sm font-normal text-white'>GitHub</Label>
        <Input
          value={links.github}
          onChange={e => updateLink('github', e.target.value)}
          placeholder='Link to GitHub repo or GitHub organization profile'
          className='bg-background rounded-[12px] border-gray-900 !p-4 !py-5 text-white placeholder:text-gray-700 focus-visible:ring-0'
        />
      </div>

      {/* Other Link */}
      <div className='space-y-2'>
        <Label className='text-sm font-normal text-white'>
          Other Link (optional)
        </Label>
        <Input
          value={links.other}
          onChange={e => updateLink('other', e.target.value)}
          placeholder='Link URL (newsletters or social account)'
          className='bg-background rounded-[12px] border-gray-900 !p-4 !py-5 text-white placeholder:text-gray-700 focus-visible:ring-0'
        />
      </div>

      {/* Save Button */}
      <BoundlessButton onClick={handleSave} className=''>
        Save Changes
      </BoundlessButton>
    </div>
  );
}
