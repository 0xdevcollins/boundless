'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { formatBytes } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { DollarSign, Package, Trash, X } from 'lucide-react';
import { Input } from '../ui/input';

const fundingGoals = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Education', label: 'Education' },
  { value: 'Environment', label: 'Environment' },
  { value: 'Social', label: 'Social' },
  { value: 'Other', label: 'Other' },
];

const projectTags = [
  { value: 'defi', label: 'DeFi' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'nft', label: 'NFT' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'public-good', label: 'Public Good' },
];

export interface ProjectSubmissionData {
  title: string;
  tagline: string;
  description: string;
  category: string;
  fundAmount: number;
  tags: string[];
  whitepaperFile?: File | null;
  thumbnailFile?: File | null;
}

interface ProjectSubmissionFormProps {
  onComplete: (data: ProjectSubmissionData) => void;
  initialData?: ProjectSubmissionData;
  onChange?: (data: ProjectSubmissionData) => void;
}

function ProjectSubmissionForm({
  onComplete,
  initialData,
  onChange,
}: ProjectSubmissionFormProps) {
  const [projectTitle, setProjectTitle] = useState(initialData?.title ?? '');
  const [projectTagline, setProjectTagline] = useState(
    initialData?.tagline ?? ''
  );
  const [projectDescription, setProjectDescription] = useState(
    initialData?.description ?? ''
  );
  const [category, setCategory] = useState(initialData?.category ?? '');
  const [fundAmount, setFundAmount] = useState(
    initialData?.fundAmount != null ? String(initialData.fundAmount) : ''
  );
  const [whitepaperFile, setWhitepaperFile] = useState<File | null>(
    initialData?.whitepaperFile ?? null
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(
    initialData?.thumbnailFile ?? null
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [isFormValid, setIsFormValid] = useState(false);
  const [tagQuery, setTagQuery] = useState('');
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const whitepaperInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const allFieldsFilled =
      projectTitle.trim() !== '' &&
      projectTagline.trim() !== '' &&
      projectDescription.trim() !== '' &&
      category.trim() !== '' &&
      fundAmount.trim() !== '' &&
      whitepaperFile !== null &&
      thumbnailFile !== null;
    setIsFormValid(allFieldsFilled);
    const snapshot: ProjectSubmissionData = {
      title: projectTitle,
      tagline: projectTagline,
      description: projectDescription,
      category,
      fundAmount: Number(fundAmount || 0),
      tags,
      whitepaperFile: whitepaperFile ?? null,
      thumbnailFile: thumbnailFile ?? null,
    };
    onChange?.(snapshot);
  }, [
    projectTitle,
    projectTagline,
    projectDescription,
    category,
    fundAmount,
    whitepaperFile,
    thumbnailFile,
    tags,
    onChange,
  ]);

  const normalizeTag = (value: string) => value.trim();

  const handleAddTag = (rawTag: string) => {
    const tag = normalizeTag(rawTag);
    if (!tag) return;
    if (tags.includes(tag)) return;
    setTags(prev => [...prev, tag]);
    setTagQuery('');
    setIsSuggestionsOpen(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleRemoveFile = (fileType: 'whitepaper' | 'thumbnail') => {
    if (fileType === 'whitepaper') {
      setWhitepaperFile(null);
      if (whitepaperInputRef.current) {
        whitepaperInputRef.current.value = '';
      }
    } else if (fileType === 'thumbnail') {
      setThumbnailFile(null);
      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = '';
      }
    }
  };

  const handleNext = () => {
    if (!isFormValid) return;
    const submissionData: ProjectSubmissionData = {
      title: projectTitle,
      tagline: projectTagline,
      description: projectDescription,
      category,
      fundAmount: Number(fundAmount),
      tags,
      whitepaperFile: whitepaperFile ?? null,
      thumbnailFile: thumbnailFile ?? null,
    };
    onComplete(submissionData);
  };

  return (
    <div className='text-white'>
      <h5>Submit your project information</h5>
      <div className='w-[500px] flex flex-col gap-3 pt-3 pb-6'>
        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium'>
            Project Title <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-12 flex items-center gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <Package className='size-5 text-card' />
            <input
              value={projectTitle}
              onChange={e => setProjectTitle(e.target.value)}
              type='text'
              className='w-full bg-transparent font-normal text-base text-placeholder focus:outline-none'
              placeholder='Enter project title'
            />
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium'>
            Project Tagline <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-12 flex items-center gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <input
              value={projectTagline}
              onChange={e => setProjectTagline(e.target.value)}
              type='text'
              className='w-full bg-transparent font-normal text-base text-placeholder focus:outline-none'
              placeholder='Enter your one-liner'
            />
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium flex justify-between'>
            <span>
              Project Description <span className='text-red-500'>*</span>
            </span>
            <span className='text-card/60'>
              {projectDescription.length}/400
            </span>
          </label>
          <Textarea
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
            maxLength={400}
            className='resize-none font-normal text-base text-placeholder rounded-[12px] bg-stepper-foreground w-full min-h-[120px] border border-stepper-border focus-visible:ring-0'
            placeholder='Describe your project in a few words'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium'>
            Category <span className='text-red-500'>*</span>
          </label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className='w-full !h-12 flex items-center !gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border focus:ring-0'>
              <div className='flex items-center gap-2'>
                <Image src='/select.svg' width={20} height={20} alt='icon' />
                <SelectValue placeholder='Select a category' />
              </div>
            </SelectTrigger>
            <SelectContent className='max-h-[200px] bg-background rounded-[12px] font-normal text-base text-placeholder border border-stepper-border overflow-y-auto'>
              {fundingGoals.map(goal => (
                <SelectItem key={goal.value} value={goal.value}>
                  {goal.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium'>
            Fund Amount <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-12 flex items-center gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <DollarSign className='size-5 text-card' />
            <Input
              value={fundAmount}
              onChange={e => setFundAmount(e.target.value)}
              type='number'
              className='w-full bg-transparent font-normal text-base text-placeholder focus:outline-none !border-none'
              placeholder='Enter the amount you need to fund this project'
            />
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='' className='text-xs text-card font-medium'>
            Upload Whitepaper or Detailed Proposal{' '}
            <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-[83px] flex justify-between p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <div className='flex gap-3 items-center'>
              <div className='bg-card size-12 rounded-full justify-center items-center flex'>
                {whitepaperFile ? (
                  <Image
                    src='/green-circle.svg'
                    width={24}
                    height={24}
                    alt='upload'
                  />
                ) : (
                  <Image
                    src='/upload.svg'
                    width={24}
                    height={24}
                    alt='upload'
                  />
                )}
              </div>
              <div className='space-y-1'>
                {whitepaperFile ? (
                  <>
                    <h5 className='font-semibold text-card text-base'>
                      {whitepaperFile.name}
                    </h5>
                    <p className='font-normal text-sm text-[#40B869] flex gap-0.5 items-center'>
                      Upload complete
                      <div className='size-1 bg-placeholder rounded-full' />
                      <span className='text-placeholder'>
                        {formatBytes(whitepaperFile.size)}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <h5 className='font-semibold text-card text-base'>
                      Upload your document
                    </h5>
                    <p className='font-normal text-sm text-placeholder flex gap-0.5 items-center'>
                      PDF, Docs{' '}
                      <span className='size-1 bg-placeholder rounded-full'></span>
                      Max. 20MB
                    </p>
                  </>
                )}
              </div>
            </div>
            <input
              type='file'
              className='hidden'
              ref={whitepaperInputRef}
              onChange={e => setWhitepaperFile(e.target.files?.[0] ?? null)}
              accept='.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            />
            {whitepaperFile ? (
              <button
                type='button'
                className='text-base font-normal text-background bg-transparent px-4 py-2 rounded-[10px]'
                onClick={() => handleRemoveFile('whitepaper')}
              >
                <Trash className='text-red-500' />
              </button>
            ) : (
              <button
                type='button'
                className='text-base font-normal text-background bg-primary px-4 py-2 rounded-[10px]'
                onClick={() => whitepaperInputRef.current?.click()}
              >
                Upload
              </button>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='' className='text-xs text-card font-medium'>
            Upload Project Thumbnail <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-[83px] flex justify-between p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <div className='flex gap-3 items-center'>
              <div className='bg-card size-12 rounded-full justify-center items-center flex'>
                {thumbnailFile ? (
                  <Image
                    src='/green-circle.svg'
                    width={24}
                    height={24}
                    alt='upload'
                  />
                ) : (
                  <Image
                    src='/upload.svg'
                    width={24}
                    height={24}
                    alt='upload'
                  />
                )}
              </div>
              <div className='space-y-1'>
                {thumbnailFile ? (
                  <>
                    <h5 className='font-semibold text-card text-base'>
                      {thumbnailFile.name}
                    </h5>
                    <p className='font-normal text-sm text-[#40B869] flex gap-0.5 items-center'>
                      Upload complete
                      <div className='size-1 bg-placeholder rounded-full' />
                      <span className='text-placeholder'>
                        {formatBytes(thumbnailFile.size)}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <h5 className='font-semibold text-card text-base'>
                      Upload your image
                    </h5>
                    <p className='font-normal text-sm text-placeholder flex gap-0.5 items-center'>
                      JPG, PNG, GIF{' '}
                      <span className='size-1 bg-placeholder rounded-full'></span>
                      Max. 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
            <input
              type='file'
              className='hidden'
              ref={thumbnailInputRef}
              onChange={e => setThumbnailFile(e.target.files?.[0] ?? null)}
              accept='image/png, image/jpeg, image/gif'
            />
            {thumbnailFile ? (
              <button
                type='button'
                className='text-base font-normal text-background bg-transparent px-4 py-2 rounded-[10px]'
                onClick={() => handleRemoveFile('thumbnail')}
              >
                <Trash className='text-red-500' />
              </button>
            ) : (
              <button
                type='button'
                className='text-base font-normal text-background bg-primary px-4 py-2 rounded-[10px]'
                onClick={() => thumbnailInputRef.current?.click()}
              >
                Upload
              </button>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-xs text-card font-medium flex items-center justify-between'>
            Tags <span className='text-placeholder'>Optional</span>
          </label>
          <div className='relative'>
            <div className='w-full min-h-12 flex items-center gap-2 p-2 rounded-[12px] bg-stepper-foreground border border-stepper-border flex-wrap'>
              {tags.map(tag => (
                <Badge
                  key={tag}
                  className='flex items-center gap-1 bg-background text-card'
                >
                  {projectTags.find(t => t.value === tag)?.label || tag}
                  <button
                    type='button'
                    className='ml-1 rounded-full outline-none hover:bg-destructive/20'
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X className='size-3' />
                  </button>
                </Badge>
              ))}
              <input
                type='text'
                value={tagQuery}
                onChange={e => {
                  setTagQuery(e.target.value);
                  setIsSuggestionsOpen(true);
                }}
                onFocus={() => setIsSuggestionsOpen(true)}
                onBlur={() => {
                  // Delay closing to allow click on suggestion
                  setTimeout(() => setIsSuggestionsOpen(false), 120);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    handleAddTag(tagQuery);
                  } else if (
                    e.key === 'Backspace' &&
                    tagQuery === '' &&
                    tags.length > 0
                  ) {
                    handleRemoveTag(tags[tags.length - 1]);
                  }
                }}
                className='flex-1 min-w-[140px] bg-transparent font-normal text-base text-placeholder focus:outline-none placeholder:text-placeholder/60'
                placeholder='Type and press Enter'
                aria-label='Add tag'
              />
            </div>

            {isSuggestionsOpen && tagQuery.trim().length > 0 && (
              <div className='absolute z-50 mt-1 w-full max-h-40 overflow-auto bg-background border border-stepper-border rounded-md shadow-md'>
                <ul className='py-1'>
                  {projectTags
                    .filter(
                      t =>
                        !tags.includes(t.value) &&
                        (t.label
                          .toLowerCase()
                          .includes(tagQuery.toLowerCase()) ||
                          t.value
                            .toLowerCase()
                            .includes(tagQuery.toLowerCase()))
                    )
                    .map(t => (
                      <li key={t.value}>
                        <button
                          type='button'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => handleAddTag(t.value)}
                          className='w-full text-left px-3 py-2 hover:bg-stepper-foreground text-card'
                        >
                          {t.label}
                        </button>
                      </li>
                    ))}

                  {!projectTags.some(
                    t =>
                      t.value.toLowerCase() === tagQuery.toLowerCase() ||
                      t.label.toLowerCase() === tagQuery.toLowerCase()
                  ) &&
                    !tags.includes(tagQuery.trim()) && (
                      <li>
                        <button
                          type='button'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => handleAddTag(tagQuery)}
                          className='w-full text-left px-3 py-2 hover:bg-stepper-foreground text-card/80'
                        >
                          Create "{tagQuery.trim()}"
                        </button>
                      </li>
                    )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <button
          type='button'
          disabled={!isFormValid}
          onClick={handleNext}
          className={`w-[171px] mt-4 text-base font-medium px-4 py-2 rounded-[10px] transition-colors ${
            isFormValid
              ? 'bg-primary text-background border border-primary'
              : 'bg-stepper-foreground text-card/30 border border-stepper-border cursor-not-allowed'
          }`}
        >
          Set Milestone
        </button>
      </div>
    </div>
  );
}

export default ProjectSubmissionForm;
