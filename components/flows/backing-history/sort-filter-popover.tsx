'use client';

import type React from 'react';
import { Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'highest' | 'lowest';

interface SortFilterPopoverProps {
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showFilterPopover: boolean;
  setShowFilterPopover: (show: boolean) => void;
}

const SortFilterPopover: React.FC<SortFilterPopoverProps> = ({
  sortBy,
  setSortBy,
  showFilterPopover,
  setShowFilterPopover,
}) => {
  return (
    <Popover open={showFilterPopover} onOpenChange={setShowFilterPopover}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='bg-muted/20 border-muted-foreground/20 text-white hover:bg-muted/30 w-12 h-12'
        >
          <Filter className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-80 border border-muted-foreground/20 p-4'
        align='start'
        style={{ backgroundColor: '#101010' }}
      >
        <div className='space-y-4'>
          {/* Time based Section */}
          <div className='space-y-2'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Time based
            </h3>
            <div className='space-y-1'>
              <Button
                variant='outline'
                onClick={() => {
                  setSortBy('newest');
                  setShowFilterPopover(false);
                }}
                className={`w-full justify-between bg-transparent border-none text-white hover:bg-muted/30 ${
                  sortBy === 'newest' ? 'bg-muted/40' : ''
                }`}
              >
                Newest first
                {sortBy === 'newest' && <Check className='w-4 h-4' />}
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setSortBy('oldest');
                  setShowFilterPopover(false);
                }}
                className={`w-full justify-start bg-transparent border-none text-white hover:bg-muted/30 ${
                  sortBy === 'oldest' ? 'bg-muted/40' : ''
                }`}
              >
                Oldest first
              </Button>
            </div>
          </div>

          {/* Backer name Section */}
          <div className='space-y-2'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Backer name
            </h3>
            <Button
              variant='outline'
              onClick={() => {
                setSortBy('alphabetical');
                setShowFilterPopover(false);
              }}
              className={`w-full justify-start bg-transparent border-none text-white hover:bg-muted/30 ${
                sortBy === 'alphabetical' ? 'bg-muted/40' : ''
              }`}
            >
              Alphabetical
            </Button>
          </div>

          {/* Funding amount Section */}
          <div className='space-y-2'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Funding amount
            </h3>
            <div className='space-y-1'>
              <Button
                variant='outline'
                onClick={() => {
                  setSortBy('highest');
                  setShowFilterPopover(false);
                }}
                className={`w-full justify-start bg-transparent border-none text-white hover:bg-muted/30 ${
                  sortBy === 'highest' ? 'bg-muted/40' : ''
                }`}
              >
                Highest first
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setSortBy('lowest');
                  setShowFilterPopover(false);
                }}
                className={`w-full justify-start bg-transparent border-none text-white hover:bg-muted/30 ${
                  sortBy === 'lowest' ? 'bg-muted/40' : ''
                }`}
              >
                Lowest first
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortFilterPopover;
