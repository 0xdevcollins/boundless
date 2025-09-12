'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
  const [expandedMilestones, setExpandedMilestones] = useState<number[]>([]);

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
        <Image src='/check.png' alt='check' className='w-20 h-20 mx-auto' />
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
              src='/profile.png'
              alt='profile'
              className='w-20 h-20 rounded-full'
            />
            <Image
              src='/verify.png'
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
        <div className='w-full flex items-center justify-between font-semibold'>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center space-x-2 bg-[#212121] rounded-lg p-2'>
              <ThumbsUp className='w-4 h-4 text-[#B5B5B5]' />
              <span className='text-[#F5F5F5] text-sm'>
                {campaignDetails.engagement.likes}
              </span>
            </div>
            <div className='flex items-center space-x-2 bg-[#212121] rounded-lg p-2'>
              <MessageCircle className='w-4 h-4 text-[#B5B5B5]' />
              <span className='text-[#F5F5F5] text-sm'>
                {campaignDetails.engagement.comments}
              </span>
            </div>
          </div>
          <div className='flex items-center space-x-2 border-x border-gray-900 px-6'>
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
            <Image
              key={index}
              src='/campaign-pics.png'
              alt={`Campaign photo ${index}`}
              width={64}
              height={64}
              className='w-40 h-40 object-cover'
            />
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className='mb-6'>
        <h4 className='text-[#F5F5F5] font-medium text-lg mb-3'>Milestones</h4>
        <div className='space-y-2'>
          {[
            {
              title: 'Prototype & Smart Contract Setup',
              description:
                'Initial development phase with smart contract implementation',
            },
            {
              title: 'Campaign & Grant Builder Integration',
              description:
                'Integration of campaign management and grant building features',
            },
            {
              title: 'Platform Launch & Community Building',
              description:
                'Final platform launch and community engagement phase',
            },
          ].map((milestone, index) => {
            const isExpanded = expandedMilestones.includes(index);
            return (
              <div
                key={index}
                className='bg-[#2A2A2A] rounded-lg overflow-hidden'
              >
                <div
                  className='p-3 cursor-pointer hover:bg-[#3A3A3A] transition-colors flex items-center justify-between'
                  onClick={() => {
                    setExpandedMilestones(prev =>
                      isExpanded
                        ? prev.filter(i => i !== index)
                        : [...prev, index]
                    );
                  }}
                >
                  <span className='text-[#F5F5F5] text-sm font-medium'>
                    Milestone {index + 1}: {milestone.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B5B5B5] transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {isExpanded && (
                  <div className='px-3 pb-3'>
                    <p className='text-[#B5B5B5] text-sm mt-2'>
                      {milestone.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Funding History */}
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-3 border-t border-[#2A2A2A] pt-4'>
          <h4 className='text-[#F5F5F5] font-medium text-lg'>
            Funding History
          </h4>
          <span className='text-[#B5B5B5] text-sm cursor-pointer'>
            View all &gt;
          </span>
        </div>
        <div className='text-center py-8'>
          <Image
            src='/nobackers.png'
            alt='no backers'
            className='w-20 h-20 mx-auto'
          />
          <p className='text-[#F5F5F5] text-lg font-medium mb-2'>
            No backers for now
          </p>
          <p className='text-[#B5B5B5] text-sm max-w-md mx-auto'>
            Get the word out and attract your first backers. Every share brings
            you closer to your funding goal.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-4 justify-center'>
        <Button
          onClick={handleShare}
          className='bg-primary text-black hover:bg-primary/90 px-6 font-medium'
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
