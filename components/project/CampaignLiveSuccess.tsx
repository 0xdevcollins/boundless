'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import check from '../../public/check.png';
import profile from '../../public/profile.png';
import verify from '../../public/verify.png';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Share2,
  ThumbsUp,
  MessageCircle,
  Users,
  Clock,
  ChevronUp,
  ChevronDown,
  Search,
  X,
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

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      {/* Success Header */}
      <div className='text-center space-y-4'>
        <h1 className='text-xl text-[#F5F5F5] mb-2'>Your Campaign is Live!</h1>
        <Image src={check} alt='check' className='w-20 h-20 mx-auto' />
        <p className='text-[#B5B5B5] font-inter text-lg leading-relaxed max-w-2xl mx-auto'>
          Your campaign has been successfully launched. Backers can now fund it,
          and your milestone progress will be tracked automatically.{' '}
          <span className='text-primary underline'>View Campaign</span>
        </p>
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
          <Share2 className='w-4 h-4 ml-2' />
        </Button>
      </div>

      {/* Campaign Preview Section */}
      <div className='p-6'>
        {/* Preview Header */}
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-[#F5F5F5] font-medium text-xl'>Preview</h3>
          <ChevronUp className='w-5 h-5 text-[#B5B5B5]' />
        </div>

        {/* Campaign Banner Image */}
        <div className='relative w-full h-60 bg-gradient-to-br from-teal-800 to-teal-900 rounded-lg mb-6 flex items-center justify-center'>
          <Image
            src={campaignDetails.thumbnail}
            alt={campaignDetails.title}
            fill
            className='object-cover rounded-lg'
          />
        </div>

        {/* Campaign Title and Status */}
        <div className='flex items-center gap-4 mb-4'>
          <h2 className='text-[#F5F5F5] text-2xl font-bold'>
            {campaignDetails.title}
          </h2>
          <Badge className='bg-red-500 text-white px-2 py-1 text-sm'>
            Live
          </Badge>
        </div>

        {/* Creator Info */}
        <div className='flex items-center space-x-3 mb-6'>
          <div className='relative'>
            <Image
              src={profile}
              alt='profile'
              className='w-20 h-20 rounded-full'
            />
            <Image
              src={verify}
              alt='verify'
              className='w-8 h-8 absolute -bottom-1 -right-1'
            />
          </div>
          <span className='text-[#B5B5B5] text-lg'>
            {campaignDetails.creator.name}
          </span>
        </div>

        {/* Financial Metrics */}
        <div className='flex justify-between mb-4'>
          <div className='text-center'>
            <p className='text-[#B5B5B5] text-sm mb-1'>Raised</p>
            <p className='text-[#F5F5F5] text-xl font-bold'>
              ${campaignDetails.raisedAmount.toLocaleString()}.00
            </p>
          </div>
          <div className='text-center'>
            <p className='text-[#B5B5B5] text-sm mb-1'>Target</p>
            <p className='text-[#F5F5F5] text-xl font-bold'>
              ${campaignDetails.fundAmount.toLocaleString()}.00
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='mb-6'>
          <div className='w-full bg-[#2A2A2A] rounded-full h-2 mb-4'>
            <div
              className='bg-primary h-2 rounded-full transition-all duration-300'
              style={{
                width: `${Math.min((campaignDetails.raisedAmount / campaignDetails.fundAmount) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className='flex space-x-4 mb-6'>
          <div className='flex items-center space-x-2 bg-[#2A2A2A] px-3 py-2 rounded-lg'>
            <ThumbsUp className='w-4 h-4 text-[#B5B5B5]' />
            <span className='text-[#F5F5F5] text-sm'>
              {campaignDetails.engagement.likes}
            </span>
          </div>
          <div className='flex items-center space-x-2 bg-[#2A2A2A] px-3 py-2 rounded-lg'>
            <MessageCircle className='w-4 h-4 text-[#B5B5B5]' />
            <span className='text-[#F5F5F5] text-sm'>
              {campaignDetails.engagement.comments}
            </span>
          </div>
          <div className='flex items-center space-x-2 bg-[#2A2A2A] px-3 py-2 rounded-lg'>
            <Users className='w-4 h-4 text-[#B5B5B5]' />
            <span className='text-[#F5F5F5] text-sm'>
              {campaignDetails.engagement.backers} Backers
            </span>
          </div>
          <div className='flex items-center space-x-2 bg-[#2A2A2A] px-3 py-2 rounded-lg'>
            <Clock className='w-4 h-4 text-[#B5B5B5]' />
            <span className='text-[#F5F5F5] text-sm'>
              {campaignDetails.engagement.daysLeft} days left
            </span>
          </div>
        </div>

        {/* Campaign Details */}
        <div className='mb-6'>
          <h4 className='text-[#F5F5F5] font-medium text-lg mb-3'>
            Campaign Details
          </h4>
          <div className=''>
            <p className='text-[#B5B5B5] text-lg leading-relaxed'>
              {campaignDetails.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className='mb-6'>
          <h4 className='text-[#F5F5F5] font-medium text-lg mb-3'>Tags</h4>
          <div className='flex space-x-2'>
            {campaignDetails.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className='text-[#B5B5B5] text-sm'>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Campaign Photos */}
        <div className='mb-6'>
          <h4 className='text-[#F5F5F5] font-medium text-lg mb-3'>
            Campaign Photos
          </h4>
          <div className='flex space-x-3'>
            {[1, 2, 3, 4].map(index => (
              <div
                key={index}
                className='w-16 h-16 bg-[#2A2A2A] rounded-lg flex items-center justify-center'
              >
                <div className='w-8 h-8 bg-[#B5B5B5] rounded'></div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className='mb-6'>
          <h4 className='text-[#F5F5F5] font-medium text-lg mb-3'>
            Milestones
          </h4>
          <div className='space-y-2'>
            {campaignDetails.milestones?.slice(0, 3).map((milestone, index) => (
              <div
                key={index}
                className='bg-[#2A2A2A] rounded-lg p-3 flex items-center justify-between'
              >
                <span className='text-[#F5F5F5] text-sm'>
                  Milestone {index + 1}: {milestone.title}
                </span>
                <ChevronDown className='w-4 h-4 text-[#B5B5B5]' />
              </div>
            ))}
          </div>
        </div>

        {/* Funding History */}
        <div className='mb-6'>
          <div className='flex items-center justify-between mb-3'>
            <h4 className='text-[#F5F5F5] font-medium text-lg'>
              Funding History
            </h4>
            <span className='text-[#B5B5B5] text-sm cursor-pointer'>
              View all &gt;
            </span>
          </div>
          <div className='text-center py-8'>
            <div className='relative inline-block mb-4'>
              <Search className='w-12 h-12 text-[#B5B5B5] mx-auto' />
              <X className='w-6 h-6 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
            </div>
            <p className='text-[#F5F5F5] text-lg font-medium mb-2'>
              No backers for now
            </p>
            <p className='text-[#B5B5B5] text-sm max-w-md mx-auto'>
              Get the word out and attract your first backers. Every share
              brings you closer to your funding goal.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-4 justify-center'>
        <Button
          onClick={onBackToDashboard}
          className='bg-[#2A2A2A] text-[#F5F5F5] hover:bg-[#3A3A3A] px-6 font-medium'
        >
          Back to Dashboard
        </Button>
        <Button
          onClick={handleShare}
          className='bg-green-500 text-white hover:bg-green-600 px-6 font-medium'
        >
          Share Campaign
        </Button>
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
