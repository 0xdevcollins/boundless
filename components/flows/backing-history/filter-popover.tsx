'use client';

import type React from 'react';
import { ArrowUpDown, Calendar, DollarSign, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

type IdentityFilter = 'all' | 'identified' | 'anonymous';

interface AdvancedFilterPopoverProps {
  amountRange: number[];
  setAmountRange: (range: number[]) => void;
  dateRange: { from?: Date; to?: Date };
  setDateRange: (range: { from?: Date; to?: Date }) => void;
  identityFilter: IdentityFilter;
  setIdentityFilter: (filter: IdentityFilter) => void;
  showSortPopover: boolean;
  setShowSortPopover: (show: boolean) => void;
  showFromCalendar: boolean;
  setShowFromCalendar: (show: boolean) => void;
  showToCalendar: boolean;
  setShowToCalendar: (show: boolean) => void;
  setQuickDateFilter: (days: number) => void;
  resetFilters: () => void;
  resetDateRange: () => void;
  resetAmountRange: () => void;
  resetIdentityFilter: () => void;
  applyFilters: () => void;
}

const AdvancedFilterPopover: React.FC<AdvancedFilterPopoverProps> = ({
  amountRange,
  setAmountRange,
  dateRange,
  setDateRange,
  identityFilter,
  setIdentityFilter,
  showSortPopover,
  setShowSortPopover,
  showFromCalendar,
  setShowFromCalendar,
  showToCalendar,
  setShowToCalendar,
  setQuickDateFilter,
  resetFilters,
  resetDateRange,
  resetAmountRange,
  resetIdentityFilter,
  applyFilters,
}) => {
  return (
    <Popover open={showSortPopover} onOpenChange={setShowSortPopover}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='bg-[#1c1c1c] hover:border-primary border-muted-foreground/20 text-white hover:text-white hover:bg-[#1c1c1c] w-12 h-12'
        >
          <ArrowUpDown className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-100 border border-muted-foreground/20 p-4'
        align='start'
        style={{ backgroundColor: '#101010' }}
      >
        <div className='space-y-6'>
          {/* Date Range Section */}
          <div className='space-y-3 border border-muted-foreground/20 rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-white'>Date range</h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={resetDateRange}
                className='text-primary hover:bg-transparent hover:text-green-300 text-xs h-6 px-2'
              >
                Reset
              </Button>
            </div>
            <div className='space-y-3'>
              <div className='grid grid-cols-2 gap-2'>
                <div className='space-y-1'>
                  <label className='text-xs text-muted-foreground'>From</label>
                  <Popover
                    open={showFromCalendar}
                    onOpenChange={setShowFromCalendar}
                  >
                    <PopoverTrigger asChild>
                      <div className='relative text-white bg-background cursor-pointer mr-2'>
                        <Input
                          value={
                            dateRange.from
                              ? format(dateRange.from, 'MM-dd-yy')
                              : '06-04-25'
                          }
                          className='bg-muted/20 p-5 border-muted-foreground/30 text-white pr-8 cursor-pointer'
                          readOnly
                        />
                        <Calendar className='absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white' />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <CalendarComponent
                        mode='single'
                        selected={dateRange.from}
                        onSelect={date => {
                          setDateRange({ ...dateRange, from: date });
                          setShowFromCalendar(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='space-y-1 ml-2'>
                  <label className='text-xs text-muted-foreground'>To</label>
                  <Popover
                    open={showToCalendar}
                    onOpenChange={setShowToCalendar}
                  >
                    <PopoverTrigger asChild>
                      <div className='relative text-white cursor-pointer'>
                        <Input
                          value={
                            dateRange.to
                              ? format(dateRange.to, 'MM-dd-yy')
                              : '06-04-25'
                          }
                          className='bg-muted/20 p-5 border-muted-foreground/20 text-white pr-8 cursor-pointer'
                          readOnly
                        />
                        <Calendar className='absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white' />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <CalendarComponent
                        mode='single'
                        selected={dateRange.to}
                        onSelect={date => {
                          setDateRange({ ...dateRange, to: date });
                          setShowToCalendar(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className='flex gap-5'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuickDateFilter(0)}
                  className='bg-muted/20 p-5 border-muted-foreground/20 rounded-3xl text-white hover:bg-muted/30 text-xs'
                >
                  Today
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuickDateFilter(7)}
                  className='bg-muted/20 rounded-3xl p-5 border-muted-foreground/20 text-white hover:bg-muted/30 text-xs'
                >
                  Last 7 days
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuickDateFilter(30)}
                  className='bg-muted/20 rounded-3xl p-5 border-muted-foreground/20 text-white hover:bg-muted/30 text-xs'
                >
                  Last month
                </Button>
              </div>
            </div>
          </div>

          {/* Amount Range Section */}
          <div className='space-y-3 border border-muted-foreground/20 rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-white'>Amount range</h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={resetAmountRange}
                className='text-primary hover:text-green-400 hover:bg-transparent text-xs h-6 px-2'
              >
                Reset
              </Button>
            </div>
            <div className='space-y-3'>
              <div className='grid grid-cols-2 gap-5'>
                <div className='space-y-1'>
                  <label className='text-xs text-muted-foreground'>Min</label>
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
                      className='bg-muted/20 border-muted-foreground/20 text-white pl-8 p-5'
                    />
                  </div>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs text-muted-foreground'>Max</label>
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
                      className='bg-muted/20 border-muted-foreground/20 text-white pl-8 p-5'
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
                className='w-full [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_.bg-primary]:bg-blue-500'
              />
            </div>
          </div>

          {/* Identity Type Section */}
          <div className='space-y-3 border border-muted-foreground/20 rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-white'>Identity Type</h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={resetIdentityFilter}
                className='text-primary hover:text-green-400 hover:bg-transparent text-xs h-6 px-2'
              >
                Reset
              </Button>
            </div>
            <div className='space-y-1'>
              <Button
                variant='outline'
                onClick={() => setIdentityFilter('all')}
                className={`w-full justify-between bg-transparent p-5 border-none text-white hover:bg-muted/30 ${
                  identityFilter === 'all'
                    ? 'bg-muted/40 border-muted-foreground/20'
                    : ''
                }`}
              >
                All
                {identityFilter === 'all' && <Check className='w-4 h-4' />}
              </Button>
              <Button
                variant='outline'
                onClick={() => setIdentityFilter('identified')}
                className={`w-full justify-start p-5 bg-transparent border-none text-white hover:bg-muted/30 ${
                  identityFilter === 'identified'
                    ? 'bg-muted/40 border-muted-foreground/20'
                    : ''
                }`}
              >
                Identified
              </Button>
              <Button
                variant='outline'
                onClick={() => setIdentityFilter('anonymous')}
                className={`w-full justify-start bg-transparent border-none text-white hover:bg-muted/30 ${
                  identityFilter === 'anonymous'
                    ? 'bg-muted/40 border-muted-foreground/20'
                    : ''
                }`}
              >
                Anonymous
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-15 pt-2'>
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
  );
};

export default AdvancedFilterPopover;
