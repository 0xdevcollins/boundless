import React, { useState, useMemo } from 'react';
import { Timeline, TimelineItemType } from '@/components/ui/timeline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Status } from './milestone-card';

// Filter options
const filterOptions = [
  { value: 'all', label: 'All Milestones', count: 0 },
  { value: 'awaiting', label: 'Awaiting', count: 0 },
  { value: 'in-progress', label: 'In Progress', count: 0 },
  { value: 'in-review', label: 'In Review', count: 0 },
  { value: 'submission', label: 'Submission', count: 0 },
  { value: 'approved', label: 'Approved', count: 0 },
  { value: 'rejected', label: 'Rejected', count: 0 },
  { value: 'draft', label: 'Draft', count: 0 },
];

interface ProjectMilestoneProps {
  projectId?: string;
}

const ProjectMilestone = ({ projectId }: ProjectMilestoneProps) => {
  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<Status | 'all'>('all');

  // Sample milestone data - in a real app, this would come from props or API
  const milestones: TimelineItemType[] = useMemo(
    () => [
      {
        id: 'milestone-1',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'awaiting',
      },
      {
        id: 'milestone-2',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'in-review',
        feedbackDays: 3,
      },
      {
        id: 'milestone-3',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'rejected',
        deadline: '31, Jan, 2026',
      },
      {
        id: 'milestone-4',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'in-progress',
      },
      {
        id: 'milestone-5',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'in-review',
        feedbackDays: 3,
      },
      {
        id: 'milestone-6',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'rejected',
        deadline: '31, Jan, 2026',
      },
      {
        id: 'milestone-7',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'submission',
        deadline: '43',
      },
      {
        id: 'milestone-8',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'approved',
        isUnlocked: true,
      },
      {
        id: 'milestone-9',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'approved',
        isUnlocked: true,
      },
      {
        id: 'milestone-10',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'draft',
      },
      {
        id: 'milestone-11',
        title: 'Prototype & Smart Contract Setup',
        description:
          'Develop a functional UI prototype for the crowdfunding and grant flow. Simultaneously, implement and test Soroban smart contracts for escrow logic, milestone validation, and secure fund handling.',
        dueDate: '05 Dec, 2025 - 31 Jan, 2026',
        amount: 12300,
        percentage: 10,
        status: 'draft',
      },
    ],
    []
  );

  // Calculate counts for each filter option
  const filterOptionsWithCounts = useMemo(() => {
    return filterOptions.map(option => {
      if (option.value === 'all') {
        return { ...option, count: milestones.length };
      }
      const count = milestones.filter(
        milestone => milestone.status === option.value
      ).length;
      return { ...option, count };
    });
  }, [milestones]);

  // Filter milestones based on selected filter
  const filteredMilestones = useMemo(() => {
    if (selectedFilter === 'all') {
      return milestones;
    }
    return milestones.filter(milestone => milestone.status === selectedFilter);
  }, [milestones, selectedFilter]);

  // Get current filter label
  const currentFilterLabel =
    filterOptionsWithCounts.find(option => option.value === selectedFilter)
      ?.label || 'All Milestones';

  return (
    <div className='w-full'>
      <div className='my-6 flex items-center justify-between'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='bg-background flex w-full items-center gap-2 border-[#ffffff]/24 px-3 text-white md:w-fit'
            >
              <ListFilter className='size-4' />
              {currentFilterLabel}
              {selectedFilter !== 'all' && (
                <span className='rounded-full bg-[#22c55e] px-2 py-1 text-xs text-black'>
                  :{selectedFilter}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-56 border-zinc-800 bg-black'
            align='start'
          >
            <DropdownMenuRadioGroup
              value={selectedFilter}
              onValueChange={value =>
                setSelectedFilter(value as Status | 'all')
              }
            >
              {filterOptionsWithCounts.map(option => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className='flex items-center justify-between text-white data-[state=checked]:text-[#22c55e]'
                >
                  <span>{option.label}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Timeline
        items={filteredMilestones}
        showConnector={true}
        variant='default'
        className='w-full'
        projectId={projectId}
      />

      {filteredMilestones.length === 0 && (
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='text-center'>
            <div className='mb-4 text-4xl'>🔍</div>
            <h3 className='mb-2 text-lg font-semibold text-white'>
              No milestones found
            </h3>
            <p className='text-gray-400'>
              No milestones match the selected filter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMilestone;
