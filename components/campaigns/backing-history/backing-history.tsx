'use client';

import type React from 'react';
import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  DollarSign,
  User,
  Wallet,
  Check,
  CheckIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import BoundlessSheet from '@/components/sheet/boundless-sheet';

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
  const [showFilters, setShowFilters] = useState(false);
  const [showSortPopover, setShowSortPopover] = useState(false);

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

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1d';
    if (diffInDays < 7) return `${diffInDays}d`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w`;
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <BoundlessSheet open={open} setOpen={setOpen} contentClassName='h-[100vh]'>
      <section className=''>
        <div className='space-y-4 max-h-screen w-[564px] mx-auto'>
          {/* Search and Controls */}
          <div className='flex items-center gap-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
              <Input
                placeholder='Search backer or wallet...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='pl-10 py-5 placeholder:font-medium bg-muted/20 border-muted-foreground/20 text-white placeholder:text-muted-foreground'
              />
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setShowFilters(!showFilters)}
              className='bg-muted/20 border-muted-foreground/20 text-white hover:bg-muted/30 w-12 h-12'
            >
              <Filter className='w-4 h-4' />
            </Button>
            <Popover open={showSortPopover} onOpenChange={setShowSortPopover}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='bg-muted/20 border-muted-foreground/20 text-white hover:bg-muted/30 w-12 h-12'
                >
                  <ArrowUpDown className='w-4 h-4' />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='w-80 bg-background border-muted-foreground/20 p-4'
                align='end'
              >
                <div className='space-y-6'>
                  {/* Date Range Section */}
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-sm font-medium text-white'>
                        Date range
                      </h3>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={resetDateRange}
                        className='text-primary hover:bg-transparent hover:text-green-300  text-xs h-6 px-2'
                      >
                        Reset
                      </Button>
                    </div>
                    <div className='space-y-3'>
                      <div className='grid grid-cols-2 gap-2'>
                        <div className='space-y-1'>
                          <label className='text-xs text-muted-foreground'>
                            From
                          </label>
                          <div className='relative text-white bg-background '>
                            <Input
                              value={
                                dateRange.from
                                  ? format(dateRange.from, 'MM-dd-yy')
                                  : '06-04-25'
                              }
                              className='bg-muted/20 border-muted-foreground/30 text-white pr-8'
                              readOnly
                            />
                            <Calendar className='absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white' />
                          </div>
                        </div>
                        <div className='space-y-1'>
                          <label className='text-xs text-muted-foreground'>
                            To
                          </label>
                          <div className='relative text-white'>
                            <Input
                              value={
                                dateRange.to
                                  ? format(dateRange.to, 'MM-dd-yy')
                                  : '06-04-25'
                              }
                              className='bg-muted/20 border-muted-foreground/20 text-white pr-8'
                              readOnly
                            />
                            <Calendar className='absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white' />
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => setQuickDateFilter(0)}
                          className='bg-muted/20 border-muted-foreground/20 text-white hover:bg-muted/30 text-xs'
                        >
                          Today
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => setQuickDateFilter(7)}
                          className='bg-muted/20 border-muted-foreground/20 text-white hover:bg-muted/30 text-xs'
                        >
                          Last 7 days
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => setQuickDateFilter(30)}
                          className='bg-muted/20 border-muted-foreground/20 text-white hover:bg-muted/30 text-xs'
                        >
                          Last month
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Amount Range Section */}
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-sm font-medium text-white'>
                        Amount range
                      </h3>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={resetAmountRange}
                        className='text-primary hover:text-green-400 hover:bg-transparent  text-xs h-6 px-2'
                      >
                        Reset
                      </Button>
                    </div>
                    <div className='space-y-3'>
                      <div className='grid grid-cols-2 gap-2'>
                        <div className='space-y-1'>
                          <label className='text-xs text-muted-foreground'>
                            Min
                          </label>
                          <div className='relative'>
                            <DollarSign className='absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                            <Input
                              value={amountRange[0]}
                              onChange={e =>
                                setAmountRange([
                                  Number.parseInt(e.target.value) || 0,
                                  amountRange[1],
                                ])
                              }
                              className='bg-muted/20 border-muted-foreground/20 text-white pl-8'
                            />
                          </div>
                        </div>
                        <div className='space-y-1'>
                          <label className='text-xs text-muted-foreground'>
                            Max
                          </label>
                          <div className='relative'>
                            <DollarSign className='absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                            <Input
                              value={amountRange[1]}
                              onChange={e =>
                                setAmountRange([
                                  amountRange[0],
                                  Number.parseInt(e.target.value) || 0,
                                ])
                              }
                              className='bg-muted/20 border-muted-foreground/20 text-white pl-8'
                            />
                          </div>
                        </div>
                      </div>
                      <Slider
                        value={amountRange}
                        onValueChange={setAmountRange}
                        max={10000}
                        min={0}
                        step={10}
                        className='w-full'
                      />
                    </div>
                  </div>

                  {/* Identity Type Section */}
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-sm font-medium text-white'>
                        Identity Type
                      </h3>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={resetIdentityFilter}
                        className='text-primary hover:text-green-400 hover:bg-transparent text-xs h-6 px-2'
                      >
                        Reset
                      </Button>
                    </div>
                    <div className='space-y-2'>
                      <Button
                        variant='outline'
                        onClick={() => setIdentityFilter('all')}
                        className={`w-full justify-between bg-muted/20 border-muted-foreground/20 text-white hover:bg-muted/30 ${
                          identityFilter === 'all' ? 'bg-muted/40' : ''
                        }`}
                      >
                        All
                        {identityFilter === 'all' && (
                          <Check className='w-4 h-4' />
                        )}
                      </Button>
                      <Button
                        variant='outline'
                        onClick={() => setIdentityFilter('identified')}
                        className={`w-full justify-start bg-muted/20 border-muted-foreground/20 text-white hover:bg-muted/30 ${
                          identityFilter === 'identified' ? 'bg-muted/40' : ''
                        }`}
                      >
                        Identified
                      </Button>
                      <Button
                        variant='outline'
                        onClick={() => setIdentityFilter('anonymous')}
                        className={`w-full justify-start bg-muted/20 border-muted-foreground/20 text-white hover:bg-muted/30 ${
                          identityFilter === 'anonymous' ? 'bg-muted/40' : ''
                        }`}
                      >
                        Anonymous
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex gap-2 pt-2'>
                    <Button
                      onClick={resetFilters}
                      variant='outline'
                      className='flex-1 bg-muted/20 py-5 border-muted-foreground/20 text-white hover:bg-muted/30'
                    >
                      Reset all
                    </Button>
                    <Button
                      onClick={applyFilters}
                      className='flex-1 bg-primary hover:bg-green-400 text-background py-5'
                    >
                      Apply now
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className='bg-muted/10 rounded-lg p-4 space-y-4 border border-muted-foreground/20'>
              {/* Sort Options */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium text-white'>
                    Time based
                  </label>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setSortBy('newest')}
                    className='text-green-400 hover:text-green-300 text-xs h-6 px-2'
                  >
                    Reset
                  </Button>
                </div>
                <Select
                  value={sortBy}
                  onValueChange={(value: SortOption) => setSortBy(value)}
                >
                  <SelectTrigger className='bg-muted/20 border-muted-foreground/20 text-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-background border-muted-foreground/20'>
                    <SelectItem value='newest'>Newest first</SelectItem>
                    <SelectItem value='oldest'>Oldest first</SelectItem>
                    <SelectItem value='alphabetical'>Alphabetical</SelectItem>
                    <SelectItem value='highest'>Highest first</SelectItem>
                    <SelectItem value='lowest'>Lowest first</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className='grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b border-muted-foreground/20 pb-2 mt-10 mb-0'>
            <div>Backer</div>
            <div>Amount</div>
            <div>Date</div>
          </div>

          {/* Backing List */}
          <div className=''>
            {filteredAndSortedBackers.map(backer => (
              <div
                key={backer.id}
                className='grid grid-cols-3 gap-4 items-center border-b border-muted-foreground/20 py-5 hover:bg-muted/10 px-2 transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <div className='relative w-10 h-10'>
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src={backer.avatar || '/placeholder.svg'} />
                      <AvatarFallback
                        className={
                          backer.isAnonymous ? 'bg-green-600' : 'bg-blue-600'
                        }
                      >
                        {backer.isAnonymous ? (
                          <User className='w-4 h-4' />
                        ) : (
                          backer.name.charAt(0)
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className='absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#2B2B2B] border border-[#2B2B2B] rounded-full flex items-center justify-center'>
                      <CheckIcon className='w-2.5 h-2.5 text-[#787878]' />
                    </div>
                  </div>
                  <div>
                    <div className='text-white font-medium'>{backer.name}</div>
                    <div className='text-xs text-muted-foreground flex items-center gap-1'>
                      <Wallet className='w-4 h-4' />
                      {backer.walletId}
                    </div>
                  </div>
                </div>
                <div className='text-white font-medium'>
                  ${backer.amount.toLocaleString()}
                </div>
                <div className='text-muted-foreground'>
                  {formatDate(backer.date)}
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedBackers.length === 0 && (
            <div className='text-center py-8 text-muted-foreground'>
              No backers found matching your criteria
            </div>
          )}
        </div>
      </section>
    </BoundlessSheet>
  );
};

export default BackingHistory;
