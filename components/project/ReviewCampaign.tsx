'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  ThumbsUp,
  MessageCircle,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  Calendar,
  Coins,
  UserCheck2,
} from 'lucide-react';
import { CampaignDetails } from '@/lib/api/types';
import { getCampaignDetails } from '@/lib/api/project';
import LoadingSpinner from '../LoadingSpinner';

interface ReviewCampaignProps {
  projectId: string;
  onBack: () => void;
  onLaunch: () => void;
  onLoading: (loading: boolean) => void;
}

const ReviewCampaign: React.FC<ReviewCampaignProps> = ({
  projectId,
  onBack,
  onLaunch,
  onLoading,
}) => {
  const [campaignDetails, setCampaignDetails] =
    useState<CampaignDetails | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [expandedMilestones, setExpandedMilestones] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        setLoading(true);
        onLoading(true);
        const details = (await getCampaignDetails(
          projectId
        )) as CampaignDetails;
        setCampaignDetails(details);
      } catch {
        setError('Failed to load campaign details');
      } finally {
        setLoading(false);
        onLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [projectId, onLoading]);

  const toggleMilestone = (milestoneIndex: number) => {
    setExpandedMilestones(prev =>
      prev.includes(milestoneIndex)
        ? prev.filter(i => i !== milestoneIndex)
        : [...prev, milestoneIndex]
    );
  };

  const handleLaunch = () => {
    if (isConfirmed) {
      onLaunch();
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  if (error || !campaignDetails) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500 mb-4'>
          {error || 'Campaign details not found'}
        </p>
        <Button onClick={onBack} variant='outline'>
          Go Back
        </Button>
      </div>
    );
  }

  // Use mock data as fallback if API fails
  const displayData = campaignDetails || {
    id: 'fallback-campaign',
    title: 'Boundless',
    tagline: 'Trustless, decentralized crowdfunding platform',
    description:
      'Boundless is a trustless, decentralized application (dApp) that empowers changemakers and builders to raise funds transparently without intermediaries. Campaigns are structured around clearly defined milestones, with funds held in escrow and released only upon approval.',
    category: 'Technology',
    fundAmount: 123000,
    raisedAmount: 0,
    tags: ['web3', 'crowdfunding'],
    thumbnail: '/BOUNDLESS.png',
    creator: {
      name: 'Collins Odumeje',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    engagement: {
      likes: 0,
      comments: 0,
      backers: 325,
      daysLeft: 90,
    },
    photos: [
      '/BOUNDLESS.png',
      '/BOUNDLESS.png',
      '/BOUNDLESS.png',
      '/BOUNDLESS.png',
    ],
    milestones: [
      {
        id: 'milestone-1',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow.',
        deliveryDate: 'October 10, 2025',
        fundPercentage: 25,
        fundAmount: 30750,
      },
      {
        id: 'milestone-2',
        title: 'Campaign & Grant Builder Integration',
        description:
          'Integrate campaign creation tools and grant builder functionality.',
        deliveryDate: 'November 15, 2025',
        fundPercentage: 35,
        fundAmount: 43050,
      },
      {
        id: 'milestone-3',
        title: 'Platform Launch & Community Building',
        description:
          'Launch the platform to the public and build a strong community.',
        deliveryDate: 'December 20, 2025',
        fundPercentage: 40,
        fundAmount: 49200,
      },
    ],
    status: 'validated',
  };

  return (
    <div className='max-w-lg space-y-6'>
      {/* Campaign Banner */}
      <div className='w-full h-60 md:h-64'>
        <Image
          src={displayData.photos[0]}
          alt={displayData.title}
          width={192}
          height={192}
          className='w-full h-full object-cover rounded-xl'
        />
      </div>
      {/* Campaign Header */}
      <div className=''>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center'>
              <UserCheck2 className='w-6 h-6 md:w-8 md:h-8 text-blue-100 bg-blue-500 rounded-full' />
            </div>
            <div>
              <h3 className='text-[#F5F5F5] font-medium md:font-semibold'>
                {displayData.creator.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Financials */}
        <div className='mb-4'>
          <div className='flex justify-between items-center mb-4'>
            <div className='text-center'>
              <p className='text-[#B5B5B5] text-sm'>Raised</p>
              <p className='text-[#F5F5F5] text-xl font-bold'>
                ${displayData.raisedAmount.toLocaleString()}.00
              </p>
            </div>
            <div className='text-center'>
              <p className='text-[#B5B5B5] text-sm'>Target</p>
              <p className='text-[#F5F5F5] text-xl font-bold'>
                ${displayData.fundAmount.toLocaleString()}.00
              </p>
            </div>
          </div>
          {/* progress bar */}
          <div className='w-full h-2 bg-[#2A2A2A] rounded-full'>
            <div
              className='h-full bg-primary rounded-full'
              style={{
                width: `${(displayData.raisedAmount / displayData.fundAmount) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className='w-full flex items-center justify-between font-semibold'>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center space-x-2 bg-[#212121] rounded-lg p-2'>
              <ThumbsUp className='w-4 h-4 text-[#B5B5B5]' />
              <span className='text-[#F5F5F5] text-sm'>
                {displayData.engagement.likes}
              </span>
            </div>
            <div className='flex items-center space-x-2 bg-[#212121] rounded-lg p-2'>
              <MessageCircle className='w-4 h-4 text-[#B5B5B5]' />
              <span className='text-[#F5F5F5] text-sm'>
                {displayData.engagement.comments}
              </span>
            </div>
          </div>
          <div className='flex items-center space-x-2 border-x border-gray-900 px-6'>
            <Users className='w-4 h-4 text-[#B5B5B5]' />
            <span className='text-[#F5F5F5] text-sm'>
              {displayData.engagement.backers} Backers
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <Clock className='w-4 h-4 text-[#B5B5B5]' />
            <span className='text-[#F5F5F5] text-sm'>
              {displayData.engagement.daysLeft} days left
            </span>
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className='space-y-4'>
        <h3 className='text-[#F5F5F5] font-semibold'>Campaign Details</h3>
        <p className='text-[#B5B5B5] text-sm leading-relaxed'>
          {displayData.description}
        </p>
      </div>

      {/* Tags */}
      <div className='space-y-3'>
        <h3 className='text-[#F5F5F5] font-medium'>Tags</h3>
        <div className='flex flex-wrap gap-2'>
          {displayData.tags.map((tag, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='bg-[#2A2A2A] text-[#F5F5F5] border-[#2B2B2B]'
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Campaign Photos */}
      <div className='space-y-3'>
        <h3 className='text-[#F5F5F5] font-medium'>Campaign Photos</h3>
        <div className='flex space-x-3 overflow-x-auto'>
          {displayData.photos.map((photo, index) => (
            <div
              key={index}
              className='relative w-20 h-20 rounded-lg overflow-hidden flex-1'
            >
              <Image
                src={photo}
                alt={`Campaign photo ${index + 1}`}
                fill
                className='object-cover'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className='space-y-3'>
        <h3 className='text-[#F5F5F5] font-medium'>Milestones</h3>
        <div className='space-y-3'>
          {displayData.milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className='border border-[#2B2B2B] rounded-xl overflow-hidden'
            >
              <button
                onClick={() => toggleMilestone(index)}
                className='w-full flex items-center justify-between bg-[#2A2A2A] text-[#F5F5F5] hover:bg-[#2A2A2A]/80 transition-colors p-4'
              >
                <div className='text-left'>
                  <h4 className='text-xs font-medium text-[#B5B5B5] mb-1'>
                    Milestone {index + 1}
                  </h4>
                  <span className='text-sm font-medium'>{milestone.title}</span>
                </div>
                {expandedMilestones.includes(index) ? (
                  <ChevronUp className='w-4 h-4' />
                ) : (
                  <ChevronDown className='w-4 h-4' />
                )}
              </button>

              {expandedMilestones.includes(index) && (
                <div className='bg-[#1A1A1A] p-4 border-t border-[#2B2B2B]'>
                  <p className='text-[#B5B5B5] text-sm mb-4'>
                    {milestone.description}
                  </p>
                  <div className='flex items-center justify-between text-[#B5B5B5] text-sm'>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='w-4 h-4' />
                      <span>{milestone.deliveryDate}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Coins className='w-4 h-4' />
                      <span>${milestone.fundAmount.toLocaleString()}.00</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation and Actions */}
      <div className='space-y-4 pt-6'>
        <div className='flex items-center space-x-3'>
          <Checkbox
            id='confirm-details'
            checked={isConfirmed}
            onCheckedChange={checked => setIsConfirmed(checked as boolean)}
            className='border-[#2B2B2B] bg-[#1A1A1A] data-[state=checked]:bg-primary data-[state=checked]:border-primary'
          />
          <label
            htmlFor='confirm-details'
            className='text-[#F5F5F5] text-sm cursor-pointer'
          >
            I confirm all details are correct
          </label>
        </div>

        <div className='flex gap-3 pb-4 font-medium md:font-semibold'>
          <Button
            variant='outline'
            onClick={onBack}
            className='flex-0 border-[#2B2B2B] bg-white/30 text-[#F5F5F5] hover:bg-white/60'
          >
            Back
          </Button>
          <Button
            onClick={handleLaunch}
            disabled={!isConfirmed}
            className='flex-1 bg-primary text-background hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Launch Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCampaign;
