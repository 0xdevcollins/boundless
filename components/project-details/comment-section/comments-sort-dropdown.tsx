'use client';

import { useState } from 'react';
import { ListFilter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type SortOption = 'latest' | 'oldest' | 'most-relevant';

const sortLabels: Record<SortOption, string> = {
  latest: 'Latest',
  oldest: 'Oldest',
  'most-relevant': 'Most relevant',
};

export function CommentsSortDropdown() {
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-8 gap-2 border-[#22c55e]/30 bg-black px-3 text-[#22c55e] hover:bg-[#22c55e]/10 hover:text-[#22c55e] md:h-9 md:px-4'
        >
          <ListFilter className='size-4' />
          <span className='hidden md:inline'>{sortLabels[sortBy]}</span>
          <span className='md:hidden'>Latest</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        className='w-48 border-zinc-800 bg-black'
      >
        <DropdownMenuRadioGroup
          value={sortBy}
          onValueChange={value => setSortBy(value as SortOption)}
        >
          <DropdownMenuRadioItem
            value='latest'
            className='text-white data-[state=checked]:text-[#22c55e]'
          >
            Latest
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='oldest'
            className='text-white data-[state=checked]:text-[#22c55e]'
          >
            Oldest
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='most-relevant'
            className='text-white data-[state=checked]:text-[#22c55e]'
          >
            Most relevant
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
