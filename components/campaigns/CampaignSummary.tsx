import React, { useState } from 'react';
import BoundlessSheet from '../sheet/boundless-sheet';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { Progress } from '../ui/progress';
import { BoundlessButton } from '../buttons';
import {
  CalendarIcon,
  Clock,
  ChevronDown,
  ChevronRight,
  MessageCircleMore,
  ThumbsUp,
  Users,
  Wallet,
  Check,
} from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { formatDate } from '@/lib/utils';
import { Button } from '../ui/button';

const CampaignSummary = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(
    null
  );

  // Mock milestone data
  const milestones = [
    {
      id: '1',
      title: 'Project Planning & Research',
      description:
        'Complete market research, competitor analysis, and detailed project planning with timeline and resource allocation.',
      deliveryDate: new Date('2024-03-15'),
      fundPercentage: 20,
    },
    {
      id: '2',
      title: 'MVP Development',
      description:
        'Develop and test the minimum viable product with core features and basic functionality.',
      deliveryDate: new Date('2024-05-20'),
      fundPercentage: 40,
    },
    {
      id: '3',
      title: 'Beta Testing & Refinement',
      description:
        'Conduct comprehensive beta testing, gather user feedback, and implement necessary improvements.',
      deliveryDate: new Date('2024-07-10'),
      fundPercentage: 25,
    },
    {
      id: '4',
      title: 'Launch & Marketing',
      description:
        'Official product launch with marketing campaign and user acquisition strategy.',
      deliveryDate: new Date('2024-08-30'),
      fundPercentage: 15,
    },
  ];

  const toggle = (id: string) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  const calculateFundAmount = (percentage: number) => {
    return (123000 * percentage) / 100;
  };

  // Mock backing history data
  const backingHistory = [
    {
      id: '1',
      name: 'Collins Odumeje',
      wallet: 'GDS3...GB7',
      amount: 2300,
      time: '3s',
      avatar: 'https://github.com/shadcn.png',
      isVerified: true,
    },
    {
      id: '2',
      name: 'Collins Odumeje',
      wallet: 'GDS3...GB7',
      amount: 2300,
      time: '19d',
      avatar: 'https://github.com/shadcn.png',
      isVerified: true,
    },
    {
      id: '3',
      name: 'Collins Odumeje',
      wallet: 'GDS3...GB7',
      amount: 2300,
      time: '2w',
      avatar: 'https://github.com/shadcn.png',
      isVerified: true,
    },
    {
      id: '4',
      name: 'Anonymous',
      wallet: 'GDS3...GB7',
      amount: 2300,
      time: 'Aug 05, 2025',
      avatar: null,
      isVerified: false,
    },
    {
      id: '5',
      name: 'Collins Odumeje',
      wallet: 'GDS3...GB7',
      amount: 2300,
      time: 'Aug 05, 2025',
      avatar: 'https://github.com/shadcn.png',
      isVerified: true,
    },
  ];
  return (
    <BoundlessSheet
      open={open}
      setOpen={setOpen}
      title='Campaign Summary'
      side='bottom'
    >
      <div className='max-w-[500px] mx-auto space-y-7'>
        <div className='space-y-4'>
          <div className='relative w-full rounded-[12px] overflow-hidden'>
            <Image
              src='/banner.png'
              alt='Campaign Summary'
              width={500}
              height={500}
              className='object-cover w-full h-full'
            />
          </div>
          <div className='space-y-4'>
            <div>
              <div className='flex items-center gap-3'>
                <h2 className='text-white text-2xl font-medium'>Boundless</h2>
                <Badge className='rounded-none'>Successful</Badge>
              </div>
              <div className='flex items-center gap-2 text-[#B5B5B5]'>
                <span>#web3</span>
                <span>#crowdfunding</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className='text-white text-lg font-medium'>
                  Collins Odumeje
                </h2>
              </div>
            </div>
            <p className='text-white'>
              This campaign successfully reached its funding goal. Contributions
              are now being distributed through escrow as milestones are
              completed.{' '}
              <Link href='/campaigns/123' className='text-primary underline'>
                Click to track milestone progress
              </Link>
            </p>
          </div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <p className='text-[#B5B5B5] text-xs font-medium'>Raised</p>
                <p className='text-[#F5F5F5] text-sm font-medium'>
                  $123,000.00
                </p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#B5B5B5] text-xs font-medium'>Target</p>
                <p className='text-[#F5F5F5] text-sm font-medium'>
                  $123,000.00
                </p>
              </div>
            </div>
            <Progress
              value={50}
              className='h-2 bg-[#1671D9]/20 [&>div]:bg-[#1671D9]'
            />
            <div className='flex justify-between items-center'>
              <div className='flex gap-3'>
                <BoundlessButton
                  variant='outline'
                  size='sm'
                  className='bg-[#212121]'
                >
                  <ThumbsUp className='w-4 h-4 text-white fill-white' />
                  <span className='text-white'>100k</span>
                </BoundlessButton>
                <BoundlessButton
                  variant='outline'
                  size='sm'
                  className='bg-[#212121]'
                >
                  <MessageCircleMore className='w-4 h-4 text-white' />
                  <span className='text-white'>100k</span>
                </BoundlessButton>
              </div>
              <div className='w-px h-6 bg-white/20'></div>
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4 text-white' />
                <span className='text-white'>100 backers</span>
              </div>
              <div className='w-px h-6 bg-white/20'></div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-white' />
                <span className='text-white'>100 days left</span>
              </div>
            </div>
          </div>
        </div>
        <div className='space-y-4'>
          <div>
            <h2 className='text-white text-lg font-semibold'>
              Campaign Details
            </h2>
            <ScrollArea className='h-[159px] pr-4 mt-2' type='always'>
              <p className='text-[#B5B5B5]'>
                Boundless is a trustless, decentralized application (dApp) that
                empowers changemakers and builders to raise funds transparently
                without intermediaries. Campaigns are structured around clearly
                defined milestones, with funds held in escrow and released only
                upon approval. Grant creators can launch programs with
                rule-based logic, and applicants can apply with proposals that
                go through public validation. The platform is built on the
                Stellar blockchain and powered by Soroban smart contracts to
                ensure transparency, security, and autonomy.
              </p>
            </ScrollArea>
          </div>
          <div>
            <h2 className='text-white text-lg font-semibold'>Milestones</h2>
            <div className='space-y-3'>
              {milestones.map((milestone, idx) => {
                const isExpanded = expandedMilestone === milestone.id;
                return (
                  <div key={milestone.id} className='space-y-2'>
                    <div className='text-xs text-white'>
                      Milestone {idx + 1}
                    </div>
                    <div className='rounded-[12px] bg-[#1C1C1C] border border-[#2B2B2B]'>
                      <div
                        className='flex items-center justify-between p-3 pb-3 cursor-pointer select-none'
                        onClick={() => toggle(milestone.id)}
                      >
                        <div className='text-white text-base font-semibold'>
                          {milestone.title || `Milestone ${idx + 1}`}
                        </div>
                        <button
                          type='button'
                          className='text-gray-400 hover:text-white'
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                      {isExpanded && (
                        <div className='p-5 pt-0 space-y-3'>
                          <div className='text-[#fff]'>
                            {milestone.description}
                          </div>
                          <div className='flex gap-6 text-gray-300 text-sm'>
                            <div className='flex items-center gap-2'>
                              <CalendarIcon className='h-4 w-4' />
                              <span className='text-white'>
                                {formatDate(milestone.deliveryDate)}
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-[#B5B5B5]'>
                                $
                                {calculateFundAmount(
                                  milestone.fundPercentage
                                ).toLocaleString()}{' '}
                                ({milestone.fundPercentage || 0}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className='flex justify-between items-center'>
              <h2 className='text-white text-lg font-semibold'>
                Backing History
              </h2>
              <Button variant='ghost' className='text-white underline'>
                View all <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
            <div className='mt-4 space-y-3'>
              {backingHistory.map(backer => (
                <div
                  key={backer.id}
                  className='flex items-center py-2 border-t border-[#2B2B2B] gap-16'
                >
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='relative'>
                      <Avatar className='w-10 h-10'>
                        <AvatarImage src={backer.avatar || undefined} />
                        <AvatarFallback className='bg-blue-500 text-white'>
                          {backer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {backer.isVerified && (
                        <div className='absolute -bottom-1 -right-1 bg-gray-600 rounded-full p-0.5'>
                          <Check className='w-3 h-3 text-white' />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className='text-white font-medium'>
                        {backer.name}
                      </div>
                      <div className='flex items-center gap-1 text-[#B5B5B5] text-sm'>
                        <Wallet className='w-3 h-3' />
                        <span>{backer.wallet}</span>
                      </div>
                    </div>
                  </div>
                  <div className='text-center w-24'>
                    <div className='text-[#B5B5B5] font-medium'>
                      ${backer.amount.toLocaleString()}
                    </div>
                  </div>
                  <div className='text-right w-20'>
                    <div className='text-[#B5B5B5] text-sm'>{backer.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </BoundlessSheet>
  );
};

export default CampaignSummary;
