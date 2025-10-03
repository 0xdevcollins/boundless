'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import FormHint from '@/components/form/FormHint';
import Image from 'next/image';

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

// Zod schema for validation
const imageFileSchema = z
  .custom<File>(
    (val): val is File => typeof File !== 'undefined' && val instanceof File
  )
  .refine(file => ['image/jpeg', 'image/png'].includes(file.type), {
    message: 'Only JPEG and PNG files are allowed',
  })
  .refine(file => file.size <= 2 * 1024 * 1024, {
    message: 'File size must be less than 2MB',
  });

const basicSchema = z.object({
  projectName: z.string().trim().min(1, 'Project name is required'),
  logo: imageFileSchema,
  vision: z
    .string()
    .trim()
    .min(1, 'Vision is required')
    .max(300, 'Vision must be 300 characters or less'),
  category: z.string().trim().min(1, 'Category is required'),
  githubUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  demoVideoUrl: z.string().url().optional().or(z.literal('')),
  socialLinks: z
    .array(z.string().trim())
    .refine(
      arr => arr.some(link => link.length > 0),
      'At least one social link is required'
    ),
});

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
    const [touched, setTouched] = useState<
      Partial<Record<keyof BasicFormData | 'socialLinks', boolean>>
    >({});
    const [submitted, setSubmitted] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

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
        setTouched(prev => ({ ...prev, logo: true }));
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

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);

      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        setTouched(prev => ({ ...prev, logo: true }));

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
      // Normalize social links (trim empties but keep array length for UI)
      const parsed = basicSchema.safeParse({
        ...formData,
        socialLinks: formData.socialLinks.map(s => s.trim()),
      });

      if (parsed.success) {
        setErrors({});
        return true;
      }

      const fieldErrors: Partial<Record<keyof BasicFormData, string>> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof BasicFormData | undefined;
        if (path) {
          fieldErrors[path] = issue.message;
        }
      }
      // If logo is null, zod will also error; add friendly message
      if (!formData.logo && !fieldErrors.logo)
        fieldErrors.logo = 'Logo is required';

      setErrors(fieldErrors);
      return false;
    };

    // Field-level validation on blur
    const validateField = (field: keyof BasicFormData | 'socialLinks') => {
      setTouched(prev => ({ ...prev, [field]: true }));
      try {
        switch (field) {
          case 'projectName':
            basicSchema
              .pick({ projectName: true })
              .parse({ projectName: formData.projectName });
            setErrors(prev => ({ ...prev, projectName: undefined }));
            break;
          case 'vision':
            basicSchema
              .pick({ vision: true })
              .parse({ vision: formData.vision });
            setErrors(prev => ({ ...prev, vision: undefined }));
            break;
          case 'category':
            basicSchema
              .pick({ category: true })
              .parse({ category: formData.category });
            setErrors(prev => ({ ...prev, category: undefined }));
            break;
          case 'githubUrl':
            if (formData.githubUrl)
              basicSchema
                .pick({ githubUrl: true })
                .parse({ githubUrl: formData.githubUrl });
            setErrors(prev => ({ ...prev, githubUrl: undefined }));
            break;
          case 'websiteUrl':
            if (formData.websiteUrl)
              basicSchema
                .pick({ websiteUrl: true })
                .parse({ websiteUrl: formData.websiteUrl });
            setErrors(prev => ({ ...prev, websiteUrl: undefined }));
            break;
          case 'demoVideoUrl':
            if (formData.demoVideoUrl)
              basicSchema
                .pick({ demoVideoUrl: true })
                .parse({ demoVideoUrl: formData.demoVideoUrl });
            setErrors(prev => ({ ...prev, demoVideoUrl: undefined }));
            break;
          case 'logo':
            // handled on change
            break;
          case 'socialLinks':
            {
              const ok = formData.socialLinks.some(s => s.trim().length > 0);
              setErrors(prev => ({
                ...prev,
                socialLinks: ok
                  ? undefined
                  : 'At least one social link is required',
              }));
            }
            break;
        }
      } catch (e: unknown) {
        // Zod throws on parse; map first error
        if (e && typeof e === 'object' && 'issues' in e) {
          const zodError = e as { issues: Array<{ message: string }> };
          const issue = zodError.issues?.[0];
          const msg = issue?.message as string | undefined;
          const k = field as keyof BasicFormData;
          setErrors(prev => ({ ...prev, [k]: msg || 'Invalid value' }));
        }
      }
    };

    // Expose validation function to parent
    React.useImperativeHandle(ref, () => ({
      validate: validateForm,
      markSubmitted: () => setSubmitted(true),
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
            onBlur={() => validateField('projectName')}
            className={cn(
              'focus-visible:border-primary border-[#484848] bg-[#1A1A1A] p-4 text-white placeholder:text-[#919191]',
              (submitted || touched.projectName) &&
                errors.projectName &&
                'border-red-500'
            )}
          />
          {(submitted || touched.projectName) && errors.projectName && (
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
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                'flex h-32 w-32 cursor-pointer items-center justify-center rounded-[12px] border border-[#2B2B2B] bg-[#101010] transition-colors xl:h-[200px] xl:w-[200px]',
                formData.logo
                  ? 'border-primary bg-primary/5'
                  : 'hover:border-primary border-[#484848]',
                (submitted || touched.logo) && errors.logo && 'border-red-500',
                isDragOver && 'border-primary bg-primary/10 scale-105'
              )}
            >
              {formData.logo ? (
                <div className='flex flex-col items-center space-y-2'>
                  {}
                  <Image
                    src={URL.createObjectURL(formData.logo)}
                    alt='Project logo'
                    className='h-32 w-32 rounded object-cover'
                    width={128}
                    height={128}
                  />
                  <span className='text-xs text-white'>Change</span>
                </div>
              ) : isDragOver ? (
                <div className='flex flex-col items-center space-y-2'>
                  <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M17.875 2.75012H9.65C6.70972 2.75012 5.23959 2.75012 4.11655 3.32234C3.1287 3.82567 2.32555 4.62882 1.82222 5.61667C1.25 6.73971 1.25 8.20985 1.25 11.1501V25.8501C1.25 28.7904 1.25 30.2605 1.82222 31.3836C2.32555 32.3714 3.1287 33.1746 4.11655 33.6779C5.23959 34.2501 6.70972 34.2501 9.65 34.2501H25.75C27.3775 34.2501 28.1912 34.2501 28.8588 34.0712C30.6705 33.5858 32.0857 32.1707 32.5711 30.3589C32.75 29.6913 32.75 28.8776 32.75 27.2501M29.25 11.5001V1.00012M24 6.25012H34.5M14.375 12.3751C14.375 14.3081 12.808 15.8751 10.875 15.8751C8.942 15.8751 7.375 14.3081 7.375 12.3751C7.375 10.4421 8.942 8.87512 10.875 8.87512C12.808 8.87512 14.375 10.4421 14.375 12.3751ZM22.2326 18.3569L7.42951 31.8142C6.59688 32.5711 6.18057 32.9496 6.14375 33.2775C6.11183 33.5616 6.22079 33.8435 6.43557 34.0323C6.68336 34.2501 7.24599 34.2501 8.37125 34.2501H24.798C27.3165 34.2501 28.5758 34.2501 29.5649 33.827C30.8065 33.2959 31.7957 32.3066 32.3269 31.065C32.75 30.0759 32.75 28.8166 32.75 26.2981C32.75 25.4507 32.75 25.027 32.6574 24.6324C32.5409 24.1365 32.3177 23.672 32.0032 23.2713C31.7529 22.9525 31.4221 22.6878 30.7604 22.1584L25.8652 18.2423C25.2029 17.7125 24.8718 17.4476 24.5071 17.3541C24.1857 17.2717 23.8475 17.2823 23.5319 17.3848C23.1739 17.5011 22.8601 17.7864 22.2326 18.3569Z'
                      stroke='#A7F950'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <span className='text-primary text-xs font-medium'>
                    Drop image here
                  </span>
                </div>
              ) : (
                <div className='flex flex-col items-center space-y-2'>
                  <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M17.875 2.75012H9.65C6.70972 2.75012 5.23959 2.75012 4.11655 3.32234C3.1287 3.82567 2.32555 4.62882 1.82222 5.61667C1.25 6.73971 1.25 8.20985 1.25 11.1501V25.8501C1.25 28.7904 1.25 30.2605 1.82222 31.3836C2.32555 32.3714 3.1287 33.1746 4.11655 33.6779C5.23959 34.2501 6.70972 34.2501 9.65 34.2501H25.75C27.3775 34.2501 28.1912 34.2501 28.8588 34.0712C30.6705 33.5858 32.0857 32.1707 32.5711 30.3589C32.75 29.6913 32.75 28.8776 32.75 27.2501M29.25 11.5001V1.00012M24 6.25012H34.5M14.375 12.3751C14.375 14.3081 12.808 15.8751 10.875 15.8751C8.942 15.8751 7.375 14.3081 7.375 12.3751C7.375 10.4421 8.942 8.87512 10.875 8.87512C12.808 8.87512 14.375 10.4421 14.375 12.3751ZM22.2326 18.3569L7.42951 31.8142C6.59688 32.5711 6.18057 32.9496 6.14375 33.2775C6.11183 33.5616 6.22079 33.8435 6.43557 34.0323C6.68336 34.2501 7.24599 34.2501 8.37125 34.2501H24.798C27.3165 34.2501 28.5758 34.2501 29.5649 33.827C30.8065 33.2959 31.7957 32.3066 32.3269 31.065C32.75 30.0759 32.75 28.8166 32.75 26.2981C32.75 25.4507 32.75 25.027 32.6574 24.6324C32.5409 24.1365 32.3177 23.672 32.0032 23.2713C31.7529 22.9525 31.4221 22.6878 30.7604 22.1584L25.8652 18.2423C25.2029 17.7125 24.8718 17.4476 24.5071 17.3541C24.1857 17.2717 23.8475 17.2823 23.5319 17.3848C23.1739 17.5011 22.8601 17.7864 22.2326 18.3569Z'
                      stroke='#919191'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <span className='text-xs text-[#919191]'>
                    Click or drag to upload
                  </span>
                </div>
              )}
            </label>
          </div>
          <div className='flex items-start gap-x-1.5'>
            <FormHint
              hint={
                <span>
                  Accepted files should be JPEG or PNG, and less than 2 MB.
                </span>
              }
              side='top'
            />
            <div className='space-y-1 text-sm text-[#B5B5B5]'>
              <p>
                Accepted file type:{' '}
                <span className='font-medium text-white'>JPEG</span> or{' '}
                <span className='font-medium text-white'>PNG</span>, and less
                than <span className='font-medium text-white'>2 MB</span>.
              </p>
              <p>
                A size of{' '}
                <span className='font-medium text-white'>480 x 480 px</span> is
                recommended.
              </p>
            </div>
            {(submitted || touched.logo) && errors.logo && (
              <p className='text-sm text-red-500'>{errors.logo}</p>
            )}
          </div>
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
            onBlur={() => validateField('vision')}
            className={cn(
              'focus-visible:border-primary min-h-24 resize-none border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191] xl:min-h-[172px]',
              (submitted || touched.vision) && errors.vision && 'border-red-500'
            )}
            maxLength={300}
          />
          <div className='flex items-start gap-x-1.5'>
            <FormHint
              hint={
                <span>
                  Describe your project's long-term goal or the positive change
                  it will bring to people, communities, or industries.
                </span>
              }
              side='top'
            />
            <p className='text-sm text-[#B5B5B5]'>
              Describe your project's long-term goal or the positive change it
              will bring to people, communities, or industries.
            </p>
          </div>
          {(submitted || touched.vision) && errors.vision && (
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
            className='flex flex-wrap gap-3'
          >
            {categories.map(category => (
              <div
                key={category}
                className={cn(
                  'flex w-fit items-center space-x-3 rounded-[6px] border border-[#2B2B2B] bg-[#2B2B2B3D] p-3',
                  formData.category === category && 'bg-[#A7F9501F]'
                )}
              >
                <RadioGroupItem
                  value={category}
                  id={category}
                  className={cn(
                    'text-primary border-[#B5B5B5] bg-transparent',
                    formData.category === category && 'border-primary'
                  )}
                />
                <Label
                  htmlFor={category}
                  className={cn(
                    'cursor-pointer text-sm font-normal',
                    formData.category === category
                      ? 'text-primary'
                      : 'text-[#B5B5B5]'
                  )}
                >
                  {category}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {(submitted || touched.category) && errors.category && (
            <p className='text-sm text-red-500'>{errors.category}</p>
          )}
        </div>

        {/* GitHub/GitLab/Bitbucket */}
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <Label className='text-white'>
              GitHub/Gitlab/Bitbucket (optional unless hackathons required)
            </Label>
            <Info className='h-4 w-4 text-white' />
          </div>
          <Input
            placeholder='Link to GitHub repo or profile'
            value={formData.githubUrl}
            onChange={e => handleInputChange('githubUrl', e.target.value)}
            onBlur={() => validateField('githubUrl')}
            className='focus-visible:border-primary border-[#484848] bg-[#1A1A1A] p-4 text-white placeholder:text-[#919191]'
          />
          <div className='flex items-center gap-x-1.5'>
            <FormHint
              hint="E.g., 'https://github.com/org' or 'https://github.com/org/repo'"
              side='top'
              iconClassName='mt-0'
            />
            <p className='text-sm text-[#B5B5B5]'>
              E.g., "https://github.com/org" or "https://github.com/org/repo"
            </p>
          </div>
        </div>

        {/* Project Website */}
        <div className='space-y-2'>
          <Label className='text-white'>Project Website (optional)</Label>
          <Input
            placeholder='Link to your project website/landing page'
            value={formData.websiteUrl}
            onChange={e => handleInputChange('websiteUrl', e.target.value)}
            onBlur={() => validateField('websiteUrl')}
            className='focus-visible:border-primary border-[#484848] bg-[#1A1A1A] p-4 text-white placeholder:text-[#919191]'
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
            onBlur={() => validateField('demoVideoUrl')}
            className='focus-visible:border-primary border-[#484848] bg-[#1A1A1A] p-4 text-white placeholder:text-[#919191]'
          />
          <div className='flex items-start space-x-2'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_2813_60981)'>
                <path
                  d='M8.33366 14.7153V16.6665C8.33366 17.587 9.07985 18.3332 10.0003 18.3332C10.9208 18.3332 11.667 17.587 11.667 16.6665V14.7153M10.0003 1.6665V2.49984M2.50033 9.99984H1.66699M4.58366 4.58317L4.08358 4.08309M15.417 4.58317L15.9172 4.08309M18.3337 9.99984H17.5003M15.0003 9.99984C15.0003 12.7613 12.7618 14.9998 10.0003 14.9998C7.2389 14.9998 5.00033 12.7613 5.00033 9.99984C5.00033 7.23841 7.2389 4.99984 10.0003 4.99984C12.7618 4.99984 15.0003 7.23841 15.0003 9.99984Z'
                  stroke='#DBF936'
                  strokeWidth='1.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
              <defs>
                <clipPath id='clip0_2813_60981'>
                  <rect width='20' height='20' fill='white' />
                </clipPath>
              </defs>
            </svg>
            <p className='text-sm text-[#DBF936]'>
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
              onBlur={() => validateField('socialLinks')}
              className='focus-visible:border-primary border-[#484848] bg-[#1A1A1A] p-4 text-white placeholder:text-[#919191]'
            />
          ))}
          <div className='flex items-start gap-x-1.5'>
            <FormHint
              hint="E.g., 'https://github.com/org' or 'https://github.com/org/repo'"
              side='top'
            />
            <p className='text-sm text-[#B5B5B5]'>
              You can add up to 3 social links on your BUIDL profile, e.g.,
              Facebook Page, Farcaster, Instagram, Substack, X/Twitter,
              YakiHonne, etc.
            </p>
          </div>
          {(submitted || touched.socialLinks) && errors.socialLinks && (
            <p className='text-sm text-red-500'>{errors.socialLinks}</p>
          )}
        </div>
      </div>
    );
  }
);

Basic.displayName = 'Basic';

export default Basic;
