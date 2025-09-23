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
import BackingHistory from './backing-history';
import { sampleBackers } from '@/lib/data/backing-history-mock';
import { backingHistory, milestones } from '@/lib/data/milestones';

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
  const [openHistory, setOpenHistory] = useState<boolean>(false);

  const toggle = (id: string) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  const calculateFundAmount = (percentage: number) => {
    return (123000 * percentage) / 100;
  };

  // Mock backing history data

  return (
    <>
      <BackingHistory
        backers={sampleBackers}
        open={openHistory}
        setOpen={setOpenHistory}
      />
      <BoundlessSheet
        open={open}
        setOpen={setOpen}
        title='Campaign Summary'
        side='bottom'
      >
        <div className='mx-auto max-w-[500px] space-y-7'>
          <div className='space-y-4'>
            <div className='relative w-full overflow-hidden rounded-[12px]'>
              <Image
                src='/banner.png'
                alt='Campaign Summary'
                width={500}
                height={500}
                className='h-full w-full object-cover'
              />
            </div>
            <div className='space-y-4'>
              <div>
                <div className='flex items-center gap-3'>
                  <h2 className='text-2xl font-medium text-white'>Boundless</h2>
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
                  <h2 className='text-lg font-medium text-white'>
                    Collins Odumeje
                  </h2>
                </div>
              </div>
              <p className='text-white'>
                This campaign successfully reached its funding goal.
                Contributions are now being distributed through escrow as
                milestones are completed.{' '}
                <Link href='/campaigns/123' className='text-primary underline'>
                  Click to track milestone progress
                </Link>
              </p>
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <p className='text-xs font-medium text-[#B5B5B5]'>Raised</p>
                  <p className='text-sm font-medium text-[#F5F5F5]'>
                    $123,000.00
                  </p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-xs font-medium text-[#B5B5B5]'>Target</p>
                  <p className='text-sm font-medium text-[#F5F5F5]'>
                    $123,000.00
                  </p>
                </div>
              </div>
              <Progress
                value={50}
                className='h-2 bg-[#1671D9]/20 [&>div]:bg-[#1671D9]'
              />
              <div className='flex items-center justify-between'>
                <div className='flex gap-3'>
                  <BoundlessButton
                    variant='outline'
                    size='sm'
                    className='bg-[#212121]'
                  >
                    <ThumbsUp className='h-4 w-4 fill-white text-white' />
                    <span className='text-white'>100k</span>
                  </BoundlessButton>
                  <BoundlessButton
                    variant='outline'
                    size='sm'
                    className='bg-[#212121]'
                  >
                    <MessageCircleMore className='h-4 w-4 text-white' />
                    <span className='text-white'>100k</span>
                  </BoundlessButton>
                </div>
                <div className='h-6 w-px bg-white/20'></div>
                <div className='flex items-center gap-2'>
                  <Users className='h-4 w-4 text-white' />
                  <span className='text-white'>100 backers</span>
                </div>
                <div className='h-6 w-px bg-white/20'></div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-white' />
                  <span className='text-white'>100 days left</span>
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <h2 className='text-lg font-semibold text-white'>
                Campaign Details
              </h2>
              <ScrollArea className='mt-2 h-[159px] pr-4' type='always'>
                <p className='text-[#B5B5B5]'>
                  Boundless is a trustless, decentralized application (dApp)
                  that empowers changemakers and builders to raise funds
                  transparently without intermediaries. Campaigns are structured
                  around clearly defined milestones, with funds held in escrow
                  and released only upon approval. Grant creators can launch
                  programs with rule-based logic, and applicants can apply with
                  proposals that go through public validation. The platform is
                  built on the Stellar blockchain and powered by Soroban smart
                  contracts to ensure transparency, security, and autonomy.
                </p>
              </ScrollArea>
            </div>
            <div>
              <h2 className='text-lg font-semibold text-white'>Milestones</h2>
              <div className='space-y-3'>
                {milestones.map((milestone, idx) => {
                  const isExpanded = expandedMilestone === milestone.id;
                  return (
                    <div key={milestone.id} className='space-y-2'>
                      <div className='text-xs text-white'>
                        Milestone {idx + 1}
                      </div>
                      <div className='rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C]'>
                        <div
                          className='flex cursor-pointer items-center justify-between p-3 pb-3 select-none'
                          onClick={() => toggle(milestone.id)}
                        >
                          <div className='text-base font-semibold text-white'>
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
                          <div className='space-y-3 p-5 pt-0'>
                            <div className='text-[#fff]'>
                              {milestone.description}
                            </div>
                            <div className='flex gap-6 text-sm text-gray-300'>
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
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold text-white'>
                  Backing History
                </h2>
                <Button
                  variant='ghost'
                  className='text-white underline'
                  onClick={() => setOpenHistory(true)}
                >
                  View all <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
              <div className='mt-4 space-y-3'>
                {backingHistory.map(backer => (
                  <div
                    key={backer.id}
                    className='flex items-center gap-16 border-t border-[#2B2B2B] py-2'
                  >
                    <div className='flex flex-1 items-center gap-3'>
                      <div className='relative'>
                        <Avatar className='h-10 w-10'>
                          <AvatarImage src={backer.avatar || undefined} />
                          <AvatarFallback className='bg-blue-500 text-white'>
                            {backer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {backer.isVerified && (
                          <div className='absolute -right-1 -bottom-1 rounded-full bg-gray-600 p-0.5'>
                            <Check className='h-3 w-3 text-white' />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className='font-medium text-white'>
                          {backer.name}
                        </div>
                        <div className='flex items-center gap-1 text-sm text-[#B5B5B5]'>
                          <Wallet className='h-3 w-3' />
                          <span>{backer.wallet}</span>
                        </div>
                      </div>
                    </div>
                    <div className='w-24 text-center'>
                      <div className='font-medium text-[#B5B5B5]'>
                        ${backer.amount.toLocaleString()}
                      </div>
                    </div>
                    <div className='w-20 text-right'>
                      <div className='text-sm text-[#B5B5B5]'>
                        {backer.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </BoundlessSheet>
    </>
  );
};

export default CampaignSummary;
