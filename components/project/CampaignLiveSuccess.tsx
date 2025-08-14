'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Share2,
  ThumbsUp,
  MessageCircle,
  Users,
  Clock,
  Copy,
  ExternalLink,
} from 'lucide-react';

import { CampaignDetails } from '@/lib/api/types';
import { generateCampaignLink } from '@/lib/api/project';
import { toast } from 'sonner';
import ShareCampaignModal from './ShareCampaignModal';

interface CampaignLiveSuccessProps {
  campaignDetails: CampaignDetails;
  onBackToDashboard: () => void;
}

const CampaignLiveSuccess: React.FC<CampaignLiveSuccessProps> = ({
  campaignDetails,
  onBackToDashboard,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState<string>('');

  const handleShare = async () => {
    try {
      const response = await generateCampaignLink(campaignDetails.id);
      const linkData = response as {
        success: boolean;
        data: { shareLink: string };
      };
      setShareLink(linkData.data.shareLink);
      setShowShareModal(true);
    } catch {
      toast.error('Failed to generate share link');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className='space-y-8'>
      {/* Success Header */}
      <div className='text-center space-y-4'>
        <div className='flex justify-center'>
          <div className='w-20 h-20 bg-green-500 rounded-full flex items-center justify-center'>
            <CheckCircle className='w-12 h-12 text-white' />
          </div>
        </div>
        <div>
          <h1 className='text-3xl font-bold text-[#F5F5F5] mb-2'>
            Your Campaign is Live!
          </h1>
          <p className='text-[#B5B5B5] text-lg leading-relaxed max-w-2xl mx-auto'>
            Your campaign has been successfully launched. Backers can now fund
            it, and your milestone progress will be tracked automatically.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-4 justify-center'>
        <Button
          onClick={onBackToDashboard}
          className='bg-primary text-background hover:bg-primary/90 px-6 font-medium md:font-semibold'
        >
          Back to Dashboard
        </Button>
        <Button
          onClick={handleShare}
          className='border-[#2B2B2B] bg-white/30 text-[#F5F5F5] hover:bg-[#2A2A2A] font-medium md:font-semibold'
        >
          Share
          <Share2 className='w-4 h-4 mr-2' />
        </Button>
      </div>

      {/* Campaign Preview */}
      <div className='bg-[#1A1A1A] rounded-xl p-6 border border-[#2B2B2B]'>
        <h3 className='text-[#F5F5F5] font-medium mb-4'>Preview</h3>

        {/* Campaign Header */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center'>
              <Image
                src={campaignDetails.creator.avatar}
                alt={campaignDetails.creator.name}
                width={24}
                height={24}
                className='rounded-full'
              />
            </div>
            <div>
              <h3 className='text-[#F5F5F5] font-medium'>
                {campaignDetails.creator.name}
              </h3>
              <div className='flex items-center space-x-2'>
                <h2 className='text-xl font-bold text-[#F5F5F5]'>
                  {campaignDetails.title}
                </h2>
                {campaignDetails.creator.verified && (
                  <CheckCircle className='w-4 h-4 text-blue-500' />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Financials */}
        <div className='flex justify-between items-center mb-4'>
          <div className='text-center'>
            <p className='text-[#B5B5B5] text-sm'>Raised</p>
            <p className='text-[#F5F5F5] text-lg font-bold'>
              ${campaignDetails.raisedAmount.toLocaleString()}.00
            </p>
          </div>
          <div className='text-center'>
            <p className='text-[#B5B5B5] text-sm'>Target</p>
            <p className='text-[#F5F5F5] text-lg font-bold'>
              ${campaignDetails.fundAmount.toLocaleString()}.00
            </p>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-6'>
            <div className='flex items-center space-x-2'>
              <ThumbsUp className='w-4 h-4 text-[#B5B5B5]' />
              <span className='text-[#F5F5F5] text-sm'>
                {campaignDetails.engagement.likes}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <MessageCircle className='w-4 h-4 text-[#B5B5B5]' />
              <span className='text-[#F5F5F5] text-sm'>
                {campaignDetails.engagement.comments}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <Users className='w-4 h-4 text-[#B5B5B5]' />
              <span className='text-[#F5F5F5] text-sm'>
                {campaignDetails.engagement.backers} Backers
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <Clock className='w-4 h-4 text-[#B5B5B5]' />
              <span className='text-[#F5F5F5] text-sm'>
                {campaignDetails.engagement.daysLeft} days left
              </span>
            </div>
          </div>
        </div>

        {/* Campaign Description */}
        <div className='mt-4'>
          <p className='text-[#B5B5B5] text-sm leading-relaxed line-clamp-3'>
            {campaignDetails.description}
          </p>
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 mt-4'>
          {campaignDetails.tags.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='bg-[#2A2A2A] text-[#F5F5F5] border-[#2B2B2B] text-xs'
            >
              #{tag}
            </Badge>
          ))}
          {campaignDetails.tags.length > 3 && (
            <Badge
              variant='secondary'
              className='bg-[#2A2A2A] text-[#B5B5B5] border-[#2B2B2B] text-xs'
            >
              +{campaignDetails.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Campaign Link */}
        <div className='mt-4 p-3 bg-[#2A2A2A] rounded-lg border border-[#2B2B2B]'>
          <div className='flex items-center justify-between'>
            <div className='flex-1 min-w-0'>
              <p className='text-[#B5B5B5] text-xs mb-1'>Campaign Link</p>
              <p className='text-[#F5F5F5] text-sm truncate'>
                {shareLink || 'https://boundless.com/campaigns/...'}
              </p>
            </div>
            <div className='flex items-center space-x-2 ml-3'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() =>
                  copyToClipboard(
                    shareLink || 'https://boundless.com/campaigns/...'
                  )
                }
                className='h-8 w-8 p-0 hover:bg-[#1A1A1A]'
              >
                <Copy className='w-4 h-4 text-[#B5B5B5]' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() =>
                  window.open(
                    shareLink || 'https://boundless.com/campaigns/...',
                    '_blank'
                  )
                }
                className='h-8 w-8 p-0 hover:bg-[#1A1A1A]'
              >
                <ExternalLink className='w-4 h-4 text-[#B5B5B5]' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareCampaignModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        campaignLink={shareLink}
        campaignTitle={campaignDetails.title}
      />
    </div>
  );
};

export default CampaignLiveSuccess;
