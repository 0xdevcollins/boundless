'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Camera, Info, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BasicProps {
  onDataChange?: (data: BasicFormData) => void;
  initialData?: Partial<BasicFormData>;
}

export interface BasicFormData {
  projectName: string;
  logo: File | null;
  vision: string;
  category: string;
  githubUrl: string;
  websiteUrl: string;
  demoVideoUrl: string;
  socialLinks: string[];
}

const categories = [
  'DeFi & Finance',
  'Gaming & Metaverse',
  'Social & Community',
  'Infrastructure & Tooling',
  'AI & Machine Learning',
  'Sustainability & Impact',
  'Other',
];

const Basic = React.forwardRef<{ validate: () => boolean }, BasicProps>(
  ({ onDataChange, initialData }, ref) => {
    const [formData, setFormData] = useState<BasicFormData>({
      projectName: initialData?.projectName || '',
      logo: initialData?.logo || null,
      vision: initialData?.vision || '',
      category: initialData?.category || '',
      githubUrl: initialData?.githubUrl || '',
      websiteUrl: initialData?.websiteUrl || '',
      demoVideoUrl: initialData?.demoVideoUrl || '',
      socialLinks: initialData?.socialLinks || ['', '', ''],
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof BasicFormData, string>>
    >({});

    const handleInputChange = (
      field: keyof BasicFormData,
      value: string | File | string[]
    ) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }

      onDataChange?.(newData);
    };

    const handleSocialLinkChange = (index: number, value: string) => {
      const newSocialLinks = [...formData.socialLinks];
      newSocialLinks[index] = value;
      handleInputChange('socialLinks', newSocialLinks);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // Validate file type
        if (!file.type.match(/^image\/(jpeg|png)$/)) {
          setErrors(prev => ({
            ...prev,
            logo: 'Only JPEG and PNG files are allowed',
          }));
          return;
        }

        // Validate file size (2MB = 2 * 1024 * 1024 bytes)
        if (file.size > 2 * 1024 * 1024) {
          setErrors(prev => ({
            ...prev,
            logo: 'File size must be less than 2MB',
          }));
          return;
        }

        handleInputChange('logo', file);
      }
    };

    const validateForm = (): boolean => {
      const newErrors: Partial<Record<keyof BasicFormData, string>> = {};

      if (!formData.projectName.trim()) {
        newErrors.projectName = 'Project name is required';
      }

      if (!formData.logo) {
        newErrors.logo = 'Logo is required';
      }

      if (!formData.vision.trim()) {
        newErrors.vision = 'Vision is required';
      } else if (formData.vision.length > 300) {
        newErrors.vision = 'Vision must be 300 characters or less';
      }

      if (!formData.category) {
        newErrors.category = 'Category is required';
      }

      const validSocialLinks = formData.socialLinks.filter(link => link.trim());
      if (validSocialLinks.length === 0) {
        newErrors.socialLinks = 'At least one social link is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    // Expose validation function to parent
    React.useImperativeHandle(ref, () => ({
      validate: validateForm,
    }));

    return (
      <div className='min-h-full space-y-8 text-white'>
        {/* Project Name */}
        <div className='space-y-2'>
          <Label className='text-white'>
            Project Name <span className='text-red-500'>*</span>
          </Label>
          <Input
            placeholder='Enter project name/title'
            value={formData.projectName}
            onChange={e => handleInputChange('projectName', e.target.value)}
            className={cn(
              'focus:border-primary border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]',
              errors.projectName && 'border-red-500'
            )}
          />
          {errors.projectName && (
            <p className='text-sm text-red-500'>{errors.projectName}</p>
          )}
        </div>

        {/* Logo/Image */}
        <div className='space-y-2'>
          <Label className='text-white'>
            Logo/Image <span className='text-red-500'>*</span>
          </Label>
          <div className='relative'>
            <input
              type='file'
              accept='image/jpeg,image/png'
              onChange={handleFileUpload}
              className='hidden'
              id='logo-upload'
            />
            <label
              htmlFor='logo-upload'
              className={cn(
                'flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors',
                formData.logo
                  ? 'border-primary bg-primary/5'
                  : 'hover:border-primary border-[#484848]',
                errors.logo && 'border-red-500'
              )}
            >
              {formData.logo ? (
                <div className='flex flex-col items-center space-y-2'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(formData.logo)}
                    alt='Project logo'
                    className='h-16 w-16 rounded object-cover'
                  />
                  <span className='text-xs text-white'>Change</span>
                </div>
              ) : (
                <div className='flex flex-col items-center space-y-2'>
                  <Camera className='h-8 w-8 text-[#919191]' />
                  <span className='text-xs text-[#919191]'>Upload</span>
                </div>
              )}
            </label>
          </div>
          <div className='space-y-1 text-sm text-[#B5B5B5]'>
            <p>
              Accepted file type:{' '}
              <span className='font-semibold text-white'>JPEG</span> or{' '}
              <span className='font-semibold text-white'>PNG</span>, and less
              than <span className='font-semibold text-white'>2 MB</span>.
            </p>
            <p>
              A size of{' '}
              <span className='font-semibold text-white'>480 x 480 px</span> is
              recommended.
            </p>
          </div>
          {errors.logo && <p className='text-sm text-red-500'>{errors.logo}</p>}
        </div>

        {/* Vision */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label className='text-white'>
              Vision <span className='text-red-500'>*</span>
            </Label>
            <span className='text-sm text-[#919191]'>
              {formData.vision.length}/300
            </span>
          </div>
          <Textarea
            placeholder='Share the future your project is building'
            value={formData.vision}
            onChange={e => handleInputChange('vision', e.target.value)}
            className={cn(
              'focus:border-primary min-h-24 resize-none border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]',
              errors.vision && 'border-red-500'
            )}
            maxLength={300}
          />
          <p className='text-sm text-[#B5B5B5]'>
            Describe your project's long-term goal or the positive change it
            will bring to people, communities, or industries.
          </p>
          {errors.vision && (
            <p className='text-sm text-red-500'>{errors.vision}</p>
          )}
        </div>

        {/* Category */}
        <div className='space-y-3'>
          <Label className='text-white'>
            Category <span className='text-red-500'>*</span>
          </Label>
          <RadioGroup
            value={formData.category}
            onValueChange={value => handleInputChange('category', value)}
            className='grid grid-cols-1 gap-3 md:grid-cols-2'
          >
            {categories.map(category => (
              <div key={category} className='flex items-center space-x-3'>
                <RadioGroupItem
                  value={category}
                  id={category}
                  className={cn(
                    'text-primary border-[#484848]',
                    formData.category === category && 'border-primary'
                  )}
                />
                <Label
                  htmlFor={category}
                  className={cn(
                    'cursor-pointer text-sm',
                    formData.category === category
                      ? 'text-white'
                      : 'text-[#B5B5B5]'
                  )}
                >
                  {category}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.category && (
            <p className='text-sm text-red-500'>{errors.category}</p>
          )}
        </div>

        {/* GitHub/GitLab/Bitbucket */}
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <Label className='text-white'>
              GitHub/Gitlab/Bitbucket (optional unless hackathons required)
            </Label>
            <Info className='h-4 w-4 text-[#919191]' />
          </div>
          <Input
            placeholder='Link to GitHub repo or profile'
            value={formData.githubUrl}
            onChange={e => handleInputChange('githubUrl', e.target.value)}
            className='focus:border-primary border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]'
          />
          <p className='text-sm text-[#B5B5B5]'>
            E.g., "https://github.com/org" or "https://github.com/org/repo"
          </p>
        </div>

        {/* Project Website */}
        <div className='space-y-2'>
          <Label className='text-white'>Project Website (optional)</Label>
          <Input
            placeholder='Link to your project website/landing page'
            value={formData.websiteUrl}
            onChange={e => handleInputChange('websiteUrl', e.target.value)}
            className='focus:border-primary border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]'
          />
        </div>

        {/* Demo Video */}
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <Label className='text-white'>
              Demo Video (optional unless hackathons required)
            </Label>
            <Info className='h-4 w-4 text-[#919191]' />
          </div>
          <Input
            placeholder='Link to demo video (YouTube video recommended)'
            value={formData.demoVideoUrl}
            onChange={e => handleInputChange('demoVideoUrl', e.target.value)}
            className='focus:border-primary border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]'
          />
          <div className='flex items-start space-x-2'>
            <Lightbulb className='mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500' />
            <p className='text-sm text-[#B5B5B5]'>
              Tip: A YouTube video link will be displayed as an embedded player.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className='space-y-3'>
          <Label className='text-white'>
            Social links (at least one link){' '}
            <span className='text-red-500'>*</span>
          </Label>
          {formData.socialLinks.map((link, index) => (
            <Input
              key={index}
              placeholder='Link URL (newsletters/social account)'
              value={link}
              onChange={e => handleSocialLinkChange(index, e.target.value)}
              className='focus:border-primary border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]'
            />
          ))}
          <p className='text-sm text-[#B5B5B5]'>
            You can add up to 3 social links on your BUIDL profile, e.g.,
            Facebook Page, Farcaster, Instagram, Substack, X/Twitter, YakiHonne,
            etc.
          </p>
          {errors.socialLinks && (
            <p className='text-sm text-red-500'>{errors.socialLinks}</p>
          )}
        </div>
      </div>
    );
  }
);

Basic.displayName = 'Basic';

export default Basic;
