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
          className='hover:border-primary border-muted-foreground/20 h-12 w-12 bg-[#1c1c1c] text-white hover:bg-[#1c1c1c] hover:text-white'
        >
          <ArrowUpDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='border-muted-foreground/20 w-80 border p-4 sm:w-100'
        align='end'
        alignOffset={-10}
        style={{ backgroundColor: '#101010' }}
      >
        <div className='space-y-6'>
          {/* Date Range Section */}
          <div className='border-muted-foreground/20 space-y-3 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-white'>Date range</h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={resetDateRange}
                className='text-primary h-6 px-2 text-xs hover:bg-transparent hover:text-green-300'
              >
                Reset
              </Button>
            </div>
            <div className='space-y-3'>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <label className='text-muted-foreground text-xs'>From</label>
                  <Popover
                    open={showFromCalendar}
                    onOpenChange={setShowFromCalendar}
                  >
                    <PopoverTrigger asChild>
                      <div className='bg-background relative cursor-pointer text-white'>
                        <Input
                          value={
                            dateRange.from
                              ? format(dateRange.from, 'MM-dd-yy')
                              : '06-04-25'
                          }
                          className='border-muted-foreground/30 cursor-pointer bg-[#101010] p-5 pr-8 text-white'
                          readOnly
                        />
                        <Calendar className='absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-white' />
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
                <div className='space-y-1'>
                  <label className='text-muted-foreground text-xs'>To</label>
                  <Popover
                    open={showToCalendar}
                    onOpenChange={setShowToCalendar}
                  >
                    <PopoverTrigger asChild>
                      <div className='relative cursor-pointer text-white'>
                        <Input
                          value={
                            dateRange.to
                              ? format(dateRange.to, 'MM-dd-yy')
                              : '06-04-25'
                          }
                          className='border-muted-foreground/20 cursor-pointer bg-[#101010] p-5 pr-8 text-white'
                          readOnly
                        />
                        <Calendar className='absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-white' />
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
              <div className='flex flex-wrap gap-2 sm:gap-5'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuickDateFilter(0)}
                  className='border-muted-foreground/20 hover:bg-muted/30 min-w-0 flex-1 rounded-3xl bg-[#101010] p-3 text-xs text-white sm:flex-none sm:p-5'
                >
                  Today
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuickDateFilter(7)}
                  className='border-muted-foreground/20 hover:bg-muted/30 min-w-0 flex-1 rounded-3xl bg-[#101010] p-3 text-xs text-white sm:flex-none sm:p-5'
                >
                  Last 7 days
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuickDateFilter(30)}
                  className='border-muted-foreground/20 hover:bg-muted/30 min-w-0 flex-1 rounded-3xl bg-[#101010] p-3 text-xs text-white sm:flex-none sm:p-5'
                >
                  Last month
                </Button>
              </div>
            </div>
          </div>

          {/* Amount Range Section */}
          <div className='border-muted-foreground/20 space-y-3 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-white'>Amount range</h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={resetAmountRange}
                className='text-primary h-6 px-2 text-xs hover:bg-transparent hover:text-green-400'
              >
                Reset
              </Button>
            </div>
            <div className='space-y-3'>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5'>
                <div className='space-y-1'>
                  <label className='text-muted-foreground text-xs'>Min</label>
                  <div className='relative'>
                    <DollarSign className='text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform' />
                    <Input
                      value={amountRange[0]}
                      onChange={e =>
                        setAmountRange([
                          Number.parseInt(e.target.value) || 0,
                          amountRange[1],
                        ])
                      }
                      className='border-muted-foreground/20 bg-[#101010] p-5 pl-8 text-white'
                    />
                  </div>
                </div>
                <div className='space-y-1'>
                  <label className='text-muted-foreground text-xs'>Max</label>
                  <div className='relative'>
                    <DollarSign className='text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform' />
                    <Input
                      value={amountRange[1]}
                      onChange={e =>
                        setAmountRange([
                          amountRange[0],
                          Number.parseInt(e.target.value) || 0,
                        ])
                      }
                      className='border-muted-foreground/20 bg-[#101010] p-5 pl-8 text-white'
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
                className='w-full [&_.bg-primary]:bg-blue-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:bg-blue-500'
              />
            </div>
          </div>

          {/* Identity Type Section */}
          <div className='border-muted-foreground/20 space-y-3 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-white'>Identity Type</h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={resetIdentityFilter}
                className='text-primary h-6 px-2 text-xs hover:bg-transparent hover:text-green-400'
              >
                Reset
              </Button>
            </div>
            <div className='space-y-1'>
              <Button
                variant='outline'
                onClick={() => setIdentityFilter('all')}
                className={`hover:bg-muted/30 w-full justify-between border-none bg-transparent p-5 text-white ${
                  identityFilter === 'all'
                    ? 'border-muted-foreground/20 bg-[#2b2b2b]'
                    : ''
                }`}
              >
                All
                {identityFilter === 'all' && <Check className='h-4 w-4' />}
              </Button>
              <Button
                variant='outline'
                onClick={() => setIdentityFilter('identified')}
                className={`hover:bg-muted/30 w-full justify-start border-none bg-transparent p-5 text-white ${
                  identityFilter === 'identified'
                    ? 'border-muted-foreground/20 bg-[#2b2b2b]'
                    : ''
                }`}
              >
                Identified
              </Button>
              <Button
                variant='outline'
                onClick={() => setIdentityFilter('anonymous')}
                className={`hover:bg-muted/30 w-full justify-start border-none bg-transparent text-white ${
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
          <div className='flex flex-col gap-3 pt-2 sm:flex-row sm:gap-15'>
            <Button
              onClick={resetFilters}
              variant='outline'
              className='border-muted-foreground/20 hover:bg-muted/30 flex-1 bg-[#101010] py-5 text-white'
            >
              Reset all
            </Button>
            <Button
              onClick={applyFilters}
              className='bg-primary text-background flex-1 py-5 hover:bg-green-400'
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
