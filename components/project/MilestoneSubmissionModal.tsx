'use client';

import React, { useState } from 'react';
import BoundlessSheet from '../sheet/boundless-sheet';
import { BoundlessButton } from '../buttons/BoundlessButton';
import { Label } from '../ui/label';
import {
  Calendar,
  Coins,
  Link as LinkIcon,
  ChevronUp,
  CloudUpload,
  Check,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MilestoneSubmissionSuccess from './MilestoneSubmissionSuccess';

export interface MilestoneSubmissionData {
  files: File[];
  externalLinks: string[];
}

interface MilestoneSubmissionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  milestone: {
    id: string;
    title: string;
    description: string;
    deliveryDate: string;
    fundAmount: number;
    status: 'ready' | 'pending' | 'completed' | 'failed';
  };
  onSubmit: (data: MilestoneSubmissionData) => void;
  loading?: boolean;
}

const MilestoneSubmissionModal: React.FC<MilestoneSubmissionModalProps> = ({
  open,
  setOpen,
  milestone,
  onSubmit,
  loading = false,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [externalLinks, setExternalLinks] = useState<string[]>(['www.']);
  const [isExpanded, setIsExpanded] = useState(true);
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleExternalLinkChange = (index: number, value: string) => {
    const newLinks = [...externalLinks];
    // Ensure the value starts with "www."
    if (!value.startsWith('www.')) {
      newLinks[index] = 'www.' + value;
    } else {
      newLinks[index] = value;
    }
    setExternalLinks(newLinks);
  };

  const handleSaveLink = () => {
    // Add a new field with "www."
    setExternalLinks(prev => [...prev, 'www.']);
  };

  const handleSubmit = () => {
    const filteredLinks = externalLinks.filter(link => link.trim() !== '');
    onSubmit({
      files,
      externalLinks: filteredLinks,
    });
    setShowSuccess(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <BoundlessSheet open={open} setOpen={setOpen} size='large'>
      {showSuccess ? (
        <MilestoneSubmissionSuccess
          onContinue={() => {
            setShowSuccess(false);
            setOpen(false);
          }}
        />
      ) : (
        <div className='space-y-6'>
          {/* Milestone Header */}
          <div className='flex justify-center'>
            <div className='text-left' style={{ width: '500px' }}>
              <h2 className='text-xl font-semibold text-white mb-2'>
                Milestone Summary
              </h2>
              <p className='text-sm text-gray-400'>Milestone 1</p>
            </div>
          </div>

          {/* Milestone Card - Centered */}
          <div className='flex justify-center'>
            <div
              className='bg-[#1C1C1C] border border-[#2B2B2B] rounded-[12px]'
              style={{
                width: '500px',
                height: '210px',
                padding: '16px',
                gap: '12px',
              }}
            >
              <div className='flex items-start justify-between mb-3'>
                <h3 className='text-white font-semibold text-base'>
                  {milestone.title}
                </h3>
                <div className='flex items-center gap-2'>
                  <span className='px-2 py-1 rounded-full text-xs font-medium bg-[#012657] text-white'>
                    {milestone.status.charAt(0).toUpperCase() +
                      milestone.status.slice(1)}
                  </span>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='text-white hover:text-gray-300 transition-colors'
                  >
                    <ChevronUp
                      className={cn(
                        'w-4 h-4 transition-transform',
                        !isExpanded && 'rotate-180'
                      )}
                    />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <>
                  <p className='text-gray-300 text-sm mb-4 leading-relaxed'>
                    {milestone.description}
                  </p>

                  <div className='flex items-center gap-6 text-sm text-gray-400'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4' />
                      <span>1 {formatDate(milestone.deliveryDate)}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Coins className='w-4 h-4' />
                      <span>{formatCurrency(milestone.fundAmount)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* File Upload Section */}
          <div className='flex justify-center'>
            <div className='space-y-3' style={{ width: '500px' }}>
              <h3 className='text-white font-medium text-lg'>
                Upload Proof of Completion
              </h3>

              <div className='text-left'>
                <Label className='text-white font-medium'>
                  File Upload <span className='text-red-500'>*</span>
                </Label>
              </div>

              <div className='border-2 border-dashed border-[#2B2B2B] rounded-xl p-6 bg-[#1C1C1C] flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div
                    className='rounded-full flex items-center justify-center'
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#FFFFFF',
                      opacity: 1,
                    }}
                  >
                    <CloudUpload className='w-6 h-6 text-[#1C1C1C]' />
                  </div>

                  <div className='text-left'>
                    <p className='text-white font-medium'>Upload your files</p>
                    <p className='text-gray-400 text-sm'>
                      JPEG, PNG, PDF, Docs • Max. 20MB
                    </p>
                  </div>
                </div>

                <BoundlessButton
                  variant='default'
                  onClick={() =>
                    document.getElementById('file-upload')?.click()
                  }
                >
                  Upload
                </BoundlessButton>

                <input
                  id='file-upload'
                  type='file'
                  multiple
                  accept='.jpg,.jpeg,.png,.pdf,.doc,.docx'
                  onChange={handleFileUpload}
                  className='hidden'
                />
              </div>

              {/* Uploaded Files Section */}
              {files.length > 0 && (
                <div className='space-y-3'>
                  {/* Header with count */}
                  <div className='flex items-center gap-2'>
                    <h3 className='text-white font-medium'>Uploaded Files</h3>
                    <div className='w-6 h-6 rounded-full bg-[#1C1C1C] border border-white flex items-center justify-center'>
                      <span className='text-white text-xs font-medium'>
                        {files.length}
                      </span>
                    </div>
                  </div>

                  {/* Files List */}
                  <div className='space-y-2'>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-3'
                      >
                        <div className='flex items-center gap-3'>
                          {/* Green check circle */}
                          <div className='w-6 h-6 rounded-full bg-green-500 flex items-center justify-center'>
                            <Check className='w-3 h-3 text-white' />
                          </div>

                          {/* File info */}
                          <div className='flex flex-col'>
                            <span className='text-white text-sm font-medium'>
                              {file.name}
                            </span>
                            <div className='flex items-center gap-2'>
                              <span className='text-green-400 text-xs'>
                                Upload complete
                              </span>
                              <span className='text-gray-400 text-xs'>•</span>
                              <span className='text-white text-xs'>
                                {(file.size / (1024 * 1024)).toFixed(1)}MB
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Red trash button */}
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className='w-8 h-8 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors'
                        >
                          <Trash2 className='w-4 h-4 text-white' />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* External Links Section */}
          <div className='flex justify-center'>
            <div className='space-y-3' style={{ width: '500px' }}>
              <Label className='text-white font-medium'>
                Links to External Evidence
              </Label>

              {externalLinks.map((link, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <div className='flex-1 relative'>
                    <LinkIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <input
                      type='url'
                      placeholder=''
                      value={link}
                      onChange={e =>
                        handleExternalLinkChange(index, e.target.value)
                      }
                      onFocus={() => setFocusedInput(index)}
                      onBlur={() => setFocusedInput(null)}
                      style={{
                        width: '500px',
                        height: '48px',
                        borderRadius: '12px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor:
                          focusedInput === index ? '#A7F950' : '#2B2B2B',
                        backgroundColor: '#1C1C1C',
                        color: '#FFFFFF',
                        paddingLeft: '40px',
                        paddingRight:
                          link.trim() && link !== 'www.' ? '80px' : '16px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        gap: '12px',
                        opacity: 1,
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      className='placeholder:text-gray-400'
                    />

                    {/* Save button - only show when there's more text than just "www." */}
                    {link.trim() && link !== 'www.' && (
                      <BoundlessButton
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 w-[65px] h-[36px] rounded-[10px] border-[0.3px] border-[#A7F950] bg-[#A7F950] text-black text-[14px] font-[500] transition-colors'
                        style={{
                          backgroundImage:
                            'linear-gradient(314.7deg, rgba(147, 229, 60, 0.14) 3.33%, rgba(117, 199, 30, 0) 21.54%, rgba(107, 185, 20, 0.14) 87.82%)',
                        }}
                        onClick={handleSaveLink}
                      >
                        Save
                      </BoundlessButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <BoundlessButton
              onClick={handleSubmit}
              disabled={files.length === 0 || loading}
              className={cn(
                'w-[500px] h-[40px] rounded-[10px] border-[1.4px] text-[14px] font-[500] transition-all duration-200',
                files.length === 0 || loading
                  ? 'border-[#2B2B2B] bg-[#1C1C1C] text-white opacity-50 cursor-not-allowed'
                  : 'border-[#A7F950] bg-[#A7F950] text-black hover:bg-[#8BE03A]'
              )}
              style={{
                backgroundImage:
                  files.length === 0 || loading
                    ? 'none'
                    : 'linear-gradient(314.7deg, rgba(147, 229, 60, 0.14) 3.33%, rgba(117, 199, 30, 0) 21.54%, rgba(107, 185, 20, 0.14) 87.82%)',
              }}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </BoundlessButton>
          </div>
        </div>
      )}
    </BoundlessSheet>
  );
};

export default MilestoneSubmissionModal;
