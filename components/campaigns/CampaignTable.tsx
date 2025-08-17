import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import {
  ChevronRightIcon,
  MoreVerticalIcon,
  CheckIcon,
  ChevronDownIcon,
  Loader2Icon,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { BoundlessButton } from '../buttons';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  name: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  fundingProgress: {
    current: number;
    target: number;
  };
  endDate: string;
  milestones: number;
  status: 'live' | 'successful' | 'failed';
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data: Campaign[];
  total: number;
  page: number;
  limit: number;
  success: boolean;
  message?: string;
}

type StatusFilter = 'all' | 'live' | 'successful' | 'failed';
type TabFilter = 'mine' | 'others';

const mockApiService = {
  async fetchCampaigns(
    statusFilter: StatusFilter = 'all',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _tabFilter: TabFilter = 'mine',
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Boundless Web3 Platform',
        creator: {
          name: 'Collins Odumeje',
          avatar: 'https://github.com/shadcn.png',
          verified: true,
        },
        fundingProgress: {
          current: 23000,
          target: 250000,
        },
        endDate: 'Sept 30',
        milestones: 6,
        status: 'live',
        tags: ['#web3', '#crowdfunding'],
        likes: 29,
        comments: 12,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
      },
      {
        id: '2',
        name: 'DeFi Innovation Hub',
        creator: {
          name: 'Sarah Johnson',
          avatar: 'https://github.com/shadcn.png',
          verified: true,
        },
        fundingProgress: {
          current: 250000,
          target: 250000,
        },
        endDate: 'Sept 30',
        milestones: 6,
        status: 'successful',
        tags: ['#defi', '#innovation'],
        likes: 29,
        comments: 23,
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-25T16:45:00Z',
      },
      {
        id: '3',
        name: 'NFT Marketplace',
        creator: {
          name: 'Mike Chen',
          avatar: 'https://github.com/shadcn.png',
          verified: false,
        },
        fundingProgress: {
          current: 23000,
          target: 250000,
        },
        endDate: 'Expired',
        milestones: 6,
        status: 'failed',
        tags: ['#nft', '#marketplace'],
        likes: 29,
        comments: 12,
        createdAt: '2024-01-05T11:00:00Z',
        updatedAt: '2024-01-18T13:20:00Z',
      },
      {
        id: '4',
        name: 'Blockchain Education Platform',
        creator: {
          name: 'Emma Wilson',
          avatar: 'https://github.com/shadcn.png',
          verified: true,
        },
        fundingProgress: {
          current: 180000,
          target: 200000,
        },
        endDate: 'Oct 15',
        milestones: 8,
        status: 'live',
        tags: ['#education', '#blockchain'],
        likes: 45,
        comments: 18,
        createdAt: '2024-01-12T08:00:00Z',
        updatedAt: '2024-01-22T15:10:00Z',
      },
    ];

    let filteredCampaigns = mockCampaigns;
    if (statusFilter !== 'all') {
      filteredCampaigns = mockCampaigns.filter(
        campaign => campaign.status === statusFilter
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

    return {
      data: paginatedCampaigns,
      total: filteredCampaigns.length,
      page,
      limit,
      success: true,
      message: 'Campaigns fetched successfully',
    };
  },

  async likeCampaign(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _campaignId: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Campaign liked successfully' };
  },

  async commentCampaign(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _campaignId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _comment: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Comment added successfully' };
  },

  async shareCampaign(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _campaignId: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Campaign shared successfully' };
  },
};

const CampaignRow = ({
  campaign,
  onAction,
}: {
  campaign: Campaign;
  onAction: (action: string, campaignId: string) => Promise<void>;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-[#1671D9] text-white';
      case 'successful':
        return 'bg-primary text-background';
      case 'failed':
        return 'bg-[#D42620] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-[#1671D9]';
      case 'successful':
        return 'bg-primary';
      case 'failed':
        return 'bg-[#919191]';
      default:
        return 'bg-[#919191]';
    }
  };

  const progressPercentage =
    (campaign.fundingProgress.current / campaign.fundingProgress.target) * 100;

  const handleAction = (action: string) => {
    onAction(action, campaign.id);
  };

  return (
    <>
      <div className='hidden xl:flex items-center p-3 border border-[#2B2B2B] bg-[#2B2B2B] rounded-[12px] hover:bg-[#171717] hover:border-[#1671D9] transition-all duration-200 group gap-6'>
        <div className='flex items-center gap-3 w-[200px] flex-shrink-0'>
          <div className='w-11 h-11 rounded-[4px] flex items-center justify-center flex-shrink-0'>
            <Image
              src={'/banner.png'}
              alt={campaign.name}
              width={44}
              height={44}
              className='object-cover w-full h-full rounded-[4px]'
            />
          </div>
          <div className='min-w-0 flex-1'>
            <div className='text-white font-medium text-sm leading-5 truncate'>
              {campaign.name}
            </div>
            <div className='text-[#B5B5B5] text-xs leading-4 truncate mt-0.5'>
              {campaign.tags.join(' ')}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-3 w-[164px] flex-shrink-0'>
          <div className='relative flex-shrink-0'>
            <Avatar className='w-8 h-8'>
              <AvatarImage
                src={campaign.creator.avatar}
                alt={campaign.creator.name}
              />
              <AvatarFallback className='bg-[#1671D9] text-white text-xs font-medium'>
                {campaign.creator.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            {campaign.creator.verified && (
              <div className='absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#2B2B2B] border border-[#2B2B2B] rounded-full flex items-center justify-center'>
                <CheckIcon className='w-2.5 h-2.5 text-[#787878]' />
              </div>
            )}
          </div>
          <span className='text-white text-sm font-medium leading-5 truncate flex-1'>
            {campaign.creator.name}
          </span>
        </div>

        <div className='space-y-2 w-[160px] flex-shrink-0'>
          <div className='text-[#F5F5F5] text-sm font-medium leading-5'>
            ${campaign.fundingProgress.current.toLocaleString()} /
            <span className='text-[#B5B5B5]'>
              ${campaign.fundingProgress.target.toLocaleString()}
            </span>
          </div>
          <div className='w-full bg-[#484848] rounded-full h-2 overflow-hidden'>
            <div
              className={`h-full rounded-full transition-all duration-300 ${getProgressColor(campaign.status)}`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className='text-white text-sm font-medium leading-5 w-[100px] flex-shrink-0'>
          {campaign.endDate}
        </div>

        <div className='text-white text-sm font-medium leading-5 w-[73px] flex-shrink-0'>
          {campaign.milestones}
        </div>

        <div className='w-[75px] flex-shrink-0'>
          <Badge
            className={`${getStatusColor(campaign.status)} capitalize text-xs font-medium px-2.5 py-1 rounded-none border-none`}
          >
            {campaign.status}
          </Badge>
        </div>

        <div className='flex justify-end w-[64px] flex-shrink-0 ml-auto'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0 hover:bg-[#374151] transition-colors duration-200'
              >
                <MoreVerticalIcon className='h-4 w-4 text-[#9CA3AF] group-hover:text-white transition-colors duration-200' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-[250px] gap-1 bg-[#101010] border-none rounded-[16px] p-2 shadow-[0_1px_4px_0_rgba(72,72,72,0.14),_0_0_4px_1px_#484848]'
            >
              {campaign.status === 'live' && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleAction('share')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('view-history')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    View History
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('like')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    Like ({campaign.likes})
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('comment')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    Comment ({campaign.comments})
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('campaign-details')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    Campaign Details
                  </DropdownMenuItem>
                </>
              )}
              {campaign.status === 'successful' && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleAction('view-summary')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    View Summary
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('like')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    Like ({campaign.likes})
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('comment')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    Comment ({campaign.comments})
                  </DropdownMenuItem>
                </>
              )}
              {campaign.status === 'failed' && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleAction('view-summary')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    View Summary
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('like')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    Like ({campaign.likes})
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('comment')}
                    className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                  >
                    Comment ({campaign.comments})
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='xl:hidden p-3 sm:p-4 border border-[#2B2B2B] bg-[#2B2B2B] rounded-[12px] hover:bg-[#171717] hover:border-[#1671D9] transition-all duration-200'>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex items-center gap-2 sm:gap-3 flex-1 min-w-0'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-[4px] flex items-center justify-center flex-shrink-0'>
              <Image
                src={'/banner.png'}
                alt={campaign.name}
                width={48}
                height={48}
                className='object-cover w-full h-full rounded-[4px]'
              />
            </div>
            <div className='min-w-0 flex-1'>
              <div className='text-white font-medium text-sm leading-5 truncate'>
                {campaign.name}
              </div>
              <div className='text-[#B5B5B5] text-xs leading-4 truncate mt-0.5'>
                {campaign.tags.join(' ')}
              </div>
            </div>
          </div>
          <div className='flex items-center gap-1 sm:gap-2'>
            <Badge
              className={`${getStatusColor(campaign.status)} capitalize text-xs font-medium px-1.5 sm:px-2 py-1 rounded-none border-none`}
            >
              {campaign.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-[#374151] transition-colors duration-200'
                >
                  <MoreVerticalIcon className='h-3 w-3 sm:h-4 sm:w-4 text-[#9CA3AF]' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='w-[180px] sm:w-[200px] gap-1 bg-[#101010] border-none rounded-[16px] p-2 shadow-[0_1px_4px_0_rgba(72,72,72,0.14),_0_0_4px_1px_#484848]'
              >
                {campaign.status === 'live' && (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleAction('share')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('view-history')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      View History
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('like')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      Like ({campaign.likes})
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('comment')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      Comment ({campaign.comments})
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('campaign-details')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      Campaign Details
                    </DropdownMenuItem>
                  </>
                )}
                {campaign.status === 'successful' && (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleAction('view-summary')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      View Summary
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('like')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      Like ({campaign.likes})
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('comment')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      Comment ({campaign.comments})
                    </DropdownMenuItem>
                  </>
                )}
                {campaign.status === 'failed' && (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleAction('view-summary')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      View Summary
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('like')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      Like ({campaign.likes})
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('comment')}
                      className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] transition-colors duration-200 cursor-pointer'
                    >
                      Comment ({campaign.comments})
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='space-y-2 sm:space-y-3'>
          <div className='flex items-center gap-2 sm:gap-3'>
            <div className='relative flex-shrink-0'>
              <Avatar className='w-7 h-7 sm:w-8 sm:h-8'>
                <AvatarImage
                  src={campaign.creator.avatar}
                  alt={campaign.creator.name}
                />
                <AvatarFallback className='bg-[#1671D9] text-white text-xs font-medium'>
                  {campaign.creator.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              {campaign.creator.verified && (
                <div className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#2B2B2B] border border-[#2B2B2B] rounded-full flex items-center justify-center'>
                  <CheckIcon className='w-1 h-1 sm:w-1.5 sm:h-1.5 text-[#787878]' />
                </div>
              )}
            </div>
            <span className='text-white text-sm font-medium leading-5 truncate'>
              {campaign.creator.name}
            </span>
          </div>

          <div className='space-y-1.5 sm:space-y-2'>
            <div className='text-[#F5F5F5] text-sm font-medium leading-5'>
              ${campaign.fundingProgress.current.toLocaleString()} / $
              {campaign.fundingProgress.target.toLocaleString()}
            </div>
            <div className='w-full bg-[#484848] rounded-full h-1.5 sm:h-2 overflow-hidden'>
              <div
                className={`h-full rounded-full transition-all duration-300 ${getProgressColor(campaign.status)}`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-1 sm:gap-4'>
            <span className='text-[#B5B5B5]'>
              End Date: <span className='text-white'>{campaign.endDate}</span>
            </span>
            <span className='text-[#B5B5B5]'>
              Milestones:{' '}
              <span className='text-white'>{campaign.milestones}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const CampaignTable = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tabFilter, setTabFilter] = useState<TabFilter>('mine');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'live', label: 'Live' },
    { value: 'successful', label: 'Successful' },
    { value: 'failed', label: 'Failed' },
  ];

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApiService.fetchCampaigns(
        statusFilter,
        tabFilter
      );
      setCampaigns(response.data);
    } catch {
      setError('Failed to fetch campaigns');
      toast.error('Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, tabFilter]);

  const handleCampaignAction = async (action: string, campaignId: string) => {
    try {
      switch (action) {
        case 'like':
          await mockApiService.likeCampaign(campaignId);
          toast.success('Campaign liked successfully');
          break;
        case 'comment':
          await mockApiService.commentCampaign(campaignId, 'Great campaign!');
          toast.success('Comment added successfully');
          break;
        case 'share':
          await mockApiService.shareCampaign(campaignId);
          toast.success('Campaign shared successfully');
          break;
        case 'view-summary':
          toast.info('Opening campaign summary...');
          break;
        case 'view-history':
          toast.info('Opening campaign history...');
          break;
        case 'campaign-details':
          toast.info('Opening campaign details...');
          break;
        default:
          toast.info(`Action: ${action}`);
      }

      await fetchCampaigns();
    } catch {
      toast.error('Action failed');
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return (
    <div className='space-y-6'>
      <div className='flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 sm:gap-4 xl:gap-0'>
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <h2 className='text-white text-base sm:text-lg xl:text-xl font-semibold leading-[120%] tracking-[-0.4px]'>
            Latest Campaigns
          </h2>
          <Link href='/campaigns' className='text-sm text-white'>
            <Button
              variant='ghost'
              className='text-white hover:bg-[#374151] transition-colors duration-200 h-8 sm:h-9 px-2 sm:px-3'
            >
              View All
              <ChevronRightIcon className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />
            </Button>
          </Link>
        </div>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full xl:w-auto'>
          <Tabs
            value={tabFilter}
            onValueChange={value => setTabFilter(value as TabFilter)}
            className='w-full sm:w-auto'
          >
            <TabsList className='bg-[#101010] border border-[#2B2B2B] p-1 gap-1 rounded-[12px] h-10 sm:h-11 text-sm w-full sm:w-auto'>
              <TabsTrigger
                value='mine'
                className='data-[state=active]:text-white text-[#B5B5B5] rounded-[8px] data-[state=active]:bg-[#2B2B2B] px-2 sm:px-3 xl:px-4 py-2 transition-all duration-200 flex-1 sm:flex-none text-xs sm:text-sm'
              >
                Mine
              </TabsTrigger>
              <TabsTrigger
                value='others'
                className='data-[state=active]:text-white text-[#B5B5B5] rounded-[8px] data-[state=active]:bg-[#2B2B2B] px-2 sm:px-3 xl:px-4 py-2 transition-all duration-200 flex-1 sm:flex-none text-xs sm:text-sm'
              >
                Others
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BoundlessButton
                variant='outline'
                className='border-[#2B2B2B] hover:border-[#374151] transition-colors duration-200 w-full sm:w-auto h-10 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm'
              >
                {
                  filterOptions.find(option => option.value === statusFilter)
                    ?.label
                }{' '}
                <ChevronDownIcon className='w-3 h-3 sm:w-4 sm:h-4' />
              </BoundlessButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-[200px] sm:w-[250px] gap-1 bg-[#101010] border-none rounded-[16px] p-2 shadow-[0_1px_4px_0_rgba(72,72,72,0.14),_0_0_4px_1px_#484848]'
            >
              {filterOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() =>
                    setStatusFilter(
                      option.value as 'all' | 'live' | 'successful' | 'failed'
                    )
                  }
                  className='text-white font-medium hover:!text-white text-sm py-2 px-3 rounded-md hover:!bg-[#2B2B2B] hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)] transition-colors duration-200 cursor-pointer'
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='hidden xl:flex px-4 py-3 text-[#B5B5B5] text-sm font-medium border-b border-[#2B2B2B] gap-6'>
        <div className='w-[200px] flex-shrink-0'>Campaign Name</div>
        <div className='w-[164px] flex-shrink-0'>Creator</div>
        <div className='w-[160px] flex-shrink-0'>Funding Progress</div>
        <div className='w-[100px] flex-shrink-0'>End Date</div>
        <div className='w-[73px] flex-shrink-0'>Milestones</div>
        <div className='w-[75px] flex-shrink-0'>Status</div>
        <div className='w-[64px] flex-shrink-0 text-right ml-auto'>Actions</div>
      </div>

      <div className='space-y-3'>
        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <div className='flex items-center gap-3'>
              <Loader2Icon className='w-6 h-6 animate-spin text-[#1671D9]' />
              <span className='text-[#B5B5B5]'>Loading campaigns...</span>
            </div>
          </div>
        ) : error ? (
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <p className='text-red-400 mb-2'>{error}</p>
              <Button
                onClick={fetchCampaigns}
                variant='outline'
                className='border-[#2B2B2B] hover:border-[#374151]'
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <p className='text-[#B5B5B5] mb-2'>No campaigns found</p>
              <p className='text-sm text-[#787878]'>
                Try adjusting your filters
              </p>
            </div>
          </div>
        ) : (
          campaigns.map(campaign => (
            <CampaignRow
              key={campaign.id}
              campaign={campaign}
              onAction={handleCampaignAction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignTable;
