'use client';

import type React from 'react';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import BoundlessSheet from '@/components/sheet/boundless-sheet';
import SortFilterPopover from './sort-filter-popover';
import AdvancedFilterPopover from './filter-popover';
import BackingHistoryTable from './backing-history-table';

interface Backer {
  id: string;
  name: string;
  avatar?: string;
  amount: number;
  date: Date;
  walletId: string;
  isAnonymous: boolean;
}

interface BackingHistoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  backers: Backer[];
}

type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'highest' | 'lowest';
type IdentityFilter = 'all' | 'identified' | 'anonymous';

const BackingHistory: React.FC<BackingHistoryProps> = ({
  open,
  setOpen,
  backers,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [amountRange, setAmountRange] = useState([0, 10000]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [identityFilter, setIdentityFilter] = useState<IdentityFilter>('all');
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);

  const setQuickDateFilter = (days: number) => {
    const today = new Date();
    const pastDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    setDateRange({ from: pastDate, to: today });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('newest');
    setAmountRange([0, 10000]);
    setDateRange({});
    setIdentityFilter('all');
  };

  const resetDateRange = () => {
    setDateRange({});
  };

  const resetAmountRange = () => {
    setAmountRange([10, 1000]);
  };

  const resetIdentityFilter = () => {
    setIdentityFilter('all');
  };

  const applyFilters = () => {
    setShowSortPopover(false);
  };

  const filteredAndSortedBackers = useMemo(() => {
    const filtered = backers.filter(backer => {
      const matchesSearch =
        backer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        backer.walletId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAmount =
        backer.amount >= amountRange[0] && backer.amount <= amountRange[1];

      const matchesDate =
        !dateRange.from ||
        !dateRange.to ||
        (backer.date >= dateRange.from && backer.date <= dateRange.to);

      const matchesIdentity =
        identityFilter === 'all' ||
        (identityFilter === 'anonymous' && backer.isAnonymous) ||
        (identityFilter === 'identified' && !backer.isAnonymous);

      return matchesSearch && matchesAmount && matchesDate && matchesIdentity;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.date.getTime() - a.date.getTime();
        case 'oldest':
          return a.date.getTime() - b.date.getTime();
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'highest':
          return b.amount - a.amount;
        case 'lowest':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [backers, searchQuery, sortBy, amountRange, dateRange, identityFilter]);

  return (
    <BoundlessSheet open={open} setOpen={setOpen} contentClassName='h-[100vh]'>
      <section className=''>
        <div className='mx-auto max-h-screen w-full max-w-[564px] space-y-4 px-4'>
          <h1 className='text-lg font-semibold text-white'>Backing History</h1>
          {/* Search and Controls */}
          <div className='flex flex-col items-stretch gap-2 sm:flex-row sm:items-center'>
            <div className='relative min-w-0 flex-1'>
              <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform' />
              <Input
                placeholder='Search backer or wallet...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='border-muted-foreground/20 text-placeholder placeholder:text-muted-foreground w-full bg-[#1c1c1c] py-5 pl-10 placeholder:font-medium focus:outline-none'
              />
            </div>
            <div className='flex flex-shrink-0 gap-2'>
              <SortFilterPopover
                sortBy={sortBy}
                setSortBy={setSortBy}
                showFilterPopover={showFilterPopover}
                setShowFilterPopover={setShowFilterPopover}
              />
              <AdvancedFilterPopover
                amountRange={amountRange}
                setAmountRange={setAmountRange}
                dateRange={dateRange}
                setDateRange={setDateRange}
                identityFilter={identityFilter}
                setIdentityFilter={setIdentityFilter}
                showSortPopover={showSortPopover}
                setShowSortPopover={setShowSortPopover}
                showFromCalendar={showFromCalendar}
                setShowFromCalendar={setShowFromCalendar}
                showToCalendar={showToCalendar}
                setShowToCalendar={setShowToCalendar}
                setQuickDateFilter={setQuickDateFilter}
                resetFilters={resetFilters}
                resetDateRange={resetDateRange}
                resetAmountRange={resetAmountRange}
                resetIdentityFilter={resetIdentityFilter}
                applyFilters={applyFilters}
              />
            </div>
          </div>

          <BackingHistoryTable backers={filteredAndSortedBackers} />
        </div>
      </section>
    </BoundlessSheet>
  );
};

export default BackingHistory;
