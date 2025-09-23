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
          className='hover:border-primary border-muted-foreground/20 h-12 w-12 bg-[#1c1c1c] text-white hover:bg-[#1c1c1c] hover:text-white'
        >
          <Filter className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='border-muted-foreground/20 w-80 border p-4'
        align='start'
        style={{ backgroundColor: '#101010' }}
      >
        <div className='space-y-4'>
          {/* Time based Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground text-sm font-medium'>
              Time based
            </h3>
            <div className='space-y-1'>
              <Button
                // variant='outline'
                onClick={() => {
                  setSortBy('newest');
                  setShowFilterPopover(false);
                }}
                className={`hover:bg-muted/30 w-full justify-between bg-transparent text-white ${
                  sortBy === 'newest' ? 'border-none bg-[#2b2b2b]' : ''
                }`}
              >
                Newest first
                {sortBy === 'newest' && <Check className='h-4 w-4' />}
              </Button>
              <Button
                // variant='outline'
                onClick={() => {
                  setSortBy('oldest');
                  setShowFilterPopover(false);
                }}
                className={`hover:bg-muted/30 w-full justify-between bg-transparent text-white ${
                  sortBy === 'oldest' ? 'border-none bg-[#2b2b2b]' : ''
                }`}
              >
                Oldest first
                {sortBy === 'oldest' && <Check className='h-4 w-4' />}
              </Button>
            </div>
          </div>

          {/* Backer name Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground text-sm font-medium'>
              Backer name
            </h3>
            <Button
              // variant='outline'
              onClick={() => {
                setSortBy('alphabetical');
                setShowFilterPopover(false);
              }}
              className={`hover:bg-muted/30 w-full justify-between bg-transparent text-white ${
                sortBy === 'alphabetical' ? 'border-none bg-[#2b2b2b]' : ''
              }`}
            >
              Alphabetical
              {sortBy === 'alphabetical' && <Check className='h-4 w-4' />}
            </Button>
          </div>

          {/* Funding amount Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground text-sm font-medium'>
              Funding amount
            </h3>
            <div className='space-y-1'>
              <Button
                // variant='outline'
                onClick={() => {
                  setSortBy('highest');
                  setShowFilterPopover(false);
                }}
                className={`hover:bg-muted/30 w-full justify-between bg-transparent text-white ${
                  sortBy === 'highest' ? 'border-none bg-[#2b2b2b]' : ''
                }`}
              >
                Highest first
                {sortBy === 'highest' && <Check className='h-4 w-4' />}
              </Button>
              <Button
                // variant='outline'
                onClick={() => {
                  setSortBy('lowest');
                  setShowFilterPopover(false);
                }}
                className={`hover:bg-muted/30 w-full justify-between bg-transparent text-white ${
                  sortBy === 'lowest' ? 'border-none bg-[#2b2b2b]' : ''
                }`}
              >
                Lowest first
                {sortBy === 'lowest' && <Check className='h-4 w-4' />}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortFilterPopover;
