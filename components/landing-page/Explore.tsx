'use client';

import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface Projects {
  id: string;
  daysToDeadline?: number;
  status: string;
  projectImg: string;
  currentAmount?: number;
  targetAmount?: number;
  currentVotes?: number;
  targetVotes?: number;
  milestonesCompleted?: number;
  totalMilestones?: number;
  milestonesRejected?: number;
}

const projects: Projects[] = [
  {
    id: '1',
    status: 'Validation',
    currentVotes: 28,
    targetVotes: 100,
    daysToDeadline: 43,
    projectImg: '/landing/explore/project-placeholder-1.png',
  },
  {
    id: '2',
    status: 'Funding',
    currentAmount: 120000,
    targetAmount: 300000,
    daysToDeadline: 15,
    projectImg: '/landing/explore/project-placeholder-2.png',
  },
  {
    id: '3',
    status: 'Completed',
    milestonesCompleted: 6,
    totalMilestones: 6,
    milestonesRejected: 1,
    projectImg: '/landing/explore/project-placeholder-3.png',
  },
  {
    id: '4',
    status: 'Funded',
    milestonesCompleted: 3,
    totalMilestones: 6,
    daysToDeadline: 3,
    projectImg: '/landing/explore/project-placeholder-4.png',
  },
  {
    id: '5',
    status: 'Funding',
    currentAmount: 120000,
    targetAmount: 300000,
    daysToDeadline: 15,
    projectImg: '/landing/explore/project-placeholder-2.png',
  },
  {
    id: '6',
    status: 'Validation',
    currentVotes: 28,
    targetVotes: 100,
    daysToDeadline: 43,
    projectImg: '/landing/explore/project-placeholder-1.png',
  },
];

const tabs = [
  { name: 'Featured Projects', value: 'featured-projects' },
  { name: 'Ongoing Hackathons', value: 'ongoing-hackathons' },
  { name: 'Open Grants', value: 'open-grants' },
];

export default function Explore() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      setUnderlineStyle({
        width: currentTab.offsetWidth,
        left: currentTab.offsetLeft,
      });
    }
  }, [activeTab]);

  const getProgressInfo = (project: Projects) => {
    if (project.status === 'Validation') {
      return {
        current: project.currentVotes,
        total: project.targetVotes,
        unit: 'Votes',
        percentage:
          project.currentVotes && project.targetVotes
            ? (project.currentVotes / project.targetVotes) * 100
            : 0,
      };
    }

    if (project.status === 'Funding') {
      return {
        current:
          project.currentAmount && project.targetAmount
            ? `${project.currentAmount / 1000}k/${project.targetAmount / 1000} USDC`
            : 'N/A',
        total: null,
        unit: 'Raised',
        percentage:
          project.currentAmount && project.targetAmount
            ? (project.currentAmount / project.targetAmount) * 100
            : 0,
      };
    }

    if (project.status === 'Completed') {
      return {
        current: project.milestonesCompleted,
        total: project.totalMilestones,
        unit: 'Milestones Submitted',
        percentage:
          project.milestonesCompleted && project.totalMilestones
            ? (project.milestonesCompleted / project.totalMilestones) * 100
            : 0,
        rejected: project.milestonesRejected,
      };
    }

    return {
      current: project.milestonesCompleted,
      total: project.totalMilestones,
      unit: 'Milestones Submitted',
      percentage:
        project.milestonesCompleted && project.totalMilestones
          ? (project.milestonesCompleted / project.totalMilestones) * 100
          : 0,
    };
  };

  return (
    <section className='relative flex flex-col items-center justify-center text-white'>
      <div className='flex flex-col items-center gap-6 text-center'>
        <p className='bg-gradient-to-r from-[#3AE6B2] to-[#A7F950] bg-clip-text text-transparent'>
          Active Opportunities
        </p>
        <h2 className='text-5xl max-sm:text-3xl'>Explore What’s Happening</h2>

        <div className='relative flex gap-8 overflow-auto border-b border-gray-700 px-4 md:px-0'>
          {tabs.map(tab => (
            <p
              key={tab.value}
              ref={el => {
                tabRefs.current[tab.value] = el;
              }}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                'shrink-0 cursor-pointer pb-3 transition-colors',
                activeTab === tab.value
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-200'
              )}
            >
              {tab.name}
            </p>
          ))}

          <span
            className='absolute bottom-0 h-[3px] bg-[#A7F950] transition-all duration-300 ease-in-out'
            style={underlineStyle}
          />
        </div>
      </div>

      <div className='mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3 xl:px-0'>
        {projects.map(project => {
          const progressInfo = getProgressInfo(project);

          return (
            <div
              className='max-w-md space-y-5 rounded-xl border border-[#2B2B2B] bg-[#030303] p-4'
              key={project.id}
            >
              {/* Top */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Image
                    src='/landing/explore/profile-head.svg'
                    alt='Profile Head'
                    width={24}
                    height={24}
                    className='aspect-auto rounded-full'
                  />
                  <p className='text-sm text-[#B5B5B5]'>Creator Name</p>
                </div>

                <div className='flex items-center gap-2'>
                  <p className='rounded-sm border border-[#645D5D] bg-[#E4DBDB] p-1 text-xs font-semibold text-[#645D5D]'>
                    Category
                  </p>
                  <p
                    className={cn(
                      'rounded-sm border border-[#99FF2D] bg-[#A7F950]/8 p-1 text-xs font-semibold text-[#36F94D]',
                      project.status === 'Validation' &&
                        'border-[#AD6F07] bg-[#FBE2B7] text-[#AD6F07]',
                      project.status === 'Funding' &&
                        'border-[#034592] bg-[#C6DDF7] text-[#034592]',
                      project.status === 'Completed' &&
                        'border-[#04802E] bg-[#B5E3C4] text-[#04802E]'
                    )}
                  >
                    {project.status}
                  </p>
                </div>
              </div>

              {/* Middle */}
              <div className='flex gap-4'>
                <Image
                  src={project.projectImg}
                  alt='Project Image'
                  width={80}
                  height={90}
                  className='aspect-square rounded-lg'
                />
                <div className='space-y-2'>
                  <p className='font-semibold'>Bitmed</p>
                  <p className='text-sm'>
                    To build a secure, transparent, and trusted digital health
                    ecosystem powered by Sonic blockchain for 280M lives in
                    Indonesia.
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className='flex flex-col space-y-2'>
                <div className='flex items-center justify-between'>
                  <p className='flex items-center gap-1 text-sm'>
                    <span>
                      {progressInfo.total
                        ? `${progressInfo.current}/${progressInfo.total}`
                        : progressInfo.current}
                    </span>
                    <span className='text-xs text-[#B5B5B5]'>
                      {progressInfo.unit}
                    </span>
                  </p>
                  {project.daysToDeadline && (
                    <p
                      className={cn(
                        'text-sm',
                        project.daysToDeadline >= 40 && 'text-[#5FC381]',
                        project.daysToDeadline < 40 && 'text-[#F5B546]',
                        project.daysToDeadline < 10 && 'text-[#E26E6A]'
                      )}
                    >
                      {project.daysToDeadline} days to deadline
                    </p>
                  )}
                  {progressInfo.rejected && (
                    <p className='text-sm text-[#E26E6A]'>
                      {progressInfo.rejected} milestones rejected
                    </p>
                  )}
                </div>
                <progress
                  value={progressInfo.percentage || 0}
                  max={100}
                  className='h-3 w-full rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#A7F950]/8 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-[#A7F950]/30 [&::-webkit-progress-value]:to-[#A7F950]'
                ></progress>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className='mt-20 flex cursor-pointer items-center gap-1'>
        <p className='font-medium underline'>View More Opportunities</p>
        <ArrowRight className='h-3 w-3' />
      </div>

      {/* Glow Effects */}
      <Image
        src='/landing/explore/explore-glow-top.svg'
        alt='Glow Effect'
        width={300}
        height={200}
        className='absolute top-[75px] right-16 -z-[5] max-sm:hidden'
      />
      <Image
        src='/landing/explore/explore-glow-bottom.svg'
        alt='Glow Effect'
        width={300}
        height={200}
        className='absolute bottom-12 left-10 -z-[5] max-sm:hidden'
      />
    </section>
  );
}
