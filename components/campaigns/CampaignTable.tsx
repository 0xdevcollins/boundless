import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { MoreVerticalIcon, CheckIcon, ChevronDown } from 'lucide-react';
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
import { CampaignTableSkeleton } from '../skeleton/UserPageSkeleton';
import Pagination from '../ui/pagination';

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
      <div className='group hidden items-center gap-6 rounded-[12px] border border-[#2B2B2B] bg-[#2B2B2B] p-3 transition-all duration-200 hover:border-[#1671D9] hover:bg-[#171717] xl:flex'>
        <div className='flex w-[200px] flex-shrink-0 items-center gap-3'>
          <div className='flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-[4px]'>
            <Image
              src={'/campaign-banner.svg'}
              alt={campaign.name}
              width={55}
              height={30}
              className='h-full rounded-[4px]'
            />
          </div>
          <div className='min-w-0 flex-1'>
            <div className='truncate text-sm leading-5 font-medium text-white'>
              {campaign.name}
            </div>
            <div className='mt-0.5 truncate text-xs leading-4 text-[#B5B5B5]'>
              {campaign.tags.join(' ')}
            </div>
          </div>
        </div>

        <div className='flex w-[164px] flex-shrink-0 items-center gap-3'>
          <div className='relative flex-shrink-0'>
            <Avatar className='h-8 w-8'>
              <AvatarImage
                src={campaign.creator.avatar}
                alt={campaign.creator.name}
              />
              <AvatarFallback className='bg-[#1671D9] text-xs font-medium text-white'>
                {campaign.creator.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            {campaign.creator.verified && (
              <div className='absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#2B2B2B] bg-[#2B2B2B]'>
                <CheckIcon className='h-2.5 w-2.5 text-[#787878]' />
              </div>
            )}
          </div>
          <span className='flex-1 truncate text-sm leading-5 font-medium text-white'>
            {campaign.creator.name}
          </span>
        </div>

        <div className='w-[160px] flex-shrink-0 space-y-2'>
          <div className='text-sm leading-5 font-medium text-[#F5F5F5]'>
            ${campaign.fundingProgress.current.toLocaleString()} /
            <span className='text-[#B5B5B5]'>
              ${campaign.fundingProgress.target.toLocaleString()}
            </span>
          </div>
          <div className='h-2 w-full overflow-hidden rounded-full bg-[#484848]'>
            <div
              className={`h-full rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className='w-[100px] flex-shrink-0 text-sm leading-5 font-medium text-white'>
          {campaign.endDate}
        </div>

        <div className='w-[73px] flex-shrink-0 text-sm leading-5 font-medium text-white'>
          {campaign.milestones}
        </div>

        <div className='w-[75px] flex-shrink-0'>
          <Badge
            className={`${getStatusColor(campaign.status)} flex w-[75px] items-center justify-center rounded-none border-none px-2.5 py-1 text-center text-xs font-medium capitalize`}
          >
            {campaign.status}
          </Badge>
        </div>

        <div className='ml-auto flex w-[64px] flex-shrink-0 justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 border border-gray-800 bg-[#1C1C1C] p-0 transition-colors duration-200 hover:bg-[#374151]'
              >
                <MoreVerticalIcon className='h-4 w-4 text-[#9CA3AF] transition-colors duration-200 group-hover:text-white' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-[250px] gap-1 rounded-[16px] border-none bg-[#101010] p-2 shadow-[0_1px_4px_0_rgba(72,72,72,0.14),_0_0_4px_1px_#484848]'
            >
              {campaign.status === 'live' && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleAction('back-project')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    Back Project
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('share')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('view-history')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    View History
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('like')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    Like ({campaign.likes})
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('comment')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    Comment ({campaign.comments})
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('campaign-details')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    Campaign Details
                  </DropdownMenuItem>
                </>
              )}
              {campaign.status === 'successful' && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleAction('view-summary')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    View Summary
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('like')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    Like ({campaign.likes})
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('comment')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    Comment ({campaign.comments})
                  </DropdownMenuItem>
                </>
              )}
              {campaign.status === 'failed' && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleAction('view-summary')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    View Summary
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('like')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    Like ({campaign.likes})
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('comment')}
                    className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                  >
                    Comment ({campaign.comments})
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='rounded-[12px] border border-[#2B2B2B] bg-[#2B2B2B] p-3 transition-all duration-200 hover:border-[#1671D9] hover:bg-[#171717] sm:p-4 xl:hidden'>
        <div className='mb-3 flex items-start justify-between'>
          <div className='flex min-w-0 flex-1 items-center gap-2 sm:gap-3'>
            <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[4px] sm:h-12 sm:w-12'>
              <Image
                src={'/campaign-banner.svg'}
                alt={campaign.name}
                width={48}
                height={48}
                className='h-full w-full rounded-[4px] object-cover'
              />
            </div>
            <div className='min-w-0 flex-1'>
              <div className='truncate text-sm leading-5 font-medium text-white'>
                {campaign.name}
              </div>
              <div className='mt-0.5 truncate text-xs leading-4 text-[#B5B5B5]'>
                {campaign.tags.join(' ')}
              </div>
            </div>
          </div>
          <div className='flex items-center gap-1 sm:gap-2'>
            <Badge
              className={`${getStatusColor(campaign.status)} flex w-[75px] items-center justify-center rounded-none border-none px-1.5 py-1 text-center text-xs font-medium capitalize sm:px-2`}
            >
              {campaign.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-7 w-7 border border-gray-800 bg-[#1C1C1C] p-0 transition-colors duration-200 hover:bg-[#374151] sm:h-8 sm:w-8'
                >
                  <MoreVerticalIcon className='h-3 w-3 text-[#9CA3AF] sm:h-4 sm:w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='w-[180px] gap-1 rounded-[16px] border-none bg-[#101010] p-2 shadow-[0_1px_4px_0_rgba(72,72,72,0.14),_0_0_4px_1px_#484848] sm:w-[200px]'
              >
                {campaign.status === 'live' && (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleAction('share')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('view-history')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      View History
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('like')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      Like ({campaign.likes})
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('comment')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      Comment ({campaign.comments})
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('campaign-details')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      Campaign Details
                    </DropdownMenuItem>
                  </>
                )}
                {campaign.status === 'successful' && (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleAction('view-summary')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      View Summary
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('like')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      Like ({campaign.likes})
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('comment')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      Comment ({campaign.comments})
                    </DropdownMenuItem>
                  </>
                )}
                {campaign.status === 'failed' && (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleAction('view-summary')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      View Summary
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('like')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
                    >
                      Like ({campaign.likes})
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction('comment')}
                      className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white'
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
              <Avatar className='h-7 w-7 sm:h-8 sm:w-8'>
                <AvatarImage
                  src={campaign.creator.avatar}
                  alt={campaign.creator.name}
                />
                <AvatarFallback className='bg-[#1671D9] text-xs font-medium text-white'>
                  {campaign.creator.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              {campaign.creator.verified && (
                <div className='absolute -right-0.5 -bottom-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full border border-[#2B2B2B] bg-[#2B2B2B] sm:h-3 sm:w-3'>
                  <CheckIcon className='h-1 w-1 text-[#787878] sm:h-1.5 sm:w-1.5' />
                </div>
              )}
            </div>
            <span className='truncate text-sm leading-5 font-medium text-white'>
              {campaign.creator.name}
            </span>
          </div>

          <div className='space-y-1.5 sm:space-y-2'>
            <div className='text-sm leading-5 font-medium text-[#F5F5F5]'>
              ${campaign.fundingProgress.current.toLocaleString()} / $
              {campaign.fundingProgress.target.toLocaleString()}
            </div>
            <div className='h-1.5 w-full overflow-hidden rounded-full bg-[#484848] sm:h-2'>
              <div
                className={`h-full rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className='flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
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

interface CampaignTableProps {
  limit?: number;
  showPagination?: boolean;
}

const CampaignTable = ({
  limit = 100,
  showPagination = false,
}: CampaignTableProps) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tabFilter, setTabFilter] = useState<TabFilter>('mine');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campaignSummaryOpen, setCampaignSummaryOpen] = useState(false);
  const [backingHistoryOpen, setBackingHistoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = limit;

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
        setCampaigns(response.data);
        if (showPagination) {
          setTotalPages(Math.ceil(response.total / itemsPerPage));
        }
      } catch {
        setError('Failed to fetch campaigns');
        toast.error('Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    },
    [statusFilter, tabFilter, itemsPerPage, showPagination]
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
    if (showPagination) {
      fetchCampaigns(currentPage);
    }
  }, [currentPage, fetchCampaigns, showPagination]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className='min-h-full space-y-6'>
        <CampaignTableSkeleton />
      </div>
    );
  }

  return (
    <div className='min-h-full space-y-6'>
      <div className='flex flex-col items-start justify-between gap-3 sm:gap-4 xl:flex-row xl:items-center xl:gap-0'>
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <h2 className='text-base leading-[120%] font-semibold tracking-[-0.4px] text-white sm:text-lg xl:text-xl'>
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
        <div className='flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 xl:w-auto'>
          <Tabs
            value={tabFilter}
            onValueChange={value => setTabFilter(value as TabFilter)}
            className='w-full sm:w-auto'
          >
            <TabsList className='h-10 w-full gap-1 rounded-[12px] border border-[#2B2B2B] bg-[#101010] p-1 text-sm sm:h-11 sm:w-auto'>
              <TabsTrigger
                value='mine'
                className='flex-1 rounded-[8px] px-2 py-2 text-xs text-[#B5B5B5] transition-all duration-200 data-[state=active]:bg-[#2B2B2B] data-[state=active]:text-white sm:flex-none sm:px-3 sm:text-sm xl:px-4'
              >
                Mine
              </TabsTrigger>
              <TabsTrigger
                value='others'
                className='flex-1 rounded-[8px] px-2 py-2 text-xs text-[#B5B5B5] transition-all duration-200 data-[state=active]:bg-[#2B2B2B] data-[state=active]:text-white sm:flex-none sm:px-3 sm:text-sm xl:px-4'
              >
                Others
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BoundlessButton
                variant='outline'
                className='h-10 w-full border-[#2B2B2B] px-3 text-xs transition-colors duration-200 hover:border-[#374151] sm:h-9 sm:w-auto sm:px-4 sm:text-sm'
              >
                {
                  filterOptions.find(option => option.value === statusFilter)
                    ?.label
                }{' '}
                <ChevronDown className='h-3 w-3 sm:h-4 sm:w-4' />
              </BoundlessButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-[200px] gap-1 rounded-[16px] border-none bg-[#101010] p-2 shadow-[0_1px_4px_0_rgba(72,72,72,0.14),_0_0_4px_1px_#484848] sm:w-[250px]'
            >
              {filterOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() =>
                    setStatusFilter(
                      option.value as 'all' | 'live' | 'successful' | 'failed'
                    )
                  }
                  className='cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:!bg-[#2B2B2B] hover:!text-white hover:shadow-[0_1px_4px_0_rgba(40,45,40,0.04),_0_0_24px_1px_rgba(10,15,10,0.14)]'
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='hidden gap-6 border-b border-[#2B2B2B] px-4 py-3 text-sm font-medium text-[#B5B5B5] xl:flex'>
        <div className='w-[200px] flex-shrink-0'>Campaign Name</div>
        <div className='w-[164px] flex-shrink-0'>Creator</div>
        <div className='w-[160px] flex-shrink-0'>Funding Progress</div>
        <div className='w-[100px] flex-shrink-0'>End Date</div>
        <div className='w-[73px] flex-shrink-0'>Milestones</div>
        <div className='w-[75px] flex-shrink-0'>Status</div>
        <div className='ml-auto w-[64px] flex-shrink-0 text-right'>Actions</div>
      </div>

      <div className='space-y-3'>
        {error ? (
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <p className='mb-2 text-red-400'>{error}</p>
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
          <div className='flex h-[60vh] items-center justify-center'>
            <div className='text-center'>
              <div className='mb-6'>
                <Image
                  src='/empty/campaignempty.svg'
                  alt='No campaigns available'
                  width={128}
                  height={128}
                  className='mx-auto mb-4 h-32 w-32'
                />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-white'>
                No Active Campaigns
              </h3>
              <p className='mx-auto max-w-md text-gray-400'>
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

        {showPagination && campaigns.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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
