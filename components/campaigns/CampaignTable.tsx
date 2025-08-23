import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import {
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
import CampaignSummary from './CampaignSummary';
import {
  Campaign,
  StatusFilter,
  TabFilter,
  mockApiService,
} from '@/lib/data/campaigns-mock';
import BackingHistory from './backing-history';
import { sampleBackers } from '@/lib/data/backing-history-mock';

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

  const getProgressColor = () => {
    // Use the same blue color for all progress bars
    return 'bg-[#1671D9]';
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
          <div className='w-11 h-11 rounded-[4px] flex items-center justify-center flex-shrink-0 overflow-hidden'>
            <Image
              src={'/campaign-banner.svg'}
              alt={campaign.name}
              width={55}
              height={30}
              className=' h-full rounded-[4px]'
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
              className={`h-full rounded-full transition-all duration-300 ${getProgressColor()}`}
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
            className={`${getStatusColor(campaign.status)} capitalize text-xs font-medium px-2.5 py-1 rounded-none border-none w-[75px] text-center flex items-center justify-center`}
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
                className='h-8 w-8 p-0 bg-[#1C1C1C] border border-gray-800 hover:bg-[#374151] transition-colors duration-200'
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
                src={'/campaign-banner.svg'}
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
              className={`${getStatusColor(campaign.status)} capitalize text-xs font-medium px-1.5 sm:px-2 py-1 rounded-none border-none w-[75px] text-center flex items-center justify-center`}
            >
              {campaign.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-7 w-7 sm:h-8 sm:w-8 p-0 bg-[#1C1C1C] border border-gray-800 hover:bg-[#374151] transition-colors duration-200'
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
                className={`h-full rounded-full transition-all duration-300 ${getProgressColor()}`}
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
  const [campaignSummaryOpen, setCampaignSummaryOpen] = useState(false);
  const [backingHistoryOpen, setBackingHistoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Quick filter options - keeping it simple for now
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'live', label: 'Live' },
    { value: 'successful', label: 'Successful' },
    { value: 'failed', label: 'Failed' },
  ];

  const fetchCampaigns = useCallback(
    async (page: number = 1) => {
      try {
        setLoading(true);
        setError(null);
        const response = await mockApiService.fetchCampaigns(
          statusFilter,
          tabFilter,
          page,
          itemsPerPage
        );
        // TODO: Handle empty state better - maybe add a refresh button?
        setCampaigns(response.data);
        setTotalPages(Math.ceil(response.total / itemsPerPage));
      } catch {
        setError('Failed to fetch campaigns');
        toast.error('Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    },
    [statusFilter, tabFilter, itemsPerPage]
  );

  // Handle different campaign actions - TODO: extract this to a separate hook
  const handleCampaignAction = async (action: string, campaignId: string) => {
    try {
      switch (action) {
        case 'like':
          await mockApiService.likeCampaign(campaignId);
          toast.success('Liked!');
          break;
        case 'comment':
          // TODO: Open comment modal instead of hardcoded comment
          await mockApiService.commentCampaign(campaignId, 'Great campaign!');
          toast.success('Comment added');
          break;
        case 'share':
          await mockApiService.shareCampaign(campaignId);
          toast.success('Shared!');
          break;
        case 'view-summary':
          setCampaignSummaryOpen(true);
          break;
        case 'view-history':
          toast.info('Opening history...');
          setBackingHistoryOpen(true);
          break;
        case 'campaign-details':
          // TODO: Navigate to details page
          toast.info('Opening details...');
          break;
        default:
          toast.info(`${action} clicked`);
      }

      // Refresh the list after actions
      fetchCampaigns();
    } catch {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchCampaigns(1);
  }, [statusFilter, tabFilter, fetchCampaigns]);

  useEffect(() => {
    fetchCampaigns(currentPage);
  }, [currentPage, fetchCampaigns]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='space-y-6 min-h-full'>
      <div className='flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 sm:gap-4 xl:gap-0'>
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <h2 className='text-white text-base sm:text-lg xl:text-xl font-semibold leading-[120%] tracking-[-0.4px]'>
            Campaigns
          </h2>
          {/* <Link href='/campaigns' className='text-sm text-white'>
            <Button
              variant='ghost'
              className='text-white hover:bg-[#374151] transition-colors duration-200 h-8 sm:h-9 px-2 sm:px-3'
            >
              View All
              <ChevronRightIcon className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />
            </Button>
          </Link> */}
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
                onClick={() => fetchCampaigns(1)}
                variant='outline'
                className='border-[#2B2B2B] hover:border-[#374151]'
              >
                Retry
              </Button>
            </div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className='flex items-center justify-center h-[60vh]'>
            <div className='text-center'>
              <div className='mb-6'>
                <Image
                  src='/empty/campaignempty.svg'
                  alt='No campaigns available'
                  width={128}
                  height={128}
                  className='w-32 h-32 mx-auto mb-4'
                />
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>
                No Active Campaigns
              </h3>
              <p className='text-gray-400 max-w-md mx-auto'>
                Projects you vote on, comment on, or fund will appear here. Get
                involved and support ideas that matter to you.
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

        {totalPages > 1 && campaigns.length > 0 && (
          <div className='border-t border-[#2B2B2B] mt-6 pt-4'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-400'>
                Page {currentPage} of {totalPages}
              </span>

              <div className='flex gap-2'>
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  size='sm'
                  variant='outline'
                  className='border-[#2B2B2B] text-white hover:bg-[#2B2B2B]'
                >
                  Previous
                </Button>

                {/* Basic pagination numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  page => {
                    // Only show if we're within 2 pages or it's first/last
                    if (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    ) {
                      return (
                        <Button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          size='sm'
                          variant={currentPage === page ? 'default' : 'outline'}
                          className={
                            currentPage === page
                              ? 'bg-blue-600'
                              : 'border-[#2B2B2B] text-white hover:bg-[#2B2B2B]'
                          }
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className='px-2 text-gray-500'>
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  size='sm'
                  variant='outline'
                  className='border-[#2B2B2B] text-white hover:bg-[#2B2B2B]'
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CampaignSummary
        open={campaignSummaryOpen}
        setOpen={setCampaignSummaryOpen}
      />
      <BackingHistory
        open={backingHistoryOpen}
        setOpen={setBackingHistoryOpen}
        backers={sampleBackers}
      />
    </div>
  );
};

export default CampaignTable;
