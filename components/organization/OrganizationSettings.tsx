'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  ImagePlus,
  Bold,
  Italic,
  Underline,
  List,
  LinkIcon,
  ImageIcon,
} from 'lucide-react';
import Image from 'next/image';

interface OrganizationSettingsProps {
  organizationId?: string;
  initialData?: {
    name?: string;
    logo?: string;
    tagline?: string;
    about?: string;
  };
}

export default function OrganizationSettings({
  organizationId,
  initialData,
}: OrganizationSettingsProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    logo: initialData?.logo || '',
    tagline: initialData?.tagline || '',
    about: initialData?.about || '',
  });

  const handleSave = () => {
    console.log('Saving organization data:', formData);
    // TODO: Implement save logic
  };

  return (
    <div className='flex-1 bg-black text-white' id={organizationId}>
      <Tabs defaultValue='profile' className='w-full'>
        <div className='border-b border-zinc-800 px-8'>
          <TabsList className='h-auto gap-6 bg-transparent p-0'>
            <TabsTrigger
              value='profile'
              className='rounded-none border-b-2 border-transparent bg-transparent px-0 pt-4 pb-3 text-sm font-medium text-zinc-400 data-[state=active]:border-lime-500 data-[state=active]:text-white data-[state=active]:shadow-none'
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value='links'
              className='rounded-none border-b-2 border-transparent bg-transparent px-0 pt-4 pb-3 text-sm font-medium text-zinc-400 data-[state=active]:border-lime-500 data-[state=active]:text-white data-[state=active]:shadow-none'
            >
              Links
            </TabsTrigger>
            <TabsTrigger
              value='members'
              className='rounded-none border-b-2 border-transparent bg-transparent px-0 pt-4 pb-3 text-sm font-medium text-zinc-400 data-[state=active]:border-lime-500 data-[state=active]:text-white data-[state=active]:shadow-none'
            >
              Members
            </TabsTrigger>
            <TabsTrigger
              value='transfer'
              className='rounded-none border-b-2 border-transparent bg-transparent px-0 pt-4 pb-3 text-sm font-medium text-zinc-400 data-[state=active]:border-lime-500 data-[state=active]:text-white data-[state=active]:shadow-none'
            >
              Transfer Ownership
            </TabsTrigger>
          </TabsList>
        </div>

        <div className='px-8 py-6'>
          <TabsContent value='profile' className='mt-0 space-y-6'>
            {/* Organization Name */}
            <div className='space-y-2'>
              <Label
                htmlFor='org-name'
                className='text-sm font-medium text-white'
              >
                Organization Name <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='org-name'
                placeholder='Enter a name for your organization'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className='border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-lime-500 focus-visible:ring-lime-500'
              />
            </div>

            {/* Logo Upload */}
            <div className='space-y-2'>
              <Label className='text-sm font-medium text-white'>Logo</Label>
              <div className='flex items-start gap-4'>
                <div className='flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900'>
                  {formData.logo ? (
                    <Image
                      src={formData.logo || '/placeholder.svg'}
                      alt='Organization logo'
                      width={128}
                      height={128}
                      className='rounded-lg object-cover'
                    />
                  ) : (
                    <ImagePlus className='h-8 w-8 text-zinc-600' />
                  )}
                </div>
                <div className='flex-1 space-y-2'>
                  <Button
                    variant='outline'
                    className='border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800'
                  >
                    Upload Image
                  </Button>
                  <div className='flex items-start gap-2 text-xs text-zinc-500'>
                    <span className='text-zinc-400'>ⓘ</span>
                    <div>
                      <p>
                        Accepted file types: JPEG or PNG, and less than 2 MB.
                      </p>
                      <p>A size of 480 x 480 px is recommended.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label
                  htmlFor='tagline'
                  className='text-sm font-medium text-white'
                >
                  Tagline
                </Label>
                <span className='text-xs text-zinc-500'>
                  {formData.tagline.length}/100
                </span>
              </div>
              <Input
                id='tagline'
                placeholder='Enter organization description - one-liner/tagline/human-summary'
                value={formData.tagline}
                onChange={e =>
                  setFormData({
                    ...formData,
                    tagline: e.target.value.slice(0, 100),
                  })
                }
                className='border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-lime-500 focus-visible:ring-lime-500'
              />
              <div className='flex items-start gap-2 text-xs text-zinc-500'>
                <span className='text-zinc-400'>ⓘ</span>
                <p>
                  Describe your project's long-term goal or the positive change
                  it will bring to people, communities, or industries.
                </p>
              </div>
            </div>

            {/* About */}
            <div className='space-y-2'>
              <Label htmlFor='about' className='text-sm font-medium text-white'>
                About <span className='text-red-500'>*</span>
              </Label>

              {/* Rich Text Editor Toolbar */}
              <div className='flex items-center gap-1 rounded-t-lg border border-b-0 border-zinc-800 bg-zinc-900 p-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                >
                  <Bold className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                >
                  <Italic className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                >
                  <Underline className='h-4 w-4' />
                </Button>
                <div className='mx-2 h-6 w-px bg-zinc-700' />
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                >
                  <List className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                >
                  <LinkIcon className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                >
                  <ImageIcon className='h-4 w-4' />
                </Button>
              </div>

              <Textarea
                id='about'
                placeholder='Talk about your organization in detail'
                value={formData.about}
                onChange={e =>
                  setFormData({ ...formData, about: e.target.value })
                }
                className='min-h-[200px] rounded-t-none border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-lime-500 focus-visible:ring-lime-500'
              />
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              className='bg-lime-500 px-6 text-black hover:bg-lime-600'
            >
              Save Changes
            </Button>
          </TabsContent>

          <TabsContent value='links' className='mt-0'>
            <p className='text-zinc-400'>Links content coming soon...</p>
          </TabsContent>

          <TabsContent value='members' className='mt-0'>
            <p className='text-zinc-400'>Members content coming soon...</p>
          </TabsContent>

          <TabsContent value='transfer' className='mt-0'>
            <p className='text-zinc-400'>
              Transfer ownership content coming soon...
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
