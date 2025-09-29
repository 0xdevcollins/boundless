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
      <div className='flex h-64 items-center justify-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  if (error || !campaignDetails) {
    return (
      <div className='py-8 text-center'>
        <p className='mb-4 text-red-500'>
          {error || 'Campaign details not found'}
        </p>
        <Button onClick={onBack} variant='outline'>
          Go Back
        </Button>
      </div>
    );
  }

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
    thumbnail:
      'https://res.cloudinary.com/danuy5rqb/image/upload/v1759143589/bondless-og-image_jufgnu.png',
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
      'https://res.cloudinary.com/danuy5rqb/image/upload/v1759143589/bondless-og-image_jufgnu.png',
      'https://res.cloudinary.com/danuy5rqb/image/upload/v1759143589/bondless-og-image_jufgnu.png',
      'https://res.cloudinary.com/danuy5rqb/image/upload/v1759143589/bondless-og-image_jufgnu.png',
      'https://res.cloudinary.com/danuy5rqb/image/upload/v1759143589/bondless-og-image_jufgnu.png',
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
      <div className='h-60 w-full md:h-64'>
        <Image
          src={displayData.photos[0]}
          alt={displayData.title}
          width={192}
          height={192}
          className='h-full w-full rounded-xl object-cover'
        />
      </div>

      <div className=''>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-500'>
              <UserCheck2 className='h-6 w-6 rounded-full bg-blue-500 text-blue-100 md:h-8 md:w-8' />
            </div>
            <div>
              <h3 className='font-medium text-[#F5F5F5] md:font-semibold'>
                {displayData.creator.name}
              </h3>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-center'>
              <p className='text-sm text-[#B5B5B5]'>Raised</p>
              <p className='text-xl font-bold text-[#F5F5F5]'>
                ${displayData.raisedAmount.toLocaleString()}.00
              </p>
            </div>
            <div className='text-center'>
              <p className='text-sm text-[#B5B5B5]'>Target</p>
              <p className='text-xl font-bold text-[#F5F5F5]'>
                ${displayData.fundAmount.toLocaleString()}.00
              </p>
            </div>
          </div>

          <div className='h-2 w-full rounded-full bg-[#2A2A2A]'>
            <div
              className='bg-primary h-full rounded-full'
              style={{
                width: `${(displayData.raisedAmount / displayData.fundAmount) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className='flex w-full items-center justify-between font-semibold'>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center space-x-2 rounded-lg bg-[#212121] p-2'>
              <ThumbsUp className='h-4 w-4 text-[#B5B5B5]' />
              <span className='text-sm text-[#F5F5F5]'>
                {displayData.engagement.likes}
              </span>
            </div>
            <div className='flex items-center space-x-2 rounded-lg bg-[#212121] p-2'>
              <MessageCircle className='h-4 w-4 text-[#B5B5B5]' />
              <span className='text-sm text-[#F5F5F5]'>
                {displayData.engagement.comments}
              </span>
            </div>
          </div>
          <div className='flex items-center space-x-2 border-x border-gray-900 px-6'>
            <Users className='h-4 w-4 text-[#B5B5B5]' />
            <span className='text-sm text-[#F5F5F5]'>
              {displayData.engagement.backers} Backers
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <Clock className='h-4 w-4 text-[#B5B5B5]' />
            <span className='text-sm text-[#F5F5F5]'>
              {displayData.engagement.daysLeft} days left
            </span>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='font-semibold text-[#F5F5F5]'>Campaign Details</h3>
        <p className='text-sm leading-relaxed text-[#B5B5B5]'>
          {displayData.description}
        </p>
      </div>

      <div className='space-y-3'>
        <h3 className='font-medium text-[#F5F5F5]'>Tags</h3>
        <div className='flex flex-wrap gap-2'>
          {displayData.tags.map((tag, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='border-[#2B2B2B] bg-[#2A2A2A] text-[#F5F5F5]'
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className='space-y-3'>
        <h3 className='font-medium text-[#F5F5F5]'>Campaign Photos</h3>
        <div className='flex space-x-3 overflow-x-auto'>
          {displayData.photos.map((photo, index) => (
            <div
              key={index}
              className='relative h-20 w-20 flex-1 overflow-hidden rounded-lg'
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

      <div className='space-y-3'>
        <h3 className='font-medium text-[#F5F5F5]'>Milestones</h3>
        <div className='space-y-3'>
          {displayData.milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className='overflow-hidden rounded-xl border border-[#2B2B2B]'
            >
              <button
                onClick={() => toggleMilestone(index)}
                className='flex w-full items-center justify-between bg-[#2A2A2A] p-4 text-[#F5F5F5] transition-colors hover:bg-[#2A2A2A]/80'
              >
                <div className='text-left'>
                  <h4 className='mb-1 text-xs font-medium text-[#B5B5B5]'>
                    Milestone {index + 1}
                  </h4>
                  <span className='text-sm font-medium'>{milestone.title}</span>
                </div>
                {expandedMilestones.includes(index) ? (
                  <ChevronUp className='h-4 w-4' />
                ) : (
                  <ChevronDown className='h-4 w-4' />
                )}
              </button>

              {expandedMilestones.includes(index) && (
                <div className='border-t border-[#2B2B2B] bg-[#1A1A1A] p-4'>
                  <p className='mb-4 text-sm text-[#B5B5B5]'>
                    {milestone.description}
                  </p>
                  <div className='flex items-center justify-between text-sm text-[#B5B5B5]'>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='h-4 w-4' />
                      <span>{milestone.deliveryDate}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Coins className='h-4 w-4' />
                      <span>${milestone.fundAmount.toLocaleString()}.00</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='space-y-4 pt-6'>
        <div className='flex items-center space-x-3'>
          <Checkbox
            id='confirm-details'
            checked={isConfirmed}
            onCheckedChange={checked => setIsConfirmed(checked as boolean)}
            className='data-[state=checked]:bg-primary data-[state=checked]:border-primary border-[#2B2B2B] bg-[#1A1A1A]'
          />
          <label
            htmlFor='confirm-details'
            className='cursor-pointer text-sm text-[#F5F5F5]'
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
            className='bg-primary text-background hover:bg-primary/90 flex-1 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Launch Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCampaign;
