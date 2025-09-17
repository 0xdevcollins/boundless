'use client';

import React, { useState } from 'react';
import { BoundlessButton } from '../buttons/BoundlessButton';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Calendar,
  Coins,
  Upload,
  Link as LinkIcon,
  ChevronUp,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MilestoneSubmissionData } from './MilestoneSubmissionModal';
import { useWalletProtection } from '@/hooks/use-wallet-protection';
import WalletRequiredModal from '@/components/wallet/WalletRequiredModal';

interface MilestoneSubmissionPageProps {
  milestone: {
    id: string;
    title: string;
    description: string;
    deliveryDate: string;
    fundAmount: number;
    status: 'ready' | 'pending' | 'completed' | 'failed';
  };
  onSubmit: (data: MilestoneSubmissionData) => void;
  onBack: () => void;
  loading?: boolean;
}

const MilestoneSubmissionPage: React.FC<MilestoneSubmissionPageProps> = ({
  milestone,
  onSubmit,
  onBack,
  loading = false,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [externalLinks, setExternalLinks] = useState<string[]>(['']);
  const [isExpanded, setIsExpanded] = useState(true);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const {
    requireWallet,
    showWalletModal,
    handleWalletConnected,
    closeWalletModal,
  } = useWalletProtection({
    actionName: 'submit milestone',
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleExternalLinkChange = (index: number, value: string) => {
    const newLinks = [...externalLinks];
    newLinks[index] = value;
    setExternalLinks(newLinks);
  };

  const handleAddExternalLink = () => {
    setExternalLinks(prev => [...prev, '']);
  };

  const handleRemoveExternalLink = (index: number) => {
    if (externalLinks.length > 1) {
      setExternalLinks(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    requireWallet(() => {
      const filteredLinks = externalLinks.filter(link => link.trim() !== '');
      onSubmit({
        files,
        externalLinks: filteredLinks,
      });
    });
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
    <div className='min-h-screen bg-[#030303] text-white'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8 justify-center'>
          <BoundlessButton
            variant='ghost'
            onClick={onBack}
            className='text-white hover:text-gray-300'
          >
            <ArrowLeft className='w-5 h-5' />
          </BoundlessButton>
          <div>
            <h1 className='text-2xl font-bold text-white'>
              Milestone Submission
            </h1>
            <p className='text-gray-400'>
              Submit proof of completion for your milestone
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 justify-center'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6 flex flex-col items-center'>
            {/* Milestone Card */}
            <div className='bg-[#1C1C1C] border border-[#2B2B2B] rounded-xl p-6 self-start w-full max-w-2xl'>
              <div className='flex items-start justify-between mb-4'>
                <h2 className='text-xl font-semibold text-white'>
                  {milestone.title}
                </h2>
                <div className='flex items-center gap-2'>
                  <span className='px-3 py-1 rounded-full text-sm font-medium bg-[#012657] text-white'>
                    {milestone.status.charAt(0).toUpperCase() +
                      milestone.status.slice(1)}
                  </span>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='text-white hover:text-gray-300 transition-colors'
                  >
                    <ChevronUp
                      className={cn(
                        'w-5 h-5 transition-transform',
                        !isExpanded && 'rotate-180'
                      )}
                    />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <>
                  <p className='text-gray-300 text-base mb-6 leading-relaxed'>
                    {milestone.description}
                  </p>

                  <div className='flex items-center gap-8 text-sm text-gray-400'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-5 h-5' />
                      <span>1 {formatDate(milestone.deliveryDate)}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Coins className='w-5 h-5' />
                      <span>{formatCurrency(milestone.fundAmount)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className='bg-[#1C1C1C] border border-[#2B2B2B] rounded-xl p-6 space-y-4 self-start w-full max-w-2xl'>
              <div>
                <Label className='text-white font-medium text-lg'>
                  Upload Proof of Completion{' '}
                  <span className='text-red-500'>*</span>
                </Label>
                <p className='text-gray-400 text-sm mt-1'>
                  Upload files that demonstrate the completion of this milestone
                </p>
              </div>

              <div className='border-2 border-dashed border-[#2B2B2B] rounded-xl p-8 bg-[#0F0F0F]'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <Upload className='w-12 h-12 text-gray-400' />
                    <div>
                      <p className='text-white font-medium text-lg'>
                        Upload your files
                      </p>
                      <p className='text-gray-400 text-sm'>
                        JPEG, PNG, PDF, Docs • Max. 20MB
                      </p>
                    </div>
                  </div>
                  <BoundlessButton
                    variant='default'
                    size='lg'
                    onClick={() =>
                      document.getElementById('file-upload-page')?.click()
                    }
                  >
                    Upload
                  </BoundlessButton>
                </div>

                <input
                  id='file-upload-page'
                  type='file'
                  multiple
                  accept='.jpg,.jpeg,.png,.pdf,.doc,.docx'
                  onChange={handleFileUpload}
                  className='hidden'
                />
              </div>

              {files.length > 0 && (
                <div className='space-y-3'>
                  <h4 className='text-white font-medium'>Uploaded Files</h4>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between bg-[#0F0F0F] border border-[#2B2B2B] rounded-lg p-4'
                    >
                      <div className='flex items-center gap-3'>
                        <Coins className='w-5 h-5 text-gray-400' />
                        <div>
                          <span className='text-white text-sm font-medium'>
                            {file.name}
                          </span>
                          <p className='text-gray-400 text-xs'>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className='text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded border border-red-400/20 hover:bg-red-400/10'
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='bg-[#1C1C1C] border border-[#2B2B2B] rounded-xl p-6 space-y-4 self-start w-full max-w-2xl'>
              <div>
                <Label className='text-white font-medium text-lg'>
                  Links to External Evidence
                </Label>
                <p className='text-gray-400 text-sm mt-1'>
                  Add links to external resources, demos, or documentation
                </p>
              </div>

              {externalLinks.map((link, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <div className='flex-1 relative'>
                    <LinkIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                    <Input
                      type='url'
                      placeholder='https://www.example.com'
                      value={link}
                      onChange={e =>
                        handleExternalLinkChange(index, e.target.value)
                      }
                      className='pl-12 h-12 bg-[#0F0F0F] border-[#2B2B2B] text-white placeholder:text-gray-400 text-base'
                    />
                  </div>
                  {externalLinks.length > 1 && (
                    <button
                      onClick={() => handleRemoveExternalLink(index)}
                      className='text-red-400 hover:text-red-300 text-sm px-3 py-2 rounded border border-red-400/20 hover:bg-red-400/10'
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <BoundlessButton
                variant='outline'
                onClick={handleAddExternalLink}
                className='w-full'
              >
                Add Another Link
              </BoundlessButton>
            </div>

            <div className='bg-[#1C1C1C] border border-[#2B2B2B] rounded-xl p-6 space-y-4 self-start w-full max-w-2xl'>
              <div>
                <Label className='text-white font-medium text-lg'>
                  Additional Notes
                </Label>
                <p className='text-gray-400 text-sm mt-1'>
                  Any additional context or explanations about your submission
                </p>
              </div>

              <Textarea
                value={additionalNotes}
                onChange={e => setAdditionalNotes(e.target.value)}
                placeholder='Provide any additional context about your milestone completion...'
                className='min-h-[120px] bg-[#0F0F0F] border-[#2B2B2B] text-white placeholder:text-gray-400 resize-none'
                maxLength={1000}
              />

              <div className='text-right'>
                <span className='text-gray-400 text-sm'>
                  {additionalNotes.length}/1000
                </span>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='bg-[#1C1C1C] border border-[#2B2B2B] rounded-xl p-6'>
              <h3 className='text-white font-semibold text-lg mb-4'>
                Submission Summary
              </h3>

              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400'>Files uploaded:</span>
                  <span className='text-white font-medium'>{files.length}</span>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-gray-400'>External links:</span>
                  <span className='text-white font-medium'>
                    {externalLinks.filter(link => link.trim() !== '').length}
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-gray-400'>Milestone value:</span>
                  <span className='text-white font-medium'>
                    {formatCurrency(milestone.fundAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className='bg-[#1C1C1C] border border-[#2B2B2B] rounded-xl p-6'>
              <h3 className='text-white font-semibold text-lg mb-4'>
                Submission Guidelines
              </h3>

              <div className='space-y-3 text-sm text-gray-300'>
                <div className='flex items-start gap-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                  <p>
                    Upload clear, high-quality evidence of milestone completion
                  </p>
                </div>

                <div className='flex items-start gap-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                  <p>Include screenshots, videos, or documentation as proof</p>
                </div>

                <div className='flex items-start gap-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                  <p>Provide links to live demos or external resources</p>
                </div>

                <div className='flex items-start gap-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                  <p>Ensure all files are under 20MB each</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 pt-6 border-t border-[#2B2B2B] w-full max-w-2xl mx-auto'>
          <div className='flex items-center justify-between'>
            <BoundlessButton variant='outline' onClick={onBack} size='lg'>
              Cancel
            </BoundlessButton>

            <BoundlessButton
              variant='default'
              onClick={handleSubmit}
              loading={loading}
              disabled={files.length === 0}
              size='lg'
            >
              Submit Milestone
            </BoundlessButton>
          </div>
        </div>
      </div>

      <WalletRequiredModal
        open={showWalletModal}
        onOpenChange={closeWalletModal}
        actionName='submit milestone'
        onWalletConnected={handleWalletConnected}
      />
    </div>
  );
};

export default MilestoneSubmissionPage;
